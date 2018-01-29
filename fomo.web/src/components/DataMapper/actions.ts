import { Actions, IActionListItem, data } from '../../common';
export { IActionListItem };

export function init(query: data.Query) {
  const list = Actions
    // Init.
    .header('Data Mappers')

    .textbox({ name: 'increment', default: 2 })
    .add('add "increment" mapper', e => {
      // const query: data.Query = e.prevProps.query;
      query.map({ id: 'increment', props: { by: e.args.increment } });
    })

    // Finish up.
    .toArray();
  return { list };
}
