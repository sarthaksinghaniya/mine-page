import React, { useState } from 'react';

export default function ContactCenterComponent() {
  const [copied, setCopied] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => { setCopied(null); }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    // Simulate network request
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => { setFormStatus('idle'); }, 3000);
    }, 1500);
  };

  return (
    <div style={{ padding: '24px', color: '#fff', height: '100%', overflowY: 'auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#00e5f0' }}>Contact Center</h2>
      <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '32px' }}>
        Establish a direct connection. Secure channel open.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        
        {/* Direct Messaging Form */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(0, 229, 240, 0.2)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '24px', color: '#00e5f0' }}>Direct Message</h3>
          
          {formStatus === 'success' ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#00ff66' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
              <h4 style={{ margin: 0 }}>Transmission Successful</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>I will reply shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input 
                type="text" 
                placeholder="Identification (Name)" 
                required 
                style={{ padding: '12px', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px' }}
              />
              <input 
                type="email" 
                placeholder="Return Address (Email)" 
                required 
                style={{ padding: '12px', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px' }}
              />
              <textarea 
                placeholder="Payload (Message)" 
                rows={5} 
                required 
                style={{ padding: '12px', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px', resize: 'none' }}
              />
              <button 
                type="submit" 
                disabled={formStatus === 'sending'}
                style={{ 
                  padding: '12px', 
                  backgroundColor: formStatus === 'sending' ? 'rgba(0,229,240,0.2)' : '#00e5f0', 
                  color: formStatus === 'sending' ? '#00e5f0' : '#000', 
                  border: 'none', 
                  borderRadius: '4px', 
                  fontWeight: 'bold',
                  cursor: formStatus === 'sending' ? 'wait' : 'pointer'
                }}
              >
                {formStatus === 'sending' ? 'TRANSMITTING...' : 'INITIALIZE UPLOAD'}
              </button>
            </form>
          )}
        </div>

        {/* Social Links & Directory */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ margin: 0, color: '#00e5f0' }}>Public Directory</h3>
          
          {[
            { label: 'Email', value: 'hello@sarthak.dev', icon: '✉️' },
            { label: 'LinkedIn', value: 'linkedin.com/in/sarthak', icon: '🔗' },
            { label: 'GitHub', value: 'github.com/sarthaksinghaniya', icon: '💻' }
          ].map(link => (
            <div key={link.label} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: '16px',
              borderRadius: '8px',
              borderLeft: '4px solid #00e5f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>{link.icon}</span>
                <div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>{link.label}</div>
                  <div style={{ fontSize: '16px' }}>{link.value}</div>
                </div>
              </div>
              <button 
                onClick={() => { handleCopy(link.value, link.label); }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(0, 229, 240, 0.5)',
                  color: '#00e5f0',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(0, 229, 240, 0.1)'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {copied === link.label ? 'COPIED' : 'COPY'}
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
