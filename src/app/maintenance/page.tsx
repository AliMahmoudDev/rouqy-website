export default function MaintenancePage() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#0b2b2a',
        fontFamily: "'Outfit', sans-serif",
        color: 'white',
      }}
    >
      <div style={{ textAlign: 'center', padding: '24px' }}>
        <img
          src="/logo.svg"
          alt="ROUQY"
          style={{
            width: '100px',
            marginBottom: '48px',
            opacity: 0.4,
          }}
        />
        <h1
          style={{
            fontWeight: 200,
            fontSize: 'clamp(22px, 4vw, 32px)',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          Under Maintenance
        </h1>
        <div
          style={{
            width: '40px',
            height: '1px',
            background: 'rgba(255,255,255,0.2)',
            margin: '0 auto 20px',
          }}
        />
        <p
          style={{
            fontWeight: 300,
            fontSize: '15px',
            opacity: 0.4,
            letterSpacing: '2px',
            lineHeight: 1.8,
          }}
        >
          We&apos;ll be back soon
        </p>
      </div>
    </div>
  );
}
