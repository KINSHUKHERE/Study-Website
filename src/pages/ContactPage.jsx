import React, { useState } from 'react';
import { Mail, Send, Info, Phone, ExternalLink } from 'lucide-react';
import Youtube from '../components/YoutubeIcon';
import FloatingInput from '../components/FloatingInput';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Construct WhatsApp message text
    const text = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not Provided'}\nMessage: ${formData.message}`;
    
    // Redirect to Pankaj Gadwal's WhatsApp number
    const whatsappNumber = '919413436533';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    
    // Open in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container section-padding animate-fade" style={{ paddingTop: '2.5rem' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Contact & Links</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Have a question or query? Connect with Pankaj Sir directly via WhatsApp, Telegram, or YouTube!
        </p>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        maxWidth: '650px',
        margin: '0 auto'
      }}>
        {/* Quick Social Contact Cards */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <a href="https://www.youtube.com/@TrigTechSolutions/" target="_blank" rel="noreferrer" className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.5rem', borderRadius: 'var(--border-radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Youtube size={24} fill="#ef4444" />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>YouTube Channel</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>@TrigTechSolutions</p>
            </div>
          </a>

          <a href="https://t.me/TrigTechMath" target="_blank" rel="noreferrer" className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '0.5rem', borderRadius: 'var(--border-radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Send a WhatsApp Message</h3>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FloatingInput 
              label="Name" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            
            <FloatingInput 
              label="Email Address" 
              type="email"
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />

            <FloatingInput 
              label="Phone (Optional)" 
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />

            <FloatingInput 
              label="Message / Query" 
              type="textarea"
              required 
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />

            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', gap: '0.5rem' }}>
              Open WhatsApp Chat <ExternalLink size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
