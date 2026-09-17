import { ArrowRight } from 'lucide-react'
import { img } from '../../data'
import ContentPage from '../../components/public/ContentPage'
export default function About () {
  return (
    <ContentPage
      kicker='01 / ABOUT T&P'
      title='A placement cell built around people, preparation and opportunity.'
      intro='A focused ecosystem connecting academic talent with industry through training, recruitment, internships and alumni.'
      image='sggs_campus_2.jpg'
    >
      <section className='content-grid'>
        <div className='content-card'>
          <span className='eyebrow'>VISION</span>
          <h2>Make every transition from campus to career more intentional.</h2>
          <p>
            Official institutional vision and mission content can be maintained
            by the T&P CMS.
          </p>
        </div>
        <div className='content-card'>
          <span className='eyebrow'>WHAT WE DO</span>
          {[
            'Industry interaction',
            'Skill development',
            'Career guidance',
            'Recruiter support',
            'Placement coordination',
            'Alumni engagement'
          ].map((x, i) => (
            <div className='simple-row' key={x}>
              <span>0{i + 1}</span>
              <b>{x}</b>
              <ArrowRight size={15} />
            </div>
          ))}
        </div>
      </section>
      <section className='image-band'>
        <img src={img('tnp.jpeg')} />
        <div>
          <span className='eyebrow light'>CAMPUS EXPERIENCE</span>
          <h2>More than a placement office.</h2>
          <p>
            Discover departments, spaces, people and programs that shape the
            student journey.
          </p>
        </div>
      </section>
    </ContentPage>
  )
}
