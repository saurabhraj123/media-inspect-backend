import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    sayHello: String
  }

  enum Platform {
    YOUTUBE
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    isEmailVerified: Boolean!
    verificationToken: String
    tokenExpiresAt: String
    createdAt: Date!
    workspaces: [Workspace]!
    editAccessWorkspaces: [Workspace]!
  }

  type Media {
    id: Int!
    type: String!
    title: String!
    description: String
    thumbnailUrl: String!
    uploadUrl: String!
    scheduledUploadAt: Date!
    createdAt: Date!
    workspace: Workspace!
  }

  type Workspace {
    id: Int!
    name: String!
    description: String
    platform: Platform!
    accessToken: String
    owner: User!
    editors: [User]!
    media: [Media]!
    createdAt: Date!
  }

  type Mutation {
    createWorkspace(
      name: String!
      description: String
      platform: Platform!
      accessToken: String
      ownerId: Int!
    ): Workspace!

    updateWorkspace(workspaceId: Int!): Workspace!
  }
`;
