import { React, css, Actions, ObjectView, Subject } from './common';
import { TestSparklines } from './TestSparkline';
import actions from './actions';

export interface ITestViewProps {}
export interface ITestViewState {
  pageLoading: boolean;
  totalSparklines: number;
}

export class TestPage extends React.Component<ITestViewProps, ITestViewState> {
  // public static async getInitialProps(ctx: any) {
  //   return {};
  // }

  public state: ITestViewState = {
    pageLoading: true,
    totalSparklines: 1,
  };

  private unmounted$ = new Subject();

  public componentDidMount() {
    this.setState({ pageLoading: false });
  }

  public componentWillUnmount() {
    this.unmounted$.next();
  }

  public render() {
    const styles = {
      base: css({
        Absolute: [15, 0, 15, 15],
        display: 'flex',
      }),
    };
    return (
      <div {...styles.base}>
        <Actions
          setState={this.setState.bind(this)} // tslint:disable-line
          leftWidth={455}
          items={actions}
        >
          <Content {...this.state} />
        </Actions>
      </div>
    );
  }
}

const Content = (props: any) => {
  const style = {
    base: css({
      flex: 1,
      marginLeft: 2,
      paddingLeft: 30,
      paddingTop: 10,
      Scroll: true,
    }),
  };

  return (
    <div {...style.base}>
      <TestSparklines total={props.totalSparklines} />
      <ObjectView data={props} expandLevel={5} />
    </div>
  );
};
