import React, { FC, ReactNode, useEffect, useState } from "react";

import { defaultData, Props } from "./types";
import { Bookmarks } from "webextension-polyfill";
import "./Bookmarks.sass";
import Icon from "../../../views/shared/icons/Icon";
import BookmarkTreeNode = Bookmarks.BookmarkTreeNode;

type NodeProps = {
  node: BookmarkTreeNode;
  depth: number;
  wrap: boolean;
  navigationStyle: 'drill-down' | 'expand-collapse';
  onFolderClick?: (folderId: string) => void;
};

const Node: FC<NodeProps> = ({ node, depth, wrap, navigationStyle, onFolderClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFolder = !node.url;
  const cls = isFolder ? "folder" : "bookmark";

  const handleClick = () => {
    if (!isFolder) return;
    
    if (navigationStyle === 'drill-down') {
      onFolderClick?.(node.id);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <>
      <div 
        className={`${cls} ${isExpanded ? 'expanded' : ''}`} 
        style={{
          marginLeft: depth + "em",
          whiteSpace: wrap ? undefined : "pre",
          cursor: "pointer"
        }} 
        onClick={handleClick}
      >
        <Icon name={cls} />
        {node.url ? <a href={node.url}>{node.title}</a> : node.title}
      </div>
      
      {navigationStyle === 'expand-collapse' && isFolder && isExpanded && node.children?.map(child => (
        <Node
          key={child.id}
          node={child}
          depth={depth + 1}
          wrap={wrap}
          navigationStyle={navigationStyle}
          onFolderClick={onFolderClick}
        />
      ))}
    </>
  );
};

const Bookmarks: FC<Props> = ({ data = defaultData }) => {
  const [tree, setTree] = useState<BookmarkTreeNode>();
  const [hasPermission, setHasPermission] = useState<boolean>(true);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [navigationStack, setNavigationStack] = useState<BookmarkTreeNode[]>([]);

  useEffect(() => {
    const checkPermission = async () => {
      const granted = await browser.permissions.contains({ permissions: ["bookmarks"] });
      if (granted) {
        const rootId = data.rootBookmark || null;
        setCurrentFolder(rootId);
        const treePromise = rootId
          ? browser.bookmarks.getSubTree(rootId)
          : browser.bookmarks.getTree();
        treePromise.then((tree) => {
          setTree(tree[0]);
          setNavigationStack([tree[0]]);
        });
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
      const rootId = data.rootBookmark || null;
      setCurrentFolder(rootId);
      const treePromise = rootId
        ? browser.bookmarks.getSubTree(rootId)
        : browser.bookmarks.getTree();
      treePromise.then((tree) => {
        setTree(tree[0]);
        setNavigationStack([tree[0]]);
      });
    }
  };

  const navigateToFolder = async (folderId: string) => {
    const folderTree = await browser.bookmarks.getSubTree(folderId);
    setCurrentFolder(folderId);
    setNavigationStack(prev => [...prev, folderTree[0]]);
  };

  const navigateBack = () => {
    if (navigationStack.length > 1) {
      const newStack = [...navigationStack];
      newStack.pop();
      setNavigationStack(newStack);
      const previousFolder = newStack[newStack.length - 1];
      setCurrentFolder(previousFolder.id);
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

  if (!tree) return null;

  return (
    <div className="Bookmarks" style={{ 
      maxWidth: data.maxWidth + "em",
      maxHeight: data.maxHeight + "em",
      overflowY: "auto"
    }}>
      {data.navigationStyle === 'drill-down' ? (
        <>
          {navigationStack.length > 1 && (
            <div className="folder" style={{ marginLeft: "0em", cursor: "pointer" }} onClick={navigateBack}>
              <Icon name="folder" />..
            </div>
          )}
          {navigationStack[navigationStack.length - 1]?.children?.map(item => (
            <Node
              key={item.id}
              node={item}
              depth={0}
              wrap={data.wrap}
              navigationStyle={data.navigationStyle}
              onFolderClick={navigateToFolder}
            />
          ))}
        </>
      ) : (
        <Node
          node={tree}
          depth={0}
          wrap={data.wrap}
          navigationStyle={data.navigationStyle}
          onFolderClick={navigateToFolder}
        />
      )}
    </div>
  );
};

export default Bookmarks;

