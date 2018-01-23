import { React, css, Observable, Subject, randomInt } from '../common';
import { Sparkline } from '../components/Sparkline';

const SAMPLE_DATA = [
  0,
  5,
  89,
  21,
  35,
  53,
  20,
  87,
  19,
  91,
  41,
  68,
  48,
  97,
  88,
  28,
  20,
  65,
  74,
  62,
];

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
  private unmounted$ = new Subject();

  public componentWillUnmount() {
    this.unmounted$.next();
  }

  public state: ITestSparklineState = {
    data: SAMPLE_DATA,
  };

  public componentDidMount() {
    Observable.timer(0, 300)
      .takeUntil(this.unmounted$)
      .subscribe(e => {
        const data = nextRandomStep(this.state.data);
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

function nextRandomStep(data: number[]) {
  data = [...data, randomInt(50)];
  data.shift();
  return data;
}
