import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Trophy, Menu, X, Download, UserRound } from "lucide-react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: "Home", href: "/", icon: <Home size={20} /> },
    { label: "Rankings", href: "/rankings", icon: <Trophy size={20} /> },
    { label: "Account Demo", href: "/account", icon: <UserRound size={20} /> },
  ];

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Hamburger Header (Only visible on mobile) */}
      <div className="mobile-header">
        <Link to="/" className="sidebar-logo">
          <div className="logo-icon"></div>
          Skinly
        </Link>
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} color="var(--ink)" /> : <Menu size={24} color="var(--ink)" />}
        </button>
      </div>

      {/* Sidebar */}
      <motion.nav
        className={`sidebar ${isOpen ? "open" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{ width: isOpen ? 260 : 80 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <div className="logo-icon"></div>
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10, transition: { duration: 0.1 } }}
                  style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                >
                  Skinly
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        <div className="sidebar-links">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                aria-label={link.label}
                className={`sidebar-link ${isActive ? "active" : ""}`}
                title={!isOpen ? link.label : undefined}
                onClick={() => {
                  if (window.innerWidth <= 768) setIsOpen(false);
                }}
              >
                <div className="sidebar-link-icon">{link.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10, transition: { duration: 0.1 } }}
                      style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </div>

        <div className="sidebar-footer">
          <button className="sidebar-download-btn" disabled>
            <div className="sidebar-link-icon"><Download size={20} /></div>
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10, transition: { duration: 0.1 } }}
                  style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                >
                  Download coming later
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="mobile-overlay" onClick={() => setIsOpen(false)}></div>
      )}
    </>
  );
}
