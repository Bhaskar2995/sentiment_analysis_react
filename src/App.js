import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://35.224.157.50/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setSentiment(data.sentiment || "No sentiment detected.");
    } catch (error) {
      console.log("Error:", error);
      setSentiment("Error: Unable to analyze sentiment.");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Sentiment Analyzer</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="6"
        cols="50"
        placeholder="Enter your text here..."
      />
      <br />
      <button onClick={analyzeSentiment} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>
      <div style={
        { marginTop: "20px", fontSize: "18px" }}>
        {sentiment && <p><strong>Sentiment:</strong> {sentiment}</p>}
      </div>
    </div>
  );
}

export default App;
