import React from "react";
import { Icon } from "@iconify/react";
import { DebounceInput } from "../../shared";
import topics from "./topics.json";
import { defaultData, Props } from "./types";
import Multiselect from "multiselect-react-dropdown";

const UnsplashSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="UnsplashSettings">
    <label>
      <span style={{ float: "right" }}>
        {data.paused ? <span className="text--grey">(Paused) </span> : null}
        <a onClick={() => setData({ ...data, paused: !data.paused })}>
          <Icon icon={`feather:${data.paused ? "play" : "pause"}`} />
        </a>
      </span>
      Show a new photo
      <select
        value={data.timeout}
        onChange={(event) =>
          setData({ ...data, timeout: Number(event.target.value) })
        }
      >
        <option value="0">Every new tab</option>
        <option value="300">Every 5 minutes</option>
        <option value="900">Every 15 minutes</option>
        <option value="3600">Every hour</option>
        <option value="86400">Every day</option>
        <option value="604800">Every week</option>
      </select>
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === "official"}
        onChange={() => setData({ ...data, by: "official" })}
      />{" "}
      Official Collection
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === "topics"}
        onChange={() => setData({ ...data, by: "topics" })}
      />{" "}
      Topics
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === "search"}
        onChange={() => setData({ ...data, by: "search" })}
      />{" "}
      Search
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === "collections"}
        onChange={() => setData({ ...data, by: "collections" })}
      />{" "}
      Collection
    </label>

    {data.by === "topics" && (
      <label>
        Topics
        <Multiselect
          options={topics.map(topic => ({ id: topic.id, name: topic.title }))}
          selectedValues={topics
            .map(topic => ({ id: topic.id, name: topic.title }))
            .filter(topic => data.topics.includes(topic.id))
          }
          onSelect={(selectedList: Array<{ id: string; name: string }>) => {
            setData({
              ...data,
              topics: selectedList.map(item => item.id)
            });
          }}
          onRemove={(selectedList: Array<{ id: string; name: string }>) => {
            setData({
              ...data,
              topics: selectedList.map(item => item.id)
            });
          }}
          displayValue="name"
          showCheckbox={true}
          style={{
            chips: {
              background: '#3498db',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '2em',
            },
            searchBox: {
              border: '1px solid #bdc3c7',
              borderRadius: '0.2em',
              padding: '0.5em',
              marginTop: '0.5em',
              width: '100%',
            },
            optionContainer: {
              border: '1px solid #bdc3c7',
              borderRadius: '0.2em',
              marginTop: '0.2em',
            },
            option: {
              padding: '0.5em',
              color: 'inherit',
              '&:hover': {
                backgroundColor: '#ecf0f1',
              },
            },
          }}
        />
        <i>Select one or more topics</i>
      </label>
    )}

    {data.by === "search" && (
      <>
        <label>
          Tags
          <DebounceInput
            type="text"
            value={data.search}
            placeholder="Try landscapes or animals..."
            onChange={(value) => setData({ ...data, search: value })}
            wait={500}
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={data.featured}
            onChange={(event) => setData({ ...data, featured: !data.featured })}
          />{" "}
          Only featured images
        </label>
      </>
    )}

    {data.by === "collections" && (
      <label>
        Collection
        <DebounceInput
          type="text"
          value={data.collections}
          placeholder="Collection ID number"
          onChange={(value) => setData({ ...data, collections: value })}
          wait={500}
        />
      </label>
    )}

    <label>
      Location On-Click Source
      <select
        value={data.locationSource}
        onChange={(event) => setData({ ...data, locationSource: event.target.value })}
      >
        <option value="google-maps">Google Maps</option>
        <option value="google">Google Search</option>
        <option value="duckduckgo">DuckDuckGo Search</option>
        <option value="unsplash">Unsplash Photos</option>
      </select>
    </label>
  </div>
);

export default UnsplashSettings;

