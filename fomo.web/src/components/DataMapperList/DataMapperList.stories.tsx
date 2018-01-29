import { React, describe, data } from '../../common/storybook';
import { DataMapperList, IDataMapperItem } from '.';

describe('data', {
  title: 'A list of DataMapper items.',
  width: 292,
  height: '100%',
  flex: true,
})
  .add('DataMapperList (1)', () => {
    const query = data.Query.map({ id: 'increment', props: { by: 4 } });
    const items = DataMapperList.toItems(query.toObject());
    return <DataMapperList items={items} />;
  })
  .add('DataMapperList (3)', () => {
    const query = data.Query
      // Mappings
      .map({ id: 'increment', props: { by: 4 } })
      .map({ id: 'increment', props: { by: -2, flag: true } })
      .map({ id: 'increment', props: { by: 6, bar: 'hello' } });
    const items = DataMapperList.toItems(query.toObject());
    return <DataMapperList items={items} />;
  });
