import { useNavigate } from "react-router-dom";

function ScoreListItem({item}) {
  const navigate = useNavigate();
  function handleEdit() {
    navigate(`/home/score/${item.id}`);
  }
  return (
    <tr>
      <td>{item.student_id}</td>
      <td>{item.student_id}</td>
      <td>{item.subject}</td>
      <td>{`${item.semesterSeason} ${item.semesterYear}`}</td>
      <td>{item.score}</td>
      <td>
        <button className="btn btn-ghost btn-soft btn-md mr-3" onClick={handleEdit}>edit</button>
        <button className="btn btn-error btn-md">delete</button>
      </td>
    </tr>
  );
}
export default ScoreListItem;
