import { useState } from "react";

export default function Info() {
  const [currentUrl, setCurrentUrl] = useState(
    "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
  );
  function handleFileChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }
  return (
    <>
      <div className="w-1/3 mx-auto text-center shadow-xl mt-40 rounded-lg">
        <label>
          <div className="avatar w-1/3">
            <div className="w-24 rounded-full">
              <img src={currentUrl} />
            </div>
          </div>
          <input
            type="file"
            className="file-input hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        <label className="input validator input-lg mx-2 my-2 w-4/5">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>
          <input type="email" placeholder="Aibo" required disabled />
        </label>
        <ul className="menu bg-base-200 rounded-box w-4/5 mx-auto">
          <li>
            <details open>
              <summary>Class In Charge</summary>
              <ul>
                <li>
                  <a>Year 2</a>
                </li>
                <li>
                  <a>Class 2</a>
                </li>
                <li></li>
              </ul>
            </details>
          </li>
        </ul>
        <button className="btn btn-primary mx-2 my-2">Update Avater</button>
      </div>
    </>
  );
}
