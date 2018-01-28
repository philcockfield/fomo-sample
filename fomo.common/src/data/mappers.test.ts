import { expect } from 'chai';
import { mappers, MapperTransform } from '.';

describe('mappers', () => {
  it('does not have the requested mapper', () => {
    expect(mappers.get('foo')).to.eql(undefined);
  });

  it('gets a registered mapper', () => {
    const fn: MapperTransform<any> = async (props, data) => {
      return { items: [] };
    };
    mappers.add('myMapper', fn);
    const result = mappers.get('myMapper');
    expect(result && result).to.eql(fn);
  });
});
