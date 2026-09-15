import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { generateMockStats, MockSkinStats, Tier } from "../data/mockStats";

type SkinEntry = {
  skin_name: string;
  weapon: string;
  cost: number;
  cost_currency: string;
  skin_image: string;
};

type Collection = {
  collection_slug: string;
  collection: string;
  bundle_image: string;
  edition: string;
  bundle_cost: number;
  cost_currency: string;
  limited_time: boolean;
  skins: SkinEntry[];
};

type SkinData = {
  data: {
    collections: Collection[];
  };
};

type RankedSkin = SkinEntry & {
  collection: string;
  edition: string;
  stats: MockSkinStats;
};

export function WeaponLeaderboard() {
  const { weaponName } = useParams<{ weaponName: string }>();
  const [data, setData] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/skin-infos.json")
      .then((r) => r.json())
      .then((json: SkinData) => {
        setData(json.data.collections);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const rankedSkins = useMemo(() => {
    if (!weaponName || !data.length) return [];
    
    const isAll = weaponName.toLowerCase() === "all";
    const targetWeapon = weaponName.toLowerCase();
    
    const allSkins: RankedSkin[] = [];
    
    data.forEach(collection => {
      if (!collection.skins) return;
      
      collection.skins.forEach(skin => {
        // Filter by weapon unless "all"
        if (!isAll && skin.weapon.toLowerCase() !== targetWeapon) return;
        
        // Skip standard/base skins
        if (skin.skin_name.toLowerCase().includes("standard") || skin.skin_name.toLowerCase() === skin.weapon.toLowerCase()) return;

        const stats = generateMockStats(skin.skin_name, collection.edition || "Select");
        
        allSkins.push({
          ...skin,
          collection: collection.collection,
          edition: collection.edition,
          stats
        });
      });
    });

    // Sort by pick rate descending
    return allSkins.sort((a, b) => b.stats.pickRate - a.stats.pickRate);
  }, [data, weaponName]);

  const skinsByTier = useMemo(() => {
    const grouped: Record<Tier, RankedSkin[]> = { S: [], A: [], B: [], C: [] };
    rankedSkins.forEach(skin => {
      grouped[skin.stats.tier].push(skin);
    });
    return grouped;
  }, [rankedSkins]);

  const displayWeapon = weaponName ? weaponName.charAt(0).toUpperCase() + weaponName.slice(1) : "";

  if (loading) {
    return (
      <>
        <div style={{ padding: "120px 20px", textAlign: "center" }}>Loading...</div>
      </>
    );
  }

  return (
    <>
      <div className="rankings-header" style={{ paddingTop: 80, paddingBottom: 40 }}>
        <div className="container">
          <Link to="/rankings" style={{ color: "var(--ink-subtle)", textDecoration: "none", marginBottom: 16, display: "inline-block" }}>
            ← Back to Rankings
          </Link>
          <div className="section-eyebrow">Tier List</div>
          <h1 style={{ textTransform: "capitalize" }}>{displayWeapon} Rankings</h1>
          <p className="hero-subtitle">
            Community tier list and pick rates for {displayWeapon} skins.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80, paddingTop: 40 }}>
        
        {(["S", "A", "B", "C"] as Tier[]).map(tier => {
          const skinsInTier = skinsByTier[tier];
          if (skinsInTier.length === 0) return null;
          
          return (
            <div className="tier-row" key={tier}>
              <div className={`tier-label tier-${tier}`}>
                {tier} TIER
              </div>
              <div className="tier-content">
                {skinsInTier.map((skin, idx) => (
                  <div className="ranked-skin-card" key={`${skin.skin_name}-${idx}`}>
                    <div className="ranked-skin-img-wrapper">
                      {skin.skin_image ? (
                        <img src={skin.skin_image} alt={skin.skin_name} loading="lazy" />
                      ) : (
                        <div className="no-img">No Image</div>
                      )}
                    </div>
                    <div className="ranked-skin-info">
                      <strong>{skin.skin_name}</strong>
                      <div className="ranked-skin-meta">
                        <span className="pick-rate">Pick Rate: {skin.stats.pickRate}%</span>
                        <span className="rating">★ {skin.stats.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {rankedSkins.length === 0 && (
          <div style={{ textAlign: "center", padding: 60, color: "var(--ink-subtle)" }}>
            No skins found for this weapon.
          </div>
        )}

      </div>

      <Footer />
    </>
  );
}
