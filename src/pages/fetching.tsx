import { useEffect, useState } from 'react';

type Person = {
  name: string;
  achievement: string;
  image: string;
};

type ApiResponse = {
  achievements: Person[];
  members: Person[];
  mentors: Person[];
  events: string[]; // event images URLs
};

export default function DataDisplay() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/fetch')  // replace with your actual API route
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data available.</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      {/* Achievements Section */}
      <section>
        <h2>Achievements</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {data.achievements.map(({ name, achievement, image }, i) => (
            <div key={i} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 10, width: 200 }}>
              {image && <img src={image} alt={name} style={{ width: '100%', borderRadius: 8 }} />}
              <h3>{name}</h3>
              <p>{achievement}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Members Section */}
      <section style={{ marginTop: '40px' }}>
        <h2>Members</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {data.members.map(({ name, achievement, image }, i) => (
            <div key={i} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 10, width: 200 }}>
              {image && <img src={image} alt={name} style={{ width: '100%', borderRadius: 8 }} />}
              <h3>{name}</h3>
              <p>{achievement}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mentors Section */}
      <section style={{ marginTop: '40px' }}>
        <h2>Mentors</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {data.mentors.map(({ name, achievement, image }, i) => (
            <div key={i} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 10, width: 200 }}>
              {image && <img src={image} alt={name} style={{ width: '100%', borderRadius: 8 }} />}
              <h3>{name}</h3>
              <p>{achievement}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section style={{ marginTop: '40px' }}>
        <h2>Events</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {data.events.map((imgUrl, i) => (
            <div key={i} style={{ width: 200 }}>
              <img src={imgUrl} alt={`Event ${i + 1}`} style={{ width: '100%', borderRadius: 8 }} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
