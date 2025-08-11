import React, { useEffect, useState } from "react";
import Widget from "../Widget";
import "./PremierLeagueScores.css";

export default function PremierLeagueScores({ config }) {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch(
          "https://api.football-data.org/v2/competitions/PL/matches?status=FINISHED",
          {
            headers: { "X-Auth-Token": config.apiKey }
          }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setMatches((data.matches || []).slice(-10).reverse());
        setError(null);
      } catch (e) {
        console.error("Error fetching PL scores:", e);
        setError("Unable to load Premier League results");
      }
    };

    fetchScores();
    const interval = setInterval(fetchScores, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, [config.apiKey]);

  return (
    <Widget title="Premier League Results">
      {error && <div className="pl-error">{error}</div>}
      <div className="pl-container">
        {matches.map((m, idx) => {
          const date = new Date(m.utcDate);
          const dateStr = date.toLocaleDateString(undefined, {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric"
          });
          return (
            <div key={idx} className="pl-match">
              <div className="pl-score-line">
                <span className="home">{m.homeTeam.name}</span>
                <span className="score">
                  {m.score.fullTime.homeTeam} – {m.score.fullTime.awayTeam}
                </span>
                <span className="away">{m.awayTeam.name}</span>
              </div>
              <div className="pl-date">{dateStr}</div>
            </div>
          );
        })}
      </div>
    </Widget>
  );
}
