import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import PageHero from "../components/layout/PageHero";
import PlaceholderImage from "../components/ui/PlaceholderImage";
import ContactForm from "../components/forms/ContactForm";
import { CONTACT_INFO } from "../data/constants";
import Entrance from "../assets/entrance-gate.jpg";

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="தொடர்பு" title="எங்களைத் தொடர்பு கொள்ளுங்கள்" />

      <div className="container page-body">
        <div className="grid-2" style={{ alignItems: "start" }}>
          <section className="panel">
            <ul className="info-list">
              <li>
                <span className="icon-badge" aria-hidden="true">
                  <FiMapPin />
                </span>
                <div>
                  <h3>முகவரி</h3>
                  <p>{CONTACT_INFO.address}</p>
                </div>
              </li>
              <li>
                <span className="icon-badge" aria-hidden="true">
                  <FiPhone />
                </span>
                <div>
                  <h3>தொலைபேசி</h3>
                  <p>
                    <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}>{CONTACT_INFO.phone}</a>
                  </p>
                </div>
              </li>
              <li>
                <span className="icon-badge" aria-hidden="true">
                  <FiMail />
                </span>
                <div>
                  <h3>மின்னஞ்சல்</h3>
                  <p>
                    <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
                  </p>
                </div>
              </li>
            </ul>
            <figure className="media-rounded">
              <PlaceholderImage shape="rect" aspectRatio="16/10" caption="இருப்பிட வரைபடம்" src={Entrance} alt="Entrance" />
            </figure>
          </section>

          <section className="panel">
            <h2 className="panel-title">செய்தி அனுப்புங்கள்</h2>
            <ContactForm />
          </section>
        </div>
      </div>
    </>
  );
}
