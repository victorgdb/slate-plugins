import { Editor, Transforms } from 'slate';
import { isNodeTypeIn } from '../../../common/queries';
import { unwrapNodesByType } from '../../../common/transforms';

import { setDefaults } from '../../../common/utils/setDefaults';
import { DEFAULTS_BLOCKQUOTE } from '../defaults';
import { getFirstAndLastSelectedNodesType } from '../../../common/queries/getFirstAndLastSelectedNodesType';

export const transformBlockquote = (
  editor: Editor,
  {
    ...options
  }
) => {
  if (!editor.selection) return;

  const { blockquote } = setDefaults(options, DEFAULTS_BLOCKQUOTE);
  const isActive = isNodeTypeIn(editor, blockquote.type);

  unwrapNodesByType(editor, blockquote.type);

  if (!isActive) {
    // Is current element a list ?
    const [match] = Editor.nodes(editor, {
      match: n =>  n.type === 'ul' || n.type === 'ol'
    })

    const [firstType, lastType] = getFirstAndLastSelectedNodesType(editor);
    if (firstType === lastType && firstType === 'ul' || firstType === 'ol') {
      // If it's a list, we need to wrap the component above the ul/ol block
      // And not above the "li"
      const [, listPath] = match;
      Transforms.wrapNodes(editor, { type: blockquote.type, children: [ ]}, { at: listPath });
    } else {
      Transforms.wrapNodes(editor, { type: blockquote.type, children: [ ]});
    }
  }
};
