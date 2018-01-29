import { React, css, ObjectView, data } from '../../../common';
import { EmptyText } from '../../Text';

export interface IDataSetColumnProps {
  dataset?: data.IDataSet;
  emptyLabel?: string;
  title?: string;
}

export const DataSetColumn = (props: IDataSetColumnProps) => {
  const { dataset, emptyLabel = 'No dataset', title = 'DataSet' } = props;
  const styles = {
    base: css({}),
    empty: css({
      textAlign: 'center',
      padding: 10,
    }),
  };

  const elEmpty = !dataset && (
    <EmptyText block={true} style={styles.empty}>
      {emptyLabel}
    </EmptyText>
  );

  const elObject = dataset && (
    <ObjectView data={props.dataset} expandLevel={3} name={title} />
  );

  return (
    <div {...styles.base}>
      {elEmpty}
      {elObject}
    </div>
  );
};
