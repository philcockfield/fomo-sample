import { React, describe } from '../../common/storybook';
import { DataMapper } from '.';

describe('data', {
  title: 'A visual representation of a data-mapper chain.',
  width: '100%',
  height: '100%',
  padding: 30,
  flex: true,
}).add('DataMapper', () => {
  return <DataMapper />;
});
