export async function shortenUrls(urls) {
  const res = await fetch("http://localhost:5000/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ urls }),
  });

  const data = await res.json();

  // Store in localStorage for stats page
  let stored = JSON.parse(localStorage.getItem("shortenedLinks") || "[]");
  localStorage.setItem("shortenedLinks", JSON.stringify([...stored, ...data]));

  return data;
}
