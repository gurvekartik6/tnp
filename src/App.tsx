import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import CommandPalette from './components/common/CommandPalette';
import CareerCopilot from './components/common/CareerCopilot';
import CinematicFX from './components/common/CinematicFX';

import Home from './home-template1/Home';
import About from './pages/public/About';
import Placements from './pages/public/Placements';
import Recruiters from './pages/public/Recruiters';
import Calendar from './pages/public/Calendar';
import Statistics from './pages/public/Statistics';
import Departments from './pages/public/Departments';
import Contact from './pages/public/Contact';
import Labs from './pages/public/Labs';
import CampusDetail from './pages/public/CampusDetail';
import Leadership from './pages/public/Leadership';
import Drive from './pages/public/Drive';
import Login from './pages/auth/Login';
import VisionMission from './pages/public/VisionMission';
import PlacementProcess from './pages/public/PlacementProcess';
import PlacementPolicy from './pages/public/PlacementPolicy';
import Announcements from './pages/public/Announcements';
import Newsletter from './pages/public/Newsletter';
import RecruiterJaf from './pages/public/RecruiterJaf';
import RecruiterDocuments from './pages/public/RecruiterDocuments';
import DeanDashboard from './pages/portals/dean/DeanDashboard';
import DeanDepartments from './pages/portals/dean/DeanDepartments';
import DeanRecruiters from './pages/portals/dean/DeanRecruiters';
import DeanDrives from './pages/portals/dean/DeanDrives';
import DeanStatistics from './pages/portals/dean/DeanStatistics';
import DeanSettings from './pages/portals/dean/DeanSettings';
import DeanCMS from './pages/portals/dean/DeanCMS';
import DeanDocuments from './pages/portals/dean/DeanDocuments';

function ScrollManager(){const {pathname}=useLocation();useEffect(()=>{window.scrollTo({top:0,left:0,behavior:'auto'})},[pathname]);return null}

export default function App(){
  const location = useLocation();
  return (
    <>
      <ScrollManager/>
      <CinematicFX/>
      <CommandPalette/>
      <CareerCopilot/>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          className="route-shell"
          initial={{ opacity: 0, y: 18, scale: 0.995, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -14, scale: 1.002, filter: 'blur(4px)' }}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
<Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/vision-mission" element={<VisionMission/>}/><Route path="/placement-process" element={<PlacementProcess/>}/><Route path="/placement-policy" element={<PlacementPolicy/>}/><Route path="/placements" element={<Placements/>}/><Route path="/recruiters" element={<Recruiters/>}/><Route path="/recruiters/jaf" element={<RecruiterJaf/>}/><Route path="/recruiters/documents" element={<RecruiterDocuments/>}/><Route path="/statistics" element={<Statistics/>}/><Route path="/announcements" element={<Announcements/>}/><Route path="/newsletter" element={<Newsletter/>}/><Route path="/departments" element={<Departments/>}/><Route path="/departments/:code" element={<CampusDetail kind="department"/>}/><Route path="/labs" element={<Labs/>}/><Route path="/labs/:slug" element={<CampusDetail kind="lab"/>}/><Route path="/leadership" element={<Leadership/>}/><Route path="/contact" element={<Contact/>}/><Route path="/calendar" element={<Calendar/>}/><Route path="/drive/:id" element={<Drive/>}/><Route path="/login" element={<Login/>}/>
<Route path="/portal/dean" element={<DeanDashboard/>}/><Route path="/portal/dean/content-management" element={<DeanCMS/>}/><Route path="/portal/dean/statistics" element={<DeanStatistics/>}/><Route path="/portal/dean/departments" element={<DeanDepartments/>}/><Route path="/portal/dean/recruiters" element={<DeanRecruiters/>}/><Route path="/portal/dean/drives" element={<DeanDrives/>}/><Route path="/portal/dean/documents" element={<DeanDocuments/>}/><Route path="/portal/dean/announcements" element={<DeanCMS initialTab="news" title="Announcements"/>}/><Route path="/portal/dean/newsletter" element={<DeanCMS initialTab="newsletter" title="Newsletter"/>}/><Route path="/portal/dean/calendar" element={<DeanCMS initialTab="calendar" title="Calendar"/>}/><Route path="/portal/dean/media-library" element={<DeanCMS initialTab="media" title="Media Library"/>}/><Route path="/portal/dean/settings" element={<DeanSettings/>}/><Route path="*" element={<Home/>}/>
</Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
