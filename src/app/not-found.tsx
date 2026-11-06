import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="container page-content">
      <header className="page-intro">
        <p className="eyebrow">404 / Page not found</p>
        <h1>This page is missing</h1>
        <p>This page could not be found.</p>
      </header>
      <Link className="button primary" href="/">
        Back to home →
      </Link>
    </div>
  );
}
