import { expect } from 'chai';
import { Mappers, MapperTransform } from '.';

describe('mappers', () => {
  it('does not have the requested mapper', () => {
    const mappers = Mappers.create();
    expect(mappers.get('foo')).to.eql(undefined);
  });

  it('gets a registered mapper', () => {
    const mappers = Mappers.create();
    const fn: MapperTransform<any> = async (props, data) => data;
    mappers.add('myMapper', fn);
    const result = mappers.get('myMapper');
    expect(result && result).to.eql(fn);
  });

  it('throws if a second mapper is added with the same ID', () => {
    const mappers = Mappers.create();
    const mapper: MapperTransform<any> = async (props, data) => data;
    mappers.add('myMapper', mapper);
    const fn = () => mappers.add('myMapper', mapper);
    expect(fn).to.throw();
  });
});
