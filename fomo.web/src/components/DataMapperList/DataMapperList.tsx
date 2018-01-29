import { React, css, data, GlamorValue } from '../../common';
import { DataMapperItem, IDataMapperItem } from '../DataMapperItem';
import { DataSetVisual } from './components/DataSetVisual';

export { IDataMapperItem };

export interface IDataMapperListProps {
  items?: IDataMapperItem[];
  style?: GlamorValue;
}

/**
 * A list of DataMapper items.
 */
export class DataMapperList extends React.Component<IDataMapperListProps, {}> {
  public static toItems(query: data.IQuery): IDataMapperItem[] {
    return query.mappers.map(item => {
      return {
        id: item.id,
        props: item.props,
      };
    });
  }

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

    return <div {...css(styles.base, this.props.style)}>{elItems}</div>;
  }
}
