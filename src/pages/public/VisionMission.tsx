import { ArrowRight, Compass, Target, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import ContentPage from '../../components/public/ContentPage'
import { img } from '../../data'

export default function VisionMission () {
  const objectives = [
    'Industry interaction and recruiter engagement',
    'Career guidance and placement coordination',
    'Skill development and interview readiness',
    'Internship, training and experiential learning',
    'Alumni engagement and long-term industry connect'
  ]
  return (
    <ContentPage
      kicker='02A / VISION & MISSION'
      title='A clearer direction for every career journey.'
      intro='A dedicated institutional layer for the official T&P vision, mission and objectives. Replace the editable text with approved SGGSIE&T wording through the CMS.'
      image='sggs_campus_2.jpg'
    >
      <section className='vision-grid'>
        <article className='vision-card navy'>
          <div className='vision-icon'>
            <Compass />
          </div>
          <span className='eyebrow light'>VISION</span>
          <h2>
            Engineering futures with purpose, preparation and opportunity.
          </h2>
          <p>
            Official SGGSIE&T vision content should be maintained by the T&P
            administrator before publication.
          </p>
        </article>
        <article className='vision-card'>
          <div className='vision-icon soft'>
            <Target />
          </div>
          <span className='eyebrow'>MISSION</span>
          <h2>Connect learning with meaningful industry outcomes.</h2>
          <p>
            Build a structured ecosystem for student development, recruiter
            engagement, internships, training and transparent placement
            operations.
          </p>
        </article>
      </section>
      <section className='objective-band'>
        <div>
          <span className='eyebrow'>CORE OBJECTIVES</span>
          <h2>What the cell is designed to enable.</h2>
        </div>
        <div className='objective-list'>
          {objectives.map((x, i) => (
            <div key={x}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <b>{x}</b>
              <Sparkles size={15} />
            </div>
          ))}
        </div>
      </section>
      <section className='image-band'>
        <img
          src={img('tnp.jpeg')}
          alt='SGGSIE&T innovation environment'
        />
        <div>
          <span className='eyebrow light'>KEEP IT OFFICIAL</span>
          <h2>Institutional statements belong to the CMS.</h2>
          <p>
            The frontend provides the visual system; approved wording can be
            published later without redesigning the page.
          </p>
          <Link className='btn-light' to='/contact'>
            Contact T&amp;P Cell <ArrowRight />
          </Link>
        </div>
      </section>
    </ContentPage>
  )
}
