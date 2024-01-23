import { getAuth, updateProfile } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { FcHome } from "react-icons/fc";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in fire base authentication
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //update name in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile details updated");
    } catch (error) {
      toast.error("Could not update the profile detail");
    }
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
                disabled={!changeDetail}
                onChange={onChange}
                className={`mb-6 w-full px-4 py-2 text-xl text-pink-500 bg-gray-200 border-gray-100 rounded transition ease-in-out ${
                  changeDetail && "bg-red-200 focus:bg-red-200"
                }`}
              />
              {/*Email Input*/}
              <input
                type="email"
                id="email"
                value={email}
                disabled
                className="mb-6 w-full px-4 py-2 text-xl text-pink-500 bg-gray-200 border-gray-100 rounded transition ease-in-out"
              />
              <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
                <p className="flex items-center text-blue-800">
                  Do you want to change your name.!?
                  <span
                    onClick={() => {
                      changeDetail && onSubmit();
                      setChangeDetail((prevState) => !prevState);
                    }}
                    className="text-red-600 hover:text-pink-950 transition ease-in-out duration-200 ml-1 cursor-pointer"
                  >
                    {changeDetail ? "Apply change" : "Edit"}
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

            <button
              type="submit"
              className="w-full bg-red-600 text-white uppercase px-6 py-2 text-sm font-medium rounded shadow-md hover:bg-red-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-black"
            >
              <Link
                to="/create-listing"
                className="flex justify-center items-center"
              >
                <FcHome className="mr-2 text-3xl bg-black rounded-full p-1 border-2" />
                Sell or Rent your home
              </Link>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
