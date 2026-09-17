import { ArrowUpRight, FlaskConical, MonitorCog } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContentPage from '../../components/public/ContentPage';
import { img } from '../../data';
import { api } from '../../services/api';
import { getPublicHomeContent, setCachedPublicHomeContent, subscribeToPublicContent, type CampusLab } from '../../services/siteContent';

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function Labs() {
  const [labs, setLabs] = useState<CampusLab[]>(() => getPublicHomeContent().campusLabs || []);

  useEffect(() => {
    let active = true;
    api.publicContent.get().then((next: Awaited<ReturnType<typeof api.publicContent.get>>) => {
      if (active) setLabs(setCachedPublicHomeContent(next).campusLabs);
    }).catch(() => undefined);
    const off = subscribeToPublicContent(() => setLabs(getPublicHomeContent().campusLabs));
    return () => { active = false; off(); };
  }, []);

  return (
    <ContentPage
      kicker="10 / LABORATORIES & FACILITIES"
      title="Where engineering becomes tangible."
      intro="A visual index of laboratories, computing environments and innovation facilities across the SGGSIE&T ecosystem."
      image="Gallary/specialFacilities/centerOfExcellence.webp"
    >
      <section className="campus-tabs">
        <Link className="campus-tab" to="/departments">Departments <span>{getPublicHomeContent().campusDepartments.length}</span></Link>
        <Link className="campus-tab active" to="/labs">Laboratories <span>{labs.length}</span></Link>
        <Link className="campus-tab" to="/leadership">Leadership <span>02</span></Link>
      </section>

      <section className="lab-intro">
        <div><span className="eyebrow">INFRASTRUCTURE</span><h2>Built for learning,<br /><i>research and making.</i></h2></div>
        <p>The directory combines department laboratories and institute-level innovation facilities. Equipment and software details are published through the T&amp;P content system.</p>
      </section>

      <section className="lab-grid">
        {labs.map((lab, i) => (
          <article className="lab-card" key={lab.name}>
            <div className="lab-image">
              <img src={lab.image.startsWith('http') || lab.image.startsWith('/') ? lab.image : img(lab.image)} alt={lab.name} />
              <span>{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div className="lab-body">
              <div className="lab-top"><span>{lab.dept}</span>{lab.dept === 'Institute' ? <MonitorCog size={17} /> : <FlaskConical size={17} />}</div>
              <h3>{lab.name}</h3>
              <p>{lab.description}</p>
              <strong>{lab.facts}</strong>
              <Link to={`/labs/${slugify(lab.name)}`}>View facility <ArrowUpRight size={14} /></Link>
            </div>
          </article>
        ))}
      </section>
    </ContentPage>
  );
}
