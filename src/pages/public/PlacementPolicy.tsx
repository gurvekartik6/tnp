import { Download, FileText, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import ContentPage from '../../components/public/ContentPage';
import { api } from '../../services/api';
import { getPublicHomeContent, setCachedPublicHomeContent, subscribeToPublicContent, type PublicHomeContent } from '../../services/siteContent';

export default function PlacementPolicy() {
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

  const policyRules = Array.isArray(content?.policyRules) ? content.policyRules : [];
  const documents = Array.isArray(content?.documents) ? content.documents : [];
  const policyDocument = documents.find((document) =>
    document.category?.toUpperCase() === 'POLICY' ||
    document.title?.toLowerCase().includes('placement policy')
  ) || {
    title: 'Training & Placement Policy',
    description: 'Official Training & Placement Policy document.',
    href: '/documents/placement-policy.pdf',
  };

  return (
    <ContentPage
      kicker="PLACEMENTS / POLICY"
      title="Placement policy and student participation framework."
      intro="Current policy information is controlled and published by the T&P administration."
      image="Gallary/statistics.jpg"
    >
      <section className="policy-layout">
        <div className="policy-intro">
          <span className="eyebrow">POLICY CENTER</span>
          <h2>Rules published before participation.</h2>
          <p>The Dean administration can update this section without changing the application code.</p>
          <div className="policy-status"><ShieldCheck size={17} /><span>Publication controlled by T&amp;P Admin</span></div>

          <div className="document-note policy-document-card">
            <FileText size={21} />
            <div>
              <span className="eyebrow">OFFICIAL DOCUMENT</span>
              <h3>{policyDocument.title}</h3>
              <p>{policyDocument.description}</p>
              <a className="btn-secondary" href={policyDocument.href} target="_blank" rel="noopener noreferrer">
                <Download size={15} /> Open Placement Policy PDF
              </a>
            </div>
          </div>
        </div>

        <div className="policy-list">
          {policyRules.length > 0 ? policyRules.map((rule, index) => (
            <article key={`${rule.title}-${index}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{rule.title}</h3><p>{rule.body}</p></div>
            </article>
          )) : (
            <div className="empty-state">
              <ShieldCheck size={24} />
              <h3>Placement policy information</h3>
              <p>Current policy rules will be published by the Training &amp; Placement Cell.</p>
            </div>
          )}
        </div>
      </section>
    </ContentPage>
  );
}
