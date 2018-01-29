import { Actions, IActionListItem, data, gql, db } from '../../common';
import { mappers } from './mappers';

export { IActionListItem };

export function init(query: data.Query) {
  const list = Actions
    // Input.
    .header('Input Dataset')
    .add('query data (1)', async e => {
      e.setState({ input: await getDataset(1) });
    })
    .add('query data (5)', async e => {
      e.setState({ input: await getDataset(5) });
    })
    .add('query data (100)', async e => {
      e.setState({ input: await getDataset(100) });
    })

    // Data Mappers.
    .header('Data Mappers')
    .textbox({ name: 'increment', default: 2 })
    .add('add "increment" mapper', e => {
      const by = e.args.increment;
      query.map({ id: 'increment', props: { by } });
    })
    .add('clear', e => query.clear())

    // Execute
    .header('Ouput Dataset')
    .add('transform', e => {
      const input: data.IDataSet = e.prevState.input;
      const output = query.transform(mappers, input);
      e.setState({ output });
    })

    // Finish up.
    .toArray();
  return { list };
}

/**
 * INTERNAL
 */
export async function getDataset(length: number): Promise<data.IDataSet> {
  const query = gql`
    query MyData($length: Int) {
      dataset(length: $length) {
        time
        value
      }
    }
  `;
  const res = await db.client.query<any>({
    query,
    variables: { length },
    fetchPolicy: 'network-only',
  });
  const items = (res.data.dataset || []).map(({ time, value }: any) => {
    return { time, value };
  });
  return { items };
}
