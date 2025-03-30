interface Note {
  contents: string;
}

export interface Data {
  notes: Note[];
  markdownEnabled: boolean;
  textAlign: "left" | "center" | "right";
}

export const defaultData: Data = {
  notes: [{ contents: "" }],
  markdownEnabled: true,
  textAlign: "left",
};
