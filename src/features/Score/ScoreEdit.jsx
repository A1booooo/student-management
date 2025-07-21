import { useState } from "react";

export default function ScoreEdit() {
  const [score, setScore] = useState(80);
  const [subject, setSubject] = useState("Math");
  const [semester, setSemester] = useState(new Date().getFullYear());
  const [season, setSeason] = useState("Spring");
  const yearList = Array.from(
    { length: new Date().getFullYear() - 2000 + 1 },
    (_, i) => 2000 + i
  );
  yearList.reverse();

  function handleScoreChange(e) {
    setScore(e.target.value);
  }

  return (
    <div className="w-1/3 mx-auto text-center shadow-xl mt-40 rounded-lg">
      <h1 className="text-2xl font-bold pt-4">Alex</h1>
      <div className="w-3/4 mx-auto">
        <label className="input input-bordered flex items-center gap-2 my-4 w-full">
          Class
          <input
            type="text"
            className="grow"
            value="Class 1 | Year 8"
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
      <button className="btn btn-primary mx-2 my-2">Update Score</button>
    </div>
  );
}
