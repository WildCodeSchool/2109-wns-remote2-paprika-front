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
const data = [
  {
    id: '1234567890',
    email: 'test@email.fr',
    lastName: 'Test',
    firstName: 'testeur',
    role: 'PO',
  },
  {
    id: '4234867898',
    email: 'email@email.fr',
    lastName: 'Email',
    firstName: 'testeur',
    role: 'ADMIN',
  },
];
// Create a new schema with mocks
const schemaWithMocks = addMocksToSchema({
  schema,
  resolvers: () => {
    return {
      Query: {
        getUser: (_: any, { userId }: { userId: string }) => {
          return data.find((user) => user.id == userId);
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
  it('return data', async () => {
    const { data } = await graphql({
      schema: schemaWithMocks,
      source: query,
      variableValues: { userId: '1234567890' },
    });

    expect(!!data?.getUser).toBeTruthy();
  });

  it('return no data', async () => {
    const { data } = await graphql({
      schema: schemaWithMocks,
      source: query,
      variableValues: { userId: '22224567890' },
    });
    expect(!!data?.getUser).toBeFalsy();
  });
});
