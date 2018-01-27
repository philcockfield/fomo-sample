import { Context } from '../../common';

export const mutation = {
  async nem(parent: any, args: any, ctx: Context, info: any) {
    console.log('args', args);
  },
};
