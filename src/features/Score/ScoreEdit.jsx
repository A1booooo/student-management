import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import Loading from "../../ui/Loading";

import { getScoreByScoreId as getScoreByScoreIdApi } from "../../services/apiScore";
import { getStudentByStudentId as getStudentByStudentIdApi } from "../../services/apiStudent";
import { updateScore as updateScoreApi } from "../../services/apiScore";

export default function ScoreEdit() {
  const { mutate: getScoreByScoreId, isPending: isGettingScoreById } =
    useMutation({
      mutationFn: ({ scoreId }) => getScoreByScoreIdApi(scoreId),
      onSuccess: (score) => {
        setScore(score.score);
        setSubject(score.subject);
        setSemester(score.semester);
        setSeason(score.season);
        getStudentByStudentId({ studentId: score.student_id });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const { mutate: getStudentByStudentId, isPending: isGettingStudentById } =
    useMutation({
      mutationFn: ({ studentId }) => getStudentByStudentIdApi(studentId),
      onSuccess: (student) => {
        setCurrentStudent(student);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const { mutate: updateScore } = useMutation({
    mutationFn: ({ scoreId, score }) => updateScoreApi(scoreId, score),
    onMutate:() => {
      toast.loading("Updating...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Score updated successfully");
      setTimeout(() => {
        navigate("/home/score");
      }, 1500);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [score, setScore] = useState(80);
  const [subject, setSubject] = useState("Math");
  const [semester, setSemester] = useState(new Date().getFullYear());
  const [season, setSeason] = useState("Spring");
  const [currentStudent, setCurrentStudent] = useState({
    name: "someone",
    class: "x",
    grade: "x",
  });
  const isLoading = isGettingScoreById || isGettingStudentById;
  const yearList = Array.from(
    { length: new Date().getFullYear() - 2000 + 1 },
    (_, i) => 2000 + i
  );
  yearList.reverse();

  useEffect(() => {
    function fetchScore() {
      getScoreByScoreId({ scoreId: id });
    }
    fetchScore();
  }, [id]);

  function handleScoreChange(e) {
    setScore(e.target.value);
  }

  function onClick() {
    const newScore = {
      score,
      subject,
      semester,
      season,
    };
    updateScore({ scoreId: id, score: newScore });
    
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-1/3 mx-auto text-center shadow-xl mt-40 rounded-lg">
          <h1 className="text-2xl font-bold pt-4">{currentStudent.name}</h1>
          <div className="w-3/4 mx-auto">
            <label className="input input-bordered flex items-center gap-2 my-4 w-full">
              Class
              <input
                type="text"
                className="grow"
                value={`Class ${currentStudent.class} | Year ${currentStudent.grade}`}
                disabled
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-4 w-full">
              Score
              <input
                type="number"
                className="grow"
                value={score}
                onChange={handleScoreChange}
              />
            </label>
          </div>
          <select
            className="select w-3/4 my-2"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option disabled={true}>Choose Subject</option>
            <option>Math</option>
            <option>English</option>
            <option>Science</option>
            <option>Social</option>
            <option>Religion</option>
            <option>PE</option>
          </select>
          <div className="mx-auto flex justify-center gap-2 w-3/4">
            <select
              className="select w-3/4 my-2"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option disabled={true}>Choose Semester</option>
              {yearList.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              className="select w-3/4 my-2"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            >
              <option disabled={true}>Choose Season</option>
              <option>Spring</option>
              <option>Fall</option>
            </select>
          </div>
          <br />
          <button className="btn btn-primary mx-2 my-2" onClick={onClick}>
            Update Score
          </button>
        </div>
      )}
    </>
  );
}
