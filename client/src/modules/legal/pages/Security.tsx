import { developerEmail } from "../../../config/app-config";
import TopBar from "../../../shared/components/layout/topbar/TopBar";

const Security = () => {
  return (
    <div className="flex flex-col gap-10">
      <TopBar pageTitle="Security Policy" />
      <div>
        We take the security and integrity of Monkeytype very seriously. If you
        have found a vulnerability, please report it ASAP so we can quickly
        remediate the issue.
      </div>

      <div className="flex flex-col gap-6">
        <p>Table of Contents</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>How to Disclose a Vulnerability</li>
          <li>Submission Guidelines</li>
        </ul>
      </div>

      {/* How to Disclose a Vulnerability */}
      <div className="flex flex-col gap-6">
        <div className="text-2xl"> How to Disclose a Vulnerability </div>
        <p>
          For vulnerabilities that impact the confidentiality, integrity, and
          availability of Monkeytype services, please send your disclosure via{" "}
          <a
            className="underline cursor-pointer"
            href={`mailto:${developerEmail}`}
          >
            email
          </a>
          . For non-security related platform bugs, follow the bug submission
          guidelines . Include as much detail as possible to ensure
          reproducibility. At a minimum, vulnerability disclosures should
          include:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Vulnerability Description</li>
          <li>Proof of Concept</li>
          <li>Impact</li>
          <li>Screenshots or Proof</li>
        </ul>
      </div>

      {/* Submission Guidelines */}
      <div className="flex flex-col gap-6">
        <div className="text-2xl"> Submission Guidelines </div>
        <p>
          Do not engage in activities that might cause a denial of service
          condition, create significant strains on critical resources, or
          negatively impact users of the site outside of test accounts.
        </p>
      </div>
    </div>
  );
};

export default Security;
