import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphql } from 'graphql';

// Fill this in with the schema string
const schemaString = `
type Query {
  getCurrentUser: User
}

type User {
  id: ID!
  email: String!
  lastName: String!
  firstName: String!
  role: RoleSite
  password: String!
}

enum RoleSite {
  ADMIN
  USER
  PO
}`;

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString });

// Create a new schema with mocks
const schemaWithMocks = addMocksToSchema({
  schema,
  resolvers: () => {
    return {
      Query: {
        getCurrentUser: () => {
          return {
            id: '1234567890',
            email: 'test@email.fr',
            lastName: 'Test',
            firstName: 'testeur',
            role: 'PO',
          };
        },
      },
    };
  },
});

const query = /* GraphQL */ `
  query getCurrentUser {
    getCurrentUser {
      id
      email
    }
  }
`;
describe('get Current User Test', () => {
  it('return without error', async () => {
    const results = await graphql({
      schema: schemaWithMocks,
      source: query,
    });
    expect(results.data).toBeDefined;
  });
});
