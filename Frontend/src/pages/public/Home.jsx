import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '16px', color: 'black' }}>
          Welcome to <span style={{ color: '#0FAF1A' }}>Qrave</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '40px' }}>
          Your ultimate restaurant companion. Discover menus, book tables, and dine with ease.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link
            to="/login"
            style={{ 
              backgroundColor: '#0FAF1A', 
              color: 'white', 
              padding: '14px 32px', 
              borderRadius: '10px', 
              fontSize: '1.1rem', 
              fontWeight: 'bold', 
              textDecoration: 'none', 
              boxShadow: '0 4px 6px rgba(15, 175, 26, 0.2)',
              transition: 'all 0.2s' 
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0c9616'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#0FAF1A'}
          >
            Sign In
          </Link>
          <Link
            to="/menu"
            style={{ 
              border: '2px solid #0FAF1A', 
              color: '#0FAF1A', 
              padding: '12px 32px', 
              borderRadius: '10px', 
              fontSize: '1.1rem', 
              fontWeight: 'bold', 
              textDecoration: 'none', 
              transition: 'all 0.2s' 
            }}
            onMouseOver={(e) => { e.target.style.backgroundColor = '#0FAF1A'; e.target.style.color = 'white'; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#0FAF1A'; }}
          >
            Explore Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
