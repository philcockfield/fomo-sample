import { React, css, color } from '../../../common';
import { Arrow } from './Arrow';
import { Text } from '../../Text';

export interface IColumnsProps {
  left?: React.ReactNode;
  middle?: React.ReactNode;
  right?: React.ReactNode;
}

const PADDING = 30;

export class Columns extends React.Component<IColumnsProps, {}> {
  public render() {
    const { left, middle, right } = this.props;
    const styles = {
      base: css({
        flex: 1,
        Flex: 'horizontal-stretch-stretch',
        boxSizing: 'border-box',
      }),
      left: css({
        position: 'relative',
        flex: 1,
      }),
      columnBody: css({
        Absolute: [30, 0, 0, 0],
        Scroll: true,
        PaddingX: PADDING,
        paddingTop: 10,
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
          <ColumnTitle>Input</ColumnTitle>
          <div {...styles.columnBody}>{left}</div>
          <Arrow style={styles.arrow} />
        </div>
        <div {...styles.middle}>
          <ColumnTitle>Mappers</ColumnTitle>
          <div {...styles.columnBody}>{middle}</div>
          <Arrow style={styles.arrow} />
        </div>
        <div {...styles.right}>
          <ColumnTitle>Output</ColumnTitle>
          <div {...styles.columnBody}>{right}</div>
        </div>
      </div>
    );
  }
}

const ColumnTitle = (props: { children: string }) => {
  const styles = {
    base: css({
      textAlign: 'center',
    }),
  };
  return (
    <div {...styles.base}>
      <Text weight={'BOLD'}>{props.children}</Text>
    </div>
  );
};
