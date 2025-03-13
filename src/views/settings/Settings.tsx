import React from "react";
import { FormattedMessage } from "react-intl";
import { UiContext } from "../../contexts/ui";
import { exportStore, importStore, resetStore } from "../../db/action";
import { useKeyPress } from "../../hooks";
import { Icon } from "@iconify/react";
import Logo from "../shared/Logo";
import Background from "./Background";
import Persist from "./Persist";
import "./Settings.sass";
import System from "./System";
import Widgets from "./Widgets";
import GitHubButton from "react-github-btn";
import { db } from "../../db/state";
import { useKey, useValue } from "../../lib/db/react";

const Settings: React.FC = () => {
  const { toggleSettings } = React.useContext(UiContext);
  const [settingsIconPosition] = useKey(db, "settingsIconPosition");
  const darkMode = useValue(db, "darkMode");

  const settingsOnRight = settingsIconPosition === "bottomRight" || settingsIconPosition === "topRight";

  const handleReset = () => {
    if (
      confirm(
        "Are you sure you want to delete all of your Tabliss settings? This cannot be undone.",
      )
    )
      resetStore();
  };

  const handleExport = () => {
    const json = exportStore();
    const url = URL.createObjectURL(
      new Blob([json], { type: "application/json" }),
    );

    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    a.href = url;
    a.download = "tabliss.json";
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    document.body.appendChild(input);
    input.style.display = "none";
    input.type = "file";
    input.addEventListener("change", function () {
      if (this.files) {
        const file = this.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
          if (event.target && event.target.result) {
            try {
              const state = JSON.parse(event.target.result as string);
              importStore(state);
            } catch (error) {
              alert(
                `Invalid import file: ${
                  error instanceof Error ? error.message : "Uknown error"
                }`,
              );
            }
          }
        });
        reader.readAsText(file);
      }
      document.body.removeChild(input);
    });
    input.click();
  };

  useKeyPress(toggleSettings, ["Escape"]);

  return (
    <div className="Settings">
      <a onClick={toggleSettings} className="fullscreen" />

      <div className="plane" style={{ left: settingsOnRight ? "auto" : 0, right: settingsOnRight ? 0 : "auto", borderRadius: settingsOnRight ? "1rem 0 0 1rem" : "0 1rem 1rem 0" }}>
        <Logo />
        <div style={{
          textAlign: "center",
          margin: "-0.5rem 0 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem"
        }}>
          <span style={{
            background: darkMode ? "#2d2d2d" : "#f0f0f0",
            padding: "0.3rem 0.8rem",
            borderRadius: "1rem",
            fontSize: "0.9rem",
            color: darkMode ? "#e0e0e0" : "#666",
            fontWeight: 500,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem"
          }}>
            <Icon icon="feather:tag" style={{ fontSize: "0.9em" }} />
            Tabliss Maintained v{VERSION} {DEV ? "DEV " : ""}
          </span>
        </div>
        <p style={{ textAlign: "center", marginTop: 0, marginBottom: 0 }}>
          <GitHubButton
            href="https://github.com/BookCatKid/tabliss-maintained/subscription"
            data-icon="octicon-eye"
            data-size="large"
            data-show-count="true"
            data-color-scheme={darkMode ? "dark" : "light"}
            aria-label="Watch BookCatKid/tabliss-maintained on GitHub"
          >
            Watch
          </GitHubButton>
          <span style={{ margin: "0 1rem" }} />
          <GitHubButton
            href="https://github.com/BookCatKid/tabliss-maintained"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            data-color-scheme={darkMode ? "dark" : "light"}
            aria-label="Star BookCatKid/tabliss-maintained on GitHub"
          >
            Star
          </GitHubButton>
        </p>
        <Background />
        <Widgets />
        <System />
        <p style={{ marginBottom: "2rem" }}>
          <a onClick={handleImport}>Import</a>,{" "}
          <a onClick={handleExport}>export</a> or{" "}
          <a onClick={handleReset}>reset</a> your settings
        </p>
        <Persist />
        <div style={{ textAlign: "center" }} className="Widget">
          <h4>Support Tabliss - Maintained</h4>
          <p>
            <a
              href="https://github.com/BookCatKid/tabliss-maintained"
              target="_blank"
              rel="noopener noreferrer"
              className="button button--primary"
            >
              <Icon icon="feather:github" /> Star the github repository! 🌟😍
            </a>
          </p>
          <p style={{ marginTop: "1rem" }} className="Widget">
            <a
              href="https://github.com/BookCatKid/tabliss-maintained/blob/master/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="button button--primary"
            >
              <Icon icon="feather:code" /> Contribute to the project! 😍🌟
            </a>
          </p>
        </div>

        <FormattedMessage
          id="settings.translationCredits"
          description="Give yourself some credit :)"
          defaultMessage=" "
          tagName="p"
        />
      </div>
    </div>
  );
};

export default React.memo(Settings);
