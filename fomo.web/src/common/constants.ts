import { IS_BROWSER, IS_DEV } from '@tdb/util/lib/constants';
export { IS_BROWSER, IS_DEV };

export const GRAPHQL_URI = IS_DEV
  ? 'http://localhost:4000'
  : 'https://fomo-graphql.db.team';
