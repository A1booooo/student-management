import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";
import { getUserId } from "../../utils/userHelper";
import Loading from "../../ui/Loading";

import { getStudentList as getStudentListApi } from "../../services/apiStudent";
import { uploadScore as uploadScoreApi } from "../../services/apiScore";

function ScoreUpload() {
  const { mutate: getStudentList, isPending: isGettingStudentList } =
    useMutation({
      mutationFn: ({ teacherId }) => getStudentListApi(teacherId),
      onSuccess: (StudentList) => {
        setStudents(StudentList);
        setCurrentStudent(StudentList[0]);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const { mutate: uploadScore } = useMutation({
    mutationFn: (score) => uploadScoreApi(score),
    onMutate: () => {
      toast.loading("Uploading...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Score uploaded successfully");
      setTimeout(() => {
        navigate("/home/score");
      }, 1500);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState({
    name: "someone",
    student_id: "123456789",
    class: "x",
    grade: "x",
  });
  const [score, setScore] = useState(80);
  const [subject, setSubject] = useState("Mathematics");
  const isLoading = isGettingStudentList;
  const [semesterYear, setSemesterYear] = useState(new Date().getFullYear());
  const [semesterSeason, setSemesterSeason] = useState("Spring");

  const yearList = Array.from(
    { length: new Date().getFullYear() - 2000 + 1 },
    (_, idx) => 2000 + idx
  );

  useEffect(() => {
    function fetchData() {
      const teacherId = getUserId();
      getStudentList({ teacherId });
    }

    fetchData();
  }, []);

  async function onClick() {
    uploadScore({
      student_id: currentStudent.student_id,
      subject,
      score,
      semesterYear,
      semesterSeason,
    });
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-1/3 mx-auto shadow-2xl shadow-blue-300 rounded-box mt-40">
          <div className="w-3/4 mx-auto pt-4">
            <select
              className="select select-bordered w-full mb-4"
              value={currentStudent.student_id}
              onChange={(e) =>
                setCurrentStudent(
                  students.find(
                    (student) => student.student_id === e.target.value
                  )
                )
              }
            >
              <option disabled>Choose Student</option>
              {students.map((student, idx) => (
                <option key={idx} value={student.student_id}>
                  {student.name}
                </option>
              ))}
            </select>

            <label className="input input-bordered flex items-center gap-2 my-4 w-full">
              Student ID
              <input
                type="text"
                className="grow"
                value={currentStudent.student_id}
                disabled
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 my-4 w-full">
              Class
              <input
                type="text"
                className="grow"
                value={currentStudent.class}
                disabled
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 my-4 w-full">
              Score
              <input
                type="number"
                className="grow"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
              />
            </label>

            <select
              className="select select-bordered w-full mb-4"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option disabled>Choose Subject</option>
              <option>Mathematics</option>
              <option>English</option>
              <option>Science</option>
              <option>History</option>
              <option>Geography</option>
              <option>Art</option>
              <option>Music</option>
              <option>Sports</option>
            </select>

            <div className="grid grid-cols-2 gap-4">
              <select
                className="select select-bordered w-full"
                value={semesterYear}
                onChange={(e) => setSemesterYear(e.target.value)}
              >
                <option disabled>Choose Year</option>
                {yearList.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
              <select
                className="select select-bordered w-full"
                value={semesterSeason}
                onChange={(e) => setSemesterSeason(e.target.value)}
              >
                <option disabled>Choose Season</option>
                <option>Spring</option>
                <option>Fall</option>
              </select>
            </div>
          </div>

          <div className="text-center">
            <button className="btn btn-primary my-2" onClick={onClick}>
              Upload Score
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ScoreUpload;
