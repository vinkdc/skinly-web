import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import "./account.css";

const skinImages: Record<string, string> = {
  "Kuronami Vandal": "https://wiki.playvalorant.com/en-us/images/Kuronami_Vandal.png",
  "Prime Phantom": "https://wiki.playvalorant.com/en-us/images/Prime_2.0_Phantom.png",
  "Reaver Sheriff": "https://wiki.playvalorant.com/en-us/images/Reaver_Sheriff.png",
};

const sessions = [
  { date: "Sep 14", map: "Ascent", skin: "Kuronami Vandal", minutes: 38 },
  { date: "Sep 12", map: "Haven", skin: "Prime Phantom", minutes: 32 },
  { date: "Sep 10", map: "Lotus", skin: "Kuronami Vandal", minutes: 40 },
  { date: "Sep 2", map: "Bind", skin: "Reaver Sheriff", minutes: 25 },
];

export function Account() {
  const [period, setPeriod] = useState("week");
  const [sharing, setSharing] = useState(false);
  const visible = period === "week" ? sessions.slice(0, 3) : sessions;
  const total = visible.reduce((sum, session) => sum + session.minutes, 0);
  const favorites = Array.from(new Set(visible.map(session => session.skin)))
    .map(skin => ({ skin, minutes: visible.filter(session => session.skin === skin).reduce((sum, session) => sum + session.minutes, 0) }))
    .sort((a, b) => b.minutes - a.minutes);

  return (
    <>
      <div className="container account-demo">
        <header className="account-heading">
          <div>
            <div className="section-eyebrow">Account · Demo only</div>
            <h1>Your collection, in perspective.</h1>
            <p>Explore a sample account. Every name, session and usage figure below is fictional.</p>
          </div>
          <span className="account-badge">Sample Data</span>
        </header>

        <section className="account-profile" aria-label="Demo profile">
          <div className="account-avatar" aria-hidden="true">S</div>
          <div><h2>Skinly Explorer</h2><p>Demo profile · No Riot account connected</p></div>
          <Link to="/rankings">Explore rankings →</Link>
        </section>

        <div className="account-section-heading">
          <div><h2>Usage overview</h2><p>Concept preview · History and analytics are planned.</p></div>
          <label>Sample period
            <select value={period} onChange={event => setPeriod(event.target.value)}>
              <option value="week">Sep 9–15, 2026</option>
              <option value="month">September 2026</option>
            </select>
          </label>
        </div>
        <dl className="account-stats">
          <div><dt>Sample sessions</dt><dd>{visible.length}</dd></div>
          <div><dt>Cosmetic usage</dt><dd>{total}<small> min</small></dd></div>
          <div><dt>Skins used</dt><dd>{favorites.length}</dd></div>
        </dl>

        <div className="account-columns">
          <section className="account-panel">
            <h2>Your most-used skins</h2><p>Share of sample cosmetic usage</p>
            <ol className="account-favorites">
              {favorites.map(({ skin, minutes }) => (
                <li key={skin}>
                  <img className="account-skin-image" src={skinImages[skin]} alt={skin} width="320" height="100" loading="lazy" />
                  <div><strong>{skin}</strong><span>{minutes} min · {Math.round(minutes / total * 100)}%</span></div>
                  <meter min="0" max={total} value={minutes} aria-label={`${skin} usage`} />
                </li>
              ))}
            </ol>
          </section>
          <section className="account-panel">
            <h2>Community sharing</h2><p>Planned · Preference preview</p>
            <p className="account-sharing-copy">Choose whether your cosmetic usage could contribute to community trends when this feature becomes available.</p>
            <label className="account-toggle"><input type="checkbox" checked={sharing} onChange={event => setSharing(event.target.checked)} /> Preview opt-in sharing</label>
            <p role="status">Demo setting: {sharing ? "on" : "off"}. This resets when you leave the page. No data is collected or shared by this control.</p>
          </section>
        </div>

        <section className="account-panel account-history">
          <h2>Session history <span className="account-badge">Planned · Sample Data</span></h2>
          <div className="account-table-scroll">
            <table>
              <caption>Fictional sessions for the selected sample period</caption>
              <thead><tr><th scope="col">Date</th><th scope="col">Map</th><th scope="col">Featured skin</th><th scope="col">Usage</th></tr></thead>
              <tbody>{visible.map(session => <tr key={session.date}><td>{session.date}</td><td>{session.map}</td><td><div className="account-session-skin"><img src={skinImages[session.skin]} alt="" width="96" height="40" loading="lazy" /><span>{session.skin}</span></div></td><td>{session.minutes} min</td></tr>)}</tbody>
            </table>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
