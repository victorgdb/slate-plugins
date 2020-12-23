import { Editor } from "slate";

export const getFirstAndLastSelectedNodesType = (editor: Editor) => {
  const nodes = Editor.nodes(editor);

  let firstDepth = null;
  let firstType = null;
  let lastType = null;
  for (let [n, path] of nodes) {
    if (n.type) {
      if (firstDepth === null) {
        firstDepth = path.length;
        firstType = n.type
      }
      if (path.length === firstDepth) {
        lastType = n.type
      }
    }
  }
  return [firstType, lastType];
};
