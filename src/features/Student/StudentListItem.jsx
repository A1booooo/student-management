import { useNavigate } from "react-router-dom";

export default function StudentListItem({ student }) {
  const navigate = useNavigate();
  function handleEdit() {
    navigate(`/home/student/${student.student_id}`);
  }
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={student.avatar} alt={student.name} />
            </div>
          </div>
          <div>
            <div className="font-bold">{student.name}</div>
            <div className="text-sm opacity-50">{student.gender}</div>
          </div>
        </div>
      </td>
      <td>{`Class ${student.class} | Grade ${student.grade}`}</td>
      <th>
        <button className="btn btn-ghost btn-md" onClick={handleEdit}>
          details
        </button>
        <button className="btn btn-error btn-md">delete</button>
      </th>
    </tr>
  );
}
