import { useState } from "react";
import {
  developerEmail,
  developerGithub,
  appRepository,
  appHostedUrl,
} from "../../../config/app-config";
import TopBar from "../../../shared/components/layout/topbar/TopBar";
import { useTheme } from "../../../shared/context";
import {
  privacyPolicy,
  privacyPolicyDataCollection,
  privacyPolicyHowDataCollect,
  privacyPolicyHowDataUse,
  privacyPolicyProtectionRights,
  privacyPolicyTableOfContents,
  privacyPolicyUseCookies,
} from "../constants/privacy-policy.constant";

const getSectionId = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

const PrivacyPolicy = () => {
  const { accent, primary, tertiary } = useTheme();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-10" style={{ color: tertiary }}>
      <TopBar pageTitle="Privacy Policy" />

      <div className="flex flex-col gap-6">
        {privacyPolicy.map((item, index) => {
          return <p key={`privacy-policy-head-${index}`}>{item}</p>;
        })}

        <div className="flex flex-col gap-4">
          <p className="text-xl font-medium tracking-wide">Table of Contents</p>
          <ul className="list-disc pl-6 space-y-1">
            {privacyPolicyTableOfContents.map((item, index) => {
              const sectionId = getSectionId(item);
              const isHovered = hoveredLink === sectionId;

              return (
                <li key={`privacy-policy-table-${index}`}>
                  <a
                    className="underline cursor-pointer transition-colors"
                    href={`#${sectionId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(sectionId);
                    }}
                    style={{
                      color: isHovered ? tertiary : primary,
                    }}
                    onMouseEnter={() => setHoveredLink(sectionId)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* What data do we collect? */}
      <div
        id="what-data-do-we-collect"
        className="flex flex-col gap-6 scroll-mt-6"
      >
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          What data do we collect?
        </div>
        <p>FizzType collects the following data:</p>
        <ul className="list-disc pl-6 space-y-1">
          {privacyPolicyDataCollection.map((item, index) => {
            return <li key={`privacy-policy-data-collect-${index}`}>{item}</li>;
          })}
        </ul>
        <p>FizzType does NOT collect:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Custom texts (these are stored locally in your browser's local
            storage and are never transmitted to our servers)
          </li>
          <li>Keystrokes outside of an active typing test session</li>
          <li>Sensitive financial, credit card, or payment information</li>
        </ul>
        <p className="italic">
          If you believe a certain data type is missing from the lists above,
          feel free to contact us and we will answer any questions and update
          the privacy policy.
        </p>
      </div>

      {/* How do we collect your data? */}
      <div
        id="how-do-we-collect-your-data"
        className="flex flex-col gap-6 scroll-mt-6"
      >
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          How do we collect your data?
        </div>
        <p>
          You directly provide most of the data we collect. We collect data and
          process data when you:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          {privacyPolicyHowDataCollect.map((item, index) => {
            return (
              <li key={`privacy-policy-how-data-collect-${index}`}>{item}</li>
            );
          })}
        </ul>
      </div>

      {/* How will we use your data? */}
      <div
        id="how-will-we-use-your-data"
        className="flex flex-col gap-6 scroll-mt-6"
      >
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          How will we use your data?
        </div>
        <p>FizzType collects your data so that we can:</p>
        <ul className="list-disc pl-6 space-y-1">
          {privacyPolicyHowDataUse.map((item, index) => {
            return <li key={`privacy-policy-how-data-use-${index}`}>{item}</li>;
          })}
        </ul>
        <p>
          If an account is found to be cheating, exploiting the website, or
          artificially fabricating test scores, we may store hashed identifiers
          of the username, email, or account metadata to prevent re-registration
          and ensure leaderboards remain fair and legitimate.
        </p>
      </div>

      {/* How do we store your data? */}
      <div
        id="how-do-we-store-your-data"
        className="flex flex-col gap-6 scroll-mt-6"
      >
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          How do we store your data?
        </div>
        <p>
          FizzType securely stores your data using modern cloud infrastructure
          and encrypted databases. We implement standard security practices,
          transport layer security (HTTPS/TLS), and access controls to prevent
          unauthorized access. Non-sensitive settings and temporary test state
          are stored on your local device via browser localStorage.
        </p>
      </div>

      {/* What are your data protection rights? */}
      <div
        id="what-are-your-data-protection-rights"
        className="flex flex-col gap-6 scroll-mt-6"
      >
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          What are your data protection rights?
        </div>
        <p>
          FizzType would like to make sure you are fully aware of all of your
          data protection rights. Every user is entitled to the following:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          {privacyPolicyProtectionRights.map((item, index) => {
            return (
              <li key={`privacy-policy-protection-rights-${index}`}>{item}</li>
            );
          })}
        </ul>
      </div>

      {/* Analytics / Log Data */}
      <div
        id="what-log-data-do-we-collect"
        className="flex flex-col gap-6 scroll-mt-6"
      >
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          What log data do we collect?
        </div>
        <p>
          When you access FizzType, our hosting infrastructure (such as Vercel)
          and telemetry tools may automatically log standard technical data that
          your browser sends. This data may include Internet Protocol (IP)
          addresses, browser type, operating system, referring URLs, and
          timestamp information.{" "}
          <span className="uppercase font-semibold">
            THIS DATA DOES NOT CONTAIN ANY PERSONALLY IDENTIFIABLE
            INFORMATION.{" "}
          </span>
          We use this information for analyzing trends, diagnosing system
          errors, monitoring server performance, and securing the platform.
        </p>
        <p>
          For more information on Google Analytics' privacy policy, please
          visit:{" "}
          <span
            className="underline cursor-pointer transition-colors"
            onClick={() =>
              window.open(
                "https://support.google.com/analytics/answer/6004245?hl=en",
                "_blank",
                "noopener,noreferrer",
              )
            }
            style={{
              color: hoveredLink === "google-analytics" ? tertiary : primary,
            }}
            onMouseEnter={() => setHoveredLink("google-analytics")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            https://support.google.com/analytics/answer/6004245?hl=en
          </span>
        </p>
      </div>

      {/* Sentry */}
      <div className="flex flex-col gap-6">
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          Sentry
        </div>
        <p>
          Sentry is an error-monitoring service that helps us capture and diagnose
          crashes and client-side bugs across different web browsers. It
          collects anonymized diagnostic data regarding your device, browser,
          and the stack trace of the error that occurred. This information is
          used exclusively to identify regressions, patch bugs quickly, and
          maintain application stability.
        </p>
        <p>
          For more information on Sentry's privacy policy, please visit:{" "}
          <span
            className="underline cursor-pointer transition-colors"
            onClick={() =>
              window.open(
                "https://sentry.io/privacy/",
                "_blank",
                "noopener,noreferrer",
              )
            }
            style={{
              color: hoveredLink === "sentry" ? tertiary : primary,
            }}
            onMouseEnter={() => setHoveredLink("sentry")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            https://sentry.io/privacy/
          </span>
        </p>
      </div>

      {/* Advertisements */}
      <div id="advertisements" className="flex flex-col gap-6 scroll-mt-6">
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          Advertisements
        </div>
        <p className="italic">
          FizzType is currently an ad-free, open-source typing platform.
        </p>
        <p>
          We do not serve third-party display advertisements, run advertising
          trackers, or sell your personal data to ad brokers. Our priority is to
          deliver a clean, fast, and distraction-free typing practice
          environment.
        </p>
        <p>
          If optional sponsorships or ad-supported features are ever introduced
          in the future to help support server hosting and development costs, we
          will update this privacy policy with clear disclosures and provide
          opt-out preferences.
        </p>
        <div id="what-are-cookies" className="scroll-mt-6 flex flex-col gap-4">
          <p>
            Cookies are text files placed on your computer to collect standard
            Internet log information and visitor behavior information. When you
            visit our websites, we may collect information from you
            automatically through cookies or similar technology.
          </p>
          <p>
            For further information, see{" "}
            <span
              className="underline cursor-pointer transition-colors"
              onClick={() =>
                window.open(
                  "https://en.wikipedia.org/wiki/HTTP_cookie",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
              style={{
                color: hoveredLink === "http-cookie" ? tertiary : primary,
              }}
              onMouseEnter={() => setHoveredLink("http-cookie")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              HTTP cookie
            </span>{" "}
            on Wikipedia.
          </p>
        </div>
      </div>

      {/* How do we use cookies? */}
      <div
        id="how-do-we-use-cookies"
        className="flex flex-col gap-6 scroll-mt-6"
      >
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          How do we use cookies?
        </div>
        <p>
          FizzType uses cookies and browser local storage in a range of ways to
          improve your experience on our website, including:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          {privacyPolicyUseCookies.map((item, index) => {
            return <li key={`privacy-policy-use-cookie-${index}`}>{item}</li>;
          })}
        </ul>
      </div>

      {/* What types of cookies do we use? */}
      <div
        id="what-types-of-cookies-do-we-use"
        className="flex flex-col gap-6 scroll-mt-6"
      >
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          What types of cookies do we use?
        </div>
        <p>
          There are a number of different types of cookies; however, our website
          primarily uses essential and functionality cookies (along with HTML5
          localStorage). FizzType uses these to recognize you, keep you signed
          in, and remember your previously selected settings such as custom
          themes, sound toggles, and test durations.
        </p>
      </div>

      {/* How to manage your cookies */}
      <div
        id="how-to-manage-your-cookies"
        className="flex flex-col gap-6 scroll-mt-6"
      >
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          How to manage your cookies
        </div>
        <p>
          You can configure your browser not to accept cookies, and remove
          cookies or clear browser storage at any time. However, in some cases,
          certain website features (such as saved theme preferences, test
          configuration persistence, or automatic sign-in) may fail to function
          properly as a result.
        </p>
      </div>

      {/* Privacy policies of other websites */}
      <div
        id="privacy-policies-of-other-websites"
        className="flex flex-col gap-6 scroll-mt-6"
      >
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          Privacy policies of other websites
        </div>
        <p>
          FizzType contains links to other external websites.{" "}
          <span className="underline" style={{ color: tertiary }}>
            Our privacy policy only applies to our website and services, so if
            you click on a link to another website, you should read their
            privacy policy.
          </span>
        </p>
      </div>

      {/* Changes to our privacy policy */}
      <div
        id="changes-to-our-privacy-policy"
        className="flex flex-col gap-6 scroll-mt-6"
      >
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          Changes to our privacy policy
        </div>
        <p>
          FizzType keeps its privacy policy under regular review and places any
          updates on this web page. The FizzType privacy policy may be subject
          to change at any given time. Continued use of the platform constitutes
          acceptance of the updated terms.
        </p>
      </div>

      {/* How to contact us */}
      <div id="how-to-contact-us" className="flex flex-col gap-6 scroll-mt-6">
        <div className="text-3xl tracking-wider" style={{ color: accent }}>
          How to contact us
        </div>
        <p>
          If you have any questions about FizzType’s privacy policy, the data we
          hold on you, or you would like to exercise one of your data protection
          rights, please do not hesitate to contact us.
        </p>

        <p>
          Website :{" "}
          <span
            className="underline cursor-pointer transition-colors"
            onClick={() => window.open(appHostedUrl, "_blank", "noopener,noreferrer")}
            style={{ color: hoveredLink === "hosted-url" ? tertiary : primary }}
            onMouseEnter={() => setHoveredLink("hosted-url")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {appHostedUrl}
          </span>
        </p>

        <p>
          General inquiries :{" "}
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
    </div>
  );
};

export default PrivacyPolicy;
