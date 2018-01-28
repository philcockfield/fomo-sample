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

  public add<P extends MapperProps>(id: string, transform: MapperTransform<P>) {
    if (this.mappers.id) {
      throw new Error(
        `A mapper with the id '${id}' has already been registered.`,
      );
    }
    this.mappers[id] = { id, transform };
    return this;
  }

  public get<P extends MapperProps>(
    id: string,
  ): MapperTransform<P> | undefined {
    const item = this.mappers[id];
    return item ? item.transform : undefined;
  }
}

export const mappers = Mappers.create();
