import * as React from 'react';
import { useSlate } from 'slate-react';
import { getPreventDefaultHandler } from '../../../common/utils/getPreventDefaultHandler';
import { ToolbarButtonProps } from '../../../components/ToolbarButton/ToolbarButton.types';
import { ToolbarElement } from '../../../components/ToolbarElement/ToolbarElement';
import { transformBlockquote } from '../transforms/transformBlockquote';

export const ToolbarBlockquote = ({
  type,
  ...props
}: ToolbarButtonProps) => {
  const editor = useSlate();

  return (
    <ToolbarElement
      type={type}
      onMouseDown={getPreventDefaultHandler(transformBlockquote, editor, {
        ...props,
      })}
      {...props}
    />
  );
};
