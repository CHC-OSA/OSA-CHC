import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router";
import crest from "../../assets/chc-crest.jpg";
import Button from "../ui/Button";

const LINKS = [
  { to: "/", label: "முகப்பு", end: true },
  {
    label: "எங்களைப் பற்றி",
    children: [
      { to: "/about", label: "வரலாறும் நோக்கமும்" },
      { to: "/directory", label: "உறுப்பினர் பட்டியல்" },
    ],
  },
  { to: "/events", label: "நிகழ்வுகள்" },
  { to: "/developments", label: "அபிவிருத்திகள்" },
  // { to: "/gallery", label: "படத்தொகுப்பு" },
  { to: "/contact", label: "தொடர்பு" },
];

function NavDropdown({ item, onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();
  const isActive = item.children.some((child) => location.pathname === child.to || location.pathname.startsWith(`${child.to}/`));

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className={`nav-dropdown${open ? " is-open" : ""}`} ref={ref}>
      <button
        type="button"
        className={`nav-link nav-dropdown-trigger${isActive ? " is-active" : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <span className="nav-dropdown-caret" aria-hidden="true">▾</span>
      </button>
      <div className="nav-dropdown-menu">
        {item.children.map((child) => (
          <NavLink
            key={child.to}
            to={child.to}
            onClick={() => {
              setOpen(false);
              onNavigate();
            }}
            className={({ isActive: childActive }) => `nav-dropdown-link${childActive ? " is-active" : ""}`}
          >
            {child.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <Link to="/" className="nav-brand" onClick={() => setOpen(false)}>
        <img src={crest} alt="CHC crest" className="nav-brand-crest" />
        <span className="nav-brand-text">
          <span>சாவகச்சேரி இந்துக் கல்லூரி</span>
          <small>பழைய மாணவர் சங்கம்</small>
        </span>
      </Link>

      <button
        type="button"
        className="btn btn-secondary nav-toggle"
        aria-label="பட்டியலைத் திற"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        ☰
      </button>

      <div className={`nav-links${open ? " is-open" : ""}`}>
        {LINKS.map((link) =>
          link.children ? (
            <NavDropdown key={link.label} item={link} onNavigate={() => setOpen(false)} />
          ) : (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
            >
              {link.label}
            </NavLink>
          )
        )}
      </div>

      <Button as="link" to="/join" pill className="nav-cta" onClick={() => setOpen(false)}>
        உறுப்பினராகுங்கள்
      </Button>
    </nav>
  );
}
