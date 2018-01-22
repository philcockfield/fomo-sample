import { React, describe } from '../../common/storybook';
import { Sparkline } from '.';

describe('primitives', {
  title:
    'A small graphic providing a quick representation of numerical or statistical information.',
}).add('Sparkline', () => {
  return (
    <Sparkline
      width={200}
      height={30}
      data={[5, 10, 5, 20, 22, 0, 34, 5, 10]}
    />
  );
});
