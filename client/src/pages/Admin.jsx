import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ConnexionContext } from "../Contextes/ConnexionContexte";
import UserCard from "../components/Admin/UserCard";
import "./styles/admin.css";

// eslint-disable-next-line react/prop-types
function Admin({ alias }) {
  const [users, setUsers] = useState([]);
  const [showUsersVerified, setShowUsersVerified] = useState("all");
  // eslint-disable-next-line no-unused-vars
  const { isAdmin, handleLogin } = useContext(ConnexionContext);
  const navigate = useNavigate();

  // Check if user is admin on component mount
  useEffect(() => {
    if (!isAdmin) {
      navigate("/"); // Redirect to home if not admin
    }
  }, [isAdmin, navigate]);

  // Check if token exists on component mount
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const token = localStorage.getItem("token");
  }, []);

  // Fetch users from the server based on verification status
  const fetchUsers = () => {
    let userUrl = `${import.meta.env.VITE_API_URL}/api/user`;
    if (showUsersVerified !== "all") {
      userUrl += `?verify=${showUsersVerified}`;
    }

    fetch(userUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };


  // Fetch users when the verification filter changes
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showUsersVerified]);



  // Handle radio button change for users filter
  const handleUsersRadioChange = (event) => {
    setShowUsersVerified(event.target.value);
  };

  const updateUser = async (userId, isAdmin, isVerify) => {
    try {
      const response = await fetch(`http://localhost:3310/api/user/admin-verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId, isAdmin, isVerify }),
      });

      if (!response.ok) {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };




  return (
    <div>
      <h1 className="admin-title">Espace Admin</h1>
      <h2 className="admin-welcome">
        Bienvenue {alias}, vous avez tous les pouvoirs !
      </h2>
      <div className="user-container">
        <label>
          Afficher les utilisateurs :
          <input
            type="radio"
            value="all"
            checked={showUsersVerified === "all"}
            onChange={handleUsersRadioChange}
          />{" "}
          Tous les utilisateurs
          <input
            type="radio"
            value="true"
            checked={showUsersVerified === "true"}
            onChange={handleUsersRadioChange}
          />{" "}
          Utilisateurs vérifiés
          <input
            type="radio"
            value="false"
            checked={showUsersVerified === "false"}
            onChange={handleUsersRadioChange}
          />{" "}
          Utilisateurs non vérifiés
        </label>
      </div>

      <div className="user-cards">
        {users.map((user) => (
            <UserCard key={user.id} user={user} onUpdateUser={updateUser} />        ))}
      </div>
    </div>
  );
}

export default Admin;
