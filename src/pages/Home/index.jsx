import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Terminal, Sparkles } from "lucide-react";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={`${styles.hero} container`}>
        <div className={styles.badge}>
          <Sparkles size={14} className={styles.badgeIcon} />
          <span>Interactive Code Playground Now Live</span>
        </div>
        
        <h1 className={styles.title}>
          Build Your <span className={styles.titleHighlight}>Engineering</span> Foundation
        </h1>
        
        <p className={styles.subtitle}>
          A code-first learning platform designed for builders. Master frontend systems, complex algorithms, and scalable architectures with real-world, interactive projects.
        </p>
        
        <div className={styles.ctaGroup}>
          <Link to="/courses" className={styles.primaryCta}>
            <span>Explore Courses</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/project" className={styles.secondaryCta}>
            <Terminal size={18} />
            <span>Browse Projects</span>
          </Link>
        </div>

        {/* Feature Cards Showcase */}
        <div className={styles.features}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <Terminal size={22} />
            </div>
            <h3 className={styles.cardTitle}>Technical Curriculums</h3>
            <p className={styles.cardDesc}>Courses tailored specifically around system design, data structures, and production patterns.</p>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <BookOpen size={22} />
            </div>
            <h3 className={styles.cardTitle}>Structured Learning</h3>
            <p className={styles.cardDesc}>Step-by-step pathways designed by software architects to take you from core basics to high autonomy.</p>
          </div>
        </div>
      </section>
    </main>
  );
}