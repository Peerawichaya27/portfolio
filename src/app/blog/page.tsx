import { BookOpen, ArrowUpRight } from 'lucide-react';
export const metadata = {
  title: 'Writing',
  description:
    'Upcoming technical notes on backend systems, cloud deployment, and secure integrations.',
};
export default function Blog() {
  return (
    <div className="container">
      <header className="page-intro">
        <p className="eyebrow">Writing</p>
        <h1>Engineering notes</h1>
        <p>A space for technical ideas, engineering decisions, and things learned along the way.</p>
      </header>
      <section className="page-content">
        <div className="empty-state">
          <BookOpen className="accent" size={32} strokeWidth={1.5} />
          <h2>Writing is in progress</h2>
          <p>
            No articles published yet. Future notes will explore backend systems, Docker and
            Kubernetes, and secure enterprise integrations.
          </p>
          <a href="https://github.com/Peerawichaya27" className="text-link">
            Find me on GitHub <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
