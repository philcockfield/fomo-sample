import { React, css } from '../../common';


export interface IListRowProps { }

/**
 * A single row within a list.
 */
export const ListRow = (props: IListRowProps) => {
  const styles = {
    base: css({
      backgroundColor: 'rgba(255, 0, 0, 0.1)', /* RED */
    }),
  };

  return (
    <div {...styles.base}>
      ListRow
    </div>
  );
};

