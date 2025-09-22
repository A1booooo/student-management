import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { useSearchParams } from "react-router-dom";

import ScoreListItem from "./ScoreListItem";
import { getScoreList } from "../../services/apiScore";
import {
  getStudentByStudentId,
  getStudentList,
} from "../../services/apistudent";
import { getUserId } from "../../utils/userHelper";
import Loading from "../../ui/Loading";
import { isStudentAtom } from "../../atoms/user";
import { scoreSearchConditionAtom } from "../../atoms/search";
import Pagination from "../../ui/Pagination";

export default function ScoreList() {
  const [scoreList, setScoreList] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const isStudent = useAtomValue(isStudentAtom);
  const scoreSearchCondition = useAtomValue(scoreSearchConditionAtom);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
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
    const fetchData = async () => {
      if (isStudent === null) {
        return;
      }
      setLoading(true);

      const userId = getUserId();
      const mockScoreList = await getScoreList();
      setScoreList(mockScoreList);
      if (!isStudent) {
        const mockStudentList = await getStudentList(userId);
        setStudents(mockStudentList);
      } else {
        const mockStudentList = await getStudentByStudentId(userId);
        setStudents(mockStudentList);
      }

      setLoading(false);
    };
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
      {loading ? (
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
