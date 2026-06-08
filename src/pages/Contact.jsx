import React, { useState } from 'react';
import { Mail, Send, Info, CheckCircle2, ChevronRight } from 'lucide-react';
import Youtube from '../components/YoutubeIcon';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container section-padding animate-fade" style={{ paddingTop: '2.5rem' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Contact & Info</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Connect with the TrigTech instructor or set up this website database.
        </p>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '3rem',
        alignItems: 'flex-start'
      }}>
        {/* Contact Info & Form (Left side) */}
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Social cards */}
          <div className="grid grid-cols-1 grid-cols-2" style={{ gap: '1rem' }}>
            <a href="https://www.youtube.com/@TrigTechSolutions/" target="_blank" rel="noreferrer" className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.5rem', borderRadius: 'var(--border-radius-sm)' }}>
                <Youtube size={24} fill="#ef4444" />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>YouTube Channel</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>@TrigTechSolutions</p>
              </div>
            </a>

            <a href="https://t.me/TrigTechMath" target="_blank" rel="noreferrer" className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '0.5rem', borderRadius: 'var(--border-radius-sm)' }}>
                <Send size={20} fill="#3b82f6" />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Telegram Channel</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>@TrigTechMath</p>
              </div>
            </a>
          </div>

          {/* Form */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Send a Message</h3>
            
            {submitted ? (
              <div className="flex flex-col items-center justify-center" style={{
                textAlign: 'center',
                padding: '2rem 0',
                background: 'rgba(16, 185, 129, 0.05)',
                border: '1px dashed var(--accent-green)',
                borderRadius: 'var(--border-radius-md)',
                gap: '0.5rem'
              }}>
                <CheckCircle2 size={40} color="var(--accent-green)" />
                <h4 style={{ fontSize: '1.15rem', color: 'var(--accent-green)' }}>Message Sent Successfully!</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '300px' }}>
                  Thank you for reaching out. We will get back to you shortly.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-secondary" style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name" 
                    className="input-field" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Email</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your email" 
                    className="input-field" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Message</label>
                  <textarea 
                    required 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Write your message here..." 
                    className="input-field" 
                    style={{ resize: 'none' }}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Submit Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Database instructions Card (Right side) */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{
            padding: '2rem',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            boxShadow: '0 4px 20px rgba(168, 85, 247, 0.05)'
          }}>
            <div className="flex items-center gap-2" style={{ color: 'var(--accent-purple)', marginBottom: '1.25rem' }}>
              <Info size={24} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Google Sheets Database Guide</h3>
            </div>
            
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              This website fetches its content directly from Google Sheets! Follow these instructions to link your own sheet so you can upload notes and lectures on the fly.
            </p>

            <ul style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{
                  background: 'var(--accent-purple)',
                  color: '#fff',
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  flexShrink: 0
                }}>1</span>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Create Spreadsheet</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
                    Create a sheet with these exact column headers in Row 1: <br />
                    <code>Title</code>, <code>Type</code>, <code>URL</code>, <code>Category</code>, <code>Description</code>, <code>Date</code>, <code>SecondaryURL</code>
                  </p>
                </div>
              </li>

              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{
                  background: 'var(--accent-purple)',
                  color: '#fff',
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  flexShrink: 0
                }}>2</span>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Add your Data</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
                    - Set <code>Type</code> to either <code>video</code> or <code>note</code>.<br />
                    - Put YouTube links in <code>URL</code> for videos.<br />
                    - Put Telegram PDF links in <code>URL</code> for notes.
                  </p>
                </div>
              </li>

              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{
                  background: 'var(--accent-purple)',
                  color: '#fff',
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  flexShrink: 0
                }}>3</span>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Publish / Share Sheet</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
                    Click <strong>Share</strong> in the top right, change the General access to <strong>"Anyone with the link can view"</strong>.
                  </p>
                </div>
              </li>

              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{
                  background: 'var(--accent-purple)',
                  color: '#fff',
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  flexShrink: 0
                }}>4</span>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Update Code Variable</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
                    Copy the Sheet ID from the URL and paste it in `src/services/sheetsService.js` under the <code>SHEET_ID</code> variable.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
