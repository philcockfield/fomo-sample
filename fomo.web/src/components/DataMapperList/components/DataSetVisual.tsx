import { React, css, color } from '../../../common';
import { Box, BOX } from './Box';

export interface IDataSetVisualProps {
  isFirst?: boolean;
  isLast?: boolean;
}

const PADDING = 15;

export const DataSetVisual = (props: IDataSetVisualProps) => {
  const { isFirst = false, isLast = false } = props;
  const styles = {
    base: css({
      boxSizing: 'border-box',
      position: 'relative',
      height: BOX.HEIGHT + (!isFirst ? PADDING : 0) + (!isLast ? PADDING : 0),
    }),
    boxOuter: css({
      Absolute: 0,
    }),
    box: css({
      AbsoluteCenter: 'x',
      top: isFirst && 0,
      bottom: isLast && 0,
    }),
    boxVerticalCenter: css({
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }),
    line: css({
      Absolute: [0, null, 0, '50%'],
      width: 1,
      borderLeft: `solid 1px ${color.format(-0.2)}`,
    }),
  };
  return (
    <div {...styles.base}>
      <div {...styles.line} />
      <div {...styles.boxOuter}>
        <Box
          style={css(
            styles.box,
            !isFirst && !isLast && styles.boxVerticalCenter,
          )}
        />
      </div>
    </div>
  );
};
