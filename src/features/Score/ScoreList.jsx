import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import ScoreListItem from "./ScoreListItem";
import { getUserId } from "../../utils/userHelper";
import Loading from "../../ui/Loading";
import { isStudentAtom } from "../../atoms/user";
import { scoreSearchConditionAtom } from "../../atoms/search";
import Pagination from "../../ui/Pagination";

import { getScoreList as getScoreListApi } from "../../services/apiScore";
import {
  getStudentByStudentId as getStudentByStudentIdApi,
  getStudentList as getStudentListApi,
} from "../../services/apiStudent";

export default function ScoreList() {
  const { mutate: getScoreList, isPending: isGettingScoreList } = useMutation({
    mutationFn: () => getScoreListApi(),
    onSuccess: (data) => {
      setScoreList(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: getStudentList, isPending: isGettingStudentList } =
    useMutation({
      mutationFn: ({ teacherId }) => getStudentListApi(teacherId),
      onSuccess: (data) => {
        setStudents(data);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const { mutate: getStudentByStudentId, isPending: isGettingStudentById } =
    useMutation({
      mutationFn: ({ studentId }) => getStudentByStudentIdApi(studentId),
      onSuccess: (data) => {
        setStudents(data);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const [scoreList, setScoreList] = useState([]);
  const [students, setStudents] = useState([]);
  const isStudent = useAtomValue(isStudentAtom);
  const isLoading =
    isGettingScoreList || isGettingStudentList || isGettingStudentById;
  const scoreSearchCondition = useAtomValue(scoreSearchConditionAtom);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const pageSize = Number(import.meta.env.VITE_PAGE_SIZE);
  const filteredScoreList = scoreList
    .filter((item) => {
      return students
        .map((student) => student.student_id)
        .includes(item.student_id);
    })
    .filter((score) => {
      const scoreItem = JSON.stringify([
        score.subject.toLowerCase(),
        score.semesterSeason.toLowerCase(),
        score.semesterYear,
      ]);
      for (const condition of scoreSearchCondition) {
        if (!scoreItem.includes(condition)) {
          return false;
        }
      }
      return true;
    });
  const pagedScoreList = filteredScoreList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    function fetchData() {
      if (isStudent === null) {
        return;
      }

      const userId = getUserId();
      getScoreList();

      if (!isStudent) {
        getStudentList({ teacherId: userId });
      } else {
        getStudentByStudentId({ studentId: userId });
      }
    }
    fetchData();
  }, [isStudent]);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table table-xs table-fixed w-full">
              <thead>
                <tr>
                  <th className="w-1/6">Name</th>
                  <th className="w-1/6">Class</th>
                  <th className="w-1/6">Subject</th>
                  <th className="w-1/6">Semester</th>
                  <th className="w-1/6">Score</th>
                  {!isStudent && <th className="w-1/6">Action</th>}
                </tr>
              </thead>
              <tbody>
                {pagedScoreList.map((item) => (
                  <ScoreListItem
                    key={item.id}
                    item={item}
                    currentStudent={students.find(
                      (student) => student.student_id === item.student_id
                    )}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            pageCount={Math.ceil(filteredScoreList.length / pageSize)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
