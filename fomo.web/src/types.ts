export { FetchPolicy } from 'apollo-client';

export interface IGraphqlNetworkEvent {
  isActive: boolean;
}

export interface IQueryOptions {
  force?: boolean;
  auth?: string;
}
