import { React, css, GlamorValue } from '../../../common';

const IMAGE_PATH = '/images/DataMapper/';

export const BOX = {
  WIDTH: 50,
  HEIGHT: 57,
};

export interface IBoxProps {
  style?: GlamorValue;
}

export const Box = (props: IBoxProps) => {
  const styles = {
    base: css({
      Image: [
        `${IMAGE_PATH}/box.png`,
        `${IMAGE_PATH}/box@2x.png`,
        BOX.WIDTH,
        BOX.HEIGHT,
      ],
    }),
  };
  return <div {...css(styles.base, props.style)} />;
};
