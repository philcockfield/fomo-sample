export interface IDataItem {
  time: Date;
  value: number;
}
export interface IDataSet {
  items: IDataItem[];
}
export type MapperTransform<P extends MapperProps> = (
  props: P,
  data: IDataSet,
) => Promise<IDataSet>;

export interface IQueryMapper {
  id: string; // Mapper factory ID.
  name?: string; // Display name.
  description?: string;
  props?: MapperProps; // Properties required by the mapper.
}
export type MapperProps = { [key: string]: string | number | boolean | Date };

export interface IQuery {
  mappers: IQueryMapper[];
}

export interface IMappers {
  get: <P extends MapperProps>(id: string) => MapperTransform<P> | undefined;
}
