import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <h3 className="footer-brand-title">Historical Atlas</h3>
          <p className="footer-brand-text">
            Explore the battles, wars, and commanders that shaped world history.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links-group">
          <h4 className="footer-links-title">Explore</h4>
          <div className="footer-links">
            <Link href="/" className="footer-link">Regions</Link>
            <Link href="/timeline" className="footer-link">Timeline</Link>
            <Link href="/map" className="footer-link">Maps</Link>
            <Link href="/search" className="footer-link">Search</Link>
          </div>
        </div>

        {/* Info */}
        <div className="footer-links-group">
          <h4 className="footer-links-title">About</h4>
          <div className="footer-links">
            <Link href="/about" className="footer-link">About This Project</Link>
            <Link href="/sources" className="footer-link">Sources</Link>
            <Link href="/admin" className="footer-link">Admin Panel</Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} Historical Atlas. Built for the study of military history.</p>
      </div>
    </footer>
  );
}
