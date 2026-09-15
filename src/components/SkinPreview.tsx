import React, { useEffect, useState, useMemo, useDeferredValue } from "react";

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
  _searchString?: string;
};

type SkinData = {
  data: {
    collections: Collection[];
  };
};

function editionClass(edition: string): string {
  const key = edition.toLowerCase();
  if (key === "select") return "edition-select";
  if (key === "deluxe") return "edition-deluxe";
  if (key === "premium") return "edition-premium";
  if (key === "ultra") return "edition-ultra";
  if (key === "exclusive") return "edition-exclusive";
  return "edition-default";
}

export function SkinPreview() {
  const [data, setData] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const [limit, setLimit] = useState(9);

  useEffect(() => {
    fetch("/data/skin-infos.json")
      .then((r) => r.json())
      .then((json: SkinData) => {
        const valid = json.data.collections.filter((c) => c.skins && c.skins.length > 0);
        valid.forEach(c => {
          c._searchString = (c.collection + " " + c.skins.map(s => s.skin_name + " " + s.weapon).join(" ")).toLowerCase();
        });
        setData(valid);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!deferredSearch.trim()) return data;
    const q = deferredSearch.toLowerCase();
    return data.filter((c) => c._searchString?.includes(q));
  }, [data, deferredSearch]);

  const selected = useMemo(
    () => data.find((c) => c.collection_slug === selectedSlug) ?? null,
    [data, selectedSlug]
  );

  const displayed = filtered.slice(0, limit);

  if (loading) {
    return (
      <div className="skin-preview" style={{ textAlign: "center", padding: "80px 32px" }}>
        <p style={{ color: "var(--ink-subtle)" }}>Loading skin database…</p>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="bundle-detail">
        <button className="bundle-back" onClick={() => setSelectedSlug(null)}>
          ← Back to Index
        </button>

        <div className="bundle-detail-header">
          {selected.bundle_image ? (
            <img className="bundle-detail-cover" src={selected.bundle_image} alt="" loading="lazy" />
          ) : (
            <div className="bundle-detail-cover" style={{ background: "var(--surface-3)" }} />
          )}
          <div className="bundle-detail-info">
            <h2>{selected.collection}</h2>
            <p>{selected.skins.length} weapons in this collection</p>
            <div className="bundle-detail-badges">
              {selected.edition && (
                <span className={`edition-badge ${editionClass(selected.edition)}`}>{selected.edition}</span>
              )}
              {selected.bundle_cost > 0 && <span style={{ fontSize: 14, color: "var(--ink-subtle)" }}>{selected.bundle_cost.toLocaleString()} VP</span>}
              {selected.limited_time && <span className="edition-badge edition-default">Limited</span>}
            </div>
          </div>
        </div>

        <div className="skin-grid">
          {selected.skins.map((skin) => (
            <div className="skin-card" key={skin.skin_name}>
              {skin.skin_image ? (
                <img className="skin-card-img" src={skin.skin_image} alt={skin.skin_name} loading="lazy" />
              ) : (
                <div className="skin-card-img" style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-tertiary)", fontSize: 14 }}>
                  No image
                </div>
              )}
              <div className="skin-card-body">
                <strong>{skin.skin_name}</strong>
                <span>{skin.weapon}</span>
                {skin.cost > 0 && <span className="skin-card-cost">{skin.cost.toLocaleString()} VP</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="skin-preview">
      <div className="skin-search">
        <input
          type="text"
          placeholder="Search bundles or weapons…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setLimit(9);
          }}
        />
      </div>

      <div className="bundle-grid">
        {displayed.map((collection) => (
          <div
            className="bundle-card"
            key={collection.collection_slug}
            onClick={() => setSelectedSlug(collection.collection_slug)}
          >
            {collection.bundle_image ? (
              <img className="bundle-card-img" src={collection.bundle_image} alt="" loading="lazy" />
            ) : (
              <div className="bundle-card-img-placeholder">🔫</div>
            )}
            <div className="bundle-card-body">
              <strong>{collection.collection}</strong>
              <div className="bundle-card-meta">
                <span>{collection.skins.length} weapons</span>
                {collection.edition && (
                  <span className={`edition-badge ${editionClass(collection.edition)}`}>{collection.edition}</span>
                )}
                {collection.bundle_cost > 0 && <span>{collection.bundle_cost.toLocaleString()} VP</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--ink-subtle)" }}>
          No bundles match "{search}"
        </div>
      )}
    </div>
  );
}
