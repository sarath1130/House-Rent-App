import { getAuth } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-4xl text-center mt-6 font-extrabold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <div>
            <form>
              {/*Name Input*/}
              <input
                type="text"
                id="name"
                value={name}
                disabled
                className="mb-6 w-full px-4 py-2 text-xl text-red-700 bg-gray-200 border-gray-100 rounded transition ease-in-out"
              />
              {/*Email Input*/}
              <input
                type="email"
                id="email"
                value={email}
                disabled
                className="mb-6 w-full px-4 py-2 text-xl text-red-700 bg-gray-200 border-gray-100 rounded transition ease-in-out"
              />
              <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
                <p className="flex items-center text-blue-800">
                  Do you want to change your name.!?
                  <span className="text-red-600 hover:text-pink-950 transition ease-in-out duration-200 ml-1 cursor-pointer">
                    Edit
                  </span>
                </p>
                <p
                  onClick={onLogout}
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
                >
                  Sign Out
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
