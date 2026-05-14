import ModalWrapper from "@/shared/components/modal/ModalWrapper";
import { ContactHeaderStyle } from "@/shared/components/modal/styles/modalStyles";
import { contact_email, admin_email } from "@/config/appConfig";

import { ContactButtonFields } from "@/shared/components/modal/config/contactModalConfig";
import Button from "@/shared/components/formFields/Button";

const ContactModal = ({ isOpen, onClose }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className={`${ContactHeaderStyle}`}>Contact</div>

      {/* Descriptive Content */}
      <div className="py-4 text-secondary ">
        <p className="mb-5">
          Feel free to send an email to{" "}
          <a href={`mailto:${contact_email}`} className="text-primary">
            {contact_email}
          </a>
          . For business inquiries, email{" "}
          <a href={`mailto:${admin_email}`} className="text-primary">
            {admin_email}
          </a>{" "}
          (the buttons below will open the default mail client).
        </p>
        <p className="mb-5">
          Please <span className="text-red-400">do not send </span>requests to
          delete account, update email, update name or clear personal bests -
          you can do that in the settings page.
        </p>

        {/* Contact Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ContactButtonFields.map((field) => (
            <Button
              key={field.name}
              className="py-4 text-left"
              onClick={() =>
                (window.location.href = `mailto:${field.name === "Business" ? admin_email : contact_email}?subject=${field.name}`)
              }
            >
              <div className="flex items-center gap-4 ms-2">
                <field.icon /> {field.name}
              </div>
            </Button>
          ))}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ContactModal;
