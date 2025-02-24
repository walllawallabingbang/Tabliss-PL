import React, { FC, useMemo } from "react";
import { defineMessages, useIntl } from "react-intl";
import { Icon } from "@iconify/react";
import { Link, Cache } from "./types";

const displayUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    return parsed.hostname + (parsed.pathname !== "/" ? parsed.pathname : "");
  } catch (e) {
    return url;
  }
};

const getDomain = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch (e) {
    return null;
  }
};

function sanitizeSvg(svgString: string) {
  return svgString.replace(/(width|height)="[^"]*"/g, ''); // Remove width and height
}

const messages = defineMessages({
  shortcutHint: {
    id: "plugins.links.shortcutHint",
    description: "Hover hint text for links with a keyboard shortcut",
    defaultMessage: "Press {number} or click to visit",
  },
  standardHint: {
    id: "plugins.links.standardHint",
    description: "Hover hint text for links without a keyboard shortcut",
    defaultMessage: "Click to visit",
  },
});

type Props = Link & {
  number: number;
  linkOpenStyle: boolean;
  linksNumbered: boolean;
  iconSize?: number;
  customIconSize?: number;
  IconString?: string;
  IconStringIco?: string;
  SvgString?: string;
  cache?: Cache;
};

const Display: FC<Props> = ({
  icon,
  iconSize,
  IconString,
  IconStringIco,
  customIconSize,
  SvgString,
  name,
  number,
  url,
  linkOpenStyle,
  linksNumbered: linksNumbered,
  iconCacheKey,
  cache,
}) => {
  const intl = useIntl();

  const title = useMemo(
    () =>
      number < 10
        ? intl.formatMessage(messages.shortcutHint, { number })
        : intl.formatMessage(messages.standardHint),
    [intl, number],
  );

  const domain = useMemo(() => getDomain(url), [url]);

  console.log(icon)

  return (
    <a
      className={`Link ${linkOpenStyle ? "Link--open" : ""}`}
      href={url}
      rel="noopener noreferrer"
      target={linkOpenStyle ? "_blank" : "_self"}
      title={title}
    >
      {linksNumbered ? <span className="LinkNumber">{number} </span> : null}
      {icon === "_favicon_duckduckgo" ? (
        domain ? (
          <i>
            <img
              alt={domain}
              src={`https://icons.duckduckgo.com/ip3/${domain}.ico`}
            />
          </i>
        ) : null
      ) : icon === "_favicon_google" ? (
        domain ? (
          <i>
            <img
              alt={domain}
              src={`https://www.google.com/s2/favicons?domain=${domain}&sz=${iconSize}`}
            />
          </i>
        ) : null
      ) : icon === "_favicon_favicone" ? (
        domain ? (
          <i>
            <img
              alt={domain}
              src={`https://favicone.com/${domain}?s=${iconSize}`}
            />
          </i>
        ) : null
      ) : icon === "_custom_iconify" && IconString ? (
        <i>
          <Icon icon={IconString} width={customIconSize} height={customIconSize} />
        </i>
      ) : icon === "_custom_svg" && SvgString ? (
        <span
            className="custom-icon"
            style={{ width: `${customIconSize}px`, height: `${customIconSize}px`, display: "inline-block" }}
            dangerouslySetInnerHTML={{ __html: sanitizeSvg(SvgString) }}
        ></span>
      ) : icon === "_custom_ico" && IconStringIco ? (
        <i>
          <img
            src={IconStringIco}
            alt=""
            style={{
              width: customIconSize,
              height: customIconSize,
              display: "inline-block",
            }}
          />
        </i>
      ) : icon === "_custom_upload" && iconCacheKey && cache?.[iconCacheKey] ? (
        <span className="custom-icon">
          {cache[iconCacheKey].type === "svg" ? (
            <span
              dangerouslySetInnerHTML={{ __html: sanitizeSvg(cache[iconCacheKey].data) }}
              style={{ width: `${customIconSize}px`, height: `${customIconSize}px`, display: "inline-block" }}
            />
          ) : (
            <img
              alt={name}
              src={cache[iconCacheKey].data}
              style={{ width: `${customIconSize}px`, height: `${customIconSize}px`, display: "inline-block" }}
            />
          )}
        </span>
      ) : icon ? (
        <i>
          <Icon icon={"feather:" + icon}/>
        </i>
      ) : null}
      {name || displayUrl(url)}
    </a>
  );
};

export default Display;
