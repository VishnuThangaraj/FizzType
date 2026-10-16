import TopBar from "../../../shared/components/layout/topbar/TopBar";
import {
  privacyPolicy,
  privacyPolicyDataCollection,
  privacyPolicyHowDataCollect,
  privacyPolicyHowDataUse,
  privacyPolicyTableOfContents,
} from "../constants/privacy-policy.constant";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col gap-10">
      <TopBar pageTitle="Privacy Policy" />

      <div className="flex flex-col gap-6">
        {privacyPolicy.map((item, index) => {
          return <p key={`privacy-policy-head-${index}`}>{item}</p>;
        })}

        <p> Table of Contents</p>
        <ul className="list-disc pl-6 space-y-1 underline cursor-pointer">
          {privacyPolicyTableOfContents.map((item, index) => {
            return <li key={`privacy-policy-table-${index}`}>{item}</li>;
          })}
        </ul>
      </div>

      {/* What data do we collect? */}
      <div className="flex flex-col gap-6">
        <div className="text-2xl"> What data do we collect? </div>
        <p>Monkeytype collects the following data:</p>
        <ul className="list-disc pl-6 space-y-1">
          {privacyPolicyDataCollection.map((item, index) => {
            return <li key={`privacy-policy-data-collect-${index}`}>{item}</li>;
          })}
        </ul>
        <p>Monkeytype does NOT collect:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            custom texts (they are stored in your browser's local storage)
          </li>
        </ul>
        <p className="italic">
          If you believe a certain data type is missing from the lists above,
          feel free to contact us and we will answer any questions and update
          the privacy policy.
        </p>
      </div>

      {/* How do we collect your data? */}
      <div className="flex flex-col gap-6">
        <div className="text-2xl"> How do we collect your data?</div>
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
      <div className="flex flex-col gap-6">
        <div className="text-2xl"> How will we use your data?</div>
        <p>Monkeytype collects your data so that we can:</p>
        <ul className="list-disc pl-6 space-y-1">
          {privacyPolicyHowDataUse.map((item, index) => {
            return <li key={`privacy-policy-how-data-use-${index}`}>{item}</li>;
          })}
        </ul>
        <p>
          If you are found to be cheating or exploiting the website, we may
          store hashed versions of your username, email and/or discord id to
          prevent you from creating new accounts.
        </p>
      </div>

      {/* How do we store your data? */}
      <div className="flex flex-col gap-6">
        <div className="text-2xl"> How do we store your data?</div>
        <p>Monkeytype securely stores your data using MongoDB.</p>
      </div>

      {/* What are your data protection rights? */}
      <div className="flex flex-col gap-6">
        <div className="text-2xl"> What are your data protection rights?</div>
        <p>Monkeytype would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
        <ul className="list-disc pl-6 space-y-1">
          {privacyPolicyHowDataUse.map((item, index) => {
            return <li key={`privacy-policy-how-data-use-${index}`}>{item}</li>;
          })}
        </ul>
        <p>
          If you are found to be cheating or exploiting the website, we may
          store hashed versions of your username, email and/or discord id to
          prevent you from creating new accounts.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
