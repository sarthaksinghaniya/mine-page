

export default function ResumeCenterComponent() {
  return (
    <div style={{ padding: '24px', color: '#fff', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#00e5f0' }}>Resume Center</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Professional experience and qualifications.</p>
        </div>
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#00e5f0', 
          color: '#000', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          DOWNLOAD PDF
        </button>
      </div>

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(0, 229, 240, 0.2)',
        borderRadius: '8px',
        padding: '32px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h3 style={{ color: '#00e5f0', borderBottom: '1px solid rgba(0,229,240,0.3)', paddingBottom: '8px', marginBottom: '16px' }}>
          EDUCATION
        </h3>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong style={{ fontSize: '18px' }}>B.Tech in Computer Science</strong>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>2023 - 2027</span>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>Indian Institute of Information Technology, Nagpur</div>
        </div>

        <h3 style={{ color: '#00e5f0', borderBottom: '1px solid rgba(0,229,240,0.3)', paddingBottom: '8px', marginBottom: '16px' }}>
          EXPERIENCE
        </h3>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong style={{ fontSize: '18px' }}>Software Engineer Intern</strong>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>Summer 2026</span>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>Tech Corp</div>
          <ul style={{ color: 'rgba(255,255,255,0.6)', marginTop: '8px', paddingLeft: '20px' }}>
            <li>Built the Portfolio Intelligence System using React, GSAP, and Three.js.</li>
            <li>Implemented a robust CacheManager and RequestManager reducing API latency by 60%.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
