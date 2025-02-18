import React, { FC, ReactNode, useEffect, useState } from "react";

import { defaultData, Props } from "./types";
import { Bookmarks } from "webextension-polyfill";
import "./Bookmarks.sass";
import Icon from "../../../views/shared/icons/Icon";
import BookmarkTreeNode = Bookmarks.BookmarkTreeNode;

const Node = ({ url, title, depth, wrap }: {
  url: string | undefined,
  title: string,
  depth: number,
  wrap: boolean
}): ReactNode => {
  const cls = url ? "bookmark" : "folder";

  return <div className={cls} style={{
    marginLeft: depth + "em",
    whiteSpace: wrap ? undefined : "pre",
  }}>
    <Icon name={cls} />{url ? <a href={url}>{title}</a> : title}
  </div>;
};

const Bookmarks: FC<Props> = ({ data = defaultData }) => {
  const [tree, setTree] = useState<BookmarkTreeNode>();
  const [hasPermission, setHasPermission] = useState<boolean>(true);

  useEffect(() => {
    const checkPermission = async () => {
      const granted = await browser.permissions.contains({ permissions: ["bookmarks"] });
      if (granted) {
        const treePromise = data.rootBookmark
          ? browser.bookmarks.getSubTree(data.rootBookmark)
          : browser.bookmarks.getTree();
        treePromise.then((tree) => setTree(tree[0]));
      } else {
        setHasPermission(false);
      }
    };
    checkPermission();
  }, [data.rootBookmark]);

  const requestPermission = async () => {
    const granted = await browser.permissions.request({ permissions: ["bookmarks"] });
    setHasPermission(granted);
    if (granted) {
      const treePromise = data.rootBookmark
        ? browser.bookmarks.getSubTree(data.rootBookmark)
        : browser.bookmarks.getTree();
      treePromise.then((tree) => setTree(tree[0]));
    }
  };

  if (!hasPermission) {
    return (
      <div className="Bookmarks">
        <button className="request-permission" style={{ padding: "0.5em 1em" }} onClick={requestPermission}>
          Bookmarks permission required for this widget (click to request)
        </button>
      </div>
    );
  }

  const items: React.JSX.Element[] = [];

  const descendTree = (tree: BookmarkTreeNode | undefined, depth: number) => {
    if (!tree) {
      return;
    }

    if (tree.title && depth) {
      items.push(<Node url={tree.url} title={tree.title} depth={depth} wrap={data.wrap} />);
    }

    if (tree.children) {
      for (const item of tree.children) {
        descendTree(item, depth + 1);
      }
    }
  };

  descendTree(tree, 0);

  return <div className="Bookmarks" style={{ maxWidth: data.maxWidth + "em" }}>
    {items}
  </div>;
};

export default Bookmarks;

