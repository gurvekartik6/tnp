import { ArrowRight, Building2, FileText, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ContentPage from "../../components/public/ContentPage";
import { api } from "../../services/api";
import {
  getPublicHomeContent,
  setCachedPublicHomeContent,
  subscribeToPublicContent,
  type PublicHomeContent,
} from "../../services/siteContent";
export default function Recruiters() {
  const [content, setContent] = useState<PublicHomeContent>(() =>
    getPublicHomeContent(),
  );
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("All");
  useEffect(() => {
    api.publicContent
      .get()
      .then((next: PublicHomeContent) =>
        setContent(setCachedPublicHomeContent(next)),
      )
      .catch(() => {});
    return subscribeToPublicContent(() => setContent(getPublicHomeContent()));
  }, []);
  const rows = useMemo(
    () =>
      content.recruiters.filter(
        (r) =>
          (source === "All" || r.source === source) &&
          r.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [content.recruiters, query, source],
  );
  return (
    <ContentPage
      kicker="RECRUITERS"
      title="Recruit from SGGSIE&T."
      intro="Recruiter information, JAF submission and the documents required to plan a campus hiring engagement."
      image="tnp.jpeg"
    >
      <section className="recruiter-page-grid">
        <div className="content-card blue-card">
          <span className="eyebrow light">RECRUITER DESK</span>
          <h2>Everything needed to start a campus hiring process.</h2>
          <p>
            Use the JAF, recruiter workflow and placement material, then
            coordinate the drive with the Training &amp; Placement Cell.
          </p>
          <div className="recruiter-proof">
            <ShieldCheck size={18} />
            <span>Only published records and documents are shown.</span>
          </div>
          <div className="recruiter-actions">
            <Link className="btn-light" to="/recruiters/jaf">
              JAF &amp; Registration <ArrowRight size={15} />
            </Link>
            <Link className="btn-light" to="/recruiters/documents">
              Recruiter Documents <FileText size={15} />
            </Link>
          </div>
        </div>
        <div className="content-card">
          <span className="eyebrow">RECRUITER NETWORK</span>
          <div className="recruiter-toolbar">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search company"
            />
            <select value={source} onChange={(e) => setSource(e.target.value)}>
              <option>All</option>
              <option>New</option>
              <option>Legacy</option>
            </select>
          </div>
          <p>{rows.length} published company records.</p>
          <div className="verified-logo-wall recruiter-logo-grid">
            {rows.map((company) => (
              <div key={company.id} title={company.name}>
                {company.image ? (
                  <img src={company.image} alt={company.name} />
                ) : (
                  <strong>{company.name.slice(0, 2).toUpperCase()}</strong>
                )}
                <span>{company.name}</span>
                <small>{company.source || "Published"}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="recruiter-benefit-grid">
        {content.recruiterBenefits.map((x) => (
          <article key={x.title}>
            <Building2 size={19} />
            <span className="eyebrow">{x.value}</span>
            <h3>{x.title}</h3>
            <p>{x.description}</p>
          </article>
        ))}
      </section>
    </ContentPage>
  );
}
