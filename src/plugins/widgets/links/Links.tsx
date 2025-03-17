import React, { FC, useMemo } from "react";

import { useKeyPress, useToggle } from "../../../hooks";
import { Icon } from "@iconify/react";
import Display from "./Display";
import { Props, defaultData, defaultCache } from "./types";
import "./Links.sass";

const Links: FC<Props> = ({ data = defaultData, setData, cache = defaultCache }) => {
  const [visible, toggleVisible] = useToggle();

  const handleLinkClick = (url: string) => {
    const updatedLinks = [...data.links];
    const originalIndex = updatedLinks.findIndex(link => link.url === url);
    
    if (originalIndex !== -1) {
      updatedLinks[originalIndex] = {
        ...updatedLinks[originalIndex],
        lastUsed: Date.now()
      };
      setData({ ...data, links: updatedLinks });
    }
  };

  const sortedLinks = useMemo(() => {
    if (data.sortBy === 'none') return data.links;
    
    return [...data.links].sort((a, b) => {
      switch (data.sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'icon':
          return (a.icon || '').localeCompare(b.icon || '');
        case 'lastUsed':
          const bTime = b.lastUsed || 0;
          const aTime = a.lastUsed || 0;
          return bTime - aTime; // Most recent first
        default:
          return 0;
      }
    });
  }, [data.links, data.sortBy]);

  useKeyPress(
    ({ key }) => {
      const index = Number(key) - 1;
      if (sortedLinks[index]) {
        data.linkOpenStyle
          ? window.open(sortedLinks[index].url, "_blank")
          : window.location.assign(sortedLinks[index].url);
      }
    },
    ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  );

  return (
    <div
      className="Links"
      style={{
        gridTemplateColumns:
          data.visible || visible ? "1fr ".repeat(data.columns) : "1fr",
        textAlign: data.columns > 1 ? "left" : "inherit",
      }}
    >
      {data.visible || visible ? (
        sortedLinks.map((link, index) => (
          <Display
            key={link.url} // Changed from index to url for stable keys
            number={index + 1}
            linkOpenStyle={data.linkOpenStyle}
            linksNumbered={data.linksNumbered}
            customWidth={data.customWidth}
            customHeight={data.customHeight}
            cache={cache}
            onLinkClick={() => handleLinkClick(link.url)}
            {...link}
          />
        ))
      ) : (
        <a onClick={toggleVisible} title="Show quick links">
          <Icon icon="fe:insert-link" />
        </a>
      )}
    </div>
  );
};

export default Links;
