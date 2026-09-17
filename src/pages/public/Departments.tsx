import { ArrowUpRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import ContentPage from '../../components/public/ContentPage';
import { img } from '../../data';
import { api } from '../../services/api';
import { getPublicHomeContent, setCachedPublicHomeContent, subscribeToPublicContent, type CampusDepartment } from '../../services/siteContent';

export default function Departments() {
  const [query, setQuery] = useState('');
  const [departments, setDepartments] = useState<CampusDepartment[]>(() => getPublicHomeContent().campusDepartments || []);

  useEffect(() => {
    let active = true;
    api.publicContent.get().then((next: Awaited<ReturnType<typeof api.publicContent.get>>) => {
      if (active) setDepartments(setCachedPublicHomeContent(next).campusDepartments);
    }).catch(() => undefined);
    const off = subscribeToPublicContent(() => setDepartments(getPublicHomeContent().campusDepartments));
    return () => { active = false; off(); };
  }, []);

  const filtered = useMemo(
    () => departments.filter(d => `${d.name} ${d.code} ${d.hod}`.toLowerCase().includes(query.toLowerCase())),
    [departments, query]
  );

  return (
    <ContentPage
      kicker="09 / ACADEMIC ECOSYSTEM"
      title="Every department. One connected campus."
      intro="Explore the engineering departments that power SGGSIE&T — with authentic department imagery, leadership, focus areas and a direct path into laboratories and facilities."
      image="Departments/CSE_img.jpg"
    >
      <section className="campus-tabs">
        <Link className="campus-tab active" to="/departments">Departments <span>{departments.length}</span></Link>
        <Link className="campus-tab" to="/labs">Laboratories <span>{getPublicHomeContent().campusLabs.length}</span></Link>
        <Link className="campus-tab" to="/leadership">Leadership <span>02</span></Link>
      </section>

      <section className="campus-directory-head">
        <div>
          <span className="eyebrow">ACADEMIC DIRECTORY</span>
          <h2>Find your department.</h2>
        </div>
        <label className="directory-search">
          <Search size={16} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search department or HOD" />
        </label>
      </section>

      <section className="department-grid refined">
        {filtered.map((d, i) => (
          <article className="department-card refined" key={d.code}>
            <div className="department-image-wrap">
              <img src={d.image.startsWith('http') || d.image.startsWith('/') ? d.image : img(d.image)} alt={d.name} />
              <span>{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div className="department-card-body">
              <div className="department-meta"><span>{d.code}</span><small>EST. {d.established}</small></div>
              <h3>{d.name}</h3>
              <p>{d.summary}</p>
              <div className="department-hod"><span>Head of Department</span><b>{d.hod}</b></div>
              <div className="department-tags">{d.highlights.map(x => <span key={x}>{x}</span>)}</div>
              <Link to={`/departments/${encodeURIComponent(d.code)}`} className="department-link">View department <ArrowUpRight size={15} /></Link>
            </div>
          </article>
        ))}
      </section>

      {filtered.length === 0 && (
        <div className="empty-state">
          <h3>No department found</h3>
          <p>Try another department name, code or HOD.</p>
        </div>
      )}
    </ContentPage>
  );
}
