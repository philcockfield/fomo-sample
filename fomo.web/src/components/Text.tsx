import { React, css, color as colorUtil, GlamorValue } from '../common';

export interface ITextProps {
  children?: React.ReactNode;
  size?: number;
  color?: number | string;
  weight?: 'THIN' | 'LIGHT' | 'NORMAL' | 'BOLD';
  italic?: boolean;
  block?: boolean;
  opacity?: number;
  style?: GlamorValue;
}

const WEIGHTS = {
  THIN: 300,
  LIGHT: 400,
  NORMAL: 500,
  BOLD: 900,
};

export const Text = (props: ITextProps) => {
  const {
    children,
    size = 16,
    color = -0.7,
    block = false,
    weight = 'NORMAL',
    italic = false,
    opacity = 1,
  } = props;
  const styles = {
    base: css({
      display: block ? 'block' : 'inline-block',
      color: colorUtil.format(color),
      fontSize: size,
      fontWeight: WEIGHTS[weight],
      fontStyle: italic && 'italic',
      cursor: 'default',
      opacity,
    }),
  };
  return <div {...css(styles.base, props.style)}>{children}</div>;
};
