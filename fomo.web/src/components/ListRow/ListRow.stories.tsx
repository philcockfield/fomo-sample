import { React, describe } from '../../common/storybook';
import { ListRow } from '.';

describe('list', {
  title: 'A single row within a list.',
}).add('ListRow', () => {
  return <ListRow />;
});
