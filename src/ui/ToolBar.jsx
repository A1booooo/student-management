import { useLocation, useNavigate } from "react-router-dom";

export default function ToolBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleCreate() {
    if (pathname === "/home/student") {
      navigate("/home/student/create");
    } else {
      navigate("/home/score/upload");
    }
  }

  return (
    <div className="flex">
      <div className="w-1/3 text-center my-auto">
        <div className="badge badge-info">
          <svg
            className="size-[1em]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="2"
              ></circle>
              <path
                d="m12,17v-5.5c0-.276-.224-.5-.5-.5h-1.5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="2"
              ></path>
              <circle
                cx="12"
                cy="7.25"
                r="1.25"
                fill="currentColor"
                strokeWidth="2"
              ></circle>
            </g>
          </svg>
          Info
        </div>
        <div className="badge badge-success">
          <svg
            className="size-[1em]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="2"
              ></circle>
              <polyline
                points="7 13 10 16 17 8"
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="2"
              ></polyline>
            </g>
          </svg>
          Success
        </div>
        <div className="badge badge-warning">
          <svg
            className="size-[1em]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
          >
            <g fill="currentColor">
              <path
                d="M7.638,3.495L2.213,12.891c-.605,1.048,.151,2.359,1.362,2.359H14.425c1.211,0,1.967-1.31,1.362-2.359L10.362,3.495c-.605-1.048-2.119-1.048-2.724,0Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></path>
              <line
                x1="9"
                y1="6.5"
                x2="9"
                y2="10"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></line>
              <path
                d="M9,13.569c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z"
                fill="currentColor"
                data-stroke="none"
                stroke="none"
              ></path>
            </g>
          </svg>
          Warning
        </div>
        <div className="badge badge-error">
          <svg
            className="size-[1em]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor">
              <rect
                x="1.972"
                y="11"
                width="20.056"
                height="2"
                transform="translate(-4.971 12) rotate(-45)"
                fill="currentColor"
                strokeWidth={0}
              ></rect>
              <path
                d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z"
                strokeWidth={0}
                fill="currentColor"
              ></path>
            </g>
          </svg>
          Error
        </div>
      </div>
      <label className="input w-1/3">
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
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" required placeholder="Search" />
      </label>
      <div className="w-1/3 text-center">
        <button className="btn btn-primary w-2/3" onClick={handleCreate}>
          {pathname === "/home/student" ? "Create Student" : "Upload Score"}
        </button>
      </div>
    </div>
  );
}
