import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import { engines } from "./engines";
import { Props, defaultData, SEARCH_ENGINE_CUSTOM } from "./types";

const SearchSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="SearchSettings">
    <label>
      <FormattedMessage
          id="plugins.search.provider"
          defaultMessage="Search Provider"
          description="Search Provider title"
        />
      <select
        onChange={(event) =>
          setData({ ...data, searchEngine: event.target.value })
        }
        value={data.searchEngine}
      >
        <option key="default" value="default">Browser Default</option>
        {engines.map(({ key, name }) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
        <option key={SEARCH_ENGINE_CUSTOM} value={SEARCH_ENGINE_CUSTOM}>
          Custom
        </option>
      </select>
    </label>

    {data.searchEngine === SEARCH_ENGINE_CUSTOM && (
      <>
        <label>
          Custom Search Provider
          <input
            type="text"
            value={data.searchEngineCustom}
            onChange={(event) =>
              setData({
                ...data,
                searchEngineCustom: event.target.value,
              })
            }
          />
        </label>

        <p className="info">
          Warning: This functionality is intended for advanced users.
          &#123;searchTerms&#125; is replaced by the entered search term.
        </p>
      </>
    )}

    <label>
      Placeholder Text
      <input
        type="text"
        value={data.placeholderText}
        placeholder="Type to search"
        onChange={(event) =>
          setData({
            ...data,
            placeholderText: event.target.value,
          })
        }
      />
    </label>

    {BUILD_TARGET === "web" && (
      <label>
        <FormattedMessage
          id="plugins.search.suggestionsProvider"
          defaultMessage="Suggestions Provider"
          description="Suggestions Provider title"
        />
        <select
          onChange={(event) =>
            setData({ ...data, suggestionsEngine: event.target.value })
          }
          value={data.suggestionsEngine}
        >
          <option key="off" value="">
            <FormattedMessage
          id="plugins.off"
          defaultMessage="Off"
          description="Off title"
        />
          </option>
          {engines
            .filter(({ suggest_url }) => Boolean(suggest_url))
            .map(({ key, name }) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
        </select>
      </label>
    )}

    {data.suggestionsEngine && (
      <label>
        <FormattedMessage
          id="plugins.search.suggestionsQuanitity"
          defaultMessage="Suggestion Quanitity"
          description="Suggestion Quanitity title"
        />
        <input
          type="number"
          min="1"
          max="10"
          value={data.suggestionsQuantity}
          onChange={(event) =>
            setData({
              ...data,
              suggestionsQuantity: Number(event.target.value),
            })
          }
        />
      </label>
    )}
  </div>
);

export default SearchSettings;
