import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { useAtom, useAtomValue } from "jotai";
import { userAtom, isStudentAtom } from "../atoms/user";
import Loading from "../ui/Loading";

import { upLoadAvatar as uploadAvatarApi } from "../services/apiStorage";
import { getTeacher as getTeacherApi } from "../services/apiTeacher";
import { updateUser as updateUserApi } from "../services/apiAuth";
import {
  getStudentByStudentId as getStudentByStudentIdApi,
  updateStudent as updateStudentApi,
} from "../services/apiStudent";

export default function Info() {
  const { mutate: getStudentByStudentId, isPending: isGettingStudentById } =
    useMutation({
      mutationFn: ({ studentId }) => getStudentByStudentIdApi(studentId),
      onSuccess: (studentData) => {
        setAvatar(studentData.avatar);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const { mutate: getTeacher, isPending: isGettingTeacherById } = useMutation({
    mutationFn: ({ teacherId }) => getTeacherApi(teacherId),
    onSuccess: (teacherData) => {
      if (teacherData && teacherData.length > 0) {
        setClassInChargeArr(JSON.parse(teacherData[0].class_in_charge));
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: uploadAvatar, isPending: isUploadingAvatar } = useMutation({
    mutationFn: ({ fileName, file }) => uploadAvatarApi(fileName, file),
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: updateUser } = useMutation({
    mutationFn: (newUserMetaData) => updateUserApi(newUserMetaData),
    onSuccess: (newUserMeta) => {
      //Update user state in jotai
      setUser(newUserMeta.user.user_metadata);
      if (!isStudent) {
        toast.dismiss();
        toast.success("Update Info Success");
      }
    },

    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  const { mutate: updateStudent, isPending: isUpdatingStudent } = useMutation({
    mutationFn: ({ studentId, studentData }) =>
      updateStudentApi(studentId, studentData),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Update Info Success");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [user, setUser] = useAtom(userAtom);
  const isStudent = useAtomValue(isStudentAtom);
  const [avatar, setAvatar] = useState(user.avatar); //Info中需要改变user,而NavBar中只需要读取,所以只需要在Info中多设置一个avatar
  const [avatarFile, setAvatarFile] = useState(null);
  const [classInChargeArr, setClassInChargeArr] = useState([]);
  const isLoading = isGettingStudentById || isGettingTeacherById;

  useEffect(() => {
    if (isStudent) {
      const fetchStudentData = () => {
        getStudentByStudentId({ studentId: user.sub });
      };
      fetchStudentData();
    } else {
      const fetchTeacherData = () => {
        setAvatar(user.avatar);
        getTeacher({ teacherId: user.sub });
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

  function onClick() {
    toast.loading("Uploading...");
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
    uploadAvatar({ fileName, file: avatarFile });
    //Update user metadata in supabase
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const avatarUrl =
      supabaseUrl + "/storage/v1/object/public/avatar/" + fileName;
    updateUser({ avatar: avatarUrl });
    if (isStudent) {
      updateStudent({
        studentId: user.sub,
        studentData: {
          avatar: avatarUrl,
        },
      });
    }
  }

  return (
    <>
      {isLoading ? (
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
            Update Avatar
          </button>
        </div>
      )}
    </>
  );
}
