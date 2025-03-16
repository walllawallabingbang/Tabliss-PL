import React, { FC, useEffect, useState } from "react";

import { defaultData, Props } from "./types";
import { Bookmarks } from "webextension-polyfill";
import BookmarkTreeNode = Bookmarks.BookmarkTreeNode;

const BookmarksSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const [tree, setTree] = useState<BookmarkTreeNode>();
  const [hasPermission, setHasPermission] = useState<boolean>(true);

  useEffect(() => {
    const checkPermission = async () => {
      const granted = await browser.permissions.contains({ permissions: ["bookmarks"] });
      setHasPermission(granted);
      if (granted) {
        const treeData = await browser.bookmarks.getTree();
        setTree(treeData[0]);
      }
    };
    checkPermission();
  }, []);

  if (!hasPermission) {
    return (
      <div className="BookmarksSettings">
        <p>Please enable the bookmarks permission in the widget first.</p>
      </div>
    );
  }

  const items: React.JSX.Element[] = [];

  const descendTree = (tree: BookmarkTreeNode | undefined, pad: string) => {
    if (!tree || tree.url) {
      return;
    }

    items.push(
      <option
        key={tree.id}
        value={tree.id}
        selected={tree.id === data.rootBookmark}
        dangerouslySetInnerHTML={{
          __html: pad + (tree.title || tree.id),
        }} />);

    if (tree.children) {
      for (const item of tree.children) {
        descendTree(item, pad + "&nbsp;&nbsp;&nbsp;");
      }
    }
  };

  descendTree(tree, "");

  return <div className="BookmarksSettings">
    <label>
      Root bookmark folder
      <select
        onChange={(evt) =>
          setData({ ...data, rootBookmark: evt.target.value })}>
        {items}
      </select>
    </label>

    <label>
      Navigation style
      <select
        value={data.navigationStyle}
        onChange={(evt) =>
          setData({ ...data, navigationStyle: evt.target.value as 'drill-down' | 'expand-collapse' })}>
        <option value="drill-down">Drill-down navigation</option>
        <option value="expand-collapse">Expandable folders</option>
      </select>
    </label>

    <label>
      Maximum width (em)
      <input
        type="number"
        value={data.maxWidth}
        onChange={(event) =>
          setData({ ...data, maxWidth: Number(event.target.value) })
        }
        min={1}
      />
    </label>

    <label>
      Maximum height (em)
      <input
        type="number"
        value={data.maxHeight}
        onChange={(event) =>
          setData({ ...data, maxHeight: Number(event.target.value) })
        }
        min={1}
      />
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.wrap}
        onChange={(event) =>
          setData({ ...data, wrap: !data.wrap })
        }
      />
      Wrap long titles
    </label>
  </div>;
};

export default BookmarksSettings;
