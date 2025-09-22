import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import StudentListItem from "./StudentListItem";
import { getUserId } from "../../utils/userHelper";
import Loading from "../../ui/Loading";
import { studentSearchConditionAtom } from "../../atoms/search";
import Pagination from "../../ui/Pagination";

import { getStudentList as getStudentListApi } from "../../services/apiStudent";

export default function StudentList() {
  const { mutate: getStudentList, isPending: isLoading } = useMutation({
    mutationFn: ({ teacherId }) => getStudentListApi(teacherId),
    onSuccess: (data) => {
      setStudentList(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [studentList, setStudentList] = useState([]);
  const studentSearchCondition = useAtomValue(studentSearchConditionAtom);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const pageSize = Number(import.meta.env.VITE_PAGE_SIZE);
  const filteredStudentList = studentList.filter((student) => {
    const studentItem = JSON.stringify([
      student.name.toLowerCase(),
      student.gender,
      student.class,
    ]);
    for (const condition of studentSearchCondition) {
      if (!studentItem.includes(condition)) {
        return false;
      }
    }
    return true;
  });
  const pagedStudentList = filteredStudentList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  useEffect(() => {
    function fetchData() {
      const teacherId = getUserId();
      getStudentList({ teacherId });
    }

    fetchData();
  }, []);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table table-fixed w-full">
              {/* head */}
              <thead>
                <tr>
                  <th className="w-1/10">
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th className="w-3/10">Name</th>
                  <th className="w-3/10">Class</th>
                  <th className="w-3/10">Action</th>
                </tr>
              </thead>
              <tbody>
                {pagedStudentList.map((student) => (
                  <StudentListItem key={student.id} student={student} />
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageCount={Math.ceil(filteredStudentList.length / pageSize)}
          />
        </>
      )}
    </>
  );
}
