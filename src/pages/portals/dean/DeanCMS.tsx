import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  FileText,
  ImagePlus,
  Save,
  UploadCloud,
  Plus,
  Trash2,
  RefreshCcw,
  ShieldCheck,
  GraduationCap,
  FlaskConical,
} from "lucide-react";
import PortalShell from "../../../components/portal/PortalShell";
import {
  getPublicHomeContent,
  setCachedPublicHomeContent,
  subscribeToPublicContent,
  type PublicHomeContent,
  type DocumentItem,
  type RecruiterLogo,
  type TrendPoint,
  type DepartmentStat,
  type CampusDepartment,
  type CampusLab,
  type HeroSlide,
} from "../../../services/siteContent";
import { api } from "../../../services/api";
import {
  uploadToCloudinary,
  cloudinaryConfigured,
} from "../../../services/cloudinary";
import { img } from "../../../data";

type Tab =
  | "home"
  | "statistics"
  | "campus"
  | "recruiters"
  | "drives"
  | "documents"
  | "pages"
  | "process"
  | "contacts"
  | "news"
  | "newsletter"
  | "calendar"
  | "placementPhotos"
  | "media";
const tabs: [Tab, string][] = [
  ["home", "Home banner & KPIs"],
  ["statistics", "Statistics"],
  ["campus", "Campus directory"],
  ["recruiters", "Recruiters"],
  ["drives", "Placement drives"],
  ["documents", "Documents"],
  ["pages", "Page content"],
  ["process", "Placement process"],
  ["contacts", "T&P contacts"],
  ["news", "Announcements"],
  ["newsletter", "Newsletter"],
  ["calendar", "Calendar"],
  ["placementPhotos", "Placement Photos"],
  ["media", "Media"],
];

export default function DeanCMS({
  initialTab = "home",
  title = "Content Management",
}: {
  initialTab?: Tab;
  title?: string;
}) {
  const [content, setContent] = useState<PublicHomeContent>(() =>
    getPublicHomeContent(),
  );
  const [tab, setTab] = useState<Tab>(initialTab);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    let active = true;
    api.adminContent
      .get()
      .then((next: PublicHomeContent) => {
        if (active) {
          setCachedPublicHomeContent(next);
          setContent(next);
        }
      })
      .catch(() => {});
    return subscribeToPublicContent(() => setContent(getPublicHomeContent()));
  }, []);
  const publish = async (patch: Partial<PublicHomeContent>) => {
    setSaving(true);
    setMessage("");
    try {
      const next = await api.publicContent.update(patch);
      setCachedPublicHomeContent(next);
      setContent(next);
      setMessage("Published successfully. Public website updated.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Unable to publish");
    } finally {
      setSaving(false);
    }
  };
  const upload = async (
    file: File,
    cb: (url: string) => void,
    folder: string,
  ) => {
    setUploading(true);
    try {
      const result = await uploadToCloudinary(file, folder);
      cb(result.secure_url);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };
  return (
    <PortalShell role="dean" title={title}>
      <section className="module dean-cms">
        <div className="module-head">
          <div>
            <span className="eyebrow">DEAN / MASTER CMS</span>
            <h2>Single source of truth</h2>
            <p>
              Publish the banner, statistics, recruiter logos, documents and
              public page content without editing React code.
            </p>
          </div>
          <div className="cms-status">
            <span
              className={
                cloudinaryConfigured
                  ? "status-pill status-verified"
                  : "status-pill status-pending"
              }
            >
              {cloudinaryConfigured
                ? "SERVER-SIGNED CLOUDINARY"
                : "CLOUDINARY NEEDS CONFIG"}
            </span>
            <small>
              {saving
                ? "Saving…"
                : message ||
                  `Last update ${new Date(content.updatedAt).toLocaleString("en-IN")}`}
            </small>
          </div>
        </div>
        <div className="cms-tabbar">
          {tabs.map(([id, label]) => (
            <button
              key={id}
              className={tab === id ? "active" : ""}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>
        {tab === "home" && (
          <HomeEditor
            content={content}
            publish={publish}
            upload={upload}
            uploading={uploading}
          />
        )}{" "}
        {tab === "statistics" && (
          <StatisticsEditor content={content} publish={publish} />
        )}{" "}
        {tab === "campus" && (
          <CampusEditor
            content={content}
            publish={publish}
            upload={upload}
            uploading={uploading}
          />
        )}{" "}
        {tab === "recruiters" && (
          <RecruitersEditor
            content={content}
            publish={publish}
            upload={upload}
            uploading={uploading}
          />
        )}{" "}
        {tab === "drives" && (
          <DrivesEditor content={content} publish={publish} />
        )}{" "}
        {tab === "documents" && (
          <DocumentsEditor
            content={content}
            publish={publish}
            upload={upload}
            uploading={uploading}
          />
        )}{" "}
        {tab === "pages" && <PagesEditor content={content} publish={publish} />}{" "}
        {tab === "process" && (
          <ProcessEditor content={content} publish={publish} />
        )}{" "}
        {tab === "contacts" && (
          <ContactsEditor content={content} publish={publish} />
        )}{" "}
        {tab === "news" && (
          <AnnouncementsEditor content={content} publish={publish} />
        )}{" "}
        {tab === "newsletter" && (
          <NewsletterEditor content={content} publish={publish} />
        )}{" "}
        {tab === "calendar" && (
          <CalendarEditor content={content} publish={publish} />
        )}{" "}
        {tab === "placementPhotos" && (
          <PlacementPhotosEditor
            content={content}
            publish={publish}
            upload={upload}
            uploading={uploading}
          />
        )}{" "}
        {tab === "media" && (
          <MediaEditor
            content={content}
            publish={publish}
            upload={upload}
            uploading={uploading}
          />
        )}
      </section>
    </PortalShell>
  );
}
function EditorCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="cms-editor-card">
      <div className="cms-editor-card-head">
        <div>
          <span className="eyebrow">DEAN EDITOR</span>
          <h3>{title}</h3>
        </div>
        <div className="cms-card-actions">{action}</div>
      </div>
      {children}
    </div>
  );
}
const json = (v: any) => JSON.stringify(v, null, 2);
function HomeEditor({
  content,
  publish,
  upload,
  uploading,
}: {
  content: PublicHomeContent;
  publish: (p: Partial<PublicHomeContent>) => void;
  upload: (f: File, cb: (u: string) => void, folder: string) => void;
  uploading: boolean;
}) {
  const [banner, setBanner] = useState(content.bannerImage);
  const [stats, setStats] = useState(content.stats);
  useEffect(() => {
    setBanner(content.bannerImage);
    setStats(content.stats);
  }, [content.bannerImage, content.stats]);
  return (
    <div className="cms-stack">
      <EditorCard
        title="Dynamic homepage banner"
        action={
          <button
            className="btn-primary"
            onClick={() => publish({ bannerImage: banner })}
          >
            <Save size={15} /> Publish banner
          </button>
        }
      >
        <div className="cms-banner-editor">
          <div className="cms-banner-preview">
            {banner ? (
              <img src={banner} alt="Current placement banner" />
            ) : (
              <span>No banner published</span>
            )}
          </div>
          <input
            value={banner}
            onChange={(e) => setBanner(e.target.value)}
            placeholder="Image URL"
          />
          <label className="upload-control">
            <UploadCloud size={14} />{" "}
            {uploading ? "Uploading…" : "Upload banner image"}
            <input
              type="file"
              accept="image/*"
              hidden
              disabled={uploading}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) upload(f, (u) => setBanner(u), "sggs-tnp/banner");
              }}
            />
          </label>
        </div>
      </EditorCard>
      <EditorCard
        title="Homepage placement KPIs"
        action={
          <button className="btn-primary" onClick={() => publish({ stats })}>
            <Save size={15} /> Publish KPIs
          </button>
        }
      >
        <div className="cms-form-grid">
          {Object.entries(stats).map(([key, value]) => (
            <label key={key}>
              {key}
              <input
                value={String(value)}
                onChange={(e) =>
                  setStats({
                    ...stats,
                    [key]: [
                      "students",
                      "enrolled",
                      "placed",
                      "offers",
                      "recruiters",
                      "drives",
                      "placementRate",
                    ].includes(key)
                      ? Number(e.target.value)
                      : e.target.value,
                  } as typeof stats)
                }
              />
            </label>
          ))}
        </div>
      </EditorCard>
    </div>
  );
}
function StatisticsEditor({
  content,
  publish,
}: {
  content: PublicHomeContent;
  publish: (p: Partial<PublicHomeContent>) => void;
}) {
  const [trend, setTrend] = useState<TrendPoint[]>(content.trend);
  const [history, setHistory] = useState(content.departmentHistory);
  const years = useMemo(() => Object.keys(history), [history]);
  const [year, setYear] = useState(years[0] || "2025-26");
  useEffect(() => {
    setTrend(content.trend);
    setHistory(content.departmentHistory);
  }, [content.trend, content.departmentHistory]);
  const rows = history[year] || [];
  const updateRow = (i: number, key: keyof DepartmentStat, value: string) =>
    setHistory({
      ...history,
      [year]: rows.map((r, j) =>
        j === i
          ? {
              ...r,
              [key]:
                key === "placed" || key === "enrolled" || key === "rate"
                  ? Number(value)
                  : value,
            }
          : r,
      ),
    });
  return (
    <div className="cms-stack">
      <EditorCard
        title="Year-wise placement summary"
        action={
          <button className="btn-primary" onClick={() => publish({ trend })}>
            <Save size={15} /> Publish trend
          </button>
        }
      >
        <div className="cms-list">
          {trend.map((r, i) => (
            <div className="cms-stat-row" key={r.year}>
              <input
                value={r.year}
                onChange={(e) =>
                  setTrend(
                    trend.map((x, j) =>
                      j === i ? { ...x, year: e.target.value } : x,
                    ),
                  )
                }
              />
              <input
                value={r.enrolled}
                onChange={(e) =>
                  setTrend(
                    trend.map((x, j) =>
                      j === i ? { ...x, enrolled: Number(e.target.value) } : x,
                    ),
                  )
                }
                placeholder="Enrolled"
              />
              <input
                value={r.placed}
                onChange={(e) =>
                  setTrend(
                    trend.map((x, j) =>
                      j === i ? { ...x, placed: Number(e.target.value) } : x,
                    ),
                  )
                }
                placeholder="Placed"
              />
              <input
                value={r.offers}
                onChange={(e) =>
                  setTrend(
                    trend.map((x, j) =>
                      j === i ? { ...x, offers: Number(e.target.value) } : x,
                    ),
                  )
                }
                placeholder="Offers"
              />
              <input
                value={r.averagePackage}
                onChange={(e) =>
                  setTrend(
                    trend.map((x, j) =>
                      j === i ? { ...x, averagePackage: e.target.value } : x,
                    ),
                  )
                }
              />
              <input
                value={r.highestPackage}
                onChange={(e) =>
                  setTrend(
                    trend.map((x, j) =>
                      j === i ? { ...x, highestPackage: e.target.value } : x,
                    ),
                  )
                }
              />
              <input
                value={r.companies}
                onChange={(e) =>
                  setTrend(
                    trend.map((x, j) =>
                      j === i ? { ...x, companies: Number(e.target.value) } : x,
                    ),
                  )
                }
                placeholder="Companies"
              />
            </div>
          ))}
        </div>
      </EditorCard>
      <EditorCard
        title="Department-wise placement summary"
        action={
          <button
            className="btn-primary"
            onClick={() => publish({ departmentHistory: history })}
          >
            <Save size={15} /> Publish departments
          </button>
        }
      >
        <div className="statistics-toolbar">
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
          <span className="eyebrow">Edit published branch data</span>
        </div>
        <div className="cms-list">
          {rows.map((r, i) => (
            <div className="cms-dept-row" key={`${year}-${r.name}`}>
              <input
                value={r.name}
                onChange={(e) => updateRow(i, "name", e.target.value)}
              />
              <input
                type="number"
                value={r.enrolled}
                onChange={(e) => updateRow(i, "enrolled", e.target.value)}
              />
              <input
                type="number"
                value={r.placed}
                onChange={(e) => updateRow(i, "placed", e.target.value)}
              />
              <input
                type="number"
                value={r.rate}
                onChange={(e) => updateRow(i, "rate", e.target.value)}
              />
              <input
                value={r.highest}
                onChange={(e) => updateRow(i, "highest", e.target.value)}
              />
            </div>
          ))}
        </div>
      </EditorCard>
    </div>
  );
}
function CampusEditor({
  content,
  publish,
  upload,
  uploading,
}: {
  content: PublicHomeContent;
  publish: (p: Partial<PublicHomeContent>) => void;
  upload: (f: File, cb: (u: string) => void, folder: string) => void;
  uploading: boolean;
}) {
  const [departments, setDepartments] = useState<CampusDepartment[]>(
    Array.isArray(content.campusDepartments) ? content.campusDepartments : [],
  );
  const [labs, setLabs] = useState<CampusLab[]>(
    Array.isArray(content.campusLabs) ? content.campusLabs : [],
  );
  useEffect(() => {
    setDepartments(
      Array.isArray(content.campusDepartments) ? content.campusDepartments : [],
    );
    setLabs(Array.isArray(content.campusLabs) ? content.campusLabs : []);
  }, [content.campusDepartments, content.campusLabs]);
  const updateDepartment = (index: number, patch: Partial<CampusDepartment>) =>
    setDepartments((rows) =>
      rows.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  const updateLab = (index: number, patch: Partial<CampusLab>) =>
    setLabs((rows) =>
      rows.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  const addDepartment = () =>
    setDepartments((rows) => [
      {
        code: `DEPT-${rows.length + 1}`,
        short: "New",
        name: "New Department",
        image: "",
        established: "",
        hod: "",
        summary: "",
        highlights: [],
      },
      ...rows,
    ]);
  const addLab = () =>
    setLabs((rows) => [
      {
        name: "New Laboratory",
        dept: "Institute",
        image: "",
        description: "",
        facts: "",
      },
      ...rows,
    ]);
  return (
    <div className="cms-stack">
      <EditorCard
        title="Campus departments"
        action={
          <>
            <button className="btn-secondary" onClick={addDepartment}>
              <Plus size={14} /> Add department
            </button>
            <button
              className="btn-primary"
              onClick={() => publish({ campusDepartments: departments })}
            >
              <Save size={15} /> Publish departments
            </button>
          </>
        }
      >
        <p className="section-subtitle">
          These published records power the public department directory and each
          department detail page.
        </p>
        <div className="cms-campus-list">
          {departments.map((d, i) => (
            <article className="cms-campus-card" key={`${d.code}-${i}`}>
              <div className="cms-campus-preview">
                {d.image ? (
                  <img
                    src={
                      d.image.startsWith("http") || d.image.startsWith("/")
                        ? d.image
                        : img(d.image)
                    }
                    alt={d.name}
                  />
                ) : (
                  <GraduationCap size={24} />
                )}
              </div>
              <div className="cms-campus-fields">
                <input
                  value={d.code}
                  onChange={(e) =>
                    updateDepartment(i, { code: e.target.value })
                  }
                  placeholder="Code"
                />
                <input
                  value={d.name}
                  onChange={(e) =>
                    updateDepartment(i, { name: e.target.value })
                  }
                  placeholder="Department name"
                />
                <input
                  value={d.established}
                  onChange={(e) =>
                    updateDepartment(i, { established: e.target.value })
                  }
                  placeholder="Established"
                />
                <input
                  value={d.hod}
                  onChange={(e) => updateDepartment(i, { hod: e.target.value })}
                  placeholder="HOD"
                />
                <input
                  className="full"
                  value={d.image}
                  onChange={(e) =>
                    updateDepartment(i, { image: e.target.value })
                  }
                  placeholder="Image URL"
                />
                <textarea
                  className="full"
                  value={d.summary}
                  onChange={(e) =>
                    updateDepartment(i, { summary: e.target.value })
                  }
                  placeholder="Summary"
                />
                <textarea
                  className="full"
                  value={d.highlights.join("\n")}
                  onChange={(e) =>
                    updateDepartment(i, {
                      highlights: e.target.value
                        .split("\n")
                        .map((x) => x.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="One focus area per line"
                />
                <label className="upload-control">
                  <UploadCloud size={14} />{" "}
                  {uploading ? "Uploading…" : "Upload department image"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    disabled={uploading}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f)
                        upload(
                          f,
                          (u) => updateDepartment(i, { image: u }),
                          "sggs-tnp/departments",
                        );
                    }}
                  />
                </label>
              </div>
              <button
                className="icon-danger"
                onClick={() =>
                  setDepartments((rows) => rows.filter((_, j) => j !== i))
                }
              >
                <Trash2 size={15} />
              </button>
            </article>
          ))}
        </div>
      </EditorCard>
      <EditorCard
        title="Laboratories & facilities"
        action={
          <>
            <button className="btn-secondary" onClick={addLab}>
              <Plus size={14} /> Add laboratory
            </button>
            <button
              className="btn-primary"
              onClick={() => publish({ campusLabs: labs })}
            >
              <Save size={15} /> Publish laboratories
            </button>
          </>
        }
      >
        <p className="section-subtitle">
          These published records power the public laboratory directory and
          individual facility pages.
        </p>
        <div className="cms-campus-list">
          {labs.map((lab, i) => (
            <article className="cms-campus-card" key={`${lab.name}-${i}`}>
              <div className="cms-campus-preview">
                {lab.image ? (
                  <img
                    src={
                      lab.image.startsWith("http") || lab.image.startsWith("/")
                        ? lab.image
                        : img(lab.image)
                    }
                    alt={lab.name}
                  />
                ) : (
                  <FlaskConical size={24} />
                )}
              </div>
              <div className="cms-campus-fields">
                <input
                  value={lab.name}
                  onChange={(e) => updateLab(i, { name: e.target.value })}
                  placeholder="Laboratory name"
                />
                <input
                  value={lab.dept}
                  onChange={(e) => updateLab(i, { dept: e.target.value })}
                  placeholder="Department"
                />
                <input
                  className="full"
                  value={lab.image}
                  onChange={(e) => updateLab(i, { image: e.target.value })}
                  placeholder="Image URL"
                />
                <textarea
                  className="full"
                  value={lab.description}
                  onChange={(e) =>
                    updateLab(i, { description: e.target.value })
                  }
                  placeholder="Description"
                />
                <input
                  className="full"
                  value={lab.facts}
                  onChange={(e) => updateLab(i, { facts: e.target.value })}
                  placeholder="Equipment / software / facts"
                />
                <label className="upload-control">
                  <UploadCloud size={14} />{" "}
                  {uploading ? "Uploading…" : "Upload laboratory image"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    disabled={uploading}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f)
                        upload(
                          f,
                          (u) => updateLab(i, { image: u }),
                          "sggs-tnp/labs",
                        );
                    }}
                  />
                </label>
              </div>
              <button
                className="icon-danger"
                onClick={() =>
                  setLabs((rows) => rows.filter((_, j) => j !== i))
                }
              >
                <Trash2 size={15} />
              </button>
            </article>
          ))}
        </div>
      </EditorCard>
    </div>
  );
}
function RecruitersEditor({
  content,
  publish,
  upload,
  uploading,
}: {
  content: PublicHomeContent;
  publish: (p: Partial<PublicHomeContent>) => void;
  upload: (f: File, cb: (u: string) => void, folder: string) => void;
  uploading: boolean;
}) {
  const [rows, setRows] = useState<RecruiterLogo[]>(content.recruiters);
  useEffect(() => setRows(content.recruiters), [content.recruiters]);
  const add = () =>
    setRows([
      {
        id: `rec-${Date.now()}`,
        name: "New recruiter",
        image: "",
        website: "",
        source: "New",
        featured: false,
      },
      ...rows,
    ]);
  return (
    <EditorCard
      title="Old + new recruiter network"
      action={
        <>
          <button className="btn-secondary" onClick={add}>
            <Plus size={14} /> Add company
          </button>
          <button
            className="btn-primary"
            onClick={() => publish({ recruiters: rows })}
          >
            <Save size={15} /> Publish recruiter network
          </button>
        </>
      }
    >
      <p className="section-subtitle">
        The imported legacy and new company assets are stored in one recruiter
        database. Update the company name and logo here; no React code changes
        are required.
      </p>
      <div className="cms-recruiter-admin-grid">
        {rows.map((r, i) => (
          <article key={r.id} className="cms-recruiter-admin-card">
            <div className="cms-recruiter-preview">
              {r.image ? (
                <img src={r.image} alt={r.name} />
              ) : (
                <span>{r.name.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <input
              value={r.name}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, name: e.target.value } : x,
                  ),
                )
              }
            />
            <select
              value={r.source || "New"}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, source: e.target.value } : x,
                  ),
                )
              }
            >
              <option>New</option>
              <option>Legacy</option>
            </select>
            <input
              value={r.website || ""}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, website: e.target.value } : x,
                  ),
                )
              }
              placeholder="Company website"
            />
            <label className="upload-control">
              <UploadCloud size={14} />{" "}
              {uploading ? "Uploading…" : "Replace logo"}
              <input
                type="file"
                accept="image/*"
                hidden
                disabled={uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f)
                    upload(
                      f,
                      (u) =>
                        setRows(
                          rows.map((x, j) =>
                            j === i ? { ...x, image: u } : x,
                          ),
                        ),
                      "sggs-tnp/recruiters",
                    );
                }}
              />
            </label>
            <button
              className="icon-danger"
              onClick={() => setRows(rows.filter((_, j) => j !== i))}
            >
              <Trash2 size={15} />
            </button>
          </article>
        ))}
      </div>
    </EditorCard>
  );
}
function DrivesEditor({
  content,
  publish,
}: {
  content: PublicHomeContent;
  publish: (p: Partial<PublicHomeContent>) => void;
}) {
  const [rows, setRows] = useState(content.drives);
  useEffect(() => setRows(content.drives), [content.drives]);
  const add = () =>
    setRows([
      {
        id: Date.now(),
        company: "New recruiter",
        role: "New role",
        department: "All eligible branches",
        package: "",
        deadline: "",
        status: "Draft",
        type: "Placement",
      },
      ...rows,
    ]);
  return (
    <EditorCard
      title="Active placement drives"
      action={
        <>
          <button className="btn-secondary" onClick={add}>
            <Plus size={14} /> Add drive
          </button>
          <button
            className="btn-primary"
            onClick={() => publish({ drives: rows })}
          >
            <Save size={15} /> Publish drives
          </button>
        </>
      }
    >
      <div className="cms-list">
        {rows.map((r, i) => (
          <div className="cms-drive-row" key={String(r.id)}>
            <input
              value={r.company}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, company: e.target.value } : x,
                  ),
                )
              }
              placeholder="Company"
            />
            <input
              value={r.role}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, role: e.target.value } : x,
                  ),
                )
              }
              placeholder="Role"
            />
            <input
              value={r.department || ""}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, department: e.target.value } : x,
                  ),
                )
              }
              placeholder="Eligible branches"
            />
            <input
              value={r.package || ""}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, package: e.target.value } : x,
                  ),
                )
              }
              placeholder="Package"
            />
            <input
              value={r.deadline || ""}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, deadline: e.target.value } : x,
                  ),
                )
              }
              placeholder="Deadline"
            />
            <select
              value={r.status}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, status: e.target.value } : x,
                  ),
                )
              }
            >
              <option>Open</option>
              <option>Closing soon</option>
              <option>Upcoming</option>
              <option>Draft</option>
              <option>Closed</option>
            </select>
            <button
              className="icon-danger"
              onClick={() => setRows(rows.filter((_, j) => j !== i))}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </EditorCard>
  );
}
function DocumentsEditor({
  content,
  publish,
  upload,
  uploading,
}: {
  content: PublicHomeContent;
  publish: (p: Partial<PublicHomeContent>) => void;
  upload: (f: File, cb: (u: string) => void, folder: string) => void;
  uploading: boolean;
}) {
  const [rows, setRows] = useState<DocumentItem[]>(content.documents);
  useEffect(() => setRows(content.documents), [content.documents]);
  const add = () =>
    setRows([
      {
        id: `doc-${Date.now()}`,
        title: "New document",
        category: "PDF",
        description: "",
        href: "",
        type: "PDF",
        audience: "Recruiters",
        status: "Draft",
      },
      ...rows,
    ]);
  return (
    <EditorCard
      title="PDF / forms / recruiter documents"
      action={
        <>
          <button className="btn-secondary" onClick={add}>
            <Plus size={14} /> Add document
          </button>
          <button
            className="btn-primary"
            onClick={() => publish({ documents: rows })}
          >
            <Save size={15} /> Publish documents
          </button>
        </>
      }
    >
      <div className="cms-doc-list">
        {rows.map((r, i) => (
          <article key={r.id}>
            <FileText size={20} />
            <div className="cms-doc-fields">
              <input
                value={r.title}
                onChange={(e) =>
                  setRows(
                    rows.map((x, j) =>
                      j === i ? { ...x, title: e.target.value } : x,
                    ),
                  )
                }
                placeholder="Document title"
              />
              <div className="cms-inline-fields">
                <input
                  value={r.category}
                  onChange={(e) =>
                    setRows(
                      rows.map((x, j) =>
                        j === i ? { ...x, category: e.target.value } : x,
                      ),
                    )
                  }
                />
                <select
                  value={r.audience || "Recruiters"}
                  onChange={(e) =>
                    setRows(
                      rows.map((x, j) =>
                        j === i ? { ...x, audience: e.target.value } : x,
                      ),
                    )
                  }
                >
                  <option>Recruiters</option>
                  <option>Students</option>
                  <option>Public</option>
                </select>
                <select
                  value={r.status || "Published"}
                  onChange={(e) =>
                    setRows(
                      rows.map((x, j) =>
                        j === i
                          ? {
                              ...x,
                              status: e.target.value as "Published" | "Draft",
                            }
                          : x,
                      ),
                    )
                  }
                >
                  <option>Published</option>
                  <option>Draft</option>
                </select>
              </div>
              <textarea
                value={r.description}
                onChange={(e) =>
                  setRows(
                    rows.map((x, j) =>
                      j === i ? { ...x, description: e.target.value } : x,
                    ),
                  )
                }
                placeholder="Description"
              />
              <input
                value={r.href}
                onChange={(e) =>
                  setRows(
                    rows.map((x, j) =>
                      j === i ? { ...x, href: e.target.value } : x,
                    ),
                  )
                }
                placeholder="PDF / document URL"
              />
              <label className="upload-control">
                <UploadCloud size={14} />{" "}
                {uploading ? "Uploading…" : "Upload PDF"}
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  hidden
                  disabled={uploading}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f)
                      upload(
                        f,
                        (u) =>
                          setRows(
                            rows.map((x, j) =>
                              j === i
                                ? {
                                    ...x,
                                    href: u,
                                    type: f.name.toLowerCase().endsWith(".pptx")
                                      ? "PPTX"
                                      : "PDF",
                                  }
                                : x,
                            ),
                          ),
                        "sggs-tnp/documents",
                      );
                  }}
                />
              </label>
            </div>
            <button
              className="icon-danger"
              onClick={() => setRows(rows.filter((_, j) => j !== i))}
            >
              <Trash2 size={15} />
            </button>
          </article>
        ))}
      </div>
    </EditorCard>
  );
}
function PagesEditor({
  content,
  publish,
}: {
  content: PublicHomeContent;
  publish: (p: Partial<PublicHomeContent>) => void;
}) {
  const keys = Object.keys(content.pages);
  const [page, setPage] = useState(keys[0] || "/about");
  const [value, setValue] = useState(content.pages[page]);
  useEffect(() => setValue(content.pages[page]), [page, content.pages]);
  return (
    <EditorCard
      title="Public page headings & hero media"
      action={
        <button
          className="btn-primary"
          onClick={() =>
            publish({ pages: { ...content.pages, [page]: value } })
          }
        >
          <Save size={15} /> Publish page
        </button>
      }
    >
      <div className="cms-page-editor">
        <select value={page} onChange={(e) => setPage(e.target.value)}>
          {keys.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <label>
          Kicker
          <input
            value={value?.kicker || ""}
            onChange={(e) => setValue({ ...value, kicker: e.target.value })}
          />
        </label>
        <label>
          Title
          <input
            value={value?.title || ""}
            onChange={(e) => setValue({ ...value, title: e.target.value })}
          />
        </label>
        <label>
          Intro
          <textarea
            value={value?.intro || ""}
            onChange={(e) => setValue({ ...value, intro: e.target.value })}
          />
        </label>
        <label>
          Hero image
          <input
            value={value?.image || ""}
            onChange={(e) => setValue({ ...value, image: e.target.value })}
          />
        </label>
      </div>
    </EditorCard>
  );
}
function ProcessEditor({
  content,
  publish,
}: {
  content: PublicHomeContent;
  publish: (p: Partial<PublicHomeContent>) => void;
}) {
  const [rows, setRows] = useState(content.placementProcess);
  useEffect(
    () => setRows(content.placementProcess),
    [content.placementProcess],
  );
  return (
    <EditorCard
      title="Placement process"
      action={
        <button
          className="btn-primary"
          onClick={() => publish({ placementProcess: rows })}
        >
          <Save size={15} /> Publish process
        </button>
      }
    >
      <div className="cms-list">
        {rows.map((r, i) => (
          <div className="cms-process-row" key={r.step}>
            <input
              value={r.step}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, step: e.target.value } : x,
                  ),
                )
              }
            />
            <input
              value={r.title}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, title: e.target.value } : x,
                  ),
                )
              }
            />
            <textarea
              value={r.description}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, description: e.target.value } : x,
                  ),
                )
              }
            />
            <button
              className="icon-danger"
              onClick={() => setRows(rows.filter((_, j) => j !== i))}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </EditorCard>
  );
}
function ContactsEditor({
  content,
  publish,
}: {
  content: PublicHomeContent;
  publish: (p: Partial<PublicHomeContent>) => void;
}) {
  const [rows, setRows] = useState(content.contacts);
  useEffect(() => setRows(content.contacts), [content.contacts]);
  const add = () =>
    setRows([
      {
        id: `contact-${Date.now()}`,
        role: "T&P Executive",
        name: "New contact",
        designation: "",
        description: "",
        office: "",
        phone: "",
        email: "",
      },
      ...rows,
    ]);
  return (
    <EditorCard
      title="T&P helpline & student representatives"
      action={
        <>
          <button className="btn-secondary" onClick={add}>
            <Plus size={14} /> Add contact
          </button>
          <button
            className="btn-primary"
            onClick={() => publish({ contacts: rows })}
          >
            <Save size={15} /> Publish contacts
          </button>
        </>
      }
    >
      <div className="cms-list">
        {rows.map((r, i) => (
          <div className="cms-contact-row" key={r.id}>
            <input
              value={r.role}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, role: e.target.value } : x,
                  ),
                )
              }
            />
            <input
              value={r.name}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, name: e.target.value } : x,
                  ),
                )
              }
            />
            <input
              value={r.designation}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, designation: e.target.value } : x,
                  ),
                )
              }
            />
            <textarea
              value={r.description}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, description: e.target.value } : x,
                  ),
                )
              }
            />
            <input
              value={r.office || ""}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, office: e.target.value } : x,
                  ),
                )
              }
              placeholder="Office line"
            />
            <input
              value={r.phone || ""}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, phone: e.target.value } : x,
                  ),
                )
              }
              placeholder="Cell"
            />
            <input
              value={r.email || ""}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, email: e.target.value } : x,
                  ),
                )
              }
              placeholder="Email"
            />
            <button
              className="icon-danger"
              onClick={() => setRows(rows.filter((_, j) => j !== i))}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </EditorCard>
  );
}
function AnnouncementsEditor({
  content,
  publish,
}: {
  content: PublicHomeContent;
  publish: (p: Partial<PublicHomeContent>) => void;
}) {
  const [rows, setRows] = useState(content.announcements);
  useEffect(() => setRows(content.announcements), [content.announcements]);
  const add = () =>
    setRows([
      {
        id: `announcement-${Date.now()}`,
        title: "New announcement",
        category: "Placement",
        description: "",
        status: "Published",
        publishDate: new Date().toISOString().slice(0, 10),
      },
      ...rows,
    ]);
  return (
    <EditorCard
      title="Announcements"
      action={
        <>
          <button className="btn-secondary" onClick={add}>
            <Plus size={14} /> Add
          </button>
          <button
            className="btn-primary"
            onClick={() => publish({ announcements: rows })}
          >
            <Save size={15} /> Publish
          </button>
        </>
      }
    >
      <div className="cms-list">
        {rows.map((r, i) => (
          <div className="cms-list-row" key={r.id}>
            <input
              value={r.title}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, title: e.target.value } : x,
                  ),
                )
              }
            />
            <select
              value={r.category}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, category: e.target.value } : x,
                  ),
                )
              }
            >
              <option>Placement</option>
              <option>Training</option>
              <option>Recruiters</option>
              <option>Important Notice</option>
            </select>
            <textarea
              value={r.description}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, description: e.target.value } : x,
                  ),
                )
              }
            />
            <button
              className="icon-danger"
              onClick={() => setRows(rows.filter((_, j) => j !== i))}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </EditorCard>
  );
}
function NewsletterEditor({
  content,
  publish,
}: {
  content: PublicHomeContent;
  publish: (p: Partial<PublicHomeContent>) => void;
}) {
  const [rows, setRows] = useState(content.newsletter);
  useEffect(() => setRows(content.newsletter), [content.newsletter]);
  const add = () =>
    setRows([
      {
        id: `newsletter-${Date.now()}`,
        title: "New letter",
        subject: "",
        body: "",
        publishedAt: new Date().toISOString(),
        status: "Draft",
      },
      ...rows,
    ]);
  return (
    <EditorCard
      title="New letters & newsletter"
      action={
        <>
          <button className="btn-secondary" onClick={add}>
            <Plus size={14} /> Add letter
          </button>
          <button
            className="btn-primary"
            onClick={() => publish({ newsletter: rows })}
          >
            <Save size={15} /> Publish
          </button>
        </>
      }
    >
      <div className="cms-list">
        {rows.map((r, i) => (
          <div className="cms-news-row" key={r.id}>
            <input
              value={r.title}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, title: e.target.value } : x,
                  ),
                )
              }
            />
            <input
              value={r.subject}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, subject: e.target.value } : x,
                  ),
                )
              }
            />
            <textarea
              value={r.body}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, body: e.target.value } : x,
                  ),
                )
              }
            />
            <select
              value={r.status}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i
                      ? {
                          ...x,
                          status: e.target.value as "Published" | "Draft",
                        }
                      : x,
                  ),
                )
              }
            >
              <option>Draft</option>
              <option>Published</option>
            </select>
            <button
              className="icon-danger"
              onClick={() => setRows(rows.filter((_, j) => j !== i))}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </EditorCard>
  );
}
function CalendarEditor({
  content,
  publish,
}: {
  content: PublicHomeContent;
  publish: (p: Partial<PublicHomeContent>) => void;
}) {
  const [rows, setRows] = useState(content.calendar);
  useEffect(() => setRows(content.calendar), [content.calendar]);
  const add = () =>
    setRows([
      {
        id: `calendar-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        title: "New event",
        venue: "",
        category: "T&P",
        status: "Published",
      },
      ...rows,
    ]);
  return (
    <EditorCard
      title="Placement calendar"
      action={
        <>
          <button className="btn-secondary" onClick={add}>
            <Plus size={14} /> Add event
          </button>
          <button
            className="btn-primary"
            onClick={() => publish({ calendar: rows })}
          >
            <Save size={15} /> Publish
          </button>
        </>
      }
    >
      <div className="cms-list">
        {rows.map((r, i) => (
          <div className="cms-calendar-row" key={r.id}>
            <input
              type="date"
              value={r.date}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, date: e.target.value } : x,
                  ),
                )
              }
            />
            <input
              value={r.title}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, title: e.target.value } : x,
                  ),
                )
              }
            />
            <input
              value={r.venue}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, venue: e.target.value } : x,
                  ),
                )
              }
            />
            <select
              value={r.category}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, category: e.target.value } : x,
                  ),
                )
              }
            >
              <option>T&P</option>
              <option>Recruitment</option>
              <option>Training</option>
              <option>Industry</option>
            </select>
            <button
              className="icon-danger"
              onClick={() => setRows(rows.filter((_, j) => j !== i))}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </EditorCard>
  );
}
function PlacementPhotosEditor({
  content,
  publish,
  upload,
  uploading,
}: {
  content: PublicHomeContent;
  publish: (p: Partial<PublicHomeContent>) => void;
  upload: (f: File, cb: (u: string) => void, folder: string) => void;
  uploading: boolean;
}) {
  const [rows, setRows] = useState<HeroSlide[]>(
    Array.isArray(content.heroSlides) ? content.heroSlides : [],
  );
  useEffect(
    () => setRows(Array.isArray(content.heroSlides) ? content.heroSlides : []),
    [content.heroSlides],
  );
  const update = (index: number, patch: Partial<HeroSlide>) =>
    setRows((current) =>
      current.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  const add = () =>
    setRows((current) => [
      {
        id: `slide-${Date.now()}`,
        image: "",
        title: "New placement",
        subtitle: "",
        batch: "2026–27",
      },
      ...current,
    ]);
  return (
    <EditorCard
      title="Homepage placement photos"
      action={
        <>
          <button className="btn-secondary" onClick={add}>
            <Plus size={14} /> Add placement
          </button>
          <button
            className="btn-primary"
            onClick={() => publish({ heroSlides: rows })}
          >
            <Save size={15} /> Publish photos
          </button>
        </>
      }
    >
      <p className="section-subtitle">
        These images power the placement highlights slider on the public
        homepage. Upload a photo, add the company/role and student names, then
        publish.
      </p>
      <div className="cms-placement-list">
        {rows.map((row, i) => (
          <article className="cms-placement-card" key={row.id}>
            <div className="cms-placement-preview">
              {row.image ? (
                <img src={row.image} alt={row.title || "Placement highlight"} />
              ) : (
                <ImagePlus size={28} />
              )}
            </div>
            <div className="cms-placement-fields">
              <label>
                Company / role
                <input
                  value={row.title}
                  onChange={(e) => update(i, { title: e.target.value })}
                  placeholder="TCS · Ninja Role"
                />
              </label>
              <label>
                Students
                <input
                  value={row.subtitle}
                  onChange={(e) => update(i, { subtitle: e.target.value })}
                  placeholder="Student 1 · Student 2"
                />
              </label>
              <label>
                Batch
                <input
                  value={row.batch}
                  onChange={(e) => update(i, { batch: e.target.value })}
                  placeholder="2026–27"
                />
              </label>
              <label className="cms-placement-url">
                Image URL
                <input
                  value={row.image}
                  onChange={(e) => update(i, { image: e.target.value })}
                  placeholder="Upload an image or paste a URL"
                />
              </label>
              <label className="upload-control">
                <UploadCloud size={14} />{" "}
                {uploading ? "Uploading…" : "Upload placement photo"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file)
                      upload(
                        file,
                        (url) => update(i, { image: url }),
                        "sggs-tnp/placement-highlights",
                      );
                  }}
                />
              </label>
            </div>
            <button
              className="icon-danger"
              aria-label={`Delete ${row.title || "placement photo"}`}
              onClick={() =>
                setRows((current) => current.filter((_, j) => j !== i))
              }
            >
              <Trash2 size={15} />
            </button>
          </article>
        ))}
        {!rows.length && (
          <div className="cms-empty-state">
            <ImagePlus size={24} />
            <p>No placement photos yet.</p>
            <button className="btn-secondary" onClick={add}>
              <Plus size={14} /> Add first placement
            </button>
          </div>
        )}
      </div>
    </EditorCard>
  );
}
function MediaEditor({
  content,
  publish,
  upload,
  uploading,
}: {
  content: PublicHomeContent;
  publish: (p: Partial<PublicHomeContent>) => void;
  upload: (f: File, cb: (u: string) => void, folder: string) => void;
  uploading: boolean;
}) {
  const [rows, setRows] = useState(content.gallery);
  useEffect(() => setRows(content.gallery), [content.gallery]);
  const add = () =>
    setRows([
      {
        id: `media-${Date.now()}`,
        title: "New media item",
        image: "",
        category: "Gallery",
      },
      ...rows,
    ]);
  return (
    <EditorCard
      title="Media library"
      action={
        <>
          <button className="btn-secondary" onClick={add}>
            <Plus size={14} /> Add item
          </button>
          <button
            className="btn-primary"
            onClick={() => publish({ gallery: rows })}
          >
            <Save size={15} /> Publish
          </button>
        </>
      }
    >
      <div className="cms-media-grid">
        {rows.map((r, i) => (
          <article key={r.id} className="cms-media-card">
            <div className="cms-media-preview">
              {r.image ? <img src={r.image} alt="" /> : <ImagePlus size={25} />}
            </div>
            <input
              value={r.title}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, title: e.target.value } : x,
                  ),
                )
              }
            />
            <input
              value={r.category}
              onChange={(e) =>
                setRows(
                  rows.map((x, j) =>
                    j === i ? { ...x, category: e.target.value } : x,
                  ),
                )
              }
            />
            <label className="upload-control">
              <UploadCloud size={14} />{" "}
              {uploading ? "Uploading…" : "Upload image"}
              <input
                type="file"
                accept="image/*"
                hidden
                disabled={uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f)
                    upload(
                      f,
                      (u) =>
                        setRows(
                          rows.map((x, j) =>
                            j === i ? { ...x, image: u } : x,
                          ),
                        ),
                      "sggs-tnp/media",
                    );
                }}
              />
            </label>
            <button
              className="icon-danger"
              onClick={() => setRows(rows.filter((_, j) => j !== i))}
            >
              <Trash2 size={15} />
            </button>
          </article>
        ))}
      </div>
    </EditorCard>
  );
}
