import { Facebook, Instagram, Linkedin, MapPin, Phone, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { img } from '../../data';
import { getPublicHomeContent, subscribeToPublicContent } from '../../services/siteContent';

const socials = [
  { label: 'Instagram', Icon: Instagram, href: 'https://www.instagram.com/tnp_sggsiet/' },
  { label: 'LinkedIn', Icon: Linkedin, href: 'https://in.linkedin.com/company/training-and-placement-cell-sggsiet-maharashtra' },
  { label: 'YouTube', Icon: Youtube, href: 'https://www.youtube.com/' },
  { label: 'Facebook', Icon: Facebook, href: 'https://www.facebook.com/' },
] as const;

export default function Footer() {
  const [settings, setSettings] = useState(() => getPublicHomeContent().settings);

  useEffect(() => {
    const unsubscribe = subscribeToPublicContent(() => {
      setSettings(getPublicHomeContent().settings);
    });
    return unsubscribe;
  }, []);

  return (
    <footer className="footer">
      <div className="footer-brand-strip">
        <div className="footer-brand-logos">
          <div className="footer-brand-logo">
            <img src={settings.logo || img('branding/sggs-logo.jpeg')} alt="SGGSIE&T logo" />
          </div>
          <div className="footer-brand-details">
            <strong>{settings.instituteName}</strong>
            <span>{settings.address}</span>
          </div>
        </div>
      </div>

      <div className="footer-top">
        <section className="footer-about">
          <div className="footer-about-logo">
            <img src={settings.tnpLogo || img('branding/tnp-logo.jpeg')} alt="Training & Placement Cell logo" />
          </div>
          <p className="footer-about-text">
            Training &amp; Placement Cell<br />
            {settings.instituteName}<br />
            {settings.address}
          </p>
          <div className="footer-socials" aria-label="T&P social links">
            {socials.map(({ label, Icon, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </section>

        <nav className="footer-links" aria-label="Footer navigation">
          <div className="footer-link-column">
            <b>Explore</b>
            <Link to="/placements">Placements</Link>
            <Link to="/statistics">Statistics</Link>
            <Link to="/recruiters">Recruiters</Link>
            <Link to="/about">About T&amp;P</Link>
            <Link to="/departments">Departments</Link>
            <Link to="/labs">Laboratories</Link>
          </div>
          <div className="footer-link-column">
            <b>Placement</b>
            <Link to="/placement-process">Placement Process</Link>
            <Link to="/placement-policy">Placement Policy</Link>
            <Link to="/recruiters/jaf">JAF &amp; Registration</Link>
            <Link to="/recruiters/documents">Recruiter Documents</Link>
            <Link to="/announcements">Announcements</Link>
            <Link to="/newsletter">Newsletter</Link>
          </div>
          <div className="footer-link-column">
            <b>Platform</b>
            <Link to="/calendar">Calendar</Link>
            <Link to="/leadership">Leadership</Link>
            <Link to="/login">Dean Admin</Link>
            <Link to="/contact">T&amp;P Helpline</Link>
          </div>
        </nav>

        <section className="footer-map">
          <div className="footer-map-heading">
            <span><MapPin size={15} /><span>CAMPUS LOCATION</span></span>
            <a href="https://www.google.com/maps/search/?api=1&query=Shri+Guru+Gobind+Singhji+Institute+of+Engineering+and+Technology+Vishnupuri+Nanded" target="_blank" rel="noopener noreferrer">Open map ↗</a>
          </div>
          <div className="map-frame">
            <iframe
              title="SGGSIE&T campus map"
              src="https://www.google.com/maps?q=Shri%20Guru%20Gobind%20Singhji%20Institute%20of%20Engineering%20and%20Technology%2C%20Vishnupuri%2C%20Nanded&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="footer-contact">
            <Phone size={14} />
            <span>{settings.address} · {settings.phone}</span>
          </div>
        </section>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {settings.shortName} Training &amp; Placement Cell</span>
        <span>Official placement experience · Built for students, recruiters &amp; industry</span>
      </div>
    </footer>
  );
}
