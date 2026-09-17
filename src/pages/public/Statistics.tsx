import { useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ArrowRight, BarChart3, Building2, GraduationCap, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContentPage from '../../components/public/ContentPage';
import { api } from '../../services/api';
import {
  getPublicHomeContent,
  setCachedPublicHomeContent,
  subscribeToPublicContent,
  type DepartmentStat,
  type PublicHomeContent,
} from '../../services/siteContent';

const chartPalette = ['#1769aa', '#2c7dbd', '#5d8cab', '#7aa4bf', '#8bb4ca', '#a5c0cf'];
const tooltipStyle = {
  borderRadius: 10,
  border: '1px solid #d9e2ea',
  background: '#ffffff',
  fontSize: 11,
};

export default function Statistics() {
  const [content, setContent] = useState<PublicHomeContent>(() => getPublicHomeContent());
  const [year, setYear] = useState(() => getPublicHomeContent().trend[0]?.year || '2025-26');

  useEffect(() => {
    let active = true;

    api.publicContent
      .get()
      .then((value: PublicHomeContent) => {
        if (!active) return;
        const next = setCachedPublicHomeContent(value);
        setContent(next);
      })
      .catch(() => undefined);

    const unsubscribe = subscribeToPublicContent(() => {
      const next = getPublicHomeContent();
      setContent(next);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const years = Array.isArray(content.trend) ? content.trend : [];

  useEffect(() => {
    if (years.length && !years.some((item) => item.year === year)) {
      setYear(years[0].year);
    }
  }, [years, year]);

  const selected = years.find((item) => item.year === year) || years[0];
  const departments: DepartmentStat[] =
    Array.isArray(content.departmentHistory?.[year])
      ? content.departmentHistory[year]
      : [];

  const trendData = useMemo(
    () =>
      years.map((item) => ({
        year: item.year,
        placed: item.placed,
        offers: item.offers,
        rate: item.rate,
      })),
    [years],
  );

  const departmentData = useMemo(
    () => departments.map((item) => ({ ...item, rate: Number(item.rate || 0) })),
    [departments],
  );

  const funnelData = Array.isArray(content.funnel) ? content.funnel : [];

  return (
    <ContentPage
      kicker="PLACEMENT STATISTICS"
      title="Year-wise and department-wise placement intelligence."
      intro="Placement outcomes, department recruitment and student journey data published by the Training & Placement administration."
      image=""
    >
      <section className="statistics-page">
        <div className="statistics-banner-card">
          {content.bannerImage ? (
            <img
              src={content.bannerImage}
              alt="SGGSIE&T Training and Placement Cell placement statistics banner"
            />
          ) : (
            <div className="statistics-banner-empty">
              Placement statistics banner will be published by the Dean.
            </div>
          )}
        </div>

        <div className="statistics-toolbar">
          <div>
            <span className="eyebrow">PUBLISHED PLACEMENT DATA</span>
            <h2>{selected ? `${selected.year} placement snapshot` : 'Placement snapshot'}</h2>
            <p>Figures are controlled from the Dean administration workspace.</p>
          </div>
          <label>
            <span>Academic year</span>
            <select value={year} onChange={(event) => setYear(event.target.value)} disabled={!years.length}>
              {years.map((item) => (
                <option value={item.year} key={item.year}>
                  {item.year}
                </option>
              ))}
            </select>
          </label>
        </div>

        {selected ? (
          <div className="statistics-kpi-grid-clean">
            <article>
              <GraduationCap size={18} />
              <small>Students enrolled</small>
              <strong>{selected.enrolled}</strong>
            </article>
            <article>
              <TrendingUp size={18} />
              <small>Students placed</small>
              <strong>{selected.placed}+</strong>
            </article>
            <article>
              <BarChart3 size={18} />
              <small>Total offers</small>
              <strong>{selected.offers}+</strong>
            </article>
            <article>
              <Building2 size={18} />
              <small>Companies</small>
              <strong>{selected.companies}</strong>
            </article>
            <article>
              <small>Average package</small>
              <strong>{selected.averagePackage}</strong>
              <span>{selected.packageRange}</span>
            </article>
            <article>
              <small>Highest package</small>
              <strong>{selected.highestPackage}</strong>
              <span>Published record</span>
            </article>
          </div>
        ) : (
          <div className="statistics-empty">No placement statistics have been published yet.</div>
        )}

        <div className="statistics-chart-grid">
          <article className="statistics-chart-card statistics-chart-wide">
            <div className="statistics-chart-head">
              <div>
                <span className="eyebrow">YEAR-WISE TREND</span>
                <h3>Offers, placed students and placement rate</h3>
              </div>
              <Link to="/placements" className="statistics-inline-link">
                Placement drives <ArrowRight size={14} />
              </Link>
            </div>
            <div className="statistics-chart-wrap">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={trendData} margin={{ top: 10, right: 16, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="4 5" stroke="#dfe7ee" />
                  <XAxis dataKey="year" fontSize={11} />
                  <YAxis yAxisId="count" fontSize={10} />
                  <YAxis yAxisId="rate" orientation="right" domain={[0, 100]} fontSize={10} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend />
                  <Line yAxisId="count" type="monotone" dataKey="placed" name="Placed" stroke="#1769aa" strokeWidth={3} dot={{ r: 3 }} />
                  <Line yAxisId="count" type="monotone" dataKey="offers" name="Offers" stroke="#7a95aa" strokeWidth={2.5} dot={{ r: 2 }} />
                  <Line yAxisId="rate" type="monotone" dataKey="rate" name="Placement rate %" stroke="#c58b2a" strokeWidth={2.5} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="statistics-chart-card">
            <div className="statistics-chart-head">
              <div>
                <span className="eyebrow">DEPARTMENT-WISE</span>
                <h3>{year} placed students</h3>
              </div>
            </div>
            <div className="statistics-chart-wrap">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={departmentData} layout="vertical" margin={{ top: 10, right: 18, left: 8, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="4 5" horizontal={false} stroke="#dfe7ee" />
                  <XAxis type="number" fontSize={10} />
                  <YAxis dataKey="name" type="category" width={58} fontSize={10} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="placed" name="Placed" fill="#1769aa" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="statistics-chart-card">
            <div className="statistics-chart-head">
              <div>
                <span className="eyebrow">PLACEMENT FUNNEL</span>
                <h3>Student journey</h3>
              </div>
            </div>
            <div className="statistics-chart-wrap">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={funnelData} margin={{ top: 12, right: 8, left: 0, bottom: 45 }}>
                  <CartesianGrid strokeDasharray="4 5" vertical={false} stroke="#dfe7ee" />
                  <XAxis dataKey="stage" fontSize={9} angle={-18} textAnchor="end" height={65} />
                  <YAxis fontSize={10} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" name="Students" fill="#2c7dbd" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="statistics-chart-card">
            <div className="statistics-chart-head">
              <div>
                <span className="eyebrow">DEPARTMENT MIX</span>
                <h3>Placed students by branch</h3>
              </div>
            </div>
            <div className="statistics-chart-wrap">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend />
                  <Pie data={departmentData} dataKey="placed" nameKey="name" cx="50%" cy="45%" outerRadius={105} innerRadius={55} paddingAngle={2}>
                    {departmentData.map((item, index) => (
                      <Cell key={item.name} fill={chartPalette[index % chartPalette.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </article>
        </div>

        <section className="statistics-table-card">
          <div className="statistics-table-head">
            <div>
              <span className="eyebrow">DEPARTMENT BREAKDOWN</span>
              <h3>{year} placement summary</h3>
            </div>
          </div>
          <div className="statistics-table-scroll">
            <div className="statistics-table-row statistics-table-row-head">
              <span>Branch</span>
              <span>Enrolled</span>
              <span>Placed</span>
              <span>Rate</span>
              <span>Highest</span>
            </div>
            {departmentData.map((department) => (
              <div className="statistics-table-row" key={department.name}>
                <strong>{department.name}</strong>
                <span>{department.enrolled}</span>
                <span>{department.placed}</span>
                <span>{department.rate}%</span>
                <span>{department.highest}</span>
              </div>
            ))}
          </div>
        </section>
      </section>
    </ContentPage>
  );
}
