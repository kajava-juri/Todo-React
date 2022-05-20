export default function Modal({open, onClose, children}){
    if (!open)
        return null;

    return(
        <div className="modal">
            <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            {children}
            </div>

        </div>
    )
}