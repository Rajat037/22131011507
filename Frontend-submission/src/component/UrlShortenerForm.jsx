import React, { useState } from "react";
import { shortenUrls } from "../Api";
import { validateUrl, validateShortcode } from "../Utils";
import ShortenedLinksList from "./ShortenedLinksList";

export default function UrlShortenerForm() {
  const [inputs, setInputs] = useState([
    { url: "", validity: "", shortcode: "" },
  ]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const addInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: "", validity: "", shortcode: "" }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    for (const input of inputs) {
      if (!validateUrl(input.url)) {
        alert(`Invalid URL: ${input.url}`);
        return;
      }
      if (input.validity && isNaN(input.validity)) {
        alert(`Invalid validity: ${input.validity}`);
        return;
      }
      if (input.shortcode && !validateShortcode(input.shortcode)) {
        alert(`Invalid shortcode: ${input.shortcode}`);
        return;
      }
    }

    // Call backend
    const data = await shortenUrls(inputs);
    setResults(data);
  };

  return (
    <div>
      <h2>Shorten URLs</h2>
      <form onSubmit={handleSubmit}>
        {inputs.map((input, index) => (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="Long URL"
              value={input.url}
              onChange={(e) => handleChange(index, "url", e.target.value)}
              required
              style={{ width: "300px" }}
            />
            <input
              type="text"
              placeholder="Validity (minutes)"
              value={input.validity}
              onChange={(e) => handleChange(index, "validity", e.target.value)}
              style={{ width: "150px", marginLeft: "10px" }}
            />
            <input
              type="text"
              placeholder="Shortcode (optional)"
              value={input.shortcode}
              onChange={(e) => handleChange(index, "shortcode", e.target.value)}
              style={{ width: "150px", marginLeft: "10px" }}
            />
          </div>
        ))}
        {inputs.length < 5 && (
          <button type="button" onClick={addInput}>
            + Add URL
          </button>
        )}
        <br />
        <button type="submit">Shorten</button>
      </form>

      {results.length > 0 && <ShortenedLinksList links={results} />}
    </div>
  );
}
