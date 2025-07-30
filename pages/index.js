import { logPathVisit } from '../lib/db';

export default function HomePage() {

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        marginBottom: '10px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        🎲 Random Name Generator
      </h1>
      
      <p style={{ 
        fontSize: '1.2rem', 
        marginBottom: '40px',
        opacity: '0.9'
      }}>
        Generate random names for any purpose!
      </p>
      
      {/* <div style={{ marginBottom: '30px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '15px',
          fontSize: '1.1rem',
          fontWeight: 'bold'
        }}>
          Choose Name Type:
        </label>
        <select 
          value={nameType} 
          onChange={(e) => setNameType(e.target.value)}
          style={{ 
            padding: '10px 15px',
            fontSize: '16px',
            borderRadius: '25px',
            border: 'none',
            marginRight: '10px',
            background: 'white',
            color: '#333',
            cursor: 'pointer'
          }}
        >
          <option value="full">Full Name</option>
          <option value="first">First Name Only</option>
          <option value="business">Business Name</option>
          <option value="pet">Pet Name</option>
          <option value="username">Username</option>
        </select>
      </div>
      
      <button 
        onClick={generateName}
        style={{ 
          padding: '15px 30px',
          fontSize: '1.2rem',
          backgroundColor: '#ff6b6b',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          transition: 'transform 0.2s',
          marginBottom: '30px'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        ✨ Generate Random Name
      </button> */}
      
      <div style={{ 
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: '30px',
        borderRadius: '20px',
        marginBottom: '30px',
        backdropFilter: 'blur(10px)'
      }}>
        <p style={{ 
          fontSize: '1.3rem',
          margin: '0',
          color: '#fff',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
        }}>
          {`Let's go to https://name-generator-d7osfo7zk-sinclairs-projects-554cd551.vercel.app/name?name={name} to get the random name!`}
        </p>
      </div>

      
      

      
      <div style={{ 
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: '20px',
        borderRadius: '15px',
        marginTop: '30px'
      }}>
        <h3 style={{ marginTop: '0' }}>Perfect for:</h3>
        <p>✓ Characters in stories • ✓ Baby names • ✓ Pet names • ✓ Business ideas • ✓ Usernames • ✓ Gaming characters</p>
      </div>
    </div>
  );
}

// Server-side props to log the path visit
export async function getServerSideProps(context) {
  const { req } = context;
  const path = '/'; // Root page is always '/'
  
  // Skip logging favicon requests
  if (path.includes('favicon')) {
    return {
      props: {}
    };
  }
  
  // Get user agent and IP
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] || 
                   req.headers['x-real-ip'] || 
                   req.connection.remoteAddress || 
                   'Unknown';

  // Log the path visit (don't let errors break the page)
  try {
    await logPathVisit(path, userAgent, ipAddress);
  } catch (error) {
    console.error('Failed to log path visit:', error);
  }

  return {
    props: {}
  };
}
