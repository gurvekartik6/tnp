import { Download, FileText, ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ContentPage from "../../components/public/ContentPage";
import { api } from "../../services/api";
import {
  getPublicHomeContent,
  subscribeToPublicContent,
  type DocumentItem,
  type PublicHomeContent,
} from "../../services/siteContent";
export default function RecruiterDocuments() {
  const [content, setContent] = useState<PublicHomeContent>(() =>
    getPublicHomeContent(),
  );
  useEffect(() => {
    api.publicContent
      .get()
      .then((next: PublicHomeContent) => setContent(next))
      .catch(() => {});
    return subscribeToPublicContent(() => setContent(getPublicHomeContent()));
  }, []);
  const docs = useMemo(
    () =>
      content.documents.filter(
        (d) =>
          d.audience === "Recruiters" ||
          ["JAF", "FRS", "BROCHURE", "FLYER"].includes(d.category),
      ),
    [content.documents],
  );
  return (
    <ContentPage
      kicker="RECRUITERS / DOCUMENTS"
      title="Recruiter document centre."
      intro="JAF, FRS, placement brochures, recruiter workflow and supporting material in one controlled place."
      image="Gallary/statistics.jpg"
    >
      <section className="document-grid recruiter-doc-grid">
        {docs.map((d) => (
          <article className="document-card" key={d.id}>
            <div className="document-card-top">
              <span className="document-icon">
                <FileText size={19} />
              </span>
              <span className="document-category">{d.category}</span>
            </div>
            <h3>{d.title}</h3>
            <p>{d.description}</p>
            {d.href && (
              <div className="document-actions">
                <a
                  className="document-open"
                  href={d.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open <ExternalLink size={14} />
                </a>
                <a className="document-download" href={d.href} download>
                  Download <Download size={14} />
                </a>
              </div>
            )}
          </article>
        ))}
      </section>
    </ContentPage>
  );
}
