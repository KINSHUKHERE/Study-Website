import React, { useState, useEffect } from 'react';
import { Search, FileDown } from 'lucide-react';
import NotesCard from '../components/NotesCard';

export default function Notes({ notes, initialSearchQuery, clearSearchQuery }) {
  const [search, setSearch] = useState(initialSearchQuery || '');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (initialSearchQuery) {
      setSearch(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Unique categories
  const categories = ['All', ...new Set(notes.map(n => n.category))];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) || 
                          note.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container section-padding animate-fade" style={{ paddingTop: '2.5rem' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Handwritten Notes & PDFs</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Download class lecture notes, revision sheets, and solved previous year question papers directly.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel" style={{
        padding: '1rem 1.5rem',
        marginBottom: '2.5rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        {/* Search */}
        <div style={{
          position: 'relative',
          flex: '1 1 300px',
          maxWidth: '450px'
        }}>
          <input 
            type="text" 
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (clearSearchQuery) clearSearchQuery();
            }}
            placeholder="Search notes..."
            className="input-field"
            style={{ paddingLeft: '2.75rem' }}
          />
          <Search 
            size={18} 
            color="var(--text-muted)" 
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} 
          />
        </div>

        {/* Categories filters */}
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1" style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {filteredNotes.map(note => (
            <div key={note.id}>
              <NotesCard note={note} />
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <FileDown size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No notes found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search query or topic filters.</p>
        </div>
      )}
    </div>
  );
}
