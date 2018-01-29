import { React, css, GlamorValue, color } from '../../../common';

const IMAGE_PATH = '/images/DataMapper/';

export interface IArrowProps {
  direction?: 'RIGHT';
  opacity?: number;
  style?: GlamorValue;
}

export const Arrow = (props: IArrowProps) => {
  const { opacity = 0.3 } = props;
  const styles = {
    base: css({
      backgroundColor: color.format(1),
      PaddingY: 10,
    }),
    icon: css({
      Image: [
        `${IMAGE_PATH}/arrow-right.png`,
        `${IMAGE_PATH}/arrow-right@2x.png`,
        20,
        20,
      ],
      opacity,
    }),
  };
  return (
    <div {...css(styles.base, props.style)}>
      <div {...styles.icon} />
    </div>
  );
};
