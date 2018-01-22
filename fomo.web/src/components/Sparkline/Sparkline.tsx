import { React, css } from '../../common';
const Library = require('react-sparklines');
const { Sparklines, SparklinesLine, SparklinesReferenceLine } = Library;

export interface ISparklineProps {
  width?: number;
  height?: number;
  data: number[];
}

/**
 * A small graphic providing a quick representation of numerical or statistical information.
 */
export class Sparkline extends React.Component<ISparklineProps, {}> {
  public render() {
    const { width = 160, height = 30, data } = this.props;
    const styles = {
      base: css({
        width,
        height,
      }),
    };

    return (
      <div {...styles.base}>
        <Sparklines data={data} width={width} height={height} margin={0}>
          <SparklinesLine color={'blue'} />
          <SparklinesReferenceLine type={'mean'} />
        </Sparklines>
      </div>
    );
  }
}
