import React, { FC } from "react";
import GitHubCalendar from "react-github-calendar";
import { Props, defaultData } from "./types";

// TODO: Inherit size and colour

const GitHubCalendarWidget: FC<Props> = ({ data = defaultData }) => {
  if (!data.username) return null;

  return (
    <a
      className="GitHub"
      href={data.clickAction !== 'none' ? `https://github.com/${data.clickAction === 'profile' ? data.username : ''}` : undefined}
      {...(data.clickAction !== 'none' && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
    >
      <GitHubCalendar
        hideColorLegend={!data.showColorLegend}
        hideMonthLabels={!data.showMonthLabels}
        hideTotalCount={!data.showTotalCount}
        username={data.username}
      />
    </a>
  );
};

export default GitHubCalendarWidget;
