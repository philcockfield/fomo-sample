import { React } from './common';
import { DataMapper } from '../components/DataMapper';

export interface IMapPageProps {}
export interface IMapPageState {}

export class MapPage extends React.Component<IMapPageProps, IMapPageState> {
  public static async getInitialProps(ctx: any) {
    return {};
  }

  public state: IMapPageState = {};

  public render() {
    return <DataMapper />;
  }
}
