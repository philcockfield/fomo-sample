import { MapperTransform, MapperProps, IMappers } from './types';

export interface IMapper<P extends MapperProps> {
  id: string;
  transform: MapperTransform<P>;
}

/**
 * [Not Serializable].
 * A set of concrete transform functions.
 */
export class Mappers implements IMappers {
  public static create = () => new Mappers();
  private constructor() {}
  private mappers: { [id: string]: IMapper<any> } = {};

  /**
   * Adds a new data transform mapper.
   */
  public add<P extends MapperProps>(id: string, transform: MapperTransform<P>) {
    if (this.mappers.id) {
      throw new Error(
        `A mapper with the id '${id}' has already been registered.`,
      );
    }
    this.mappers[id] = { id, transform };
    return this;
  }

  /**
   * Gets the data mapper with the given id.
   */
  public get<P extends MapperProps>(
    id: string,
  ): MapperTransform<P> | undefined {
    const item = this.mappers[id];
    return item ? item.transform : undefined;
  }
}
