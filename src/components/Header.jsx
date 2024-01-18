import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);
  function pathMathRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6x1 mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          ></img>
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={` cursor-pointer py-6-3 text-sm font-semibold text-gray-500 border-b-[3px] border-b-transparent ${
                pathMathRoute("/") && "text-black border-b-yellow-600"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-6-3 text-sm font-semibold text-gray-500 border-b-[3px] border-b-transparent ${
                pathMathRoute("/Offers") && "text-black border-b-yellow-600"
              }`}
              onClick={() => navigate("/Offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-6-3 text-sm font-semibold text-gray-500 border-b-[3px] border-b-transparent ${
                pathMathRoute("/Sign") && "text-black border-b-yellow-600"
              }`}
              onClick={() => navigate("/Sign")}
            >
              Sign In
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
