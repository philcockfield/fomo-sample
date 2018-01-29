import { React, css, Actions, ObjectView, data, Subject } from '../../common';
import { init } from './actions';

export interface IDataMapperProps {}
export interface IDataMapperState {
  query: data.IQuery;
}

/**
 * A visual representation of a data-mapper chain.
 */
export class DataMapper extends React.Component<
  IDataMapperProps,
  IDataMapperState
> {
  private unmounted$ = new Subject();

  private query = data.Query.create();
  private actions = init(this.query);
  public state: IDataMapperState = {
    query: this.query.toObject(),
  };

  public componentDidMount() {
    this.query.change$.takeUntil(this.unmounted$).subscribe(e => {
      const query = this.query.toObject();
      this.setState({ query });
    });
  }

  public componentWillUnmount() {
    this.unmounted$.next();
  }

  public render() {
    const styles = {
      base: css({
        Absolute: [15, 0, 15, 15],
        display: 'flex',
        flex: 1,
      }),
    };

    return (
      <div {...styles.base}>
        <Actions
          setState={this.setState.bind(this)} // tslint:disable-line
          leftWidth={350}
          items={this.actions.list}
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
      <ObjectView data={props} expandLevel={5} />
    </div>
  );
};
