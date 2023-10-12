import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Container } from "../components/Container";
import { Modal, Input } from "antd"; // Import Modal and Input from Ant Design
import avatar from "/avatar.png";

const UserProfile = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [newDisplayName, setNewDisplayName] = useState(currentUser.displayName);
  const [newPhotoURL, setNewPhotoURL] = useState(currentUser.photoURL);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async () => {
    await updateUserProfile(newDisplayName, newPhotoURL);
    setIsModalVisible(false);
  };

  return (
    <div className="flex items-center justify-center text-center md:p-20 p-5 min-h-[90vh]">
      <Container>
        <div>
          <img
            src={currentUser?.photoURL || avatar}
            alt="profile_photo"
            className="rounded-full mx-auto w-96"
          />
          <h1 className="font-bold text-secondary2 text-4xl mt-5">
            {currentUser?.name}
          </h1>
          <h6 className="text-gray-400">{currentUser.email}</h6>
          <button
            onClick={showModal}
            className="mt-10 bg-red-100 font-semibold text-primary py-2 px-6 rounded border-none hover:bg-red-200 transition-all duration-200"
          >
            Edit Profile
          </button>
        </div>
      </Container>

      <Modal
        title="Edit Profile"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form>
          <label className="font-bold" htmlFor="displayName">
            Name
          </label>
          <br />
          <Input
            id="displayName"
            type="text"
            className="mb-2"
            defaultValue={currentUser?.name}
            onChange={(e) => setNewDisplayName(e.target.value)}
          />
          <br />
          <label className="font-bold text-secondary2" htmlFor="photoURL">
            Photo URL
          </label>
          <br />
          <Input
            id="photoURL"
            type="text"
            defaultValue={currentUser?.photoURL}
            onChange={(e) => setNewPhotoURL(e.target.value)}
          />
        </form>
      </Modal>
    </div>
  );
};

export default UserProfile;
