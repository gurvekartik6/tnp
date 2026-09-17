import { ArrowUpRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import ContentPage from '../../components/public/ContentPage'
import { img, leadership } from '../../data'

export default function Leadership () {
  return (
    <ContentPage
      kicker='11 / INSTITUTIONAL LEADERSHIP'
      title='The people guiding the ecosystem.'
      intro='Meet the Director and Dean responsible for institutional direction, industry liaison and the Training & Placement function.'
      image='Director.jpeg'
    >
      <section className='campus-tabs'>
        <Link className='campus-tab' to='/departments'>
          Departments <span>10</span>
        </Link>
        <Link className='campus-tab' to='/labs'>
          Laboratories <span>11</span>
        </Link>
        <Link className='campus-tab active' to='/leadership'>
          Leadership <span>02</span>
        </Link>
        
      </section>
      <section className='leadership-grid'>
        {leadership.map((p, i) => (
          <article className='leader-card' key={p.name}>
            <div className='leader-photo'>
              {p.image ? (
                <img src={img(p.image)} alt={p.name} />
              ) : (
                <div className='leader-initials'>SBM</div>
              )}
              <span>0{i + 1}</span>
            </div>
            <div className='leader-body'>
              <span className='eyebrow'>{p.role}</span>
              <h2>{p.name}</h2>
              <p>{p.note}</p>
              <a href={`mailto:${p.email}`}>
                <Mail size={15} />
                {p.email}
              </a>
              <Link to='/about'>
                View T&amp;P context <ArrowUpRight size={14} />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <section className='leadership-note'>
        <span className='eyebrow'>INSTITUTIONAL NOTE</span>
        <h2>Industry connection is a leadership function.</h2>
        <p>
          SGGSIE&amp;T's public institutional pages identify Dr. M. B. Kokare as
          Director and Dr. S. B. Mundhe as Dean (Industry Liaison) and I/C TPO.
          This interface keeps their leadership context distinct from the
          student operations workspace.
        </p>
      </section>
    </ContentPage>
  )
}
