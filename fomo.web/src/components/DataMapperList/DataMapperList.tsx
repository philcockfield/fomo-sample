import { React, css } from '../../common';
import { DataMapperItem, IDataMapperItem } from '../DataMapperItem';
import { DataSetVisual } from './components/DataSetVisual';

export { IDataMapperItem };

export interface IDataMapperListProps {
  items?: IDataMapperItem[];
}

/**
 * A list of DataMapper items.
 */
export class DataMapperList extends React.Component<IDataMapperListProps, {}> {
  public render() {
    const { items = [] } = this.props;
    const styles = {
      base: css({
        flex: 1,
        boxSizing: 'border-box',
      }),
    };

    const elItems = items.map((item, i) => {
      const isFirst = i === 0;
      const isLast = i === items.length - 1;
      const elFirst = isFirst && <DataSetVisual isFirst={isFirst} />;
      return (
        <div key={i}>
          {elFirst}
          <DataMapperItem id={item.id} props={item.props} />
          <DataSetVisual isLast={isLast} />
        </div>
      );
    });

    return <div {...styles.base}>{elItems}</div>;
  }
}
