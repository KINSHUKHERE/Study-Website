import React from 'react';

export default function FloatingInput({ label, type = 'text', value, onChange, required = false, name, rows }) {
  const isTextArea = type === 'textarea';
  
  return (
    <div className="floating-input-container" style={{ position: 'relative', width: '100%' }}>
      {isTextArea ? (
        <textarea
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          placeholder=" "
          rows={rows || 4}
          className="floating-input"
          style={{
            width: '100%',
            padding: '1.5rem 1rem 0.5rem 1rem',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--border-radius-md)',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            outline: 'none',
            resize: 'none',
            fontFamily: 'var(--font-body)',
            transition: 'all var(--transition-fast)'
          }}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          placeholder=" "
          className="floating-input"
          style={{
            width: '100%',
            padding: '1.5rem 1rem 0.5rem 1rem',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--border-radius-md)',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            outline: 'none',
            fontFamily: 'var(--font-body)',
            transition: 'all var(--transition-fast)'
          }}
        />
      )}
      <label 
        className="floating-label"
        style={{
          position: 'absolute',
          left: '1rem',
          top: isTextArea ? '1.25rem' : '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)',
          fontSize: '1rem',
          pointerEvents: 'none',
          transition: 'all 0.18s ease-in-out',
          fontWeight: 500
        }}
      >
        {label}
      </label>

      <style>{`
        .floating-input:focus {
          border-color: var(--primary) !important;
          box-shadow: 0 0 0 2px var(--primary-glow) !important;
        }
        .floating-input:focus ~ .floating-label,
        .floating-input:not(:placeholder-shown) ~ .floating-label {
          top: 0.45rem !important;
          transform: translateY(0) !important;
          font-size: 0.75rem !important;
          color: var(--primary) !important;
        }
      `}</style>
    </div>
  );
}
