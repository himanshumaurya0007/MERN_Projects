import './Modal.css';

function Modal({ message, onConfirm, onCancel }) {
    return (
        <>
            <div className="modal-backdrop">
                <div className="modal-content">
                    <p>{message}</p>
                    <div className="modal-buttons">
                        <button onClick={onConfirm} className="confirm-btn">Yes, Reset</button>
                        <button onClick={onCancel} className="cancel-btn">Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;