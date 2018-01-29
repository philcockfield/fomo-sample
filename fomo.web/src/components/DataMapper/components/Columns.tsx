import { React, css, color } from '../../../common';
import { Arrow } from './Arrow';

export interface IColumnsProps {
  left?: React.ReactNode;
  middle?: React.ReactNode;
  right?: React.ReactNode;
}

const PADDING = 20;

export class Columns extends React.Component<IColumnsProps, {}> {
  public render() {
    const { left, middle, right } = this.props;
    const styles = {
      base: css({
        flex: 1,
        Flex: 'horizontal-stretch-stretch',
        Scroll: true,
        boxSizing: 'border-box',
      }),
      left: css({
        position: 'relative',
        flex: 1,
        PaddingX: PADDING,
      }),
      middle: css({
        position: 'relative',
        flex: 1,
        borderLeft: `solid 1px ${color.format(-0.1)}`,
        borderRight: `solid 1px ${color.format(-0.1)}`,
        PaddingX: PADDING,
      }),
      right: css({
        position: 'relative',
        flex: 1,
        PaddingX: PADDING,
      }),
      arrow: css({
        position: 'absolute',
        right: -20,
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
      }),
    };

    return (
      <div {...styles.base}>
        <div {...styles.left}>
          {left}
          <Arrow style={styles.arrow} />
        </div>
        <div {...styles.middle}>
          {middle}
          <Arrow style={styles.arrow} />
        </div>
        <div {...styles.right}>{right}</div>
      </div>
    );
  }
}
