import { getAuth, updateProfile } from "firebase/auth";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import { deleteDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import ListingItem from "../components/ListingItem";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

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
  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);
  async function onDelete(listingID) {
    if (window.confirm("Are you sure you want to delete.?")) {
      await deleteDoc(doc(db, "listings", listingID));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updatedListings);
      toast.success("Successfully deleted listings");
    }
  }
  function onEdit(listingID) {
    navigate(`/edit-listing/${listingID}`);
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
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6">
              My Listings
            </h2>
            <ul className=" sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
