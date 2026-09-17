import { CheckCircle2, Download, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import ContentPage from '../../components/public/ContentPage';
import { api } from '../../services/api';
import { getPublicHomeContent, setCachedPublicHomeContent, subscribeToPublicContent, type PublicHomeContent } from '../../services/siteContent';

export default function PlacementProcess() {
  const [content, setContent] = useState<PublicHomeContent>(() => getPublicHomeContent());

  useEffect(() => {
    let active = true;
    api.publicContent.get().then((value: PublicHomeContent) => {
      if (!active) return;
      setContent(setCachedPublicHomeContent(value));
    }).catch(() => {});

    const unsubscribe = subscribeToPublicContent(() => setContent(getPublicHomeContent()));
    return () => { active = false; unsubscribe(); };
  }, []);

  const documents = Array.isArray(content?.documents) ? content.documents : [];
  const processSteps = Array.isArray(content?.placementProcess) ? content.placementProcess : [];
  const frs = documents.find((document) => document.category?.toUpperCase() === 'FRS') || null;

  return (
    <ContentPage
      kicker="PLACEMENTS / PROCESS"
      title="A transparent journey from recruiter requirement to offer."
      intro="The complete campus recruitment workflow and recruiter-ready documents, published by the Dean administration."
      image="Gallary/step_3.webp"
    >
      <section className="process-rail">
        {processSteps.length > 0 ? processSteps.map((step) => (
          <article key={step.step}>
            <div className="process-node"><span>{step.step}</span><CheckCircle2 size={15} /></div>
            <div>
              <span className="eyebrow">STEP {step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </article>
        )) : (
          <div className="empty-state">
            <FileText size={24} />
            <h3>Placement process will be published soon.</h3>
            <p>The Training &amp; Placement Cell is preparing the current recruitment workflow.</p>
          </div>
        )}
      </section>

      {frs && (
        <section className="document-note recruiter-frs-card">
          <FileText size={21} />
          <div>
            <span className="eyebrow">RECRUITER DOCUMENT</span>
            <h3>{frs.title}</h3>
            <p>{frs.description}</p>
            <a className="btn-secondary" href={frs.href} target="_blank" rel="noopener noreferrer">
              <Download size={15} /> Open FRS PDF
            </a>
          </div>
        </section>
      )}
    </ContentPage>
  );
}
