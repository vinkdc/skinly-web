import { Footer } from "../components/Footer";

export function Terms() {
  return (
    <>
      <div className="legal-page">
        <div className="container" style={{ maxWidth: 720 }}>
          <h1>Terms of Service</h1>
          <p className="legal-updated">Last updated: September 2026</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Skinly ("the Service"), you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use the Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Skinly is a VALORANT companion application that tracks and displays cosmetic skin usage during
            gameplay sessions. The Service is provided through a desktop application (via Overwolf) and an
            optional web dashboard.
          </p>

          <h2>3. Eligibility</h2>
          <p>
            You must have a valid VALORANT account and comply with Riot Games' Terms of Service to use Skinly.
            You must be at least 13 years of age (or the minimum age required in your jurisdiction) to use the Service.
          </p>

          <h2>4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service in any way that violates Riot Games' Terms of Service or API policies.</li>
            <li>Attempt to reverse engineer, decompile, or disassemble the Service.</li>
            <li>Use the Service to gain any competitive advantage in VALORANT.</li>
            <li>Share, redistribute, or sell data obtained through the Service without authorization.</li>
            <li>Use automated systems or bots to interact with the Service.</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>
            VALORANT, Riot Games, and all associated trademarks are the property of Riot Games, Inc.
            Skinly is an independent third-party application and is not endorsed by, affiliated with,
            or sponsored by Riot Games.
          </p>
          <p>
            All skin artwork and game assets displayed within Skinly are the property of Riot Games
            and are used under the terms of the Riot Games API.
          </p>

          <h2>6. Disclaimer of Warranties</h2>
          <p>
            The Service is provided "as is" and "as available" without warranties of any kind.
            We do not guarantee that the Service will be uninterrupted, error-free, or that tracking
            data will be 100% accurate at all times.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            In no event shall Skinly be liable for any indirect, incidental, special, consequential,
            or punitive damages arising out of or in connection with your use of the Service.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective immediately
            upon posting. Your continued use of the Service after changes constitutes acceptance of the
            modified Terms.
          </p>

          <h2>9. Termination</h2>
          <p>
            We may terminate or suspend your access to the Service at any time, with or without cause,
            with or without notice. You may stop using the Service at any time by uninstalling the application.
          </p>

          <h2>10. Contact</h2>
          <p>
            For questions about these Terms, please contact us at support@skinly.app.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
