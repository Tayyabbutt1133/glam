'use client'

import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import client from '../../../lib/apollo-client';

export default function ApolloProvider({ children }) {
  return (
    <BaseApolloProvider client={client}>
      {children}
    </BaseApolloProvider>
  );
}