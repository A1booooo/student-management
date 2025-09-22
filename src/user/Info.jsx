import { useEffect, useState } from "react";
import { toast } from "sonner";

import { upLoadAvatar } from "../services/apiStorage";
import { useAtom, useAtomValue } from "jotai";
import { userAtom, isStudentAtom } from "../atoms/user";
import { getTeacher } from "../services/apiTeacher";
import { updateUser } from "../services/apiAuth";
import Loading from "../ui/Loading";
import { getStudentByStudentId, updateStudent } from "../services/apistudent";

export default function Info() {
  const [user, setUser] = useAtom(userAtom);
  const isStudent = useAtomValue(isStudentAtom);
  const [avatar, setAvatar] = useState(user.avatar); //Info中需要改变user,而NavBar中只需要读取,所以只需要在Info中多设置一个avatar
  const [avatarFile, setAvatarFile] = useState(null);
  const [classInChargeArr, setClassInChargeArr] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isStudent) {
      const fetchStudentData = async () => {
        setLoading(true);
        const students = await getStudentByStudentId(user.sub);
        const studentData = students[0];
        setAvatar(studentData.avatar);
        setLoading(false);
      };
      fetchStudentData();
    } else {
      const fetchTeacherData = async () => {
        setLoading(true);
        setAvatar(user.avatar);
        const data = await getTeacher(user.sub);
        if (data && data.length > 0) {
          setClassInChargeArr(JSON.parse(data[0].class_in_charge));
        }
        setLoading(false);
      };
      fetchTeacherData();
    }
  }, [user]);

  function handleFileChange(e) {
    const file = e.target.files[0];
    setAvatarFile(file);
    const newAvatarUrl = URL.createObjectURL(file);
    setAvatar(newAvatarUrl);
  }

  async function onClick() {
    toast.loading("Updating...");
    if (!avatarFile) {
      toast.dismiss();
      toast.error("Please select a file");
      return;
    }
    //Build filename
    const token = import.meta.env.VITE_SUPABASE_TOKEN;
    const userToken = JSON.parse(localStorage.getItem(token));
    const fileName = "public/" + userToken.user.email + Date.now() + ".png";
    //Upload file in storage
    await upLoadAvatar(fileName, avatarFile);
    //Update user metadata in supabase
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const avatarUrl =
      supabaseUrl + "/storage/v1/object/public/avatar/" + fileName;
    const newUserMeta = await updateUser({ avatar: avatarUrl });
    if (isStudent) {
      const newStudentMeta = await updateStudent(user.sub, {
        avatar: avatarUrl,
      });
    }
    //Update user state in jotai
    setUser(newUserMeta.user.user_metadata);
    toast.dismiss();
    toast.success("Update Info Success");
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-1/3 mx-auto text-center shadow-xl mt-40 rounded-lg">
          <label>
            <div className="avatar w-1/3 mt-10">
              <div className="w-24 rounded-full mx-auto">
                <img src={avatar} />
              </div>
            </div>
            <input
              type="file"
              className="file-input hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <label className="input validator input-lg mx-2 my-2 w-4/5">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input type="email" placeholder="Aibo" required disabled />
          </label>
          {!isStudent && (
            <ul className="menu bg-base-200 rounded-box w-4/5 mx-auto">
              <li>
                <details open>
                  <summary>Class In Charge</summary>
                  <ul>
                    {classInChargeArr.map((item, idx) => {
                      return (
                        <li key={idx} className="text-left ml-4 mb-2">
                          {`Class${item.split("|")[0]} | Year${
                            item.split("|")[1]
                          }`}
                        </li>
                      );
                    })}
                  </ul>
                </details>
              </li>
            </ul>
          )}
          <button className="btn btn-primary mx-2 my-4" onClick={onClick}>
            Update Avater
          </button>
        </div>
      )}
    </>
  );
}
