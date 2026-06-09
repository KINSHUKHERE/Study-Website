import React from 'react';
import { BookOpen, Award, CheckCircle, Terminal, HelpCircle, Code, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const learningCards = [
    {
      title: "Engineering Math (RTU Kota)",
      desc: "Comprehensive syllabus coverage for RTU Kota first-year and second-year B.Tech engineering mathematics, including multivariable calculus, LDE, and random variables.",
      icon: <Award size={24} color="var(--primary)" />
    },
    {
      title: "NEET Math & Concepts",
      desc: "Structured short lectures and quick-revision conceptual classes to help medical students master foundational mathematics needed for physics and chemistry.",
      icon: <BookOpen size={24} color="var(--accent-purple)" />
    },
    {
      title: "Excel & Automation",
      desc: "Practical guides on automating repetitive tasks using Python, Excel shortcuts, and custom scripting tools to boost your daily data productivity.",
      icon: <Terminal size={24} color="var(--accent-green)" />
    },
    {
      title: "Trigonometry & Calculus",
      desc: "Core mathematical tutorials covering standard limits, derivatives, integration, and trigonometric identities designed for high school and college students.",
      icon: <Code size={24} color="var(--accent-blue)" />
    }
  ];

  const highlights = [
    {
      title: "100% Free Material",
      desc: "All video lectures and handwritten PDF notes are completely free, with no paywalls or registration required."
    },
    {
      title: "Handwritten PDFs",
      desc: "Access beautifully drafted classroom notes designed specifically for quick revision before exams."
    },
    {
      title: "Direct Doubt Support",
      desc: "Join our active Telegram channel and group for daily updates and peer-to-peer query support."
    },
    {
      title: "Conceptual Focus",
      desc: "Skip the memorization. Understand 'why' the mathematical formulas and code scripts work from the ground up."
    }
  ];

  return (
    <div className="container section-padding animate-fade" style={{ paddingTop: '2.5rem' }}>
      
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        borderRadius: 'var(--border-radius-lg)',
        padding: '3.5rem 2rem',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.04) 100%)',
        border: '1px solid var(--border-color)',
        marginBottom: '4rem',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>Instructor Profile</span>
          <h1 className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '0.75rem' }}>
            Pankaj Gadwal
          </h1>
          <p style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            letterSpacing: '0.5px'
          }}>
            Math & Tech Educator | RTU Kota Specialist
          </p>
        </div>
      </section>

      {/* Bio Section with Glass Image Slot */}
      <section style={{ marginBottom: '5rem' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '3rem',
          alignItems: 'center'
        }}>
          {/* Bio text (Left) */}
          <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Teaching with Clarity & Logic</h2>
            
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              Welcome to TrigTech! I am Pankaj Gadwal, an educator passionate about simplifying mathematics and technology. My mission is to make advanced topics in college-level engineering math, school calculus, and tech automation accessible and engaging for students worldwide.
            </p>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              For engineering students under Rajasthan Technical University (RTU Kota), I offer highly tailored tutorials that align directly with your semester syllabus. We cover complex topics such as linear differential equations (LDE), multivariable differentiation, and random probability variables with step-by-step clarity to ensure you excel in your exams.
            </p>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              Beyond math, I produce short, highly practical guides on daily Excel shortcuts, automated desktop scripting, and Python utilities. By combining analytical mathematical principles with modern software tools, TrigTech equips you with both academic qualifications and practical tech skills.
            </p>
          </div>

          {/* Instructor Image Frame (Right) */}
          <div style={{ 
            flex: '1 1 300px', 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div className="glass-panel instructor-card" style={{
              width: '100%',
              maxWidth: '350px',
              aspectRatio: '1/1',
              borderRadius: 'var(--border-radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative',
              cursor: 'pointer'
            }}>
              {/* Full Image */}
              <img 
                src="/pankaj_sir.jpg" 
                alt="Pankaj Gadwal" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              
              {/* Overlay Glassmorphic Name Tag */}
              <div className="name-tag" style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'max-content',
                maxWidth: '90%',
                background: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--border-radius-md)',
                padding: '0.75rem 1.5rem',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 700, 
                  margin: 0, 
                  color: '#ffffff',
                  letterSpacing: '0.5px',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                }}>
                  Pankaj Gadwal
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "What you'll learn here" Section */}
      <section style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>Curriculum</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>What You'll Learn Here</h2>
        </div>

        <div className="grid grid-cols-1 grid-cols-2" style={{ gap: '1.5rem' }}>
          {learningCards.map((card, idx) => (
            <motion.div 
              key={idx} 
              className="glass-panel glass-panel-interactive" 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05, ease: 'easeOut' }}
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{
                background: 'var(--bg-tertiary)',
                width: '3.2rem',
                height: '3.2rem',
                borderRadius: 'var(--border-radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border-color)'
              }}>
                {card.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{card.title}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Value Highlights Row */}
      <section style={{
        background: 'var(--bg-secondary)',
        padding: '4rem 2rem',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>The TrigTech Value</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Quality study materials designed around student success</p>
        </div>

        <div className="grid grid-cols-1" style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem'
        }}>
          {highlights.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div className="flex items-center gap-2" style={{ color: 'var(--accent-green)' }}>
                <ShieldCheck size={20} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</h4>
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .instructor-card {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.4s ease, box-shadow 0.4s ease !important;
        }
        .instructor-card img {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }
        .instructor-card .name-tag {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease, border-color 0.3s ease !important;
        }
        .instructor-card:hover {
          transform: translateY(-6px);
          border-color: rgba(99, 102, 241, 0.4) !important;
          box-shadow: 0 16px 36px rgba(99, 102, 241, 0.25) !important;
        }
        .instructor-card:hover img {
          transform: scale(1.05);
        }
        .instructor-card:hover .name-tag {
          transform: translateX(-50%) translateY(-2px) scale(1.02) !important;
          background: rgba(99, 102, 241, 0.75) !important;
          border-color: rgba(255, 255, 255, 0.25) !important;
        }
      `}</style>

    </div>
  );
}
