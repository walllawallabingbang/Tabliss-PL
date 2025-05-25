import React, { useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { setBackground } from "../../db/action";
import { BackgroundDisplay, db } from "../../db/state";
import { useKey } from "../../lib/db/react";
import { backgroundConfigs, getConfig } from "../../plugins";
import Plugin from "../shared/Plugin";
import ToggleSection from "../shared/ToggleSection";

const Background: React.FC = () => {
  const [data, setData] = useKey(db, "background");
  const intl = useIntl();
  const plugin = getConfig(data.key);

  const sortedBackgroundConfigs = useMemo(() => {
    return [...backgroundConfigs].sort((a, b) => {
      const nameA = intl.formatMessage(a.name);
      const nameB = intl.formatMessage(b.name);
      return nameA.localeCompare(nameB);
    });
  }, [intl]);

  const setBackgroundDisplay = (display: BackgroundDisplay): void => {
    setData({ ...data, display: { ...data.display, ...display } });
  };

  return (
    <div>
      <h2>
        <FormattedMessage
          id="background"
          defaultMessage="Background"
          description="Background title"
        />
      </h2>

      <label>
        <select
          value={data.key}
          onChange={(event) => setBackground(event.target.value)}
          className="primary"
        >
          {sortedBackgroundConfigs.map((plugin) => (
            <option key={plugin.key} value={plugin.key}>
              <FormattedMessage {...plugin.name} />
            </option>
          ))}
        </select>
      </label>

      {plugin && (
        <div className="Widget">
          <h4><FormattedMessage {...plugin.name} /></h4>

          {plugin.settingsComponent && (
            <div className="settings">
              <Plugin id={data.id} component={plugin.settingsComponent} />
            </div>
          )}

          {plugin.supportsBackdrop && (
            <ToggleSection
              name={intl.formatMessage({
                id: "backgrounds.display.settings",
                defaultMessage: "Display Settings",
                description: "Title for background display settings section"
              })}
            >
              <>
                <label>
                  <FormattedMessage
                    id="backgrounds.display.blur"
                    defaultMessage="Blur"
                    description="Label for blur slider"
                  /> <br />
                  <input
                    type="range"
                    list="blur-markers"
                    min="0"
                    max="50"
                    step="2"
                    value={data.display.blur}
                    onChange={(event) =>
                      setBackgroundDisplay({
                        blur: Number(event.target.value),
                      })
                    }
                  />
                  <datalist id="blur-markers">
                    <option value="0" />
                    <option value="50" />
                  </datalist>
                </label>

                <label>
                  <FormattedMessage
                    id="backgrounds.display.luminosity"
                    defaultMessage="Luminosity"
                    description="Label for luminosity slider"
                  /> <br />
                  <input
                    type="range"
                    list="luminosity-markers"
                    min="-1"
                    max="1"
                    step="0.1"
                    value={data.display.luminosity}
                    onChange={(event) =>
                      setBackgroundDisplay({
                        luminosity: Number(event.target.value),
                      })
                    }
                  />
                  <datalist id="luminosity-markers">
                    <option
                      value="-1"
                      label={intl.formatMessage({
                        id: "backgrounds.display.darken",
                        defaultMessage: "Darken",
                        description: "Label for minimum luminosity"
                      })}
                    />
                    <option value="0" />
                    <option
                      value="1"
                      label={intl.formatMessage({
                        id: "backgrounds.display.lighten",
                        defaultMessage: "Lighten",
                        description: "Label for maximum luminosity"
                      })}
                    />
                  </datalist>
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={data.display.scale}
                    onChange={(e) => {
                      setBackgroundDisplay({
                        scale: e.target.checked,
                      });
                    }}
                  />{" "}
                  <FormattedMessage
                    id="backgrounds.display.scale"
                    defaultMessage="Scale background to fit"
                    description="Label for scale background checkbox"
                  />
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={data.display.nightDim}
                    onChange={(e) => {
                      setBackgroundDisplay({
                        nightDim: e.target.checked,
                      });
                    }}
                  />{" "}
                  <FormattedMessage
                    id="backgrounds.display.nightDim"
                    defaultMessage="Automatically dim at night"
                    description="Label for night dim checkbox"
                  />
                </label>

                {data.display.nightDim && (
                  <>
                    <label>
                      <FormattedMessage
                        id="backgrounds.display.nightStart"
                        defaultMessage="Night starts at"
                        description="Label for night start time input"
                      /> <br />
                      <input
                        type="time"
                        value={data.display.nightStart}
                        onChange={(e) => {
                          setBackgroundDisplay({
                            nightStart: e.target.value
                          });
                        }}
                      />
                    </label>

                    <label>
                      <FormattedMessage
                        id="backgrounds.display.nightEnd"
                        defaultMessage="Night ends at"
                        description="Label for night end time input"
                      /> <br />
                      <input
                        type="time"
                        value={data.display.nightEnd}
                        onChange={(e) => {
                          setBackgroundDisplay({
                            nightEnd: e.target.value
                          });
                        }}
                      />
                    </label>
                  </>
                )}
              </>
            </ToggleSection>
          )}
        </div>
      )}
    </div>
  );
};

export default Background;
