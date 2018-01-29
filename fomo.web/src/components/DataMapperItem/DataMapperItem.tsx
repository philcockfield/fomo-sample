import { React, css, color, constants, data } from '../../common';
import { Text, EmptyText, ITextProps } from '../primitives';
import { PropGrid } from './components/PropGrid';

const IMAGE_PATH = '/images/DataMapper/';

export interface IDataMapperItem {
  id: string;
  props?: data.MapperProps;
}

export interface IDataMapperItemProps extends IDataMapperItem {}

/**
 * A visual representation of a query mapping.
 */
export class DataMapperItem extends React.Component<IDataMapperItemProps, {}> {
  public render() {
    const { props } = this.props;
    const styles = {
      base: css({
        background: color.format(-0.03),
        border: `solid 1px ${color.format(-0.1)}`,
        borderRadius: 3,
        PaddingX: 10,
        paddingTop: 10,
      }),
      header: css({
        Flex: 'horizontal-center',
        paddingBottom: 8,
        borderBottom: `solid 1px ${color.format(-0.1)}`,
      }),
      headerLabels: css({
        flex: 1,
        Flex: 'horizontal-center-spaceBetween',
      }),
      headerIcon: css({
        Image: [
          `${IMAGE_PATH}/icon-mapper.png`,
          `${IMAGE_PATH}/icon-mapper@2x.png`,
          20,
          22,
        ],
        opacity: 0.5,
        marginRight: 10,
      }),
      body: css({}),
      noProps: css({
        padding: 10,
        Flex: 'center-center',
      }),
    };

    const elPropGrid = props && <PropGrid data={props} />;

    const elNoProps = !props && (
      <EmptyText style={styles.noProps} block={true}>
        No props
      </EmptyText>
    );

    return (
      <div {...styles.base}>
        <div {...styles.header}>
          <div {...styles.headerIcon} />
          <div {...styles.headerLabels}>
            <Label>Mapper</Label>
            <Label color={constants.COLORS.BLUE}>“{this.props.id}”</Label>
          </div>
        </div>
        <div {...styles.body}>
          {elPropGrid}
          {elNoProps}
        </div>
      </div>
    );
  }
}

const Label = (props: ITextProps) => (
  <Text color={-0.6} size={14} weight={'BOLD'} {...props} />
);
