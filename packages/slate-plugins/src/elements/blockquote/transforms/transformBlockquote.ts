import { Editor, Transforms } from 'slate';
import { getNodesByType, isNodeTypeIn } from '../../../common/queries';
import { wrapNodes } from '../../../common/transforms/wrapNodes';
import { unwrapNodesByType } from '../../../common/transforms';

import { setDefaults } from '../../../common/utils/setDefaults';
import { DEFAULTS_BLOCKQUOTE } from '../defaults';

export const transformBlockquote = (
  editor: Editor,
  {
    ...options
  }
) => {
  if (!editor.selection) return;

  const { p, blockquote } = setDefaults(options, DEFAULTS_BLOCKQUOTE);
  const isActive = isNodeTypeIn(editor, blockquote.type);

  unwrapNodesByType(editor, blockquote.type);

  // Creating a p node to allow rich content.
  // e.g: This node will be replaced by list instead of blockquote
  Transforms.setNodes(editor, {
    type: p.type,
  });

  if (!isActive) {
    wrapNodes(editor, { type: blockquote.type, children: []});
  }
};
