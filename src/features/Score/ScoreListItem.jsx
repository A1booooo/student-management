import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { isStudentAtom } from "../../atoms/user";

function ScoreListItem({ item, currentStudent }) {
  const navigate = useNavigate();
  const isStudent = useAtomValue(isStudentAtom);
  function handleEdit() {
    navigate(`/home/score/${item.id}`);
  }
  return (
    <tr>
      <td>{currentStudent?.name}</td>
      <td>{`Class ${currentStudent.class} | Grade ${currentStudent.grade}`}</td>
      <td>{item.subject}</td>
      <td>{`${item.semesterSeason} ${item.semesterYear}`}</td>
      <td>{item.score}</td>

      {!isStudent && (
        <td>
          <button
            className="btn btn-ghost btn-soft btn-md mr-3"
            onClick={handleEdit}
          >
            edit
          </button>
          <button className="btn btn-error btn-md">delete</button>
        </td>
      )}
    </tr>
  );
}
export default ScoreListItem;
