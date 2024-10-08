import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ConnexionContext } from "../Contextes/ConnexionContexte";
import "./styles/profile.css";

const apiUrl = import.meta.env.VITE_API_URL;

function Profile() {
  const {
    isConnected,
    alias,
    handleLogout,
    profilePicture: initialProfilePicture,
    updateProfilePicture,
  } = useContext(ConnexionContext);

  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(initialProfilePicture);
  const [dragOver, setDragOver] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (initialProfilePicture) {
      setProfilePicture(initialProfilePicture);
    } else {
      console.error("No initial profile picture found.");
    }
  }, [initialProfilePicture]);

  const uploadAvatar = async (file) => {
    if (!token) {
      console.error("No token found.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${apiUrl}/api/upload/avatars`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      return result.filename;
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      throw error;
    }
  };

  const updateUserData = async (data) => {
    if (!token) {
      console.error("No token found.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/user/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error updating user data:", errorText);
        throw new Error(errorText);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];

    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      try {
        const filename = await uploadAvatar(file);

        if (filename) {
          const newProfilePictureUrl = `${apiUrl}/uploadsAvatars/${filename}?v=${new Date().getTime()}`;

          setProfilePicture(newProfilePictureUrl);

          const userData = {
            profilePicture: newProfilePictureUrl,
            alias,
          };

          await updateUserData(userData);
          updateProfilePicture(newProfilePictureUrl);
        }
      } catch (error) {
        console.error(
            "Error uploading profile picture or updating user data:",
            error
        );
      }
    } else {
      console.error("Invalid file type. Only PNG and JPEG are allowed.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDisconnect = () => {
    handleLogout();
    navigate("/");
  };

  return (
      <main>
        <div
            className={`profile-picture-container ${dragOver ? "drag-over" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
          {profilePicture ? (
              <img
                  src={profilePicture}
                  alt={`${alias}'s avatar`}
                  className="profile-picture"
              />
          ) : (
              <p>No profile picture available</p>
          )}
        </div>
        <div className="infos-profile-container">
          <div className="alias-container">
            {isConnected && <h2 className="alias-text">{alias}</h2>}
          </div>

          <div className="disconnect-button-container">
            <button
                className="disconnect-button"
                onClick={handleDisconnect}
                type="button"
            >
              Disconnect
            </button>
          </div>
        </div>
      </main>
  );
}

export default Profile;
