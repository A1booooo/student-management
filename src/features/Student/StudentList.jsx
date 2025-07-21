import { useState, useEffect } from "react";

import StudentListItem from "./StudentListItem";
import getStudentList from "../../services/apiStudent";

export default function StudentList() {
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const mockStudentList = await getStudentList();
      setStudentList(mockStudentList);
    }

    fetchData();
  }, []);
  return (
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
          {studentList.map((student) => (
            <StudentListItem key={student.id} student={student} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
