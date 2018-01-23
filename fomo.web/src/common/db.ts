import { GRAPHQL_URI } from '../common/constants';
import { IGraphqlNetworkEvent } from '../types';
import { GraphqlClient, gql, graphql, Observable } from '../common/libs';

export { gql, GraphqlClient, IGraphqlNetworkEvent, Observable };

const client = graphql(GRAPHQL_URI);
export const db = {
  client,
};
