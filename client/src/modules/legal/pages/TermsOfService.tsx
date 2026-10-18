import { useState } from "react";
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
import {
  developerEmail,
  developerGithub,
  appRepository,
  appHostedUrl,
} from "../../../config/app-config";
import { useTheme } from "../../../shared/context";

const TermsOfService = () => {
  const navigate = useNavigate();
  const { accent, primary, tertiary } = useTheme();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-10" style={{ color: tertiary }}>
      <TopBar pageTitle="Terms of Service" />
      <div>These terms of service were last updated on October 18, 2026.</div>

      {/* Agreement */}
      <div className="flex flex-col gap-6">
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          Agreement
        </div>
        <p>
          By accessing and using this Website, accessible from{" "}
          <span
            className="underline cursor-pointer transition-colors"
            onClick={() => window.open(appHostedUrl, "_blank", "noopener,noreferrer")}
            style={{ color: hoveredLink === "app-url" ? tertiary : primary }}
            onMouseEnter={() => setHoveredLink("app-url")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {appHostedUrl}
          </span>{" "}
          (including all associated mirrors, subdomains, and the open-source
          codebase on GitHub), you agree to be bound by these Website Terms of
          Service and agree that you are responsible for compliance with any
          applicable local laws.{" "}
          <span className="uppercase font-semibold">
            IF YOU DO NOT AGREE TO ALL THE TERMS AND CONDITIONS OF THIS
            AGREEMENT, YOU ARE NOT PERMITTED TO ACCESS OR USE OUR SERVICES.
          </span>
        </p>
      </div>

      {/* Limitations */}
      <div className="flex flex-col gap-6">
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          Limitations
        </div>
        <p>
          You are responsible for maintaining your account's security and for
          all activities that occur under your account or session. You must not,
          in the use of this site, violate any applicable laws, including,
          without limitation, copyright or intellectual property laws, or any
          regulations regarding the privacy and security of personal data.
        </p>

        <p>
          FizzType reserves the right to suspend or remove any account, reset
          leaderboard results, or restrict access to the Services at any time,
          without prior notice, if we reasonably believe that you have violated
          this Agreement or engaged in malicious behavior.
        </p>

        <p>
          You agree that you will not upload, post, host, or transmit any
          content (including usernames, custom texts, or profile details) that:
        </p>

        <ol className="list-decimal pl-6 space-y-1">
          {limitationsAgreeToList.map((item, index) => {
            return <li key={`limitation-agree-to-${index}`}>{item}</li>;
          })}
        </ol>

        <p>While using the Services, you agree that you will not:</p>

        <ol className="list-decimal pl-6 space-y-1">
          {limitationsAgreeNotToList.map((item, index) => {
            return <li key={`limitation-agree-not-to-${index}`}>{item}</li>;
          })}
        </ol>

        <p>
          Without limiting the foregoing, you will not transmit or post any
          content anywhere on the Services that violates applicable laws.
          FizzType does not tolerate abusive conduct or activity that harms our
          users or the community. We reserve the right to resolve disputes in
          favor of protecting our community and platform integrity.
        </p>
      </div>

      {/* Privacy Policy */}
      <div className="flex flex-col gap-6">
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          Privacy Policy
        </div>
        <p>
          If you use our Services, you must abide by our Privacy Policy. You
          acknowledge that you have read our{" "}
          <span
            className="underline cursor-pointer transition-colors"
            onClick={() => navigate("/privacy-policy")}
            style={{ color: hoveredLink === "privacy" ? tertiary : primary }}
            onMouseEnter={() => setHoveredLink("privacy")}
            onMouseLeave={() => setHoveredLink(null)}
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
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          Limitations on Automated Use
        </div>
        <p>
          You must not use bots or access our Services in malicious,
          disruptive, or prohibited ways. While accessing or using the Services,
          you may not:
        </p>

        <ol className="list-decimal pl-6 space-y-1">
          {limitationsOnAutomatedUseList.map((item, index) => {
            return <li key={`limitation-automated-use-${index}`}>{item}</li>;
          })}
        </ol>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-6">
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          Links
        </div>
        <p>{limitationLinks}</p>
      </div>

      {/* Changes */}
      <div className="flex flex-col gap-6">
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          Changes
        </div>
        <p>{limitationChanges}</p>
      </div>

      {/* Disclaimer */}
      <div className="flex flex-col gap-6">
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          Disclaimer
        </div>
        <p className="uppercase leading-relaxed">{limitationDisclaimer}</p>
      </div>

      {/* Contact */}
      <div className="flex flex-col gap-6">
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          Contact
        </div>
        <p>
          If you have any questions regarding FizzType's Terms of Service, the
          Services, or your account, please do not hesitate to contact us.
        </p>
        <p>
          Website :{" "}
          <span
            className="underline cursor-pointer transition-colors"
            onClick={() => window.open(appHostedUrl, "_blank", "noopener,noreferrer")}
            style={{ color: hoveredLink === "contact-url" ? tertiary : primary }}
            onMouseEnter={() => setHoveredLink("contact-url")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {appHostedUrl}
          </span>
        </p>
        <p>
          Email :{" "}
          <span
            className="underline cursor-pointer transition-colors"
            onClick={() => window.open(`mailto:${developerEmail}`)}
            style={{ color: hoveredLink === "email" ? tertiary : primary }}
            onMouseEnter={() => setHoveredLink("email")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {developerEmail}
          </span>
        </p>
        <p>
          GitHub Repository :{" "}
          <span
            className="underline cursor-pointer transition-colors"
            onClick={() =>
              window.open(appRepository, "_blank", "noopener,noreferrer")
            }
            style={{ color: hoveredLink === "repo" ? tertiary : primary }}
            onMouseEnter={() => setHoveredLink("repo")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            VishnuThangaraj/FizzType
          </span>
        </p>
        <p>
          Maintainer :{" "}
          <span
            className="underline cursor-pointer transition-colors"
            onClick={() =>
              window.open(developerGithub, "_blank", "noopener,noreferrer")
            }
            style={{ color: hoveredLink === "github" ? tertiary : primary }}
            onMouseEnter={() => setHoveredLink("github")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            VishnuThangaraj
          </span>
        </p>
      </div>

      <div>
        Terms based on{" "}
        <span
          className="underline cursor-pointer transition-colors"
          onClick={() =>
            window.open(
              "https://blog.glitch.com/",
              "_blank",
              "noopener,noreferrer",
            )
          }
          style={{ color: hoveredLink === "glitch" ? tertiary : primary }}
          onMouseEnter={() => setHoveredLink("glitch")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Glitch Terms
        </span>
      </div>
    </div>
  );
};

export default TermsOfService;
