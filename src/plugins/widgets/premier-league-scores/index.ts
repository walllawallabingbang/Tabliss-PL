import { Widget } from "@/types/widgets";
import html from "./widget.html";
import css from "./widget.css?inline";

const PremierLeagueScores: Widget = {
  name: "Premier League Scores",
  id: "premier-league-scores",
  description: "Shows the last 10 Premier League results",
  categories: ["sports"],
  component: () => {
    const container = document.createElement("div");
    container.innerHTML = html;
    const style = document.createElement("style");
    style.textContent = css;
    container.appendChild(style);
    return container;
  },
};

export default PremierLeagueScores;
