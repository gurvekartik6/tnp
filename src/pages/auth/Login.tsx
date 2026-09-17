import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, BarChart3, Moon, Sun, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { img } from '../../data';
import { api } from '../../services/api';
import { DEAN_EMAIL, setDeanSession } from '../../services/deanAuth';
import { getTheme, setTheme, subscribeToTheme, type Theme } from '../../lib/theme';

export default function Login(){
 const [theme,setThemeState]=useState<Theme>(()=>getTheme()); const dark=theme==='dark'; const navigate=useNavigate();
 const [email,setEmail]=useState(DEAN_EMAIL); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const [busy,setBusy]=useState(false);
 useEffect(()=>subscribeToTheme(setThemeState),[]);
 const submit=async(e:FormEvent)=>{e.preventDefault();setBusy(true);setError('');try{const result=await api.auth.login({email,password});setDeanSession(result);navigate('/portal/dean')}catch(err){setError(err instanceof Error?err.message:'Unable to sign in')}finally{setBusy(false)}};
 return <div className="login-page">
  <div className="login-image"><img src={img('SGGS_Campus.jpg')} alt="SGGSIE&T campus"/><div className="login-image-content"><div className="login-brand-lockup"><Link to="/" className="login-brand-logo"><img src={img('official/institute-logo.jpg')} alt="SGGSIE&T institute logo"/></Link><span className="login-brand-divider"/><Link to="/" className="login-brand-logo login-brand-logo-tnp"><img src={img('official/tnp-logo.jpg')} alt="Training and Placement Cell logo"/></Link><div className="login-brand-copy"><strong>SGGSIE&amp;T</strong><span>Training &amp; Placement Cell</span></div></div><span className="eyebrow light">SGGSIE&amp;T · DEAN ADMINISTRATION</span><h1>One website.<br/><i>One control centre.</i></h1><p className="login-hero-note">The Dean workspace controls the published banner, placement statistics, recruiter network, documents, announcements and website content.</p></div></div>
  <div className="login-panel"><div className="login-panel-top"><Link to="/" className="back-link">← Back to website</Link><button type="button" className="theme-toggle login-theme" onClick={()=>setTheme(dark?'light':'dark')} aria-label={dark?'Switch to light theme':'Switch to dark theme'}>{dark?<Sun size={16}/>:<Moon size={16}/>}</button></div><span className="eyebrow">DEAN ADMIN PORTAL</span><h2>Secure administrator sign in.</h2><div className="login-role-single"><span><ShieldCheck size={18}/></span><div><b>Dean Administrator</b><small>Server-verified access to published T&amp;P content and placement data</small></div></div><form onSubmit={submit}><label>Official email<input value={email} onChange={e=>setEmail(e.target.value)} autoComplete="username"/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter Dean password" autoComplete="current-password"/></label>{error&&<div className="login-error">{error}</div>}<button className="btn-primary wide" disabled={busy}>{busy?'Signing in…':'Enter Dean Admin'} <ArrowRight/></button></form><small className="demo-note">Authentication is verified by the backend. Configure a strong server-side DEAN_PASSWORD before deployment.</small></div>
 </div>
}
