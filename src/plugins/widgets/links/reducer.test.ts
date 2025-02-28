import { addLink, removeLink, updateLink, reorderLink } from "./actions";
import { reducer } from "./reducer";

describe("links/reducer()", () => {
  it("should add new links", () => {
    expect(reducer([], addLink())).toEqual([{ url: "https://" }]);
    expect(
      reducer([{ url: "https://tabliss.io/" }], { type: "ADD_LINK" }),
    ).toEqual([{ url: "https://tabliss.io/" }, { url: "https://" }]);
  });

  it("should remove links", () => {
    expect(
      reducer(
        [
          { url: "https://tabliss.io/" },
          { url: "https://tabliss.io/about.html" },
        ],
        removeLink(0),
      ),
    ).toEqual([{ url: "https://tabliss.io/about.html" }]);
  });

  it("should update links", () => {
    expect(
      reducer(
        [
          { url: "https://tabliss.io/" },
          { url: "https://tabliss.io/about.html" },
        ],
        updateLink(0, { name: "Tabliss", url: "https://tabliss.io/" }),
      ),
    ).toEqual([
      { name: "Tabliss", url: "https://tabliss.io/" },
      { url: "https://tabliss.io/about.html" },
    ]);
  });

  it("should reorder links", () => {
    expect(
      reducer(
        [
          { url: "https://tabliss.io/" },
          { url: "https://tabliss.io/about.html" },
          { url: "https://tabliss.io/support.html" },
        ],
        reorderLink(1, 0),
      ),
    ).toEqual([
      { url: "https://tabliss.io/about.html" },
      { url: "https://tabliss.io/" },
      { url: "https://tabliss.io/support.html" },
    ]);

    expect(
      reducer(
        [
          { url: "https://tabliss.io/" },
          { url: "https://tabliss.io/about.html" },
          { url: "https://tabliss.io/support.html" },
        ],
        reorderLink(1, 2),
      ),
    ).toEqual([
      { url: "https://tabliss.io/" },
      { url: "https://tabliss.io/support.html" },
      { url: "https://tabliss.io/about.html" },
    ]);
  });

  it("should throw on unknown action", () => {
    expect(() => reducer([], { type: "UNKNOWN" } as any)).toThrow();
  });

  it("should handle adding multiple links", () => {
    let state = reducer([], addLink());
    state = reducer(state, addLink());
    state = reducer(state, addLink());
    expect(state).toEqual([
      { url: "https://" },
      { url: "https://" },
      { url: "https://" },
    ]);
  });

  it("should handle removing the last link", () => {
    const state = reducer([{ url: "https://tabliss.io/" }], removeLink(0));
    expect(state).toEqual([]);
  });

  it("should handle updating a non-existent link", () => {
    const state = reducer(
      [{ url: "https://tabliss.io/" }],
      updateLink(1, { url: "https://example.com/" }),
    );
    expect(state).toEqual([{ url: "https://tabliss.io/" }]);
  });

  it("should handle reordering with invalid indices", () => {
    const state = reducer(
      [
        { url: "https://tabliss.io/" },
        { url: "https://tabliss.io/about.html" },
      ],
      reorderLink(2, 0),
    );
    expect(state).toEqual([
      { url: "https://tabliss.io/" },
      { url: "https://tabliss.io/about.html" },
    ]);
  });

  it("should handle reordering to the same position", () => {
    const state = reducer(
      [
        { url: "https://tabliss.io/" },
        { url: "https://tabliss.io/about.html" },
      ],
      reorderLink(1, 1),
    );
    expect(state).toEqual([
      { url: "https://tabliss.io/" },
      { url: "https://tabliss.io/about.html" },
    ]);
  });
});
