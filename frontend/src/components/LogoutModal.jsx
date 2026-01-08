import { useNavigate } from "react-router-dom";

export default function LogoutModal({ close }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Log Out</h3>
        <p>Are you sure you want to log out?</p>

        <div className="actions">
          <button onClick={close} className="cancel">Cancel</button>
          <button onClick={logout} className="confirm">Confirm</button>
        </div>
      </div>
    </div>
  );
}
