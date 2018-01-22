import { Actions, IActionListItem } from './common';
export { IActionListItem };

export default Actions
  // System state.
  .header('Sparklines')
  .add('Show 1', e => e.setState({ totalSparklines: 1 }))
  .add('Show 2', e => e.setState({ totalSparklines: 2 }))
  .add('Show 10', e => e.setState({ totalSparklines: 10 }))
  .add('Show 100', e => e.setState({ totalSparklines: 100 }))

  // Finish up.
  .toArray();
