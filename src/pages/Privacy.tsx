import { Footer } from "../components/Footer";

export function Privacy() {
  return (
    <>
      <div className="legal-page">
        <div className="container" style={{ maxWidth: 720 }}>
          <h1>Privacy Policy</h1>
          <p className="legal-updated">Last updated: September 2026</p>

          <h2>1. Introduction</h2>
          <p>
            Skinly ("we", "us", or "our") is a VALORANT companion application that tracks cosmetic skin usage
            during gameplay sessions. This Privacy Policy explains how we collect, use, and protect your information
            when you use our application and website.
          </p>

          <h2>2. Information We Collect</h2>
          <p>Skinly collects minimal data required to provide the skin tracking service:</p>
          <ul>
            <li><strong>Game event data:</strong> Skin equip/unequip events, weapon types, and session timestamps received through the Overwolf Game Events API.</li>
            <li><strong>Session metadata:</strong> Duration of each skin usage, session start/end times, and skin switch counts.</li>
            <li><strong>Riot Account identifier:</strong> Your Riot ID (game name and tagline) for associating your skin history with your account when using the web dashboard.</li>
          </ul>

          <h2>3. Information We Do NOT Collect</h2>
          <ul>
            <li>We do not collect, store, or transmit your Riot account password or authentication credentials.</li>
            <li>We do not read game memory or inject code into the VALORANT process.</li>
            <li>We do not capture screenshots, screen recordings, or any visual data from your gameplay.</li>
            <li>We do not collect personal information such as your real name, email address, or payment information unless you explicitly provide it.</li>
          </ul>

          <h2>4. How We Use Your Information</h2>
          <ul>
            <li>To display your skin usage history and analytics within the Skinly app and web dashboard.</li>
            <li>To generate session summaries and usage statistics.</li>
            <li>To improve the accuracy and reliability of our tracking service.</li>
          </ul>

          <h2>5. Data Storage</h2>
          <p>
            By default, all tracking data is stored locally on your device. If you choose to enable the web dashboard
            feature, your session data will be synced to our servers over an encrypted (HTTPS) connection and stored
            securely. You can delete your data at any time through the application settings.
          </p>

          <h2>6. Third-Party Services</h2>
          <p>Skinly integrates with the following third-party services:</p>
          <ul>
            <li><strong>Overwolf:</strong> Provides the game event API that Skinly uses to detect skin changes. Overwolf's privacy policy applies to data collected by their platform.</li>
            <li><strong>Riot Games API:</strong> Used to retrieve your Riot ID and validate your account. Subject to the Riot Games API Terms of Service.</li>
            <li><strong>VALORANT API (community):</strong> Used to fetch skin artwork and metadata. No personal data is shared with this service.</li>
          </ul>

          <h2>7. Data Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to outside parties.
            We may share anonymized, aggregated usage statistics for analytical purposes.
          </p>

          <h2>8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access all data we store about you.</li>
            <li>Request deletion of your data.</li>
            <li>Export your data in a machine-readable format.</li>
            <li>Opt out of cloud sync and keep all data local.</li>
          </ul>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting
            the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>10. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at privacy@skinly.app.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
