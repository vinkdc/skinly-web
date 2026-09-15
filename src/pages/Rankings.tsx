import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";

// We'll hardcode some popular weapons for the top navigation
const POPULAR_WEAPONS = ["Vandal", "Phantom", "Operator", "Sheriff", "Melee"];

type SkinData = {
  data: {
    collections: { skins: { skin_name: string; weapon: string; skin_image: string }[] }[];
  };
};

function useSkinData() {
  const [data, setData] = useState<{ skin_name: string; weapon: string; skin_image: string }[]>([]);
  useEffect(() => {
    fetch("/data/skin-infos.json")
      .then(r => r.json())
      .then((json: SkinData) => {
        const skins: { skin_name: string; weapon: string; skin_image: string }[] = [];
        json.data.collections.forEach(c => {
          c.skins.forEach(s => {
            if (s.skin_image) skins.push(s);
          });
        });
        setData(skins);
      })
      .catch(() => {});
  }, []);
  return data;
}

function SkinMarquee({ allSkins }: { allSkins: { skin_name: string; weapon: string; skin_image: string }[] }) {
  const [images, setImages] = useState<string[]>([]);
  
  useEffect(() => {
    if (allSkins.length === 0) return;
    const skins = allSkins.map(s => s.skin_image);
    // Pick 45 visually distinct skins by skipping ahead
    const selected = [];
    for (let i = 0; i < 45; i++) {
      selected.push(skins[(i * 13) % skins.length]);
    }
    setImages(selected);
  }, [allSkins]);

  if (images.length === 0) return <div style={{ height: 320 }} />;

  const row1 = images.slice(0, 15);
  const row2 = images.slice(15, 30);
  const row3 = images.slice(30, 45);

  const renderMarquee = (row: string[], direction: "left" | "right") => (
    <div className={`marquee-track ${direction}`}>
       <div className="marquee-half">
         {row.map((src, i) => <img key={`a-${i}`} src={src} className="marquee-item" alt="skin" loading="lazy" />)}
       </div>
       <div className="marquee-half">
         {row.map((src, i) => <img key={`b-${i}`} src={src} className="marquee-item" alt="skin" loading="lazy" />)}
       </div>
    </div>
  );

  return (
    <div className="marquee-wrapper">
      {renderMarquee(row1, "left")}
      {renderMarquee(row2, "right")}
      {renderMarquee(row3, "left")}
    </div>
  );
}

export function Rankings() {
  const allSkins = useSkinData();
  const [weaponImages, setWeaponImages] = useState<Record<string, string>>({});

  useEffect(() => {
    if (allSkins.length === 0) return;
    const imgMap: Record<string, string> = {};
    POPULAR_WEAPONS.forEach(w => {
       const matching = allSkins.filter(s => s.weapon.toLowerCase() === w.toLowerCase());
       if (matching.length > 0) {
          imgMap[w] = matching[Math.floor(Math.random() * matching.length)].skin_image;
       }
    });
    setWeaponImages(imgMap);
  }, [allSkins]);

  return (
    <>
      <div className="rankings-header">
        <div style={{ filter: "blur(3px)", opacity: 0.6, transform: "scale(1.05)" }}>
          <SkinMarquee allSkins={allSkins} />
        </div>
        <div className="container" style={{ textAlign: "center", marginTop: 24 }}>
          <div className="section-eyebrow">Community Data · Sample Data</div>
          <h1 style={{ textTransform: "uppercase", fontWeight: 700 }}>Skin Rankings & Tier Lists</h1>
          <p className="hero-subtitle" style={{ maxWidth: 600, margin: "0 auto" }}>
            Preview how community cosmetic trends could be presented using aggregated, opt-in Skinly data.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        <h2 className="section-title" style={{ marginTop: 40, marginBottom: 24, fontSize: 24 }}>Browse by Weapon</h2>
        
        <div className="weapon-categories-grid">
          {POPULAR_WEAPONS.map(weapon => (
            <Link to={`/rankings/${weapon.toLowerCase()}`} key={weapon} className="weapon-category-card">
              <h3>{weapon}</h3>
              {weaponImages[weapon] && (
                <img src={weaponImages[weapon]} alt={weapon} className="hover-skin-img" />
              )}
            </Link>
          ))}
          <Link to={`/rankings/all`} className="weapon-category-card" style={{ background: "var(--surface-3)" }}>
            <h3>All Weapons</h3>
          </Link>
        </div>

        <div className="rankings-split" style={{ marginTop: 60, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          
          <div className="rankings-panel">
            <h2 className="section-title" style={{ marginBottom: 24, fontSize: 24 }}>Trending Collections</h2>
            <div className="trending-list">
              <div className="trending-item">
                <div className="trending-rank">1</div>
                <img src="https://wiki.playvalorant.com/en-us/images/Kuronami_Vandal.png" alt="Kuronami" style={{ width: 64, height: 32, objectFit: 'contain' }} />
                <div className="trending-info">
                  <strong>Kuronami</strong>
                  <span>Exclusive Edition</span>
                </div>
                <div className="trending-stat" style={{ color: "var(--success)" }}>+12%</div>
              </div>
              <div className="trending-item">
                <div className="trending-rank">2</div>
                <img src="https://wiki.playvalorant.com/en-us/images/Reaver_Vandal.png" alt="Reaver" style={{ width: 64, height: 32, objectFit: 'contain' }} />
                <div className="trending-info">
                  <strong>Reaver</strong>
                  <span>Premium Edition</span>
                </div>
                <div className="trending-stat" style={{ color: "var(--success)" }}>+5%</div>
              </div>
              <div className="trending-item">
                <div className="trending-rank">3</div>
                <img src="https://wiki.playvalorant.com/en-us/images/RGX_11z_Pro_Vandal.png" alt="RGX 11z Pro" style={{ width: 64, height: 32, objectFit: 'contain' }} />
                <div className="trending-info">
                  <strong>RGX 11z Pro</strong>
                  <span>Exclusive Edition</span>
                </div>
                <div className="trending-stat" style={{ color: "var(--success)" }}>+3%</div>
              </div>
            </div>
          </div>

          <div className="rankings-panel">
            <h2 className="section-title" style={{ marginBottom: 24, fontSize: 24 }}>Highest Rated</h2>
            <div className="trending-list">
              <div className="trending-item">
                <div className="trending-rank" style={{ color: "gold" }}>★</div>
                <img src="https://wiki.playvalorant.com/en-us/images/Prime_Vandal.png" alt="Prime Vandal" style={{ width: 64, height: 32, objectFit: 'contain' }} />
                <div className="trending-info">
                  <strong>Prime Vandal</strong>
                  <span>4.9 / 5.0 Rating</span>
                </div>
              </div>
              <div className="trending-item">
                <div className="trending-rank" style={{ color: "gold" }}>★</div>
                <img src="https://wiki.playvalorant.com/en-us/images/Spectrum_Classic.png" alt="Spectrum Classic" style={{ width: 64, height: 32, objectFit: 'contain' }} />
                <div className="trending-info">
                  <strong>Spectrum Classic</strong>
                  <span>4.8 / 5.0 Rating</span>
                </div>
              </div>
              <div className="trending-item">
                <div className="trending-rank" style={{ color: "gold" }}>★</div>
                <img src="https://wiki.playvalorant.com/en-us/images/Araxys_Vandal.png" alt="Araxys Vandal" style={{ width: 64, height: 32, objectFit: 'contain' }} />
                <div className="trending-info">
                  <strong>Araxys Vandal</strong>
                  <span>4.8 / 5.0 Rating</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </>
  );
}
