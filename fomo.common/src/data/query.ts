import { Subject, Observable } from '../common';
import { IQueryMapper, IQuery, IDataSet, IMappers } from './types';

export { Observable };

export interface IQueryChange {
  type: 'MAPPER_ADDED' | 'CLEARED';
}

/**
 * [Serializable].
 * Prepresents a set of query transforms.
 */
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

  private changeSubject$ = new Subject<IQueryChange>();
  public change$ = this.changeSubject$.asObservable().share();

  /**
   * Adds a mapper to the chain.
   */
  public map(mapper: IQueryMapper) {
    const props = mapper.props || {};
    this.mappers = [...this.mappers, { ...mapper, props }];
    this.changeSubject$.next({ type: 'MAPPER_ADDED' });
    return this;
  }

  /**
   * Clears all internal state.
   */
  public clear() {
    this.mappers = [];
    this.changeSubject$.next({ type: 'CLEARED' });
    return this;
  }

  /**
   * Converts the Query to a serializable object.
   */
  public toObject(): IQuery {
    return { mappers: [...this.mappers] };
  }

  /**
   * Performs a transform on the data.
   */
  public async transform(mappers: IMappers, data: IDataSet): Promise<IDataSet> {
    let result = { ...data };
    for (const { id, props = {} } of this.mappers) {
      const mapper = mappers.get(id);
      if (!mapper) {
        throw new Error(
          `Attempting to transform data using mapper '${id}' which has not been registered yet.`,
        );
      }
      result = await mapper(props, result);
    }
    return result;
  }
}
