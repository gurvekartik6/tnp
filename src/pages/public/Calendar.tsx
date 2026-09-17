import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import ContentPage from '../../components/public/ContentPage';
import { api } from '../../services/api';
import { getPublicHomeContent, subscribeToPublicContent, type CalendarEvent } from '../../services/siteContent';

function monthMeta(date: Date) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  return { year: first.getFullYear(), month: first.getMonth(), days: new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate(), start: first.getDay(), label: first.toLocaleString('en-IN', { month: 'long', year: 'numeric' }) };
}

export default function Calendar(){
  const [events, setEvents] = useState<CalendarEvent[]>(() => getPublicHomeContent().calendar);
  const [date, setDate] = useState(() => new Date());
  const meta = useMemo(() => monthMeta(date), [date]);
  const cells = useMemo(() => { const result:Array<Date|null>=[]; for(let i=0;i<meta.start;i+=1) result.push(null); for(let d=1;d<=meta.days;d+=1) result.push(new Date(meta.year,meta.month,d)); while(result.length%7) result.push(null); return result; }, [meta]);
  useEffect(() => { api.calendar.list().then((rows:CalendarEvent[])=>setEvents(rows||[])).catch(()=>undefined); return subscribeToPublicContent(()=>setEvents(getPublicHomeContent().calendar)); }, []);
  return <ContentPage kicker="PLACEMENT CALENDAR" title="See the season in motion." intro="A live monthly schedule for registrations, assessments, interviews, training and placement activities." image="Gallary/step_3.webp"><section className="public-calendar-page">
    <div className="public-calendar-head"><div><span className="eyebrow">LIVE SCHEDULE</span><h2>{meta.label}</h2><p>Dates published by the Training &amp; Placement Cell appear automatically.</p></div><div className="calendar-public-actions"><button onClick={()=>setDate(new Date(meta.year,meta.month-1,1))}><ChevronLeft size={16}/></button><button onClick={()=>setDate(new Date(meta.year,meta.month+1,1))}><ChevronRight size={16}/></button><button className="calendar-today-button" onClick={()=>setDate(new Date())}><CalendarDays size={15}/> Today</button></div></div>
    <div className="calendar-weekdays">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day=><span key={day}>{day}</span>)}</div>
    <div className="calendar-grid-public">{cells.map((cell,index)=>{if(!cell)return <div className="calendar-day empty" key={`empty-${index}`}/>;const key=cell.toISOString().slice(0,10);const items=events.filter(event=>event.date===key);const today=new Date().toISOString().slice(0,10)===key;return <div className={`calendar-day ${today?'today':''}`} key={key}><span className="calendar-day-number">{cell.getDate()}</span>{items.map(event=><div className="calendar-event-chip" key={event.id}><b>{event.title}</b><small>{event.venue||event.category}</small></div>)}</div>})}</div>
  </section></ContentPage>
}
