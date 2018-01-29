import { React, data } from './common';
import { DataMapper } from '../components/DataMapper';

export interface IMapPageProps {
  dataset?: data.IDataSet;
}
export interface IMapPageState {}

export class MapPage extends React.Component<IMapPageProps, IMapPageState> {
  public static async getInitialProps(ctx: any) {
    const dataset = (await DataMapper.getDataset(5)) as any;
    return { dataset };
  }

  public state: IMapPageState = {};

  public render() {
    return <DataMapper input={this.props.dataset} />;
  }
}
