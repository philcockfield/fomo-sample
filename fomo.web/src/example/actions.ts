import { Actions, IActionListItem, db, gql, data } from './common';

export { IActionListItem };

export const actions = Actions
  // Tests.
  .header('Sparklines')
  .add('Show 1', e => e.setState({ totalSparklines: 1 }))
  .add('Show 2', e => e.setState({ totalSparklines: 2 }))
  .add('Show 10', e => e.setState({ totalSparklines: 10 }))
  .add('Show 50', e => e.setState({ totalSparklines: 50 }))

  // GraphQL.
  .header('GraphQL')
  .add('query data (1)', async e => {
    e.setState({ dataset: await getDataset(1) });
  })
  .add('query data (5)', async e => {
    e.setState({ dataset: await getDataset(5) });
  })
  .add('query data (100)', async e => {
    e.setState({ dataset: await getDataset(100) });
  })

  // Finish up.
  .toArray();

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
  const items = res.data.dataset || [];
  return { items };
}
