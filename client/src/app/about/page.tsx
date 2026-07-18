import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — Historical Atlas',
  description:
    'Learn about Historical Atlas, an interactive exploration of military history through regions, eras, battles, commanders, and maps.',
};

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-bg" />
        <div className="about-hero-content">
          <h1 className="about-hero-title">About Historical Atlas</h1>
          <p className="about-hero-subtitle">
            Exploring the battles, wars, kingdoms, commanders, and military history
            that shaped human civilization.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="about-section">
        <div className="about-section-header">
          <h2 className="about-section-title">Our Mission</h2>
          <p className="about-section-subtitle">
            Making military history easier to explore through an interactive and structured experience.
          </p>
        </div>
        <div className="about-text">
          <p>
            Historical Atlas was created to help people navigate the vast landscape of military
            history. Instead of reading disconnected articles, visitors can move through time and
            geography using connected historical data — from ancient battlefields to modern
            campaigns.
          </p>
          <p>
            The project organizes information around regions, historical eras, kingdoms and empires,
            wars, battles, commanders, maps, and timelines. The goal is to help users understand how
            events connect across time and geography, and to provide a useful reference for students,
            educators, and anyone curious about the past.
          </p>
        </div>
      </section>

      {/* What You Can Explore */}
      <section className="about-section">
        <div className="about-section-header">
          <h2 className="about-section-title">What You Can Explore</h2>
          <p className="about-section-subtitle">
            A structured view of military history across time and space.
          </p>
        </div>
        <div className="about-features-grid">
          <div className="about-feature-card">
            <span className="about-feature-icon" aria-hidden="true">🌍</span>
            <h3 className="about-feature-title">Regions</h3>
            <p className="about-feature-text">Browse military history by continent and geographical region.</p>
          </div>
          <div className="about-feature-card">
            <span className="about-feature-icon" aria-hidden="true">🏺</span>
            <h3 className="about-feature-title">Historical Eras</h3>
            <p className="about-feature-text">Travel from ancient civilizations to the modern world.</p>
          </div>
          <div className="about-feature-card">
            <span className="about-feature-icon" aria-hidden="true">⚔️</span>
            <h3 className="about-feature-title">Battles</h3>
            <p className="about-feature-text">Discover famous and lesser-known battles that changed history.</p>
          </div>
          <div className="about-feature-card">
            <span className="about-feature-icon" aria-hidden="true">🏴</span>
            <h3 className="about-feature-title">Wars</h3>
            <p className="about-feature-text">Understand the causes, campaigns, and outcomes of major conflicts.</p>
          </div>
          <div className="about-feature-card">
            <span className="about-feature-icon" aria-hidden="true">👑</span>
            <h3 className="about-feature-title">Kingdoms & Empires</h3>
            <p className="about-feature-text">Explore the rise and fall of civilizations across the ages.</p>
          </div>
          <div className="about-feature-card">
            <span className="about-feature-icon" aria-hidden="true">👤</span>
            <h3 className="about-feature-title">Commanders</h3>
            <p className="about-feature-text">Learn about influential military leaders and their strategies.</p>
          </div>
          <div className="about-feature-card">
            <span className="about-feature-icon" aria-hidden="true">🗺️</span>
            <h3 className="about-feature-title">Maps</h3>
            <p className="about-feature-text">Visualize battlefields and changing borders over time.</p>
          </div>
          <div className="about-feature-card">
            <span className="about-feature-icon" aria-hidden="true">📜</span>
            <h3 className="about-feature-title">Timeline</h3>
            <p className="about-feature-text">Follow world history chronologically through a structured timeline.</p>
          </div>
        </div>
      </section>

      {/* Historical Accuracy */}
      <section className="about-section">
        <div className="about-section-header">
          <h2 className="about-section-title">Historical Accuracy</h2>
          <p className="about-section-subtitle">
            A commitment to reliable, well-organized historical information.
          </p>
        </div>
        <div className="about-text">
          <p>
            This project aims to present historical information that is accurate, contextual, and
            clearly organized. Whenever possible, data is compiled from reputable historical
            references and academic sources.
          </p>
          <p>
            Some illustrations may be modern artistic reconstructions or AI-generated visualizations
            intended to help readers imagine historical events, landscapes, and figures. These are
            presented as interpretive aids rather than documentary evidence.
          </p>
          <p>
            For deeper research, readers are encouraged to consult primary sources, peer-reviewed
            academic works, and established historical publications. History is often subject to
            reinterpretation as new evidence emerges.
          </p>
        </div>
      </section>

      {/* Sources */}
      <section className="about-section">
        <div className="about-section-header">
          <h2 className="about-section-title">Sources</h2>
          <p className="about-section-subtitle">
            Historical information gathered from reliable references.
          </p>
        </div>
        <div className="about-text">
          <p>
            The information in Historical Atlas is gathered from reliable references including
            published books, academic publications, museum collections, public domain archives, and
            open historical resources.
          </p>
          <p>
            Every effort is made to credit image sources and respect licensing requirements. If you
            believe any content requires attribution or review, please contact the project team.
          </p>
        </div>
      </section>

      {/* Technologies */}
      <section className="about-section">
        <div className="about-section-header">
          <h2 className="about-section-title">Technologies</h2>
          <p className="about-section-subtitle">
            Built with modern web technologies for performance and accessibility.
          </p>
        </div>
        <div className="about-tech-grid">
          <div className="about-tech-card">
            <span className="about-tech-icon" aria-hidden="true">⚛️</span>
            <h3 className="about-tech-name">Next.js</h3>
            <p className="about-tech-desc">React framework for server-rendered pages and routing.</p>
          </div>
          <div className="about-tech-card">
            <span className="about-tech-icon" aria-hidden="true">⚡</span>
            <h3 className="about-tech-name">React</h3>
            <p className="about-tech-desc">Component-based UI library for interactive interfaces.</p>
          </div>
          <div className="about-tech-card">
            <span className="about-tech-icon" aria-hidden="true">🔷</span>
            <h3 className="about-tech-name">TypeScript</h3>
            <p className="about-tech-desc">Type-safe development across client and server.</p>
          </div>
          <div className="about-tech-card">
            <span className="about-tech-icon" aria-hidden="true">🎨</span>
            <h3 className="about-tech-name">Tailwind CSS</h3>
            <p className="about-tech-desc">Utility-first styling with a consistent design system.</p>
          </div>
          <div className="about-tech-card">
            <span className="about-tech-icon" aria-hidden="true">🟢</span>
            <h3 className="about-tech-name">Node.js</h3>
            <p className="about-tech-desc">JavaScript runtime for the backend API.</p>
          </div>
          <div className="about-tech-card">
            <span className="about-tech-icon" aria-hidden="true">🚂</span>
            <h3 className="about-tech-name">Express</h3>
            <p className="about-tech-desc">Web framework for building the REST API.</p>
          </div>
          <div className="about-tech-card">
            <span className="about-tech-icon" aria-hidden="true">🍃</span>
            <h3 className="about-tech-name">MongoDB</h3>
            <p className="about-tech-desc">Document database for flexible historical data storage.</p>
          </div>
          <div className="about-tech-card">
            <span className="about-tech-icon" aria-hidden="true">🟫</span>
            <h3 className="about-tech-name">Mongoose</h3>
            <p className="about-tech-desc">MongoDB object modeling and validation.</p>
          </div>
          <div className="about-tech-card">
            <span className="about-tech-icon" aria-hidden="true">☁️</span>
            <h3 className="about-tech-name">Cloudinary</h3>
            <p className="about-tech-desc">Image hosting, optimization, and delivery.</p>
          </div>
        </div>
      </section>

      {/* Looking Ahead */}
      <section className="about-section">
        <div className="about-section-header">
          <h2 className="about-section-title">Looking Ahead</h2>
          <p className="about-section-subtitle">
            Planned improvements to make the atlas more useful over time.
          </p>
        </div>
        <div className="about-text">
          <p>
            Future versions of Historical Atlas may include interactive historical maps, an advanced
            search experience, a dedicated timeline explorer, battle comparison tools, richer
            commander profiles, expanded image galleries, educational statistics, and additional
            historical content.
          </p>
          <p>
            The project is developed incrementally, with attention to accuracy, usability, and
            long-term maintainability. No specific release dates are promised.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="about-section">
        <div className="about-section-header">
          <h2 className="about-section-title">Disclaimer</h2>
          <p className="about-section-subtitle">
            Important notes about the content and purpose of this project.
          </p>
        </div>
        <div className="about-disclaimer">
          <h3 className="about-disclaimer-title">Please Note</h3>
          <ul className="about-disclaimer-list">
            <li>
              Historical interpretations differ between sources. The project presents information
              based on available references, but scholarship continues to evolve.
            </li>
            <li>
              AI-generated artwork is clearly presented as artistic reconstruction where used, and
              should not be treated as photographic or documentary evidence.
            </li>
            <li>
              Images remain the property of their respective owners when applicable. Credits and
              licensing information are provided where possible.
            </li>
            <li>
              This project is intended for educational and informational purposes. It is not a
              definitive historical authority.
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2 className="about-cta-title">Continue Exploring History</h2>
        <Link href="/" className="about-cta-button">
          Explore Regions
        </Link>
      </section>
    </div>
  );
}
