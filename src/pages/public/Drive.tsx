import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ContentPage from "../../components/public/ContentPage";
import {
  getPublicHomeContent,
  subscribeToPublicContent,
} from "../../services/siteContent";
export default function Drive() {
  const { id } = useParams();
  const [drives, setDrives] = useState(() => getPublicHomeContent().drives);
  useEffect(
    () =>
      subscribeToPublicContent(() => setDrives(getPublicHomeContent().drives)),
    [],
  );
  const d = drives.find((x) => String(x.id) === id) || drives[0];
  if (!d)
    return (
      <ContentPage
        kicker="PLACEMENT DRIVE"
        title="Placement drive information"
        intro="No published placement drive is available."
        image="Departments/INFO_img.jpg"
      >
        <section className="content-card">
          <h2>No placement drive published.</h2>
        </section>
      </ContentPage>
    );
  return (
    <ContentPage
      kicker="PLACEMENT DRIVE"
      title={d.company}
      intro={`${d.role} · ${Array.isArray(d.branches) ? d.branches.join(" · ") : d.branches || d.department || "All eligible branches"}`}
      image="Departments/INFO_img.jpg"
    >
      <section className="drive-detail">
        <div className="content-card">
          <span className="pill">{d.status}</span>
          <h2>Drive details</h2>
          <p>
            {d.location ||
              "Campus recruitment information published by the Dean."}
          </p>
          <div className="detail-grid">
            <div>
              <small>Eligibility</small>
              <b>
                {Array.isArray(d.branches)
                  ? d.branches.join(" · ")
                  : d.branches || d.department || "All eligible branches"}
              </b>
            </div>
            <div>
              <small>Deadline</small>
              <b>{d.deadline}</b>
            </div>
            <div>
              <small>Package</small>
              <b>{d.package || "As published"}</b>
            </div>
            <div>
              <small>Process</small>
              <b>{"PPT · Assessment · Interview"}</b>
            </div>
          </div>
          <Link className="btn-primary" to="/contact">
            Contact T&amp;P Cell <ArrowRight />
          </Link>
        </div>
      </section>
    </ContentPage>
  );
}
