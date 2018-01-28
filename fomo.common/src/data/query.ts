import { IQueryMapper, IQuery } from './types';

export class Query {
  private constructor() {}
  public static create = (obj?: IQuery) => {
    const query = new Query();
    if (obj) {
      obj.mappers.forEach(mapper => query.map(mapper));
    }
    return query;
  };
  public static map = (mapper: IQueryMapper) => Query.create().map(mapper);
  public mappers: IQueryMapper[] = [];

  /**
   * Adds a mapper to the chain.
   */
  public map(mapper: IQueryMapper) {
    const props = mapper.props || {};
    this.mappers = [...this.mappers, { ...mapper, props }];
    return this;
  }

  /**
   * Converts the Query to a serializable object.
   */
  public toObject(): IQuery {
    return { mappers: [...this.mappers] };
  }
}
