import { BarChart3, Bell, CalendarDays, FileText, ImagePlus, LayoutDashboard, Mail, Settings, Users, BriefcaseBusiness, Megaphone, ClipboardList } from 'lucide-react';
import type { ComponentType } from 'react';

export const publicMenuGroups: readonly {
  label: string;
  items: readonly (readonly [string, string])[];
}[] = [
  {
    label: "About",
    items: [
      ["About T&P", "/about"],
      ["Vision & Mission", "/vision-mission"],
    ],
  },
  {
    label: "Placements",
    items: [
      ["Active Drives", "/placements"],
      ["Placement Process", "/placement-process"],
      ["Placement Policy", "/placement-policy"],
    ],
  },
  {
    label: "Recruiters",
    items: [
      ["Recruiter Overview", "/recruiters"],
      ["JAF & Registration", "/recruiters/jaf"],
      ["Recruiter Documents", "/recruiters/documents"],
    ],
  },
  {
    label: "Campus",
    items: [
      ["Departments", "/departments"],
      ["Laboratories", "/labs"],
      ["Leadership", "/leadership"],
    ],
  },
] as const;

export const publicPrimaryLinks = [['Statistics', '/statistics'], ['Announcements', '/announcements'], ['Newsletter', '/newsletter'], ['Contact', '/contact']] as const;
export const publicLinks = [['/', '/'], ...publicPrimaryLinks, ...publicMenuGroups.flatMap(group => group.items)];

export type Role = 'dean';
export const roles: { id: Role; label: string; desc: string; icon: ComponentType<{ size?: number }> }[] = [
  { id: 'dean', label: 'Dean Admin', desc: 'Manage the complete public T&P website, data, media and analytics.', icon: LayoutDashboard },
];

export const portalModules: Record<Role, string[]> = {
  dean: ['Dashboard', 'Content Management', 'Statistics', 'Departments', 'Recruiters', 'Drives', 'Documents', 'Announcements', 'Newsletter', 'Calendar', 'Media Library', 'Settings'],
};

export const portalIcons: Record<string, ComponentType<{ size?: number }>> = {
  Dashboard: LayoutDashboard, 'Content Management': FileText, 'Media Library': ImagePlus, Announcements: Megaphone, Newsletter: Mail,
  Calendar: CalendarDays, Statistics: BarChart3, Departments: Users, Recruiters: BriefcaseBusiness, Drives: ClipboardList,
  Documents: FileText, Settings,
};
