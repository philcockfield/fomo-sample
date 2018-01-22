import { React, css } from '../../common';


export interface IListProps { }

/**
 * List of data rows.
 */
export class List extends React.Component<IListProps, {}> {
  public render() {
    const styles = {
      base: css({
        backgroundColor: 'rgba(255, 0, 0, 0.1)', /* RED */
      }),
    };

    return (
      <div {...styles.base}>
        List
      </div>
    );
  }
}
