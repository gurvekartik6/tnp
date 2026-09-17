import { LogOut, X } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { img } from '../../data';
import { portalIcons, portalModules, type Role } from '../../config/navigation';
import { deanLogout } from '../../services/deanAuth';
import { api } from '../../services/api';
const pathFor=(role:Role,label:string)=>{if(label==='Dashboard')return `/portal/${role}`;const slug=label.toLowerCase().replace(/&/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');return `/portal/${role}/${slug}`};
export default function PortalSidebar({role,mobileOpen,onClose}:{role:Role;mobileOpen:boolean;onClose:()=>void}){const navigate=useNavigate();return <aside className={`portal-side ${mobileOpen?'mobile-open':''}`}><Link to="/" className="portal-brand"><img src={img('official/institute-logo.jpg')} alt="SGGSIE&T"/><span><b>SGGSIE&T</b><small>Dean Admin Portal</small></span></Link><div className="side-role"><span className="role-mark">D</span><div><b>Dean Admin</b><small>Executive content & placement control</small></div><button className="sidebar-close" onClick={onClose}><X size={16}/></button></div><nav>{portalModules[role].map(label=>{const Icon=portalIcons[label];return <NavLink key={label} to={pathFor(role,label)} end={label==='Dashboard'} onClick={onClose}>{Icon&&<Icon size={15}/>}<span>{label}</span></NavLink>})}</nav><button className="logout" onClick={async()=>{try{await api.auth.logout()}finally{deanLogout();navigate('/login')}}}><LogOut size={15}/> Sign out</button></aside>}
