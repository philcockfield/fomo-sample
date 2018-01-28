export interface IQueryMapper {
  id: string; // Mapper factory ID.
  name?: string; // Display name.
  props?: { [key: string]: string | number | boolean | Date }; // Properties required by the mapper.
}

export interface IQuery {
  mappers: IQueryMapper[];
}
