import React from "react";

export default function ShortenedLinksList({ links }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Shortened Links</h3>
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
    </div>
  );
}
