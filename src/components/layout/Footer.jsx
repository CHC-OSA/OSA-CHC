import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import crest from "../../assets/chc-crest.jpg";
import { CONTACT_INFO } from "../../data/constants";

const QUICK_LINKS = [
  { to: "/about", label: "எங்களைப் பற்றி" },
  { to: "/events", label: "நிகழ்வுகள்" },
  { to: "/developments", label: "அபிவிருத்திகள்" },
  // { to: "/join", label: "உறுப்பினராகுங்கள்" },
  { to: "/directory", label: "உறுப்பினர் பட்டியல்" },
  // { to: "/gallery", label: "படத்தொகுப்பு" },
];

const SOCIALS = [
  { label: "Facebook", icon: <FaFacebookF />, url: "https://www.facebook.com/share/1YDNMVwJH9/?mibextid=wwXIfr" },
  { label: "YouTube", icon: <FaYoutube />, url: "https://www.youtube.com/@CHCOSAOfficial" },
  { label: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/chcosaofficial/" },
];

export default function Footer() {
  return (
    <footer className="footer">
      {/* .footer-grid sits inside .container (not on it) so the container's padding shorthand can't wipe its vertical padding. */}
      <div className="container">
        <div className="footer-grid">
          <div>
            <span className="footer-brand">
              <img src={crest} alt="CHC crest" />
              சாவகச்சேரி இந்துக் கல்லூரி OSA
            </span>
            <p className="footer-motto">&ldquo;நலமே நாடுக, நலமே புரிக, நலமே ஒளிர்க&rdquo;</p>
          </div>

          <div>
            <p className="footer-title">விரைவு இணைப்புகள்</p>
            <ul className="footer-links">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-title">தொடர்பு</p>
            <ul className="footer-contact">
              <li>
                <FiMapPin aria-hidden="true" /> <span>{CONTACT_INFO.address}</span>
              </li>
              <li>
                <FiPhone aria-hidden="true" /> <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}>{CONTACT_INFO.phone}</a>
              </li>
              <li>
                <FiMail aria-hidden="true" /> <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="footer-title">பின்தொடருங்கள்</p>
            <div className="footer-socials">
              {SOCIALS.map((social) => (
                <a key={social.label} href={social.url} aria-label={social.label} className="social-icon" target="_blank" rel="noopener noreferrer">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">© 2026 பழைய மாணவர் சங்கம். அனைத்து உரிமைகளும் காக்கப்பட்டவை.</div>
      </div>
    </footer>
  );
}
