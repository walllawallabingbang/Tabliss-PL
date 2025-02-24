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
    return new URL(url).hostname;
  } catch (e) {
    return null;
  }
};

const parseSvg = (svgString: string, size?: number) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svg = doc.querySelector("svg");
    if (!svg) return null;

    svg.setAttribute("width", `${size ?? 24}`);
    svg.setAttribute("height", `${size ?? 24}`);
    return <span dangerouslySetInnerHTML={{ __html: svg.outerHTML }} />;
  } catch {
    return null;
  }
};

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
  linksNumbered,
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
  const parsedSvg = useMemo(() => (SvgString ? parseSvg(SvgString, customIconSize) : null), [SvgString, customIconSize]);

  return (
    <a
      className={`Link ${linkOpenStyle ? "Link--open" : ""}`}
      href={url}
      rel="noopener noreferrer"
      target={linkOpenStyle ? "_blank" : "_self"}
      title={title}
    >
      {linksNumbered ? <span className="LinkNumber">{number} </span> : null}
      {icon === "_favicon_duckduckgo" && domain ? (
        <i>
          <img alt={domain} src={`https://icons.duckduckgo.com/ip3/${domain}.ico`} />
        </i>
      ) : icon === "_favicon_google" && domain ? (
        <i>
          <img alt={domain} src={`https://www.google.com/s2/favicons?domain=${domain}&sz=${iconSize}`} />
        </i>
      ) : icon === "_favicon_favicone" && domain ? (
        <i>
          <img alt={domain} src={`https://favicone.com/${domain}?s=${iconSize}`} />
        </i>
      ) : icon === "_custom_iconify" && IconString ? (
        <i>
          <Icon icon={IconString} width={customIconSize} height={customIconSize} />
        </i>
      ) : icon === "_custom_svg" && parsedSvg ? (
        <span className="custom-icon">{parsedSvg}</span>
      ) : icon === "_custom_ico" && IconStringIco ? (
        <i>
          <img src={IconStringIco} alt="" width={customIconSize} height={customIconSize} />
        </i>
      ) : icon === "_custom_upload" && iconCacheKey && cache?.[iconCacheKey] ? (
        <span className="custom-icon">
          {cache[iconCacheKey].type === "svg" ? (
            parseSvg(cache[iconCacheKey].data, customIconSize)
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
          <Icon icon={"feather:" + icon} />
        </i>
      ) : null}
      {name || displayUrl(url)}
    </a>
  );
};

export default Display;
