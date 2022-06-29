import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphql } from 'graphql';

// Fill this in with the schema string
const schemaString = `
type Query {
  getUser(userId: String!): User
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
        getUser: (_: any, { userId }: { userId: string }) => {
          if (userId === '1234567890') {
            return {
              id: '1234567890',
              email: 'test@email.fr',
              lastName: 'Test',
              firstName: 'testeur',
              role: 'PO',
            };
          } else {
            return null;
          }
        },
      },
    };
  },
});

const query = /* GraphQL */ `
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      id
      email
      lastName
      firstName
      role
    }
  }
`;
describe('Get User By Id Test', () => {
  it('return without error', async () => {
    const {data} = await graphql({
      schema: schemaWithMocks,
      source: query,
      variableValues: { userId: '1234567890' },
    });
    expect(data?.getUser).toBeDefined;
  });

  it('return no data', async () => {
    const {data} = await graphql({
      schema: schemaWithMocks,
      source: query,
      variableValues: { userId: '22224567890' },

    });
    expect(data?.getUser).toBeNull;
  });
});
