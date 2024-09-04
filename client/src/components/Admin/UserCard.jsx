// eslint-disable-next-line react/prop-types
function UserCard({ user, onUpdateUser }) {
    // eslint-disable-next-line react/prop-types
    const { alias, isAdmin, profilePicture, email, isVerify } = user;

    return (
        <div className="user-card">
            <img
                src={profilePicture}
                alt={`${alias}'s avatar`}
                className="user-profile-picture"
            />
            <div className="user-info">
                <h3>{alias}</h3>
                <p>Email: {email}</p>
                <p>Admin: {isAdmin ? "Yes" : "No"}</p>
                <p>Verified: {isVerify ? "Yes" : "No"}</p>
                <button onClick={() => onUpdateUser(user.id)}>Verify & Make Admin</button>
            </div>
        </div>
    );
}

export default UserCard;
