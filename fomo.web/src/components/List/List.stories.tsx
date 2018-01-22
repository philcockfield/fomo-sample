import { React, describe } from '../../common/storybook';
import { List } from '.';

describe('list', {
  title: 'List of data rows.',
}).add('List', () => {
  return <List />;
});
