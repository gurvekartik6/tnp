import {
  ArrowRight,
  Download,
  FileText,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ContentPage from "../../components/public/ContentPage";
import { api } from "../../services/api";
import {
  getPublicHomeContent,
  setCachedPublicHomeContent,
  subscribeToPublicContent,
  type PublicHomeContent,
} from "../../services/siteContent";
export default function RecruiterJaf() {
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
  const jaf = content.documents.find((x) => x.category === "JAF");
  return (
    <ContentPage
      kicker="RECRUITERS / JAF"
      title="Job Announcement Form & registration."
      intro="Submit the recruiter requirement through the published JAF and coordinate the next steps with the Training & Placement Cell."
      image="tnp.jpeg"
    >
      <section className="recruiter-form-info">
        <div className="content-card">
          <span className="eyebrow">STEP 01</span>
          <h2>Download the JAF</h2>
          <p>
            Complete the official/currently published Job Announcement Form with
            role, eligibility, compensation, location and selection details.
          </p>
          {jaf && (
            <a
              className="btn-primary"
              href={jaf.href}
              target="_blank"
              rel="noreferrer"
            >
              <Download size={15} /> Download JAF <ArrowRight size={15} />
            </a>
          )}
        </div>
        <div className="content-card">
          <span className="eyebrow">STEP 02</span>
          <h2>Share the requirement</h2>
          <p>
            Send the completed JAF and supporting company information to the
            placement desk using the published contact details.
          </p>
          <div className="contact-mini">
            <a href={`mailto:${content.settings.tnpEmail}`}>
              <Mail size={15} /> {content.settings.tnpEmail}
            </a>
            <a href={`tel:${content.settings.phone.replace(/[^+0-9]/g, "")}`}>
              <Phone size={15} /> {content.settings.phone}
            </a>
          </div>
        </div>
        <div className="content-card">
          <span className="eyebrow">STEP 03</span>
          <h2>T&P coordination</h2>
          <p>
            The T&P Cell reviews the requirement, coordinates eligibility,
            schedules the drive and communicates the recruitment workflow.
          </p>
          <div className="policy-status">
            <ShieldCheck size={17} />
            <span>Recruiter communication remains controlled by T&amp;P.</span>
          </div>
        </div>
      </section>
      <section className="recruiter-next">
        <Link to="/recruiters/documents">
          View all recruiter documents <ArrowRight size={15} />
        </Link>
        <Link to="/placement-process">
          View placement process <ArrowRight size={15} />
        </Link>
      </section>
    </ContentPage>
  );
}
