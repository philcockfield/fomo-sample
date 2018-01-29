import {
  React,
  css,
  color,
  Actions,
  ObjectView,
  data,
  Subject,
} from '../../common';
import { init, getDataset } from './actions';
import { DataMapperList } from '../DataMapperList';
import { Columns } from './components/Columns';
import { DataSetColumn } from './components/DataSetColumn';

export interface IDataMapperProps {
  input?: data.IDataSet;
}
export interface IDataMapperState {
  query: data.IQuery;
  input?: data.IDataSet;
  output?: data.IDataSet;
}

/**
 * A visual representation of a data-mapper chain.
 */
export class DataMapper extends React.Component<
  IDataMapperProps,
  IDataMapperState
> {
  public static getDataset = getDataset;

  private unmounted$ = new Subject();

  private query = data.Query.create();
  private actions = init(this.query);
  public state: IDataMapperState = {
    query: this.query.toObject(),
    input: this.props.input,
  };

  public async componentDidMount() {
    this.updateState();

    if (!this.state.input) {
      const input = await getDataset(5);
      this.setState({ input });
    }

    this.query.change$
      .takeUntil(this.unmounted$)
      .subscribe(e => this.updateState());
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
    };

    const elLeftBottom = <LeftBottom {...this.state} />;
    const items = DataMapperList.toItems(this.state.query);

    const elInput = (
      <DataSetColumn
        dataset={this.state.input}
        title={'Input'}
        emptyLabel={'No input data'}
      />
    );
    const elMappers = <DataMapperList items={items} />;
    const elOutput = (
      <DataSetColumn
        dataset={this.state.output}
        title={'Output'}
        emptyLabel={''}
      />
    );

    return (
      <div {...styles.base}>
        <Actions
          state={this.state}
          setState={this.setState.bind(this)} // tslint:disable-line
          items={this.actions.list}
          leftWidth={320}
          leftBottom={elLeftBottom}
        >
          <Columns left={elInput} middle={elMappers} right={elOutput} />
        </Actions>
      </div>
    );
  }
}

const LeftBottom = (props: any) => {
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
      <ObjectView data={props} />
    </div>
  );
};
