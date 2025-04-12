import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { addWidget, removeWidget, reorderWidget } from "../../db/action";
import { selectWidgets } from "../../db/select";
import { db } from "../../db/state";
import { useSelector } from "../../lib/db/react";
import Widget from "./Widget";
import { widgetConfigs } from "../../plugins/plugins";

const Widgets: React.FC = () => {
  const widgets = useSelector(db, selectWidgets);
  const intl = useIntl();

  const getWidgetName = (key: string) => {
    const config = widgetConfigs.find(w => w.key === key);
    if (!config) return key;

    return typeof config.name === 'string'
      ? config.name
      : intl.formatMessage(config.name);
  };

  return (
    <div>
      <h2>
        <FormattedMessage
          id="widgets"
          defaultMessage="Widgets"
          description="Widgets title"
        />
      </h2>

      <label>
        <select
          value=""
          onChange={(event) => addWidget(event.target.value)}
          className="primary"
        >
          <option disabled value="">
            <FormattedMessage
              id="add.new.widget"
              defaultMessage="Add a new widget"
              description="Add a new widget button text"
            />
          </option>
          {widgetConfigs.map((plugin) => (
            <option key={plugin.key} value={plugin.key}>
              {typeof plugin.name === "string"
                ? plugin.name
                : intl.formatMessage(plugin.name)}
            </option>
          ))}
        </select>
      </label>

      {widgets.map((widget, index) => (
        <Widget
          key={widget.id}
          plugin={widget}
          onMoveUp={
            index > 0 ? () => reorderWidget(index, index - 1) : undefined
          }
          onMoveDown={
            index < widgets.length - 1
              ? () => reorderWidget(index, index + 1)
              : undefined
          }
          onRemove={() => removeWidget(widget.id)}
        />
      ))}
    </div>
  );
};

export default Widgets;
