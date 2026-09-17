import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContentPage from "../../components/public/ContentPage";
import { api } from "../../services/api";
import {
  getPublicHomeContent,
  setCachedPublicHomeContent,
  subscribeToPublicContent,
  type PublicHomeContent,
} from "../../services/siteContent";
export default function Contact() {
  const [content, setContent] = useState<PublicHomeContent>(() =>
    getPublicHomeContent(),
  );
  useEffect(() => {
    api.publicContent
      .get()
      .then((next: PublicHomeContent) =>
        setContent(setCachedPublicHomeContent(next)),
      )
      .catch(() => {});
    return subscribeToPublicContent(() => setContent(getPublicHomeContent()));
  }, []);
  const executives = content.contacts.filter((x) => x.role === "T&P Executive");
  const students = content.contacts.filter(
    (x) => x.role === "Student Representative Committee",
  );
  return (
    <ContentPage
      kicker="CONTACT"
      title="Training & Placement Helpline."
      intro="Official placement-desk contact points for recruiters, students and institutional coordination."
      image="ContactUsIcon.png"
    >
      <section className="contact-grid dynamic-contact-grid">
        <div className="contact-card">
          <span className="eyebrow">PLACEMENT CELL OFFICE</span>
          <h2>{content.settings.shortName}</h2>
          <p>{content.settings.address}</p>
          <div className="contact-row">
            <MapPin size={18} />
            <span>Ground Floor, Administrative Block</span>
          </div>
          <div className="contact-row">
            <Phone size={18} />
            <a href={`tel:${content.settings.phone.replace(/[^+0-9]/g, "")}`}>
              {content.settings.phone}
            </a>
          </div>
          <div className="contact-row">
            <Mail size={18} />
            <a href={`mailto:${content.settings.tnpEmail}`}>
              {content.settings.tnpEmail}
            </a>
          </div>
        </div>
        <div className="contact-card">
          <span className="eyebrow">RECRUITER SUPPORT</span>
          <h2>Planning a campus drive?</h2>
          <p>
            Use the recruiter JAF and document centre, then coordinate the
            requirement with the T&amp;P Cell.
          </p>
          <Link className="btn-primary" to="/recruiters/jaf">
            JAF &amp; Registration <ArrowRight />
          </Link>
        </div>
      </section>
      <section className="contact-team-grid">
        {executives.map((person) => (
          <article className="contact-person" key={person.id}>
            <span className="eyebrow">{person.role}</span>
            <h3>{person.name}</h3>
            <b>{person.designation}</b>
            <p>{person.description}</p>
            {person.office && (
              <a href={`tel:${person.office.replace(/[^+0-9]/g, "")}`}>
                <Phone size={14} /> Office: {person.office}
              </a>
            )}
            {person.phone && (
              <a href={`tel:${person.phone.replace(/[^+0-9]/g, "")}`}>
                <Phone size={14} /> {person.phone}
              </a>
            )}
            {person.email && (
              <a href={`mailto:${person.email}`}>
                <Mail size={14} /> {person.email}
              </a>
            )}
          </article>
        ))}
      </section>
      {students.length > 0 && (
        <section className="contact-team-grid student-rep-grid">
          {students.map((person) => (
            <article className="contact-person" key={person.id}>
              <span className="eyebrow">{person.role}</span>
              <h3>{person.name}</h3>
              <b>{person.designation}</b>
              <p>{person.description}</p>
              {person.phone && (
                <a href={`tel:${person.phone.replace(/[^+0-9]/g, "")}`}>
                  <Phone size={14} /> {person.phone}
                </a>
              )}
              {person.email && (
                <a href={`mailto:${person.email}`}>
                  <Mail size={14} /> {person.email}
                </a>
              )}
            </article>
          ))}
        </section>
      )}
    </ContentPage>
  );
}
