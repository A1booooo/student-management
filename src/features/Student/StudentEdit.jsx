import { useState } from "react";

export default function StudentEdit() {
  const [name, setName] = useState()
  const [gender, setGender] = useState()

  return (
    <div className="w-1/3 mx-auto text-center shadow-xl mt-40 rounded-lg">
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' />
        </div>
      </div>
      <div className="w-3/4 mx-auto">
        <label className="input input-bordered flex items-center gap-2 my-4 w-full">
          Name
          <input
            type="text"
            className="grow"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        
      </div>
      <select
        className="select w-3/4 my-2"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option disabled={true}>Choose Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      <br />
      <button className="btn btn-primary mx-2 my-2">Update Score</button>
    </div>
  );
}
