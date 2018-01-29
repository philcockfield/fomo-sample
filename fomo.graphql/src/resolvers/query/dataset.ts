import { Context } from '../../common';

export const query = {
  async dataset(
    parent: any,
    args: { length: number },
    ctx: Context,
    info: any,
  ) {
    const { length = 20 } = args;

    /**
     * NOTE: Calls made out to back-end services here.
     */

    const items = Array.from({ length }).map((v, i) => {
      const time = new Date();
      return { time, value: randomInt(100), isReal: true };
    });

    return items;
  },
};

function randomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default {
  ...query,
};
