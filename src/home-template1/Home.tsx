import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, BarChart3, CalendarDays, ChevronLeft, ChevronRight, LineChart as LineChartIcon, Users, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Header from './Header';
import Footer from '../components/public/Footer';
import './styles.css';
import '../final-ui.css';
import { drives as fallbackDrives } from './data';
import { api } from '../services/api';
import { getPublicHomeContent, setCachedPublicHomeContent, subscribeToPublicContent, type CalendarEvent, type PublicHomeContent } from '../services/siteContent';

type Drive = (typeof fallbackDrives)[number];
const chartPalette = ['#1769aa','#2c7dbd','#5d8cab','#7aa4bf','#8bb4ca','#a5c0cf'];

const fallbackContent = getPublicHomeContent();
const valueFromStorage=(c:PublicHomeContent)=>Array.isArray(c?.drives)&&c.drives.length?c.drives:fallbackDrives;
const chartTooltip = { borderRadius: 10, border: '1px solid #d9e2ea', background: '#ffffff', fontSize: 11 };

function monthMeta(date: Date) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const start = first.getDay();
  return { year: date.getFullYear(), month: date.getMonth(), days, start, label: first.toLocaleString('en-IN', { month: 'long', year: 'numeric' }) };
}

function iso(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default function Home() {
  const [content, setContent] = useState<PublicHomeContent>(fallbackContent);
  const [driveRows, setDriveRows] = useState<any[]>(fallbackDrives);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [calendarDate, setCalendarDate] = useState(() => new Date());

  // CMS data is external input. Normalize every collection before it
  // reaches JSX so a partial/legacy response can never crash the page.
  const heroSlides = Array.isArray(content?.heroSlides) ? content.heroSlides : [];
  const recruiters = Array.isArray(content?.recruiters) ? content.recruiters : [];
  const calendarEvents = Array.isArray(content?.calendar) ? content.calendar : [];
  const trends = Array.isArray(content?.trend) ? content.trend : [];
  const funnel = Array.isArray(content?.funnel) ? content.funnel : [];
  const departmentHistory =
    content?.departmentHistory && typeof content.departmentHistory === 'object'
      ? content.departmentHistory
      : {};
  const safeDriveRows = Array.isArray(driveRows) ? driveRows : [];

  useEffect(() => {
    let active = true;
    api.publicContent.get().then((value: PublicHomeContent) => { if (active) { const next = setCachedPublicHomeContent(value); setContent(next); setDriveRows(valueFromStorage(next)); } }).catch(() => setContent(getPublicHomeContent()));
    setDriveRows(valueFromStorage(fallbackContent));
    return () => { active = false; };
  }, []);

  useEffect(() => subscribeToPublicContent(() => { const next=getPublicHomeContent(); setContent(next); setDriveRows(valueFromStorage(next)); }), []);

  useEffect(() => {
    if (paused || (!Array.isArray(content?.heroSlides) || heroSlides.length < 2)) return;
    const length = heroSlides.length;
    const timer = window.setInterval(() => setSlide(value => (value + 1) % length), 5000);
    return () => window.clearInterval(timer);
  }, [paused, heroSlides.length]);

  useEffect(() => {
    if (slide >= heroSlides.length) setSlide(0);
  }, [heroSlides.length, slide]);

  const calendar = useMemo(() => monthMeta(calendarDate), [calendarDate]);
  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    calendarEvents.forEach(event => {
      const list = map.get(event.date) || [];
      list.push(event);
      map.set(event.date, list);
    });
    return map;
  }, [calendarEvents]);

  const calendarCells = useMemo(() => {
    const cells: Array<Date | null> = [];
    for (let i = 0; i < calendar.start; i += 1) cells.push(null);
    for (let day = 1; day <= calendar.days; day += 1) cells.push(new Date(calendar.year, calendar.month, day));
    while (cells.length % 7) cells.push(null);
    return cells;
  }, [calendar]);

  const currentDepartments = departmentHistory[trends[0]?.year || "2025-26"] || [];
  const pieCells = currentDepartments.map((entry, index) => <Cell key={entry.name} fill={chartPalette[index % chartPalette.length]} />);

  const nextSlide = () => setSlide(value => (value + 1) % Math.max(heroSlides.length, 1));
  const prevSlide = () => setSlide(value => { const length = heroSlides.length; return length ? (value - 1 + length) % length : 0; });

  return <div className="template1-home-page tnp-home-clean">
    <Header />
    <main>
      <section className="home-video-box-section">
        <div className="home-video-shell">
          <div className="home-video-frame">
            <video autoPlay muted loop playsInline preload="metadata" poster={content.settings.heroPoster || '/hero-poster.png'} aria-label="SGGSIE&T campus and Training & Placement Cell video">
              <source src={content.settings.heroVideo || '/hero-campus.mp4'} type="video/mp4" />
            </video>
            <div className="home-video-text-overlay">
              <div className="home-video-copy">
                <span className="home-section-label">SGGSIE&amp;T · TRAINING &amp; PLACEMENT CELL</span>
                <h2>Preparing talent for the next opportunity.</h2>
                <p>Explore the campus, people and placement ecosystem that connects SGGSIE&amp;T students with industry.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="placement-kpi-section"><div className="tnp-shell">
        <div className="placement-kpi-head">
          <div><span className="home-section-label">LIVE PUBLIC DATA</span><h2>Placement at a glance</h2></div>
          <span className="public-sync-note">Updated {new Date(content.updatedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
        </div>
        <div className="placement-kpi-grid">
          <article><span>Placement rate</span><strong>{content.stats.placementRate}%</strong><small>Institute-wide</small></article>
          <article><span>Highest package</span><strong>{content.stats.highestPackage}</strong><small>Approved record</small></article>
          <article><span>Average package</span><strong>{content.stats.averagePackage}</strong><small>Approved record</small></article>
          <article><span>Students placed</span><strong>{content.stats.placed.toLocaleString()}</strong><small>Published outcomes</small></article>
          <article><span>Total offers</span><strong>{content.stats.offers.toLocaleString()}</strong><small>Published offers</small></article>
          <article><span>Recruiters</span><strong>{content.stats.recruiters}</strong><small>Participating companies</small></article>
        </div>
      </div></section>

      <section className="student-placement-section">
        <div className="tnp-shell">
          <div className="placement-kpi-head">
            <div><span className="home-section-label">STUDENT PLACEMENT HIGHLIGHTS</span><h2>Student placement highlights</h2></div>
            <Link to="/placements" className="text-action">View all <ArrowRight size={15} /></Link>
          </div>
          <div className="student-slider student-image-only-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <button className="slider-control left" onClick={prevSlide} aria-label="Previous placement image"><ChevronLeft size={22} /></button>
            <div className="student-slider-stage">
              <AnimatePresence mode="wait">
                {heroSlides.length > 0 && <motion.article key={heroSlides[slide].id} className="student-slide-card image-only" initial={{ opacity: 0, x: 45, scale: .985 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -45, scale: .985 }} transition={{ duration: .48, ease: [0.22, 1, 0.36, 1] }}>
                  <img src={heroSlides[slide].image} alt="SGGSIE&T student placement highlight" />
                </motion.article>}
              </AnimatePresence>
            </div>
            <button className="slider-control right" onClick={nextSlide} aria-label="Next placement image"><ChevronRight size={22} /></button>
          </div>
          <div className="slider-meta"><div className="slider-dots">{heroSlides.map((item, index) => <button key={item.id} className={index === slide ? 'active' : ''} onClick={() => setSlide(index)} aria-label={`Show placement image ${index + 1}`} />)}</div><span>{String(Math.min(slide + 1, heroSlides.length)).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}</span></div>
        </div>
      </section>

      <section className="home-recruiters-clean animated-recruiters"><div className="tnp-shell">
        <div className="placement-kpi-head"><div><span className="home-section-label">RECRUITER NETWORK</span><h2>Companies hiring from SGGSIE&amp;T</h2></div><Link to="/recruiters">Recruiter information <ArrowRight size={15} /></Link></div>
        <div className="company-marquee" aria-label="Recruiter logos">
          <div className="company-marquee-track">
            {[...recruiters, ...recruiters].map((company, index) => <div className="company-logo-clean animated-logo" key={`${company.id}-${index}`} title={company.name}>{company.image ? <img src={company.image} alt={company.name} /> : <span>{company.name}</span>}</div>)}
          </div>
        </div>
      </div></section>

      <section className="dynamic-calendar-section"><div className="tnp-shell">
        <div className="placement-kpi-head">
          <div><span className="home-section-label">LIVE T&amp;P CALENDAR</span><h2>{calendar.label}</h2><p className="section-subtitle">Published schedules appear here automatically when the T&amp;P team updates the calendar.</p></div>
          <Link to="/calendar" className="text-action">Full calendar <ArrowRight size={15} /></Link>
        </div>
        <div className="calendar-panel-public">
          <div className="calendar-toolbar"><button onClick={() => setCalendarDate(new Date(calendar.year, calendar.month - 1, 1))}><ChevronLeft size={17} /></button><strong>{calendar.label}</strong><button onClick={() => setCalendarDate(new Date(calendar.year, calendar.month + 1, 1))}><ChevronRight size={17} /></button><button className="calendar-today" onClick={() => setCalendarDate(new Date())}>Today</button></div>
          <div className="calendar-weekdays">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day => <span key={day}>{day}</span>)}</div>
          <div className="calendar-grid-public">
            {calendarCells.map((date, index) => {
              if (!date) return <div className="calendar-day empty" key={`empty-${index}`} />;
              const dateKey = iso(date);
              const dayEvents = eventsByDate.get(dateKey) || [];
              const today = iso(new Date()) === dateKey;
              return <div className={`calendar-day ${today ? 'today' : ''}`} key={dateKey}><span className="calendar-day-number">{date.getDate()}</span>{dayEvents.slice(0, 2).map(event => <div className="calendar-event-chip" key={event.id}><b>{event.title}</b><small>{event.venue}</small></div>)}{dayEvents.length > 2 && <small className="calendar-more">+{dayEvents.length - 2} more</small>}</div>;
            })}
          </div>
        </div>
      </div></section>

      <section className="placement-intelligence-section"><div className="tnp-shell">
        <div className="placement-kpi-head"><div><span className="home-section-label">PLACEMENT INTELLIGENCE</span><h2>Performance by year and department</h2><p className="section-subtitle">Charts are driven by the same public data controlled by T&amp;P administrators.</p></div><Link to="/statistics">Open full statistics <ArrowRight size={15} /></Link></div>
        <div className="intelligence-grid">
          <article className="intelligence-card"><div className="intelligence-card-head"><div><span>YEAR-WISE TREND</span><h3>Placement rate &amp; offers</h3></div><LineChartIcon size={19} /></div><div className="chart-wrap"><ResponsiveContainer width="100%" height={280}><LineChart data={trends}><CartesianGrid strokeDasharray="4 5" stroke="#dfe7ee" /><XAxis dataKey="year" fontSize={10} /><YAxis yAxisId="rate" domain={[0, 100]} fontSize={10} /><YAxis yAxisId="offers" orientation="right" fontSize={10} /><Tooltip contentStyle={chartTooltip} /><Line yAxisId="rate" type="monotone" dataKey="rate" stroke="#1769aa" strokeWidth={3} dot={{ r: 3 }} /><Line yAxisId="offers" type="monotone" dataKey="offers" stroke="#7a95aa" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div></article>
          <article className="intelligence-card"><div className="intelligence-card-head"><div><span>DEPARTMENT-WISE</span><h3>Placement ratio</h3></div><Users size={19} /></div><div className="chart-wrap"><ResponsiveContainer width="100%" height={280}><BarChart data={currentDepartments} layout="vertical" margin={{ left: 5, right: 10 }}><CartesianGrid strokeDasharray="4 5" horizontal={false} stroke="#dfe7ee" /><XAxis type="number" domain={[0, 100]} fontSize={10} /><YAxis dataKey="name" type="category" width={80} fontSize={10} /><Tooltip contentStyle={chartTooltip} /><Bar dataKey="rate" fill="#1769aa" radius={[0, 5, 5, 0]} /></BarChart></ResponsiveContainer></div></article>
          <article className="intelligence-card"><div className="intelligence-card-head"><div><span>PLACEMENT FUNNEL</span><h3>Student journey</h3></div><Building2 size={19} /></div><div className="chart-wrap"><ResponsiveContainer width="100%" height={280}><BarChart data={funnel}><CartesianGrid strokeDasharray="4 5" vertical={false} stroke="#dfe7ee" /><XAxis dataKey="stage" fontSize={9} angle={-18} textAnchor="end" height={55} /><YAxis fontSize={10} /><Tooltip contentStyle={chartTooltip} /><Bar dataKey="value" fill="#2c7dbd" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div></article>
          <article className="intelligence-card compact-chart"><div className="intelligence-card-head"><div><span>PLACED VS ENROLLED</span><h3>Department mix</h3></div><BarChart3 size={19} /></div><div className="chart-wrap"><ResponsiveContainer width="100%" height={280}><PieChart><Tooltip contentStyle={chartTooltip} /><Pie data={currentDepartments} dataKey="placed" nameKey="name" cx="50%" cy="50%" outerRadius={92} innerRadius={55} paddingAngle={2}>{pieCells}</Pie></PieChart></ResponsiveContainer></div></article>
        </div>
      </div></section>

      <section className="home-opportunities-clean"><div className="tnp-shell"><div className="placement-kpi-head"><div><span className="home-section-label">CURRENT RECRUITMENT</span><h2>Active placement drives</h2></div><Link to="/placements">View all drives <ArrowRight size={15} /></Link></div>
        <div className="home-drive-table">{safeDriveRows.slice(0, 6).map(drive => <Link to={`/drive/${drive.id}`} className="home-drive-row" key={drive.id}><div className="drive-company-mark">{drive.company.slice(0, 2).toUpperCase()}</div><div><strong>{drive.company}</strong><span>{drive.role} · {drive.department}</span></div><b>{drive.package}</b><small>{drive.deadline}</small><ChevronRight size={17} /></Link>)}</div>
      </div></section>

      <section className="home-final-cta"><div className="tnp-shell"><div><span className="home-section-label">SGGSIE&amp;T TRAINING &amp; PLACEMENT CELL</span><h2>For students. For recruiters. For industry.</h2></div><div className="home-final-actions"><Link to="/login">Dean Admin <ArrowRight size={15} /></Link><Link to="/contact">Contact T&P Cell <ArrowRight size={15} /></Link></div></div></section>
    </main>
    <Footer />
  </div>;
}
