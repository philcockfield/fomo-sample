import { React, css, color, data } from '../../../common';
import { Text, ITextProps } from '../../primitives';

export interface IPropGridProps {
  data?: data.MapperProps;
}

export const PropGrid = (props: IPropGridProps) => {
  const styles = {
    base: css({
      border: 'none',
      boxSizing: 'border-box',
    }),
    table: css({
      padding: 0,
      margin: 0,
      borderSpacing: 0,
    }),
    tr: css({
      padding: 0,
      margin: 0,
    }),
    td: css({
      margin: 0,
      padding: 5,
      paddingBottom: 0,
    }),
    tdFirst: css({
      paddingTop: 12,
    }),
    tdLast: css({
      paddingBottom: 12,
    }),
    tdKey: css({
      minWidth: 40,
      borderRight: `solid 1px ${color.format(-0.1)}`,
    }),
    tdValue: css({
      paddingLeft: 10,
    }),
  };

  const data = props.data || {};
  const keys = Object.keys(data);

  const elRows = keys.map((key, i) => {
    const isLast = i === keys.length - 1;
    const tdFirst = i === 0 && styles.tdFirst;
    const tdLast = isLast && styles.tdLast;
    const value = data[key];
    const valueString =
      value === undefined
        ? '<undefined>'
        : value === null ? '<null>' : value.toString();
    return (
      <tr key={i} {...styles.tr}>
        <td {...css(styles.td, styles.tdKey, tdFirst, tdLast)}>
          <Label>{key}</Label>
        </td>
        <td {...css(styles.td, styles.tdValue, tdFirst, tdLast)}>
          <Label>{valueString}</Label>
        </td>
      </tr>
    );
  });

  return (
    <div {...styles.base}>
      <table {...styles.table}>
        <tbody>{elRows}</tbody>
      </table>
    </div>
  );
};

const Label = (props: ITextProps) => (
  <Text color={-0.6} size={14} weight={'BOLD'} {...props} />
);
