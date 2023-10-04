import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Container } from "../components/Container";

export default function UserProfile() {
  const { currentUser, updateUserProfile } = useAuth();
  const [newDisplayName, setNewDisplayName] = useState(currentUser.displayName);
  const [newPhotoURL, setNewPhotoURL] = useState(currentUser.photoURL);
  const [modal, setModal] = useState(false);

  const updateProfile = async (e) => {
    e.preventDefault();
    await updateUserProfile(newDisplayName, newPhotoURL);
    setModal(false);
  };
  return (
    <div className="flex items-center justify-center dark:text-white  dark:bg-slate-900 text-center md:p-20 p-5 min-h-[90vh]">
      <Container>
        <div>
          <img
            src={currentUser?.photoURL}
            alt="profile_photo"
            className="rounded-full mx-auto w-96"
          />
          <h1 className="font-bold text-secondary2 text-4xl mt-5">
            {currentUser?.name}
          </h1>
          <h6 className="text-gray-400">{currentUser.email}</h6>
          {/* The button to open modal */}
          <button
            onClick={() => setModal(!modal)}
            className="mt-10 bg-red-100 font-semibold text-primary py-2 px-6 rounded border-none hover:bg-red-200 transision-all duration-200"
          >
            Edit Profile
          </button>
        </div>
      </Container>

      {/* Put this part before </body> tag */}
      {modal && (
        <div className="">
          <div
            onClick={() => setModal(false)}
            className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
          ></div>
          <div className="rounded w-3/4 overflow-auto lg:w-2/5 bg-white dark:bg-gray-700 p-2 md:p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <form onSubmit={updateProfile} className="text-left p-5 md:p-10">
              <label className="font-bold" htmlFor="displayName">
                Name
              </label>
              <br />
              <input
                id="displayName"
                type="text"
                className="p-3 dark:bg-white bg-gray-100 rounded font-bold mb-2 w-full text-black focus:outline-none"
                defaultValue={currentUser?.name}
                onChange={(e) => setNewDisplayName(e.target.value)}
              />
              <br />
              <label className="font-bold text-secondary2" htmlFor="photoURL">
                Photo URL
              </label>
              <br />
              <input
                id="photoURL"
                type="text"
                className="p-3 dark:bg-white bg-gray-100 rounded font-bold w-full shadow text-black focus:outline-none"
                defaultValue={currentUser?.photoURL}
                onChange={(e) => setNewPhotoURL(e.target.value)}
              />
              <input
                className="bg-primary text-white w-full p-2 mt-5 rounded hover:bg-secondary transition-all duration-200 cursor-pointer"
                type="submit"
                value="Update"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
