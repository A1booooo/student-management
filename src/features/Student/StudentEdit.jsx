import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import Loading from "../../ui/Loading";

import { upLoadAvatar as upLoadAvatarApi } from "../../services/apiStorage";
import {
  getStudentByStudentId as getStudentByStudentIdApi,
  updateStudent as updateStudentApi,
} from "../../services/apiStudent";

export default function StudentEdit() {
  const { mutate: getStudentByStudentId, isPending: isGettingStudent } =
    useMutation({
      mutationFn: ({ studentId }) => getStudentByStudentIdApi(studentId),
      onSuccess: (student) => {
        setName(student.name);
        setGender(student.gender);
        setAvatar(student.avatar);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const { mutate: updateStudent } = useMutation({
    mutationFn: ({ studentId, student }) =>
      updateStudentApi(studentId, student),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Update Student Success");
      setTimeout(() => {
        navigate("/home/student");
      }, 1500);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: upLoadAvatar } = useMutation({
    mutationFn: ({ fileName, file }) => upLoadAvatarApi(fileName, file),
    onMutate: () => {
      toast.loading("Uploading...");
    },
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const { id } = useParams();
  const [avatar, setAvatar] = useState(
    "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
  );
  const [avatarFile, setAvatarFile] = useState(null);
  const navigate = useNavigate();
  const isLoading = isGettingStudent;

  useEffect(() => {
    const fetchStudentData = () => {
      getStudentByStudentId({ studentId: id });
    };
    fetchStudentData();
  }, [id]);

  function handleFileChange(e) {
    const file = e.target.files[0];
    setAvatarFile(file);
    const newAvatarUrl = URL.createObjectURL(file);
    setAvatar(newAvatarUrl);
  }

  async function onClick() {
    toast.loading("Updating...");
    const student = {
      name,
      gender,
    };
    if (avatarFile) {
      //Build filename
      const token = import.meta.env.VITE_SUPABASE_TOKEN;
      const userToken = JSON.parse(localStorage.getItem(token));
      const fileName = "public/" + userToken.user.email + Date.now() + ".png";
      //Upload file in storage
      upLoadAvatar({ fileName, file: avatarFile });
      //Update user metadata in supabase
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const avatarUrl =
        supabaseUrl + "/storage/v1/object/public/avatar/" + fileName;
      student.avatar = avatarUrl;
    }
    updateStudent({ studentId: id, student });
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
          <div className="w-3/4 mx-auto">
            <label className="input input-bordered flex items-center gap-2 my-4 w-full">
              Name
              <input
                type="text"
                className="grow"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <select
            className="select w-3/4 my-2"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option disabled={true}>Choose Gender</option>
            <option>male</option>
            <option>female</option>
          </select>
          <br />
          <button className="btn btn-primary mx-2 my-2" onClick={onClick}>
            Update Score
          </button>
        </div>
      )}
    </>
  );
}
