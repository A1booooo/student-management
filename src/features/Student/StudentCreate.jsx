import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import Loading from "../../ui/Loading";

import { getTeacher as getTeacherApi } from "../../services/apiTeacher";
import { createStudent as createStudentApi } from "../../services/apiStudent";
import { signup as signupApi } from "../../services/apiAuth";

function StudentCreate() {
  const { mutate: getTeacher, isPending: isGettingTeacher } = useMutation({
    mutationFn: ({ teacherId }) => getTeacherApi(teacherId),
    onSuccess: (data) => {
      if (data && data.length > 0) {
        const classInCharge = JSON.parse(data[0].class_in_charge);
        setClassInChargeArr(classInCharge);
        setClassInfo(classInCharge[0]);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: signup } = useMutation({
    mutationFn: ({ email, password, metaData }) =>
      signupApi(email, password, metaData),
    onMutate: () => {
      toast.loading("Creating...");
    },
    onSuccess: (userData) => {
      createStudent({
        name,
        // 提取数字部分并转换为整数（移除 "Class " 前缀）
        class: parseInt(classInfo.split("|")[0].replace(/\D/g, ""), 10),
        // 直接转换年级为整数
        grade: parseInt(classInfo.split("|")[1].replace(/\D/g, ""), 10),
        teacher_id: teacher_id,
        student_id: userData.user.id,
        gender,
        avatar:
          "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: createStudent } = useMutation({
    mutationFn: (student) => createStudentApi(student),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Successfully created!");
      setTimeout(() => {
        navigate("/home/student");
      }, 1500);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const navigate = useNavigate();
  const [name, setName] = useState("Someone");
  const [email, setEmail] = useState("some@example.com");
  const [classInfo, setClassInfo] = useState("x|x");
  const [classInChargeArr, setClassInChargeArr] = useState([]);
  const [gender, setGender] = useState("male");
  const [teacher_id, setTeacherId] = useState("");
  const isLoading = isGettingTeacher;

  const token = import.meta.env.VITE_SUPABASE_TOKEN;
  const userToken = JSON.parse(localStorage.getItem(token));

  useEffect(() => {
    getTeacher({ teacherId: userToken.user.id });
    setTeacherId(userToken.user.id);
  }, []);

  async function onClick() {
    signup({ email, password: "Qwe123456", isStudent: true });
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-1/3 mx-auto shadow-2xl shadow-blue-300 rounded-box mt-40">
          <div className="w-3/4 mx-auto pt-4">
            <label className="input input-bordered flex items-center gap-2 my-4 w-full">
              Name
              <input
                type="text"
                className="grow"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 my-4 w-full">
              Email
              <input
                type="text"
                className="grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <select
              className="select select-bordered w-full mb-4"
              value={classInfo}
              onChange={(e) => setClassInfo(e.target.value)}
            >
              <option disabled>Choose Class</option>
              {classInChargeArr.map((item, idx) => {
                return (
                  <option key={idx} value={item}>
                    {`Class${item.split("|")[0]} | Year${item.split("|")[1]}`}
                  </option>
                );
              })}
            </select>

            <select
              className="select select-bordered w-full mb-4"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option disabled>Choose Gender</option>
              <option>male</option>
              <option>female</option>
            </select>
          </div>

          <div className="text-center">
            <button className="btn btn-primary my-2" onClick={onClick}>
              Create Student
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default StudentCreate;
