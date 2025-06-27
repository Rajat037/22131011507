import React, { useEffect, useState } from "react";

export default function StatisticsPage() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    // For now, load from localStorage or dummy data.
    const stored = localStorage.getItem("shortenedLinks");
    if (stored) {
      setLinks(JSON.parse(stored));
    }
  }, []);

  return (
    <div>
      <h2>URL Shortener Statistics</h2>
      {links.length === 0 ? (
        <p>No shortened URLs yet.</p>
      ) : (
        <ul>
          {links.map((link, idx) => (
            <li key={idx}>
              <strong>Original:</strong> {link.originalUrl} <br />
              <strong>Short:</strong>{" "}
              <a href={link.shortUrl} target="_blank" rel="noreferrer">
                {link.shortUrl}
              </a>{" "}
              <br />
              <strong>Expires At:</strong> {link.expiresAt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
