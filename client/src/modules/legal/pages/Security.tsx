import { useState } from "react";
import {
  developerEmail,
  developerGithub,
  appRepository,
} from "../../../config/app-config";
import TopBar from "../../../shared/components/layout/topbar/TopBar";
import { useTheme } from "../../../shared/context";

const tableOfContents = [
  {
    id: "how-to-disclose-a-vulnerability",
    title: "How to Disclose a Vulnerability",
    key: "disclose",
  },
  {
    id: "submission-guidelines",
    title: "Submission Guidelines",
    key: "guidelines",
  },
];

const Security = () => {
  const { accent, tertiary, primary } = useTheme();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <TopBar pageTitle="Security Policy" />
      <div className="flex flex-col gap-10" style={{ color: tertiary }}>
        <div>
          We take the security and integrity of FizzType very seriously. If
          you discover a vulnerability, security flaw, or exploit in our
          application or services, please report it as soon as possible so we
          can promptly investigate and remediate the issue.
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xl font-medium tracking-wide">Table of Contents</p>
          <ul className="list-disc pl-6 space-y-1">
            {tableOfContents.map((item) => (
              <li key={item.id}>
                <a
                  className="underline cursor-pointer transition-colors"
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  style={{
                    color: hoveredLink === item.key ? tertiary : primary,
                  }}
                  onMouseEnter={() => setHoveredLink(item.key)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* How to Disclose a Vulnerability */}
        <div
          id="how-to-disclose-a-vulnerability"
          className="flex flex-col gap-6 scroll-mt-6"
        >
          <div className="text-3xl tracking-wider" style={{ color: accent }}>
            How to Disclose a Vulnerability
          </div>
          <p>
            For security issues affecting the confidentiality, integrity, or
            availability of FizzType services, user accounts, or hosting
            infrastructure, please report your findings privately via{" "}
            <a
              className="underline cursor-pointer transition-colors"
              href={`mailto:${developerEmail}`}
              style={{ color: hoveredLink === "email" ? tertiary : primary }}
              onMouseEnter={() => setHoveredLink("email")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              email ({developerEmail})
            </a>{" "}
            or submit a private security advisory on our{" "}
            <a
              className="underline cursor-pointer transition-colors"
              href={`${appRepository}/security/advisories`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: hoveredLink === "advisory" ? tertiary : primary }}
              onMouseEnter={() => setHoveredLink("advisory")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              GitHub Security Advisory
            </a>{" "}
            page.
          </p>
          <p>
            For non-security bugs, styling issues, or feature requests, please
            open an issue directly on our{" "}
            <a
              className="underline cursor-pointer transition-colors"
              href={`${appRepository}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: hoveredLink === "issues" ? tertiary : primary }}
              onMouseEnter={() => setHoveredLink("issues")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              GitHub repository issues
            </a>
            .
          </p>
          <p>
            To help us triage and resolve the issue quickly, please include as
            much detail as possible. At a minimum, vulnerability disclosures
            should include:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Description &amp; Severity:</strong> Summary of the
              vulnerability and its potential security impact
            </li>
            <li>
              <strong>Affected Components:</strong> URLs, routes, parameters, or
              files involved
            </li>
            <li>
              <strong>Proof of Concept:</strong> Step-by-step reproduction steps
              or minimal sample payloads
            </li>
            <li>
              <strong>Screenshots or Proof:</strong> Visual evidence or HTTP
              request/response transcripts (redacting any private data)
            </li>
            <li>
              <strong>Remediation Suggestion:</strong> Suggested fix or code
              patch, if available
            </li>
          </ul>
        </div>

        {/* Submission Guidelines */}
        <div
          id="submission-guidelines"
          className="flex flex-col gap-6 scroll-mt-6"
        >
          <div className="text-3xl tracking-wider" style={{ color: accent }}>
            Submission Guidelines
          </div>
          <p>
            When conducting vulnerability research, please adhere to responsible
            security practices and coordinated disclosure:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Do not perform attacks that degrade service availability or cause a
              denial-of-service (DoS/DDoS) condition.
            </li>
            <li>
              Do not attempt to access, modify, or delete data belonging to other
              users. Only conduct tests against your own test accounts.
            </li>
            <li>
              Do not run aggressive automated vulnerability scanners that cause
              excessive request spam or stress production resources.
            </li>
            <li>
              Do not engage in social engineering, phishing, or physical
              attacks against maintainers, contributors, or service providers.
            </li>
            <li>
              Allow reasonable time for the maintainer to review, triage, and
              deploy a fix before disclosing any details publicly.
            </li>
          </ul>
          <p>
            We sincerely appreciate the efforts of security researchers and
            contributors who help keep FizzType safe, fast, and reliable for
            everyone.
          </p>
          <p>
            Maintainer:{" "}
            <a
              className="underline cursor-pointer transition-colors"
              href={developerGithub}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: hoveredLink === "github" ? tertiary : primary }}
              onMouseEnter={() => setHoveredLink("github")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              VishnuThangaraj
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Security;
