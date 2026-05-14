import Modal from "@mui/material/Modal";
import { ModalBackgroundStyles } from "@/shared/components/modal/styles/modalStyles";

const ModalWrapper = ({ isOpen, onClose, children }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={`${ModalBackgroundStyles}`}>{children}</div>
    </Modal>
  );
};

export default ModalWrapper;
