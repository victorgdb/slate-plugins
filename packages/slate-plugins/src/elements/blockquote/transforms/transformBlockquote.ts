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

  if (!isActive) {
    // Is current element a list ?
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'ul' || n.type === 'ol'
    })
    if (match) {
      // If it's a list, we need to wrap the component above the ul/ol block
      // And not above the "li"
      const [, listPath] = match;
      Transforms.wrapNodes(editor, { type: blockquote.type, children: [ ]}, { at: listPath });
    } else {
      Transforms.wrapNodes(editor, { type: blockquote.type, children: [ ]});
    }
  }
};
