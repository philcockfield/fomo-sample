import { React, css, Observable } from '../common';
import { Sparkline } from '../components/Sparkline';

const DATA = [5, 10, 5, 20, 22, 0, 34, 5, 10, 4, 22, 34, 12];

export interface ITestSparklinesProps {
  total: number;
}
export const TestSparklines = (props: ITestSparklinesProps) => {
  const styles = {
    base: css({
      marginBottom: 30,
      Flex: 'horizontal',
      flexWrap: 'wrap',
    }),
  };
  const elSparklines = Array.from({ length: props.total }).map((v, i) => {
    return <TestSparkline key={i} />;
  });
  return <div {...styles.base}>{elSparklines}</div>;
};

export interface ITestSparklineProps {}
export interface ITestSparklineState {
  data: number[];
}
export class TestSparkline extends React.Component<
  ITestSparklineProps,
  ITestSparklineState
> {
  public state: ITestSparklineState = {
    data: DATA,
  };

  public componentDidMount() {
    Observable.timer(0, 500).subscribe(e => {
      const data = [...this.state.data, randomInt(50)];
      data.shift();
      this.setState({ data });
    });
  }

  public render() {
    const styles = {
      base: css({
        margin: 5,
      }),
    };
    return (
      <div {...styles.base}>
        <Sparkline width={220} height={35} data={this.state.data} />
      </div>
    );
  }
}

function randomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}
