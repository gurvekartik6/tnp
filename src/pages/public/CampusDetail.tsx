import { ArrowLeft, ArrowUpRight, FlaskConical, GraduationCap, MapPin, MonitorCog } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import ContentPage from '../../components/public/ContentPage';
import { img } from '../../data';
import { api } from '../../services/api';
import { getPublicHomeContent, setCachedPublicHomeContent, subscribeToPublicContent, type CampusDepartment, type CampusLab } from '../../services/siteContent';

function assetUrl(value: string) {
  return value.startsWith('http') || value.startsWith('/') ? value : img(value);
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function CampusDetail({ kind }: { kind: 'department' | 'lab' }) {
  const params = useParams();
  const [content, setContent] = useState(() => getPublicHomeContent());

  useEffect(() => {
    let active = true;
    api.publicContent.get().then((next: Awaited<ReturnType<typeof api.publicContent.get>>) => {
      if (active) setContent(setCachedPublicHomeContent(next));
    }).catch(() => undefined);
    const off = subscribeToPublicContent(() => setContent(getPublicHomeContent()));
    return () => { active = false; off(); };
  }, []);

  const departments = Array.isArray(content.campusDepartments) ? content.campusDepartments : [];
  const labs = Array.isArray(content.campusLabs) ? content.campusLabs : [];

  const department = useMemo<CampusDepartment | undefined>(() => {
    if (kind !== 'department') return undefined;
    return departments.find(item => item.code.toLowerCase() === String(params.code || '').toLowerCase());
  }, [departments, kind, params.code]);

  const lab = useMemo<CampusLab | undefined>(() => {
    if (kind !== 'lab') return undefined;
    const requested = String(params.slug || '').toLowerCase();
    return labs.find(item => slugify(item.name) === requested);
  }, [labs, kind, params.slug]);

  const item = department || lab;

  if (!item) {
    return (
      <ContentPage
        kicker="ACADEMIC ECOSYSTEM"
        title="Information not found."
        intro="The requested department or laboratory is not currently published by the T&P content system."
        image="Departments/CSE_img.jpg"
      >
        <section className="campus-detail-empty">
          <GraduationCap size={30} />
          <h2>Published information unavailable</h2>
          <p>Please return to the campus directory and select a currently published entry.</p>
          <Link className="btn-secondary" to={kind === 'department' ? '/departments' : '/labs'}>
            <ArrowLeft size={15} /> Back to directory
          </Link>
        </section>
      </ContentPage>
    );
  }

  const isDepartment = Boolean(department);
  const title = isDepartment ? department!.name : lab!.name;
  const image = assetUrl(item.image);

  return (
    <ContentPage
      kicker={isDepartment ? `DEPARTMENT / ${department!.code}` : `LABORATORY / ${lab!.dept}`}
      title={title}
      intro={isDepartment ? department!.summary : lab!.description}
      image={image}
    >
      <section className="campus-detail-page">
        <div className="campus-detail-actions">
          <Link to={isDepartment ? '/departments' : '/labs'} className="campus-back-link">
            <ArrowLeft size={15} /> Back to {isDepartment ? 'Departments' : 'Laboratories'}
          </Link>
        </div>

        <div className="campus-detail-grid">
          <article className="campus-detail-main">
            <div className="campus-detail-image">
              <img src={image} alt={title} />
            </div>

            <div className="campus-detail-copy">
              <span className="eyebrow">{isDepartment ? 'DEPARTMENT PROFILE' : 'FACILITY PROFILE'}</span>
              <h2>{title}</h2>
              <p>{isDepartment ? department!.summary : lab!.description}</p>

              {isDepartment ? (
                <div className="campus-detail-facts">
                  <div><span>Department Code</span><strong>{department!.code}</strong></div>
                  <div><span>Established</span><strong>{department!.established}</strong></div>
                  <div><span>Head of Department</span><strong>{department!.hod}</strong></div>
                </div>
              ) : (
                <div className="campus-detail-facts">
                  <div><span>Department</span><strong>{lab!.dept}</strong></div>
                  <div><span>Facility</span><strong>Laboratory</strong></div>
                  <div><span>Reference</span><strong>{lab!.facts}</strong></div>
                </div>
              )}
            </div>
          </article>

          <aside className="campus-detail-side">
            <div className="campus-detail-panel">
              <div className="campus-detail-panel-icon">
                {isDepartment ? <GraduationCap size={19} /> : lab!.dept === 'Institute' ? <MonitorCog size={19} /> : <FlaskConical size={19} />}
              </div>
              <span className="eyebrow">KEY INFORMATION</span>

              {isDepartment ? (
                <>
                  <h3>Focus areas</h3>
                  <div className="campus-detail-tags">
                    {department!.highlights.map(highlight => <span key={highlight}>{highlight}</span>)}
                  </div>
                </>
              ) : (
                <>
                  <h3>Facility details</h3>
                  <p>{lab!.facts}</p>
                </>
              )}
            </div>

            <div className="campus-detail-panel campus-detail-contact">
              <MapPin size={18} />
              <div>
                <span className="eyebrow">SGGSIE&amp;T CAMPUS</span>
                <p>Vishnupuri, Nanded, Maharashtra</p>
                <Link to="/contact">Contact T&amp;P Cell <ArrowUpRight size={14} /></Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </ContentPage>
  );
}
