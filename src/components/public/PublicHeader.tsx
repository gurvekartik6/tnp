import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Facebook, Instagram, Linkedin, Menu, Moon, Phone, Search, Sun, X, Youtube } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { publicMenuGroups, publicPrimaryLinks } from '../../config/navigation';
import { getTheme, setTheme, subscribeToTheme, type Theme } from '../../lib/theme';
import { getPublicHomeContent, subscribeToPublicContent } from '../../services/siteContent';

const instituteLogo = '/assets/branding/sggs-logo.jpeg';
const tnpLogo = '/assets/branding/tnp-logo.jpeg';
const socialLinks = [
  { label: 'LinkedIn', href: 'https://in.linkedin.com/company/training-and-placement-cell-sggsiet-maharashtra', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/sggsietnanded/', icon: Instagram },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: Youtube },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: Facebook },
] as const;

export default function PublicHeader() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [theme, setThemeState] = useState<Theme>(() => getTheme());
  const [settings, setSettings] = useState(() => getPublicHomeContent().settings);
  const dark = theme === 'dark';

  useEffect(() => subscribeToTheme(setThemeState), []);
  useEffect(() => subscribeToPublicContent(() => setSettings(getPublicHomeContent().settings)), []);

  useEffect(() => {
    setOpen(false);
    setActiveMenu(null);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); setActiveMenu(null); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const isGroupActive = (items: readonly (readonly [string, string])[]) => items.some(([, path]) => pathname === path || pathname.startsWith(`${path}/`));
  const toggleTheme = () => setTheme(dark ? 'light' : 'dark');

  return (
    <header className="site-header professional-header">
      <div className="header-utility">
        <div className="header-utility-inner">
          <div className="utility-contact">
            <a href="https://www.sggs.ac.in/" target="_blank" rel="noreferrer" className="college-link"><span>sggs.ac.in</span></a>
            <a href={`tel:${settings.phone.replace(/[^+0-9]/g, "")}`}><Phone size={13} /> {settings.phone}</a>
          </div>
          <div className="utility-right">
            <a className="old-website-link" href="https://tnpsggs.in/" target="_blank" rel="noreferrer">Old Website</a>
            <span className="utility-divider" />
            <div className="header-socials" aria-label="Official social links">
              {socialLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}><Icon size={13} /></a>)}
            </div>
          </div>
        </div>
      </div>

      <div className="header-brandbar">
        <div className="header-brand-inner">
          <Link to="/" className="institute-brand" aria-label="SGGSIE&T Training and Placement Cell home">
            <img src={settings.logo || instituteLogo} alt="SGGSIE&T institute logo" />
            <div className="institute-brand-copy">
              <strong>{settings.instituteName}</strong>
              <span>{settings.address}</span>
            </div>
          </Link>
          <div className="header-brand-divider" aria-hidden="true" />
          <Link to="/" className="tnp-brand" aria-label="Training and Placement Cell home">
            <img src={settings.tnpLogo || tnpLogo} alt="Training and Placement Cell logo" />
            <div className="tnp-brand-copy">
              <span>SGGSIE&amp;T</span>
              <strong>Training &amp; Placement Cell</strong>
              <small>Industry Relations · Career Services · Campus Recruitment</small>
            </div>
          </Link>
          <div className="header-brand-actions">
            <button type="button" className="header-search" onClick={() => window.dispatchEvent(new Event('sggs-open-command'))} aria-label="Search SGGS T&P"><Search size={16} /><span>Search</span><kbd>Ctrl K</kbd></button>
            <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
            <Link className="header-portal" to="/login"><span>Dean Admin</span><ArrowRight size={15} /></Link>
            <button className="mobile-menu-btn" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(v => !v)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
          </div>
        </div>
      </div>

      <nav className="desktop-nav professional-nav" aria-label="Primary navigation">
        <NavLink to="/" end className="nav-home">Home</NavLink>
        {publicMenuGroups.map(group => {
          const groupActive = isGroupActive(group.items);
          return <div className={`nav-group ${groupActive ? 'is-active' : ''}`} key={group.label} onMouseEnter={() => setActiveMenu(group.label)} onMouseLeave={() => setActiveMenu(null)}>
            <button type="button" className="nav-trigger" aria-expanded={activeMenu === group.label} onClick={() => setActiveMenu(activeMenu === group.label ? null : group.label)}>{group.label}<ChevronDown size={14} strokeWidth={2.2} /></button>
            <AnimatePresence>{activeMenu === group.label && <motion.div className="nav-dropdown" initial={{ opacity: 0, y: 8, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 5, scale: .99 }} transition={{ duration: .18, ease: [0.22,1,0.36,1] }}><div className="dropdown-label">{group.label}</div>{group.items.map(([label, path], index) => <motion.div key={path} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .025, duration: .16 }}><NavLink to={path} onClick={() => setActiveMenu(null)}><span>{label}</span><ArrowRight size={13} /></NavLink></motion.div>)}</motion.div>}</AnimatePresence>
          </div>;
        })}
        <NavLink to="/statistics" className="nav-home nav-primary-link">Statistics</NavLink>
        {publicPrimaryLinks.filter(([label]) => label !== 'Statistics').map(([label, path]) => <NavLink key={path} to={path} className="nav-home nav-primary-link">{label}</NavLink>)}
      </nav>

      {open && <div className="mobile-nav professional-mobile-nav">
        <NavLink to="/" end className="mobile-home" onClick={() => setOpen(false)}>Home <ArrowRight size={14} /></NavLink>
        {publicMenuGroups.map(group => <div className="mobile-nav-group" key={group.label}><strong>{group.label}</strong>{group.items.map(([label, path]) => <Link key={path} to={path} onClick={() => setOpen(false)}>{label}</Link>)}</div>)}
        <Link className="mobile-home" to="/statistics" onClick={() => setOpen(false)}>Statistics <ArrowRight size={14} /></Link>
        {publicPrimaryLinks.filter(([label]) => label !== 'Statistics').map(([label, path]) => <Link key={path} className="mobile-home" to={path} onClick={() => setOpen(false)}>{label} <ArrowRight size={14} /></Link>)}
        <Link className="mobile-portal" to="/login" onClick={() => setOpen(false)}>Enter Portal <ArrowRight size={14} /></Link>
      </div>}
    </header>
  );
}
