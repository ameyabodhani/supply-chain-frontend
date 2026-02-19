import { useHistory } from 'react-router-dom'
import './About.css'

const modules = [
  { icon: '📦', title: 'Order Management',    desc: 'Create and track purchase orders end-to-end with real-time status updates.' },
  { icon: '🏭', title: 'Vendor Management',   desc: 'Manage vendor profiles, GST records, contact details, and part catalogs.' },
  { icon: '👥', title: 'Client Management',   desc: 'Maintain client accounts, delivery addresses, and order histories.' },
  { icon: '📊', title: 'Inventory Tracking',  desc: 'Monitor stock levels across all parts with low-inventory visibility.' },
  { icon: '🔐', title: 'Role-based Access',   desc: 'Separate portals for Admins, Users, and Vendors with protected routes.' },
  { icon: '⚡', title: 'Real-time Updates',   desc: 'Instant data sync across all modules powered by REST APIs.' },
]

const stack = ['React 17', 'Spring Boot', 'MySQL', 'REST API', 'JWT Auth', 'Bootstrap']

const About = () => {
  const history = useHistory()

  return (
    <div className="about-wrapper">

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <div className="about-logo">SC</div>
          <h1>Supply Chain Portal</h1>
          <p className="about-tagline">
            A full-stack enterprise platform to manage vendors, clients,
            inventory, and orders — built for scalability and clarity.
          </p>
        </div>
      </section>

      {/* Modules */}
      <section className="about-section">
        <h2 className="about-section-title">What this platform does</h2>
        <div className="about-modules">
          {modules.map((m, i) => (
            <div className="about-module-card" key={i}>
              <span className="about-module-icon">{m.icon}</span>
              <h4>{m.title}</h4>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="about-section about-section-alt">
        <h2 className="about-section-title">Built with</h2>
        <div className="about-stack">
          {stack.map((tech, i) => (
            <span className="about-stack-badge" key={i}>{tech}</span>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="about-cta">
        <button className="about-back-btn" onClick={() => history.push('/home')}>
          ← Back to Home
        </button>
      </section>

    </div>
  )
}

export default About
