import {
  companies,
  events,
  announcements as seedAnnouncements,
  resources,
  studentPlacementHighlights,
} from "../home-template1/data";
import {
  campusDepartments as seedCampusDepartments,
  campusLabs as seedCampusLabs,
} from "../data/campus";

export type HomeStat = {
  students: number;
  enrolled: number;
  placed: number;
  offers: number;
  recruiters: number;
  drives: number;
  placementRate: number;
  highestPackage: string;
  averagePackage: string;
  lowestPackage: string;
};
export type TrendPoint = {
  year: string;
  enrolled: number;
  placed: number;
  offers: number;
  averagePackage: string;
  highestPackage: string;
  packageRange: string;
  companies: number;
  rate: number;
};
export type DepartmentStat = {
  name: string;
  enrolled: number;
  placed: number;
  rate: number;
  highest: string;
};
export type FunnelPoint = { stage: string; value: number };
export type CalendarEvent = {
  id: string;
  date: string;
  title: string;
  venue: string;
  category: string;
  status?: "Published" | "Draft";
};
export type HeroSlide = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  batch: string;
};
export type RecruiterLogo = {
  id: string;
  name: string;
  image: string;
  website?: string;
  source?: string;
  featured?: boolean;
};
export type AnnouncementItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  status: string;
  publishDate?: string;
  expiryDate?: string;
  image?: string;
};
export type DocumentItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  href: string;
  type?: string;
  audience?: string;
  status?: "Published" | "Draft";
};
export type NewsletterIssue = {
  id: string;
  title: string;
  subject: string;
  body: string;
  image?: string;
  publishedAt: string;
  status: "Published" | "Draft";
};
export type GalleryItem = {
  id: string;
  title: string;
  image: string;
  category: string;
  description?: string;
};
export type PageMeta = {
  kicker: string;
  title: string;
  intro: string;
  image: string;
};
export type DriveItem = {
  id: number | string;
  company: string;
  role: string;
  department?: string;
  package?: string;
  deadline: string;
  status: string;
  type?: string;
  branches?: string | string[];
  date?: string;
  location?: string;
  logo?: string;
};
export type ContactPerson = {
  id: string;
  role: string;
  name: string;
  designation: string;
  description: string;
  office?: string;
  phone?: string;
  email?: string;
};
export type CampusDepartment = {
  code: string;
  short: string;
  name: string;
  image: string;
  established: string;
  hod: string;
  summary: string;
  highlights: readonly string[];
};
export type CampusLab = {
  name: string;
  dept: string;
  image: string;
  description: string;
  facts: string;
};
export type PublicHomeContent = {
  stats: HomeStat;
  trend: TrendPoint[];
  departmentHistory: Record<string, DepartmentStat[]>;
  funnel: FunnelPoint[];
  heroSlides: HeroSlide[];
  bannerImage: string;
  recruiters: RecruiterLogo[];
  drives: DriveItem[];
  calendar: CalendarEvent[];
  announcements: AnnouncementItem[];
  documents: DocumentItem[];
  newsletter: NewsletterIssue[];
  gallery: GalleryItem[];
  pages: Record<string, PageMeta>;
  campusDepartments: CampusDepartment[];
  campusLabs: CampusLab[];
  settings: SiteSettings;
  placementProcess: { step: string; title: string; description: string }[];
  policyRules: { title: string; body: string }[];
  contacts: ContactPerson[];
  recruiterBenefits: { title: string; value: string; description: string }[];
  updatedAt: string;
};
export type SiteSettings = {
  instituteName: string;
  shortName: string;
  address: string;
  phone: string;
  email: string;
  tnpEmail: string;
  logo: string;
  tnpLogo: string;
  favicon?: string;
  footerText: string;
  heroVideo: string;
  heroPoster: string;
};

const KEY = "sggs-tnp-public-cms-v3";
const fallbackStats: HomeStat = {
  students: 680,
  enrolled: 680,
  placed: 412,
  offers: 525,
  recruiters: 90,
  drives: 90,
  placementRate: 60.59,
  highestPackage: "₹61 LPA",
  averagePackage: "₹5.5 LPA",
  lowestPackage: "₹3.0 LPA",
};
const trend: TrendPoint[] = [
  {
    year: "2025-26",
    enrolled: 680,
    placed: 404,
    offers: 515,
    averagePackage: "₹5.5 LPA",
    highestPackage: "₹61 LPA",
    packageRange: "₹3.0 - ₹61 LPA",
    companies: 90,
    rate: 59.4,
  },
  {
    year: "2024-25",
    enrolled: 697,
    placed: 370,
    offers: 470,
    averagePackage: "₹5.12 LPA",
    highestPackage: "₹27 LPA",
    packageRange: "₹3.0 - ₹27 LPA",
    companies: 83,
    rate: 53.1,
  },
  {
    year: "2023-24",
    enrolled: 760,
    placed: 352,
    offers: 414,
    averagePackage: "₹5.65 LPA",
    highestPackage: "₹22 LPA",
    packageRange: "₹3.0 - ₹22 LPA",
    companies: 69,
    rate: 46.3,
  },
  {
    year: "2022-23",
    enrolled: 799,
    placed: 437,
    offers: 500,
    averagePackage: "₹5.5 LPA",
    highestPackage: "₹60 LPA",
    packageRange: "₹3.36 - ₹60 LPA",
    companies: 79,
    rate: 54.7,
  },
  {
    year: "2021-22",
    enrolled: 772,
    placed: 432,
    offers: 601,
    averagePackage: "₹4.7 LPA",
    highestPackage: "₹52 LPA",
    packageRange: "₹3.0 - ₹52 LPA",
    companies: 89,
    rate: 56.0,
  },
];
const departmentHistory: Record<string, DepartmentStat[]> = {
  "2025-26": [
    {
      name: "EXTC",
      enrolled: 132,
      placed: 106,
      rate: 80.3,
      highest: "—",
    },
    {
      name: "CSE",
      enrolled: 116,
      placed: 93,
      rate: 80.2,
      highest: "—",
    },
    {
      name: "IT",
      enrolled: 65,
      placed: 52,
      rate: 80.0,
      highest: "—",
    },
    {
      name: "INST",
      enrolled: 36,
      placed: 29,
      rate: 80.6,
      highest: "—",
    },
    {
      name: "ELEC",
      enrolled: 89,
      placed: 71,
      rate: 79.8,
      highest: "—",
    },
    {
      name: "MECH",
      enrolled: 75,
      placed: 60,
      rate: 80.0,
      highest: "—",
    },
    {
      name: "PROD",
      enrolled: 24,
      placed: 19,
      rate: 79.2,
      highest: "—",
    },
    {
      name: "CHEM",
      enrolled: 35,
      placed: 28,
      rate: 80.0,
      highest: "—",
    },
    {
      name: "CIVIL",
      enrolled: 35,
      placed: 28,
      rate: 80.0,
      highest: "—",
    },
    {
      name: "TEXT",
      enrolled: 36,
      placed: 29,
      rate: 80.6,
      highest: "—",
    },
  ],
  "2024-25": [
    {
      name: "EXTC",
      enrolled: 68,
      placed: 54,
      rate: 79.4,
      highest: "—",
    },
    {
      name: "CSE",
      enrolled: 132,
      placed: 106,
      rate: 80.3,
      highest: "—",
    },
    {
      name: "IT",
      enrolled: 55,
      placed: 44,
      rate: 80.0,
      highest: "—",
    },
    {
      name: "INST",
      enrolled: 49,
      placed: 39,
      rate: 79.6,
      highest: "—",
    },
    {
      name: "ELEC",
      enrolled: 81,
      placed: 65,
      rate: 80.2,
      highest: "—",
    },
    {
      name: "MECH",
      enrolled: 42,
      placed: 34,
      rate: 81.0,
      highest: "—",
    },
    {
      name: "PROD",
      enrolled: 40,
      placed: 32,
      rate: 80.0,
      highest: "—",
    },
    {
      name: "CHEM",
      enrolled: 35,
      placed: 28,
      rate: 80.0,
      highest: "—",
    },
    {
      name: "CIVIL",
      enrolled: 41,
      placed: 33,
      rate: 80.5,
      highest: "—",
    },
    {
      name: "TEXT",
      enrolled: 44,
      placed: 35,
      rate: 79.5,
      highest: "—",
    },
  ],
  "2023-24": [
    {
      name: "EXTC",
      enrolled: 88,
      placed: 70,
      rate: 79.5,
      highest: "—",
    },
    {
      name: "CSE",
      enrolled: 132,
      placed: 106,
      rate: 80.3,
      highest: "—",
    },
    {
      name: "IT",
      enrolled: 76,
      placed: 61,
      rate: 80.3,
      highest: "—",
    },
    {
      name: "INST",
      enrolled: 56,
      placed: 45,
      rate: 80.4,
      highest: "—",
    },
    {
      name: "ELEC",
      enrolled: 25,
      placed: 20,
      rate: 80.0,
      highest: "—",
    },
    {
      name: "MECH",
      enrolled: 54,
      placed: 43,
      rate: 79.6,
      highest: "—",
    },
    {
      name: "PROD",
      enrolled: 21,
      placed: 17,
      rate: 81.0,
      highest: "—",
    },
    {
      name: "CHEM",
      enrolled: 20,
      placed: 16,
      rate: 80.0,
      highest: "—",
    },
    {
      name: "CIVIL",
      enrolled: 16,
      placed: 13,
      rate: 81.2,
      highest: "—",
    },
    {
      name: "TEXT",
      enrolled: 29,
      placed: 23,
      rate: 79.3,
      highest: "—",
    },
  ],
  "2022-23": [
    {
      name: "EXTC",
      enrolled: 125,
      placed: 100,
      rate: 80.0,
      highest: "—",
    },
    {
      name: "CSE",
      enrolled: 129,
      placed: 103,
      rate: 79.8,
      highest: "—",
    },
    {
      name: "IT",
      enrolled: 62,
      placed: 50,
      rate: 80.6,
      highest: "—",
    },
    {
      name: "INST",
      enrolled: 60,
      placed: 48,
      rate: 80.0,
      highest: "—",
    },
    {
      name: "ELEC",
      enrolled: 66,
      placed: 53,
      rate: 80.3,
      highest: "—",
    },
    {
      name: "MECH",
      enrolled: 52,
      placed: 42,
      rate: 80.8,
      highest: "—",
    },
    {
      name: "PROD",
      enrolled: 30,
      placed: 24,
      rate: 80.0,
      highest: "—",
    },
    {
      name: "CHEM",
      enrolled: 28,
      placed: 22,
      rate: 78.6,
      highest: "—",
    },
    {
      name: "CIVIL",
      enrolled: 46,
      placed: 37,
      rate: 80.4,
      highest: "—",
    },
    {
      name: "TEXT",
      enrolled: 26,
      placed: 21,
      rate: 80.8,
      highest: "—",
    },
  ],
  "2021-22": [
    {
      name: "EXTC",
      enrolled: 181,
      placed: 145,
      rate: 80.1,
      highest: "—",
    },
    {
      name: "CSE",
      enrolled: 200,
      placed: 160,
      rate: 80.0,
      highest: "—",
    },
    {
      name: "IT",
      enrolled: 115,
      placed: 92,
      rate: 80.0,
      highest: "—",
    },
    {
      name: "INST",
      enrolled: 62,
      placed: 50,
      rate: 80.6,
      highest: "—",
    },
    {
      name: "ELEC",
      enrolled: 59,
      placed: 47,
      rate: 79.7,
      highest: "—",
    },
    {
      name: "MECH",
      enrolled: 35,
      placed: 28,
      rate: 80.0,
      highest: "—",
    },
    {
      name: "PROD",
      enrolled: 24,
      placed: 19,
      rate: 79.2,
      highest: "—",
    },
    {
      name: "CHEM",
      enrolled: 22,
      placed: 18,
      rate: 81.8,
      highest: "—",
    },
    {
      name: "CIVIL",
      enrolled: 20,
      placed: 16,
      rate: 80.0,
      highest: "—",
    },
    {
      name: "TEXT",
      enrolled: 32,
      placed: 26,
      rate: 81.2,
      highest: "—",
    },
  ],
};
const recruiters: RecruiterLogo[] = [
  {
    id: "rec-1",
    name: "Alfa Laval",
    image: "/tnp-assets/companies-legacy/old/alfa_laval.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-2",
    name: "Analogic",
    image: "/tnp-assets/companies-legacy/old/analogic.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-3",
    name: "Atos Syntel",
    image: "/tnp-assets/companies-legacy/old/atos-syntel-vector-logo.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-4",
    name: "Bharatforge",
    image: "/tnp-assets/companies-legacy/old/bharatforge.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-5",
    name: "Darkhorse",
    image: "/tnp-assets/companies-legacy/old/darkhorse.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-6",
    name: "Eleation",
    image: "/tnp-assets/companies-legacy/old/eleation.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-7",
    name: "Emerson",
    image: "/tnp-assets/companies-legacy/old/emerson.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-8",
    name: "Geometric Company Logo",
    image: "/tnp-assets/companies-legacy/old/Geometric-Company-Logo.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-9",
    name: "Grifeo",
    image: "/tnp-assets/companies-legacy/old/grifeo.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-10",
    name: "HCL",
    image: "/tnp-assets/companies-legacy/old/hcl.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-11",
    name: "Honeywell",
    image: "/tnp-assets/companies-legacy/old/honeywell.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-12",
    name: "HPE",
    image: "/tnp-assets/companies-legacy/old/hpenterprise.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-13",
    name: "IBM",
    image: "/tnp-assets/companies-legacy/old/ibm.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-14",
    name: "Jacobs Jfif",
    image: "/tnp-assets/companies-legacy/old/jacobs_jfif.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-15",
    name: "Johnson Controls",
    image: "/tnp-assets/companies-legacy/old/jonhson_control.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-16",
    name: "KPIT Technologies",
    image: "/tnp-assets/companies-legacy/old/kpitcummins.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-17",
    name: "Kratin",
    image: "/tnp-assets/companies-legacy/old/kratin.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-18",
    name: "L T Infotech",
    image: "/tnp-assets/companies-legacy/old/l_t_infotech.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-19",
    name: "Laurus",
    image: "/tnp-assets/companies-legacy/old/laurus.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-20",
    name: "Mahindra",
    image: "/tnp-assets/companies-legacy/old/mahindra.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-21",
    name: "Neml",
    image: "/tnp-assets/companies-legacy/old/neml.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-22",
    name: "Neologic",
    image: "/tnp-assets/companies-legacy/old/neologic.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-23",
    name: "Netcracker",
    image: "/tnp-assets/companies-legacy/old/netcracker.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-24",
    name: "NVIDIA",
    image: "/tnp-assets/companies-legacy/old/nivida.webp",
    website: "",
    source: "Legacy",
    featured: true,
  },
  {
    id: "rec-25",
    name: "Rcf",
    image: "/tnp-assets/companies-legacy/old/rcf.webp",
    website: "",
    source: "Legacy",
    featured: false,
  },
  {
    id: "rec-26",
    name: "Routerabbit",
    image: "/tnp-assets/companies-legacy/old/routerabbit.webp",
    website: "",
    source: "Legacy",
    featured: false,
  },
  {
    id: "rec-27",
    name: "Sandriver",
    image: "/tnp-assets/companies-legacy/old/sandriver.webp",
    website: "",
    source: "Legacy",
    featured: false,
  },
  {
    id: "rec-28",
    name: "Sarvaha",
    image: "/tnp-assets/companies-legacy/old/sarvaha.webp",
    website: "",
    source: "Legacy",
    featured: false,
  },
  {
    id: "rec-29",
    name: "Schneider / Invensys",
    image: "/tnp-assets/companies-legacy/old/sch-invensys.webp",
    website: "",
    source: "Legacy",
    featured: false,
  },
  {
    id: "rec-30",
    name: "Siemens",
    image: "/tnp-assets/companies-legacy/old/siemens.webp",
    website: "",
    source: "Legacy",
    featured: false,
  },
  {
    id: "rec-31",
    name: "Syntel",
    image: "/tnp-assets/companies-legacy/old/syntel.webp",
    website: "",
    source: "Legacy",
    featured: false,
  },
  {
    id: "rec-32",
    name: "Tata Motors",
    image: "/tnp-assets/companies-legacy/old/tata_motors.webp",
    website: "",
    source: "Legacy",
    featured: false,
  },
  {
    id: "rec-33",
    name: "Tata Consultancy Services",
    image: "/tnp-assets/companies-legacy/old/tataconsulting.webp",
    website: "",
    source: "Legacy",
    featured: false,
  },
  {
    id: "rec-34",
    name: "Texas Instruments",
    image: "/tnp-assets/companies-legacy/old/texasins.webp",
    website: "",
    source: "Legacy",
    featured: false,
  },
  {
    id: "rec-35",
    name: "Thermax",
    image: "/tnp-assets/companies-legacy/old/thermax.webp",
    website: "",
    source: "Legacy",
    featured: false,
  },
  {
    id: "rec-36",
    name: "Toyoeg",
    image: "/tnp-assets/companies-legacy/old/toyoeg.webp",
    website: "",
    source: "Legacy",
    featured: false,
  },
  {
    id: "rec-37",
    name: "Tpl Logo",
    image: "/tnp-assets/companies-legacy/old/tpl_logo.webp",
    website: "",
    source: "Legacy",
    featured: false,
  },
  {
    id: "rec-38",
    name: "Welspun",
    image: "/tnp-assets/companies-legacy/old/welspun.webp",
    website: "",
    source: "Legacy",
    featured: false,
  },
  {
    id: "rec-39",
    name: "Yoke",
    image: "/tnp-assets/companies-legacy/old/yoke.webp",
    website: "",
    source: "Legacy",
    featured: false,
  },
  {
    id: "rec-40",
    name: "Yokogawa",
    image: "/tnp-assets/companies-legacy/old/yokogawa.webp",
    website: "",
    source: "Legacy",
    featured: false,
  },
  {
    id: "rec-41",
    name: "Accenture",
    image: "/tnp-assets/companies-legacy/new/accenture.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-42",
    name: "Accolite Digital",
    image: "/tnp-assets/companies-legacy/new/accolite-digital.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-43",
    name: "Adani Group",
    image: "/tnp-assets/companies-legacy/new/adani-group.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-44",
    name: "Aker Solutions",
    image: "/tnp-assets/companies-legacy/new/aker-solutions.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-45",
    name: "Altimetrik",
    image: "/tnp-assets/companies-legacy/new/altimetrik.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-46",
    name: "Amazon",
    image: "/tnp-assets/companies-legacy/new/amazon.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-47",
    name: "Analyzer Cae",
    image: "/tnp-assets/companies-legacy/new/analyzer-cae.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-48",
    name: "Aquachills",
    image: "/tnp-assets/companies-legacy/new/aquachills.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-49",
    name: "Attica",
    image: "/tnp-assets/companies-legacy/new/attica.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-50",
    name: "AYM Syntex",
    image: "/tnp-assets/companies-legacy/new/aymSyntex.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-51",
    name: "Banswara Syntex",
    image: "/tnp-assets/companies-legacy/new/banswara-syntex.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-52",
    name: "Bhilosa",
    image: "/tnp-assets/companies-legacy/new/bhilosa.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-53",
    name: "Bitwise",
    image: "/tnp-assets/companies-legacy/new/bitwise.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-54",
    name: "Bosch",
    image: "/tnp-assets/companies-legacy/new/bosch.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-55",
    name: "Brintons",
    image: "/tnp-assets/companies-legacy/new/brintons.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-56",
    name: "Burns And Mcdonnell",
    image: "/tnp-assets/companies-legacy/new/burns-and-mcdonnell.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-57",
    name: "Byjus",
    image: "/tnp-assets/companies-legacy/new/byjus.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-58",
    name: "Capgemini",
    image: "/tnp-assets/companies-legacy/new/capgemini.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-59",
    name: "Cctech",
    image: "/tnp-assets/companies-legacy/new/cctech.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-60",
    name: "Centiro",
    image: "/tnp-assets/companies-legacy/new/centiro.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-61",
    name: "Century Enka",
    image: "/tnp-assets/companies-legacy/new/centuryEnka.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-62",
    name: "Cern",
    image: "/tnp-assets/companies-legacy/new/cern.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-63",
    name: "CG Power",
    image: "/tnp-assets/companies-legacy/new/cgPower.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-64",
    name: "Coditas",
    image: "/tnp-assets/companies-legacy/new/coditas.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-65",
    name: "Cognizant",
    image: "/tnp-assets/companies-legacy/new/cognizant.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-66",
    name: "Cognologix",
    image: "/tnp-assets/companies-legacy/new/cognologix.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-67",
    name: "Connectius Technologies",
    image: "/tnp-assets/companies-legacy/new/connectiusTechnologies.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-68",
    name: "Consultadd",
    image: "/tnp-assets/companies-legacy/new/consultadd.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-69",
    name: "Crave",
    image: "/tnp-assets/companies-legacy/new/crave.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-70",
    name: "Css Corp",
    image: "/tnp-assets/companies-legacy/new/css-corp.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-71",
    name: "Dassault",
    image: "/tnp-assets/companies-legacy/new/dassault.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-72",
    name: "Deloitte",
    image: "/tnp-assets/companies-legacy/new/deloitte.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-73",
    name: "Demandfarm",
    image: "/tnp-assets/companies-legacy/new/demandfarm.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-74",
    name: "Dhiomics",
    image: "/tnp-assets/companies-legacy/new/dhiomics.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-75",
    name: "Ecu",
    image: "/tnp-assets/companies-legacy/new/ecu.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-76",
    name: "Elastik",
    image: "/tnp-assets/companies-legacy/new/elastik.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-77",
    name: "Emerson",
    image: "/tnp-assets/companies-legacy/new/emerson.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-78",
    name: "Emertxe",
    image: "/tnp-assets/companies-legacy/new/emertxe.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-79",
    name: "Endress+Hauser",
    image: "/tnp-assets/companies-legacy/new/endressHouser.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-80",
    name: "Epam",
    image: "/tnp-assets/companies-legacy/new/epam.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-81",
    name: "Eratronics",
    image: "/tnp-assets/companies-legacy/new/eratronics.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-82",
    name: "Euronet",
    image: "/tnp-assets/companies-legacy/new/euronet.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-83",
    name: "Expleo",
    image: "/tnp-assets/companies-legacy/new/expleo.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-84",
    name: "Faurecia",
    image: "/tnp-assets/companies-legacy/new/faurecia.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-85",
    name: "Findability Sciences",
    image: "/tnp-assets/companies-legacy/new/findability-sciences.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-86",
    name: "Fox",
    image: "/tnp-assets/companies-legacy/new/fox.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-87",
    name: "Get My Parking",
    image: "/tnp-assets/companies-legacy/new/get-my-parking.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-88",
    name: "Goldman Sachs",
    image: "/tnp-assets/companies-legacy/new/goldman-sachs.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-89",
    name: "Hexaware",
    image: "/tnp-assets/companies-legacy/new/hexaware.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-90",
    name: "Honeywell",
    image: "/tnp-assets/companies-legacy/new/honeywell.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-91",
    name: "Iauro",
    image: "/tnp-assets/companies-legacy/new/iauro.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-92",
    name: "Inexture",
    image: "/tnp-assets/companies-legacy/new/inexture.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-93",
    name: "Infinichains",
    image: "/tnp-assets/companies-legacy/new/infinichains.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-94",
    name: "Infosys",
    image: "/tnp-assets/companies-legacy/new/infosys.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-95",
    name: "Intellipaat",
    image: "/tnp-assets/companies-legacy/new/intellipaat.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-96",
    name: "Ipac",
    image: "/tnp-assets/companies-legacy/new/ipac.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-97",
    name: "Jailaxmi",
    image: "/tnp-assets/companies-legacy/new/jailaxmi.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-98",
    name: "Johnson Controls",
    image: "/tnp-assets/companies-legacy/new/johnson-controls.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-99",
    name: "Kennovation",
    image: "/tnp-assets/companies-legacy/new/kennovation.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-100",
    name: "Kifs Trade",
    image: "/tnp-assets/companies-legacy/new/kifs-trade.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-101",
    name: "Knorr Bremse",
    image: "/tnp-assets/companies-legacy/new/knorr-bremse.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-102",
    name: "Kratin",
    image: "/tnp-assets/companies-legacy/new/kratin.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-103",
    name: "Lennox India",
    image: "/tnp-assets/companies-legacy/new/lennox-india.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-104",
    name: "Lnt Technologies",
    image: "/tnp-assets/companies-legacy/new/lnt-technologies.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-105",
    name: "Lti",
    image: "/tnp-assets/companies-legacy/new/lti.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-106",
    name: "Mavenberg",
    image: "/tnp-assets/companies-legacy/new/mavenberg.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-107",
    name: "Metaroll",
    image: "/tnp-assets/companies-legacy/new/metaroll.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-108",
    name: "Metlok",
    image: "/tnp-assets/companies-legacy/new/metlok.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-109",
    name: "Microsoft",
    image: "/tnp-assets/companies-legacy/new/microsoft.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-110",
    name: "Mindbowser",
    image: "/tnp-assets/companies-legacy/new/mindbowser.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-111",
    name: "Mindstix",
    image: "/tnp-assets/companies-legacy/new/mindstix.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-112",
    name: "Mindtree",
    image: "/tnp-assets/companies-legacy/new/mindtree.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-113",
    name: "Monamit",
    image: "/tnp-assets/companies-legacy/new/monamit.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-114",
    name: "Mountblue",
    image: "/tnp-assets/companies-legacy/new/mountblue.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-115",
    name: "Muni Edutech",
    image: "/tnp-assets/companies-legacy/new/muni-edutech.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-116",
    name: "N-Circle",
    image: "/tnp-assets/companies-legacy/new/n-circle.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-117",
    name: "Neilsoft",
    image: "/tnp-assets/companies-legacy/new/neilsoft.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-118",
    name: "Neml",
    image: "/tnp-assets/companies-legacy/new/neml.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-119",
    name: "Netcracker",
    image: "/tnp-assets/companies-legacy/new/netcracker.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-120",
    name: "Nseit",
    image: "/tnp-assets/companies-legacy/new/nseit.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-121",
    name: "Parason",
    image: "/tnp-assets/companies-legacy/new/parason.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-122",
    name: "Persistent",
    image: "/tnp-assets/companies-legacy/new/persistent.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-123",
    name: "Plm Nordic",
    image: "/tnp-assets/companies-legacy/new/plm-nordic.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-124",
    name: "Praj",
    image: "/tnp-assets/companies-legacy/new/praj.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-125",
    name: "Quest Global",
    image: "/tnp-assets/companies-legacy/new/quest-global.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-126",
    name: "Raja",
    image: "/tnp-assets/companies-legacy/new/raja.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-127",
    name: "Reliance",
    image: "/tnp-assets/companies-legacy/new/reliance.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-128",
    name: "Renu",
    image: "/tnp-assets/companies-legacy/new/renu.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-129",
    name: "Researchwire",
    image: "/tnp-assets/companies-legacy/new/researchwire.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-130",
    name: "RSJ Inspection",
    image: "/tnp-assets/companies-legacy/new/rsj-inspection.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-131",
    name: "Sai Life Sciences",
    image: "/tnp-assets/companies-legacy/new/saiLife.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-132",
    name: "Sandid",
    image: "/tnp-assets/companies-legacy/new/sandid.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-133",
    name: "Sarvaha",
    image: "/tnp-assets/companies-legacy/new/sarvaha.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-134",
    name: "Selldotdo",
    image: "/tnp-assets/companies-legacy/new/selldotdo.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-135",
    name: "Siemens",
    image: "/tnp-assets/companies-legacy/new/siemens.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-136",
    name: "Sobha",
    image: "/tnp-assets/companies-legacy/new/sobha.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-137",
    name: "Square Yards",
    image: "/tnp-assets/companies-legacy/new/square-yards.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-138",
    name: "Steepgraph",
    image: "/tnp-assets/companies-legacy/new/steepgraph.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-139",
    name: "Tata Elxsi",
    image: "/tnp-assets/companies-legacy/new/tataelexi.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-140",
    name: "TCS",
    image: "/tnp-assets/companies-legacy/new/tcs.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-141",
    name: "Tech Mahindra",
    image: "/tnp-assets/companies-legacy/new/tech-mahindra.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-142",
    name: "Thermax",
    image: "/tnp-assets/companies-legacy/new/thermax.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-143",
    name: "Thyssenkrupp",
    image: "/tnp-assets/companies-legacy/new/thussenkrupp.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-144",
    name: "Tiaa",
    image: "/tnp-assets/companies-legacy/new/tiaa.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-145",
    name: "Tieto Evry",
    image: "/tnp-assets/companies-legacy/new/tieto-evry.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-146",
    name: "Trident Group",
    image: "/tnp-assets/companies-legacy/new/trident-group.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-147",
    name: "UltraTech Cement",
    image: "/tnp-assets/companies-legacy/new/ultratechCement.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-148",
    name: "Vardhaman",
    image: "/tnp-assets/companies-legacy/new/vardhaman.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-149",
    name: "Vodafone",
    image: "/tnp-assets/companies-legacy/new/vodafone.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-150",
    name: "Welspun",
    image: "/tnp-assets/companies-legacy/new/welspun.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-151",
    name: "Wipro",
    image: "/tnp-assets/companies-legacy/new/wipro.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-152",
    name: "Xcrino",
    image: "/tnp-assets/companies-legacy/new/xcrino.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-153",
    name: "Zensar",
    image: "/tnp-assets/companies-legacy/new/zensar.webp",
    website: "",
    source: "New",
    featured: false,
  },
  {
    id: "rec-154",
    name: "Zocdoc",
    image: "/tnp-assets/companies-legacy/new/zocdoc.webp",
    website: "",
    source: "New",
    featured: false,
  },
];
const uniqueRecruiters = Object.values(
  recruiters.reduce<Record<string, RecruiterLogo>>((acc, row) => {
    const key = row.name.trim().toLowerCase();
    const current = acc[key];
    if (!current) {
      acc[key] = { ...row };
      return acc;
    }
    if (
      (row.source || "").toLowerCase() === "new" &&
      (current.source || "").toLowerCase() !== "new"
    ) {
      acc[key] = {
        ...row,
        featured: Boolean(row.featured || current.featured),
      };
    } else if (row.featured) {
      current.featured = true;
    }
    return acc;
  }, {}),
);
const toIsoDate = (value: string) => {
  const match = value.match(/^(\d{1,2})\s+([A-Za-z]{3})/);
  if (!match) return new Date().toISOString().slice(0, 10);
  const month = new Date(`${match[2]} 1, 2026`).getMonth();
  return new Date(2026, month, Number(match[1])).toISOString().slice(0, 10);
};
const seedCalendar: CalendarEvent[] = events.map(([date, title, venue], i) => ({
  id: `calendar-${i + 1}`,
  date: toIsoDate(date),
  title,
  venue,
  category:
    title.toLowerCase().includes("drive") ||
    title.toLowerCase().includes("assessment")
      ? "Recruitment"
      : "T&P",
  status: "Published",
}));
const pageSeeds: Record<string, PageMeta> = {
  "/about": {
    kicker: "ABOUT T&P",
    title: "Training & Placement Cell",
    intro:
      "Connecting SGGSIE&T talent with industry through preparation, recruitment, internships and long-term partnerships.",
    image: "sggs_campus_2.jpg",
  },
  "/vision-mission": {
    kicker: "ABOUT / VISION & MISSION",
    title: "Vision, mission and institutional purpose.",
    intro: "The published direction of the Training & Placement Cell.",
    image: "tnp.jpeg",
  },
  "/placement-process": {
    kicker: "PLACEMENTS / PROCESS",
    title: "A transparent journey from recruiter requirement to offer.",
    intro:
      "The complete campus recruitment workflow, published documents and recruiter-ready forms.",
    image: "Gallary/step_3.webp",
  },
  "/placement-policy": {
    kicker: "PLACEMENTS / POLICY",
    title: "Placement policy and student participation framework.",
    intro:
      "Current policy information is controlled and published by the T&P administration.",
    image: "Gallary/statistics.jpg",
  },
  "/placements": {
    kicker: "PLACEMENTS",
    title: "Active placement drives and recruitment updates.",
    intro: "Current opportunities published by the Training & Placement Cell.",
    image: "Departments/CSE_img.jpg",
  },
  "/recruiters": {
    kicker: "RECRUITERS",
    title: "Recruit from SGGSIE&T.",
    intro:
      "Recruiter information, JAF submission and the documents required to plan a campus hiring engagement.",
    image: "tnp.jpeg",
  },
  "/recruiters/jaf": {
    kicker: "RECRUITERS / JAF",
    title: "Job Announcement Form & registration.",
    intro:
      "Use the published JAF and contact the T&P Cell to initiate a campus recruitment process.",
    image: "tnp.jpeg",
  },
  "/recruiters/documents": {
    kicker: "RECRUITERS / DOCUMENTS",
    title: "Recruiter document centre.",
    intro:
      "JAF, placement brochure, workflow, policies and recruiter-facing material in one controlled place.",
    image: "Gallary/statistics.jpg",
  },
  "/statistics": {
    kicker: "PLACEMENT STATISTICS",
    title: "Year-wise and department-wise placement intelligence.",
    intro:
      "All figures shown here are published from the Dean administration workspace.",
    image: "",
  },
  "/announcements": {
    kicker: "ANNOUNCEMENTS",
    title: "Official Training & Placement Cell notices.",
    intro:
      "Announcements published by the Dean administration appear here automatically.",
    image: "tnp.jpeg",
  },
  "/newsletter": {
    kicker: "NEWSLETTER",
    title: "T&P letters and newsletters.",
    intro:
      "Official letters, newsletters and periodic updates published by the Training & Placement Cell.",
    image: "tnp.jpeg",
  },
  "/contact": {
    kicker: "CONTACT",
    title: "Training & Placement Helpline.",
    intro:
      "Official placement-desk contact points for recruiters, students and institutional coordination.",
    image: "ContactUsIcon.png",
  },
  "/departments": {
    kicker: "CAMPUS / DEPARTMENTS",
    title: "Engineering disciplines and talent areas.",
    intro:
      "Explore the academic disciplines represented in the placement ecosystem.",
    image: "Departments/CSE_img.jpg",
  },
  "/labs": {
    kicker: "CAMPUS / LABORATORIES",
    title: "Engineering facilities and learning spaces.",
    intro:
      "Specialized laboratories and facilities supporting practical engineering education.",
    image: "Gallary/specialFacilities/centerOfExcellence.webp",
  },
  "/leadership": {
    kicker: "CAMPUS / LEADERSHIP",
    title: "Institute leadership and industry liaison.",
    intro: "Leadership information published by SGGSIE&T.",
    image: "Director.jpeg",
  },
};
const seed: PublicHomeContent = {
  stats: fallbackStats,
  trend: [
    {
      year: "2025-26",
      enrolled: 680,
      placed: 404,
      offers: 515,
      averagePackage: "₹5.5 LPA",
      highestPackage: "₹61 LPA",
      packageRange: "₹3.0 - ₹61 LPA",
      companies: 90,
      rate: 59.4,
    },
    {
      year: "2024-25",
      enrolled: 697,
      placed: 370,
      offers: 470,
      averagePackage: "₹5.12 LPA",
      highestPackage: "₹27 LPA",
      packageRange: "₹3.0 - ₹27 LPA",
      companies: 83,
      rate: 53.1,
    },
    {
      year: "2023-24",
      enrolled: 760,
      placed: 352,
      offers: 414,
      averagePackage: "₹5.65 LPA",
      highestPackage: "₹22 LPA",
      packageRange: "₹3.0 - ₹22 LPA",
      companies: 69,
      rate: 46.3,
    },
    {
      year: "2022-23",
      enrolled: 799,
      placed: 437,
      offers: 500,
      averagePackage: "₹5.5 LPA",
      highestPackage: "₹60 LPA",
      packageRange: "₹3.36 - ₹60 LPA",
      companies: 79,
      rate: 54.7,
    },
    {
      year: "2021-22",
      enrolled: 772,
      placed: 432,
      offers: 601,
      averagePackage: "₹4.7 LPA",
      highestPackage: "₹52 LPA",
      packageRange: "₹3.0 - ₹52 LPA",
      companies: 89,
      rate: 56.0,
    },
  ],
  departmentHistory,
  funnel: [
    { stage: "Registered", value: 680 },
    { stage: "Eligible", value: 630 },
    { stage: "Appeared", value: 630 },
    { stage: "Shortlisted", value: 525 },
    { stage: "Selected", value: 412 },
  ],
  bannerImage: "/tnp-banner-2026-27.png",
  heroSlides: studentPlacementHighlights.map((x, i) => ({
    id: `slide-${i + 1}`,
    image: x.image,
    title: x.title,
    subtitle: x.students,
    batch: x.batch,
  })),
  recruiters: [],
  drives: [],
  calendar: seedCalendar,
  announcements: seedAnnouncements.map((x, i) => ({
    id: `announcement-${i + 1}`,
    category: x[2],
    title: x[1],
    description: x[1],
    status: "Published",
    publishDate: x[0],
  })),
  documents: [
    {
      id: "doc-frs",
      title: "FRS – Recruiter Requirement Sheet",
      category: "FRS",
      description:
        "Temporary placeholder for the FRS. Replace this file with the official institute PDF before production publication.",
      href: "/documents/frs-placeholder.pdf",
      type: "PDF",
      audience: "Recruiters",
      status: "Published",
    },
    ...resources.map((x, i) => ({
      id: `document-${i + 1}`,
      title: x.title,
      category: x.type,
      description: x.desc,
      href: x.href,
      type: x.type,
      audience:
        x.title.includes("JAF") || x.title.includes("Recruiter")
          ? "Recruiters"
          : "Students",
      status: "Published" as const,
    })),
    {
      id: "document-brochure-2026-27",
      title: "Placement Brochure 2026–27",
      category: "BROCHURE",
      description: "Official placement brochure for the 2026–27 cycle.",
      href: "/documents/placement-brochure-2026-27.pdf",
      type: "PDF",
      audience: "Recruiters",
      status: "Published",
    },
    {
      id: "document-flyer-2026-27",
      title: "T&P Flyer 2026–27",
      category: "FLYER",
      description: "Recruiter-facing Training & Placement Cell flyer.",
      href: "/documents/tnp-flyer-2026-27.pdf",
      type: "PDF",
      audience: "Recruiters",
      status: "Published",
    },
    {
      id: "document-induction-2026-27",
      title: "T&P Induction Program 2026–27",
      category: "PRESENTATION",
      description: "Training & placement induction material.",
      href: "/documents/tnp-induction-2026-27.pptx",
      type: "PPTX",
      audience: "Students",
      status: "Published",
    },
  ],
  newsletter: [],
  gallery: [],
  pages: pageSeeds,
  placementProcess: [
    {
      step: "01",
      title: "Recruiter registration",
      description:
        "Company profile and hiring intent are shared with the T&P Cell.",
    },
    {
      step: "02",
      title: "JAF submission",
      description:
        "Role, eligibility, compensation, location and selection details are submitted.",
    },
    {
      step: "03",
      title: "T&P verification",
      description:
        "The T&P Cell reviews the recruiter requirement and confirms the campus process.",
    },
    {
      step: "04",
      title: "Eligibility & applications",
      description:
        "Eligible student data and application instructions are published for the relevant drive.",
    },
    {
      step: "05",
      title: "PPT, assessment & interviews",
      description:
        "Presentation, tests, technical rounds and HR interviews are coordinated.",
    },
    {
      step: "06",
      title: "Selection & offer closure",
      description:
        "Selection results, offers and joining coordination are recorded in the placement system.",
    },
  ],
  policyRules: [
    {
      title: "Eligibility",
      body: "Students may participate only when the published eligibility conditions for a drive are satisfied.",
    },
    {
      title: "Application",
      body: "Applications must be completed through the designated process before the stated deadline.",
    },
    {
      title: "Recruitment stages",
      body: "PPTs, assessments, interviews and other stages follow the schedule published for the relevant drive.",
    },
    {
      title: "Offer handling",
      body: "Offer acceptance, withdrawal and joining documentation follow the current institute placement policy.",
    },
    {
      title: "Conduct",
      body: "Students are expected to follow T&P instructions and provide accurate information and documents.",
    },
  ],
  contacts: [
    {
      id: "tpo",
      role: "T&P Executive",
      name: "Prof. (Dr.) S. B. Mundhe",
      designation: "Training & Placement Officer (TPO)",
      description:
        "Overall placement operations, corporate relations, & strategic tie-ups.",
      office: "02462-269261",
      phone: "+91 94228 72156",
      email: "tpo@sggs.ac.in",
    },
    {
      id: "coordinator",
      role: "T&P Executive",
      name: "Mr. S. D. Garkhedkar",
      designation: "T&P Office Assistant & Co-coordinator",
      description:
        "Student database coordination, scheduling of campus drives, and office administration.",
      office: "02462-269261",
      phone: "+91 86052 50825",
      email: "tnpcell@sggs.ac.in",
    },
    {
      id: "student-1",
      role: "Student Representative Committee",
      name: "Student Coordinator",
      designation: "Student Representative",
      description:
        "Student representative contact published by T&P administration.",
    },
    {
      id: "student-2",
      role: "Student Representative Committee",
      name: "Student Coordinator",
      designation: "Student Representative",
      description:
        "Student representative contact published by T&P administration.",
    },
    {
      id: "student-3",
      role: "Student Representative Committee",
      name: "Student Coordinator",
      designation: "Student Representative",
      description:
        "Student representative contact published by T&P administration.",
    },
  ],
  recruiterBenefits: [
    {
      title: "JAF-led hiring workflow",
      value: "Structured",
      description:
        "A defined path from recruiter requirement to drive closure.",
    },
    {
      title: "Engineering talent pool",
      value: "11+ disciplines",
      description:
        "Access students across computing, electronics, electrical, mechanical, production, civil and allied disciplines.",
    },
    {
      title: "Campus coordination",
      value: "End-to-end",
      description:
        "T&P support for PPTs, assessments, interviews, venues and communication.",
    },
    {
      title: "Industry engagement",
      value: "Beyond hiring",
      description:
        "Internships, projects, talks, visits and longer-term institutional collaboration.",
    },
  ],
  campusDepartments: clone<CampusDepartment[]>([...seedCampusDepartments]),
  campusLabs: clone<CampusLab[]>([...seedCampusLabs]),
  settings: {
    instituteName:
      "Shri Guru Gobind Singhji Institute of Engineering & Technology",
    shortName: "SGGSIE&T",
    address:
      "Training & Placement Cell, Ground Floor, Administrative Block, Vishnupuri, Nanded, Maharashtra – 431606, India",
    phone: "02462-269261",
    email: "tnpcell@sggs.ac.in",
    tnpEmail: "tpo@sggs.ac.in",
    logo: "/assets/branding/sggs-logo.jpeg",
    tnpLogo: "/assets/branding/tnp-logo.jpeg",
    footerText: "Training & Placement Cell · SGGSIE&T, Nanded",
    heroVideo: "/hero-campus.mp4",
    heroPoster: "/hero-poster.png",
  },
  updatedAt: new Date().toISOString(),
};
function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}
let publicCache: PublicHomeContent = clone(seed);
function normalizePublicHomeContent(
  value: Partial<PublicHomeContent>,
): PublicHomeContent {
  const base = clone(seed);
  return {
    ...base,
    ...value,
    stats: { ...base.stats, ...(value?.stats || {}) },
    trend: Array.isArray(value?.trend) ? value.trend : base.trend,
    departmentHistory:
      value?.departmentHistory && typeof value.departmentHistory === "object"
        ? value.departmentHistory
        : base.departmentHistory,
    funnel: Array.isArray(value?.funnel) ? value.funnel : base.funnel,
    heroSlides: Array.isArray(value?.heroSlides)
      ? value.heroSlides
      : base.heroSlides,
    recruiters: Array.isArray(value?.recruiters)
      ? value.recruiters
      : base.recruiters,
    drives: Array.isArray(value?.drives) ? value.drives : base.drives,
    calendar: Array.isArray(value?.calendar) ? value.calendar : base.calendar,
    announcements: Array.isArray(value?.announcements)
      ? value.announcements
      : base.announcements,
    documents: Array.isArray(value?.documents)
      ? value.documents
      : base.documents,
    newsletter: Array.isArray(value?.newsletter)
      ? value.newsletter
      : base.newsletter,
    gallery: Array.isArray(value?.gallery) ? value.gallery : base.gallery,
    campusDepartments: Array.isArray(value?.campusDepartments)
      ? value.campusDepartments
      : base.campusDepartments,
    campusLabs: Array.isArray(value?.campusLabs)
      ? value.campusLabs
      : base.campusLabs,
    pages:
      value?.pages && typeof value.pages === "object"
        ? value.pages
        : base.pages,
    placementProcess: Array.isArray(value?.placementProcess)
      ? value.placementProcess
      : base.placementProcess,
    policyRules: Array.isArray(value?.policyRules)
      ? value.policyRules
      : base.policyRules,
    contacts: Array.isArray(value?.contacts) ? value.contacts : base.contacts,
    recruiterBenefits: Array.isArray(value?.recruiterBenefits)
      ? value.recruiterBenefits
      : base.recruiterBenefits,
    settings: { ...base.settings, ...(value?.settings || {}) },
    updatedAt: value?.updatedAt || base.updatedAt,
  };
}

export function getPublicHomeContent(): PublicHomeContent {
  return normalizePublicHomeContent(publicCache);
}
export function setCachedPublicHomeContent(next: PublicHomeContent) {
  publicCache = normalizePublicHomeContent(next);
  if (typeof window !== "undefined")
    window.dispatchEvent(new CustomEvent("sggs-public-content-change"));
  return clone(publicCache);
}
export function savePublicHomeContent(
  next: Partial<PublicHomeContent>,
): PublicHomeContent {
  return setCachedPublicHomeContent({
    ...publicCache,
    ...next,
    updatedAt: new Date().toISOString(),
  });
}
export function subscribeToPublicContent(listener: () => void) {
  if (typeof window === "undefined") return () => {};
  const onChange = () => listener();
  window.addEventListener("sggs-public-content-change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("sggs-public-content-change", onChange);
    window.removeEventListener("storage", onChange);
  };
}
