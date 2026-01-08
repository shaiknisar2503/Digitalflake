export default function DeleteModal({ onClose, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Delete</h3>
        <p>Are you sure you want to delete?</p>

        <div className="actions">
          <button className="cancel" onClick={onClose}>
            Delete
          </button>
          <button className="confirm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
