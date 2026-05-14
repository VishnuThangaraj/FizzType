import { FaHeart } from "react-icons/fa";

import ModalWrapper from "@/shared/components/modal/ModalWrapper";
import { ContactHeaderStyle } from "@/shared/components/modal/styles/modalStyles";

import { SupportButtonFields } from "@/shared/components/modal/config/supportModalConfig";
import Button from "@/shared/components/formFields/Button";

const SupportModal = ({ isOpen, onClose }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className={ContactHeaderStyle}>Support FizzType</div>
      <div className="py-4 text-secondary ">
        <p className="mb-5">
          Thank you so much for thinking about supporting this project. It would
          not be possible without you and your continued support.{" "}
          <FaHeart className="inline mb-1" />
        </p>

        {/* Contact Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SupportButtonFields.map((field) => (
            <Button
              key={field.name}
              className="py-4 flex flex-col items-center justify-center gap-2"
            >
              <field.icon className="text-3xl" />
              <div className="text-md text-center">{field.name}</div>
            </Button>
          ))}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default SupportModal;
