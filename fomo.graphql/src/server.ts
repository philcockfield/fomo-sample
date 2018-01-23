import { log } from './common';
import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
  }),
});

export function start() {
  return server.start(async () => {
    const port = log.cyan(4000);
    const localhost = log.magenta('http://localhost:');
    log.info(`\n🤖  Running on ${localhost}:${port}\n`);
  });
}
