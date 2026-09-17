import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContentPage from '../../components/public/ContentPage';
import { api } from '../../services/api';
import { getPublicHomeContent, setCachedPublicHomeContent, subscribeToPublicContent, type DriveItem } from '../../services/siteContent';

export default function Placements() {
  const [drives, setDrives] = useState<DriveItem[]>(() => {
    const content = getPublicHomeContent();
    return Array.isArray(content?.drives) ? content.drives : [];
  });

  useEffect(() => {
    let active = true;
    api.publicContent.get().then((value: Awaited<ReturnType<typeof api.publicContent.get>>) => {
      if (!active) return;
      const content = setCachedPublicHomeContent(value);
      setDrives(Array.isArray(content.drives) ? content.drives : []);
    }).catch(() => undefined);
    const unsubscribe = subscribeToPublicContent(() => {
      const content = getPublicHomeContent();
      setDrives(Array.isArray(content.drives) ? content.drives : []);
    });
    return () => { active = false; unsubscribe(); };
  }, []);

  return (
    <ContentPage
      kicker="02 / PLACEMENTS"
      title="Placement drives and the journey from application to offer."
      intro="A dedicated placement space keeps active placement drives, process information and student actions easy to find."
      image="Departments/CSE_img.jpg"
    >
      <section className="filterbar">
        <button className="filter active">All Drives</button>
        <button className="filter">Internships</button>
        <button className="filter">Training</button>
      </section>

      <section className="drive-list">
        {drives.length > 0 ? drives.map((drive) => (
          <Link to={`/drive/${drive.id}`} className="drive-row" key={String(drive.id)}>
            <div className="drive-icon"><BriefcaseBusiness /></div>
            <div>
              <small>{drive.type || 'Placement'}</small>
              <h3>{drive.company}</h3>
              <p>{drive.role}</p>
            </div>
            <div>
              <b>{Array.isArray(drive.branches) ? drive.branches.join(' · ') : (drive.branches || drive.department || 'All eligible branches')}</b>
              <span>{drive.deadline}</span>
            </div>
            <span className="pill">{drive.status}</span>
            <ArrowUpRight />
          </Link>
        )) : (
          <div className="empty-state">
            <BriefcaseBusiness size={24} />
            <h3>No active placement drives</h3>
            <p>Placement drives published by the Training &amp; Placement Cell will appear here.</p>
          </div>
        )}
      </section>
    </ContentPage>
  );
}
