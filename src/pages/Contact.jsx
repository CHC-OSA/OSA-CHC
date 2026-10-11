import { Call02Icon, Location01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import Icon from "../components/ui/Icon";
import PageHero from "../components/layout/PageHero";
import PlaceholderImage from "../components/ui/PlaceholderImage";
import ContactForm from "../components/forms/ContactForm";
import { CONTACT_INFO } from "../data/constants";
import Entrance from "../assets/entrance-gate.jpg";

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="தொடர்பு" title="எம்மைத் தொடர்பு கொள்ளவும்" />

      <div className="container page-body">
        <div className="grid-2" style={{ alignItems: "start" }}>
          <section className="panel">
            <ul className="info-list">
              <li>
                <span className="icon-badge" aria-hidden="true">
                  <Icon icon={Location01Icon} />
                </span>
                <div>
                  <h3>முகவரி</h3>
                  <p>{CONTACT_INFO.address}</p>
                </div>
              </li>
              <li>
                <span className="icon-badge" aria-hidden="true">
                  <Icon icon={Call02Icon} />
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
                  <Icon icon={Mail01Icon} />
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
              <PlaceholderImage shape="rect" aspectRatio="16/10" caption="கல்லூரி நுழைவாயில்" src={Entrance} alt="கல்லூரி நுழைவாயில்" />
            </figure>
          </section>

          <section className="panel">
            <h2 className="panel-title">செய்தி அனுப்பவும்</h2>
            <ContactForm />
          </section>
        </div>
      </div>
    </>
  );
}
