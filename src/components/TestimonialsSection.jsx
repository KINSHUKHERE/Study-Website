import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  // --- DATABASE BINDING POINT ---
  // Replace this static array with fetched/live feedback data from Google Sheets or Firestore in the future.
  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      course: "Engineering Math (RTU Kota)",
      quote: "Pankaj Sir's lectures are incredibly conceptual. The way he breaks down multivariable calculus and differential equations helped me score a perfect back-free grade in my semester exams!",
      rating: 5,
      isVerified: true
    },
    {
      id: 2,
      name: "Amit Verma",
      course: "NEET Math & Tricks",
      quote: "The shorts on trigonometry and basic calculus saved me so much time during my NEET preparations. His hand-drawn notes are exceptionally helpful for quick formula revisions!",
      rating: 4,
      isVerified: true
    },
    {
      id: 3,
      name: "Priya Patel",
      course: "Excel & Web Automation",
      quote: "I watched the Python and Excel automation playlists. The step-by-step demonstrations are clear, concise, and directly applicable. Pankaj Sir is a phenomenal educator!",
      rating: 5,
      isVerified: true
    }
  ];

  return (
    <section className="section-padding" style={{
      background: 'radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.05), transparent 40%)',
      borderTop: '1px solid var(--border-color)'
    }}>
      <div className="container">
        
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>Reviews</span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800 }}>What Students Say</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
            Hear from students who successfully cleared engineering exams and mastered automation skills using TrigTech.
          </p>
        </div>

        {/* Scrollable Container / Grid */}
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div 
              key={t.id} 
              className="glass-panel testimonial-card" 
              style={{
                padding: '2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.25rem',
                height: '100%',
                border: '1px solid var(--border-color)',
                position: 'relative'
              }}
            >
              {/* Star Rating & Verified Badge */}
              <div className="flex justify-between items-center">
                <div className="flex gap-1" style={{ color: '#fbbf24' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < t.rating ? '#fbbf24' : 'none'} 
                      color={i < t.rating ? '#fbbf24' : 'var(--text-muted)'} 
                    />
                  ))}
                </div>
                {t.isVerified && (
                  <span className="badge badge-green" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>
                    Verified
                  </span>
                )}
              </div>

              {/* Quote */}
              <p style={{
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: 'var(--text-primary)',
                fontStyle: 'italic',
                margin: 0
              }}>
                "{t.quote}"
              </p>

              {/* User Bio */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: 'auto' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', margin: 0 }}>
                  {t.name}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.1rem 0 0 0' }}>
                  Student of {t.course}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scoped Styling for Desktop Grid vs Mobile Horizontal Scroll */}
      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .testimonials-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 1.25rem;
            padding: 0.5rem 0.25rem 1.5rem 0.25rem;
            scrollbar-width: thin;
            -webkit-overflow-scrolling: touch;
          }
          
          .testimonial-card {
            flex: 0 0 85%;
            scroll-snap-align: center;
          }
        }
      `}</style>
    </section>
  );
}
