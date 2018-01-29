import { Actions, IActionListItem, data } from '../../common';
export { IActionListItem };

export function init(query: data.Query) {
  const list = Actions
    // Init.
    .header('Data Mappers')

    .textbox({ name: 'increment', default: 2 })
    .add('add "increment" mapper', e => {
      const by = e.args.increment;
      query.map({ id: 'increment', props: { by } });
    })

    // Finish up.
    .toArray();
  return { list };
}
