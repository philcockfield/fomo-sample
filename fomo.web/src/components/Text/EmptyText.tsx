import { React } from '../../common';
import { Text, ITextProps } from './Text';

export const EmptyText = (props: ITextProps) => (
  <Text
    size={12}
    italic={true}
    weight={'LIGHT'}
    color={-0.3}
    block={true}
    {...props}
  />
);
