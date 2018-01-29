import {
  React,
  css,
  color,
  Actions,
  ObjectView,
  data,
  Subject,
} from '../../common';
import { init } from './actions';
import { DataMapperList } from '../DataMapperList';

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
    this.query.change$
      .takeUntil(this.unmounted$)
      .subscribe(e => this.updateState());
    this.updateState();
  }

  public componentWillUnmount() {
    this.unmounted$.next();
  }

  private updateState() {
    const query = this.query.toObject();
    this.setState({ query });
  }

  public render() {
    const styles = {
      base: css({
        Absolute: [15, 0, 15, 15],
        display: 'flex',
        flex: 1,
      }),
      content: css({
        display: 'flex',
        flex: 1,
        Scroll: true,
        paddingLeft: 50,
      }),
      dataMapperList: css({
        maxWidth: 300,
      }),
    };

    const elLeftBottom = <Content {...this.state} />;
    const items = DataMapperList.toItems(this.state.query);

    return (
      <div {...styles.base}>
        <Actions
          setState={this.setState.bind(this)} // tslint:disable-line
          items={this.actions.list}
          leftWidth={320}
          leftBottom={elLeftBottom}
        >
          <div {...styles.content}>
            <DataMapperList items={items} style={styles.dataMapperList} />
          </div>
        </Actions>
      </div>
    );
  }
}

const Content = (props: any) => {
  const style = {
    base: css({
      maxHeight: '35%',
      paddingTop: 10,
      Scroll: true,
      borderTop: `solid 1px ${color.format(-0.1)}`,
    }),
  };

  return (
    <div {...style.base}>
      <ObjectView data={props} expandLevel={5} />
    </div>
  );
};
