import { React, describe } from '../../common/storybook';
import { DataMapperItem } from '.';

describe('data', {
  title: 'A visual representation of a query mapping.',
  width: 292,
})
  .add('DataMapperItem (no props)', () => <DataMapperItem id={'increment'} />)
  .add('DataMapperItem (props)', () => {
    const props = {
      foo: 123,
      bar: 'baz',
      nothing: undefined,
      empty: null,
      flag: true,
    };
    return <DataMapperItem id={'increment'} props={props} />;
  });
