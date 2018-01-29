import { Mappers } from '../../common';

export const mappers = Mappers
  // Register mappers.
  .create()
  .add<{ by: number }>('increment', async (props, data) => {
    const items = data.items.map(item => ({
      ...item,
      value: item.value + props.by,
    }));
    return { ...data, items };
  });
