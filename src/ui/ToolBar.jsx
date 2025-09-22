import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { toast } from "sonner";

import { isStudentAtom } from "../atoms/user";
import {
  studentSearchConditionAtom,
  scoreSearchConditionAtom,
} from "../atoms/search";

export default function ToolBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isScoreList = pathname === "/home/score";
  const [searchString, setSearchString] = useState("");
  const [studentSearchCondition, setStudentSearchCondition] = useAtom(
    studentSearchConditionAtom
  );
  const [scoreSearchCondition, setScoreSearchCondition] = useAtom(
    scoreSearchConditionAtom
  );
  const isStudent = useAtomValue(isStudentAtom);

  function handleCreate() {
    if (pathname === "/home/student") {
      navigate("/home/student/create");
    } else {
      navigate("/home/score/upload");
    }
  }

  function onSearch() {
    if (!searchString.length) {
      toast.dismiss();
      toast.error("Please input search string");
      return;
    }
    if (isScoreList) {
      setScoreSearchCondition((prev) => [
        ...prev,
        searchString.toLowerCase(),
      ]);
    } else {
      setStudentSearchCondition((prev) => [
        ...prev,
        searchString.toLowerCase(),
      ]);
    }
    setSearchString("");
  }

  function onDelete(idx) {
    if (isScoreList) {
      setScoreSearchCondition(
        scoreSearchCondition.filter((_, i) => i !== idx)
      );
    } else {
      setStudentSearchCondition(
        studentSearchCondition.filter((_, i) => i !== idx)
      );
    }
  }

  return (
    <div className="flex">
      <div className="w-1/3 text-center my-auto">
        {isScoreList
          ? scoreSearchCondition.map((scoreCondition, idx) => (
              <div className="badge badge-info gap-2" key={idx}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  onClick={() => onDelete(idx)}
                  className="inline-block h-4 w-4 stroke-current cursor-pointer hover:scale-125 transition-transform duration-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                {scoreCondition}
              </div>
            ))
          : studentSearchCondition.map((studentCondition, idx) => (
              <div className="badge badge-info gap-2" key={idx}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  onClick={() => onDelete(idx)}
                  className="inline-block h-4 w-4 stroke-current cursor-pointer hover:scale-125 transition-transform duration-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                {studentCondition}
              </div>
            ))}
      </div>
      <label className="input w-1/3">
        <input
          type="search"
          required
          placeholder="Search"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <svg
          className="h-[1em] opacity-50 cursor-pointer hover:scale-125 transition-transform duration-200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          onClick={onSearch}
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
      </label>
      {!isStudent && (
        <div className="w-1/3 text-center">
          <button className="btn btn-primary w-2/3" onClick={handleCreate}>
            {pathname === "/home/student" ? "Create Student" : "Upload Score"}
          </button>
        </div>
      )}
    </div>
  );
}
