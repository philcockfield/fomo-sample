import { Context } from '../common';

export default {
  Query: {
    async dataset(
      parent: any,
      args: { length: number },
      ctx: Context,
      info: any,
    ) {
      const { length = 20 } = args;
      const result = Array.from({ length }).map((v, i) => {
        const time = new Date();
        return { time, value: randomInt(100), isReal: true };
      });

      return result;
    },
  },
};

function randomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}
