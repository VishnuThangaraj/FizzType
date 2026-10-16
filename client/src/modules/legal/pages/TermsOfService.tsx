import { useNavigate } from "react-router-dom";
import TopBar from "../../../shared/components/layout/topbar/TopBar";
import {
  limitationChanges,
  limitationDisclaimer,
  limitationLinks,
  limitationsAgreeNotToList,
  limitationsAgreeToList,
  limitationsOnAutomatedUseList,
} from "../constants/terms-of-service.constant";
import { developerEmail, developerGithub } from "../../../config/app-config";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-10">
      <TopBar pageTitle="Terms of Service" />
      <div>These terms of service were last updated on October 06, 2026.</div>
      {/* Agreement */}
      <div className="flex flex-col gap-6">
        <div className="text-2xl">Agreement</div>
        <p>
          By accessing this Website, accessible from monkeytype.com, you are
          agreeing to be bound by these Website Terms of Service and agree that
          you are responsible for the agreement in accordance with any
          applicable local laws.{" "}
          <span className="uppercase">
            IF YOU DO NOT AGREE TO ALL THE TERMS AND CONDITIONS OF THIS
            AGREEMENT, YOU ARE NOT PERMITTED TO ACCESS OR USE OUR SERVICES.
          </span>
        </p>
      </div>
      {/* Limitations */}
      <div className="flex flex-col gap-6">
        <div className="text-2xl">Limitations</div>
        <p>
          You are responsible for your account's security and all activities on
          your account. You must not, in the use of this site, violate any
          applicable laws, including, without limitation, copyright laws, or any
          other laws regarding the security of your personal data, or otherwise
          misuse this site.
        </p>

        <p>
          Monkeytype reserves the right to remove or disable any account or any
          other content on this site at any time for any reason, without prior
          notice to you, if we believe that you have violated this agreement.
        </p>

        <p>
          You agree that you will not upload, post, host, or transmit any
          content that:
        </p>

        <ol className="list-decimal pl-6 space-y-1">
          {limitationsAgreeToList.map((item, index) => {
            return <li key={`limitation-agree-to-${index}`}>{item}</li>;
          })}
        </ol>

        <p>While using the Services, you agree that you will not:</p>

        <ol className="list-decimal pl-6 space-y-1">
          {limitationsAgreeNotToList.map((item, index) => {
            return <li key={`limitation-agree-to-${index}`}>{item}</li>;
          })}
        </ol>

        <p>
          Without limiting the foregoing, you will not transmit or post any
          content anywhere on the Services that violates any laws. Monkeytype
          absolutely does not tolerate engaging in activity that significantly
          harms our Users. We will resolve disputes in favor of protecting our
          Users as a whole.
        </p>
      </div>
      {/* privacy Policy */}
      <div className="flex flex-col gap-6">
        <div className="text-2xl">Privacy Policy</div>
        <p>
          If you use our Services, you must abide by our Privacy Policy. You
          acknowledge that you have read our{" "}
          <span
            className="text-red-500"
            onClick={() => navigate("/privacy-poilcy")}
          >
            Privacy Policy
          </span>{" "}
          and understand that it sets forth how we collect, use, and store your
          information. If you do not agree with our Privacy Statement, then you
          must stop using the Services immediately. Any person, entity, or
          service collecting data from the Services must comply with our Privacy
          Statement. Misuse of any User's Personal Information is prohibited. If
          you collect any Personal Information from a User, you agree that you
          will only use the Personal Information you gather for the purpose for
          which the User has authorized it. You agree that you will reasonably
          secure any Personal Information you have gathered from the Services,
          and you will respond promptly to complaints, removal requests, and 'do
          not contact' requests from us or Users.
        </p>
      </div>
      {/* Automated Use */}
      <div className="flex flex-col gap-6">
        <div className="text-2xl">Limitations on Automated Use</div>
        <p>
          You shouldn't use bots or access our Services in malicious or
          prohibited ways. While accessing or using the Services, you may not:
        </p>

        <ol className="list-decimal pl-6 space-y-1">
          {limitationsOnAutomatedUseList.map((item, index) => {
            return <li key={`limitation-automated-use-${index}`}>{item}</li>;
          })}
        </ol>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-6">
        <div className="text-2xl">Links</div>
        <p>{limitationLinks}</p>
      </div>

      {/* Changes */}
      <div className="flex flex-col gap-6">
        <div className="text-2xl">Changes</div>
        <p>{limitationChanges}</p>
      </div>

      {/* Disclaimer */}
      <div className="flex flex-col gap-6">
        <div className="text-2xl">Disclaimer</div>
        <p className="uppercase">{limitationDisclaimer}</p>
      </div>

      {/* Contact */}
      <div className="flex flex-col gap-6">
        <div className="text-2xl">Contact</div>
        <p>
          If you have any questions about Monkeytype's privacy policy, the data
          we hold on you, or you would like to exercise one of your data
          protection rights, please do not hesitate to contact us.
        </p>
        <p>
          Email : <span className="underline">{developerEmail}</span>
        </p>
        <p>
          Github :{" "}
          <span
            className="underline"
            onClick={() =>
              window.open(developerGithub, "_blank", "noopener,noreferrer")
            }
          >
            VishnuThangaraj
          </span>
        </p>
      </div>

      <div>
        Terms based on{" "}
        <span
          className="underline"
          onClick={() =>
            window.open(
              "https://blog.glitch.com/",
              "_blank",
              "noopener,noreferrer",
            )
          }
        >
          Glitch Terms
        </span>
      </div>
    </div>
  );
};

export default TermsOfService;
