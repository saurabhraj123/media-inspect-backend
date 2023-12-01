import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    sayHello: String
    me: User
    workspace(id: Int!): Workspace
    media(id: Int!): Media
  }

  type mutation {
    createWorkspace(
      name: String!
      description: String
      platform: Platform!
      accessToken: String
      ownerId: Int!
    ): Workspace!

    updateWorkspace(
      workspaceId: Int!
      name: String
      description: String
      platform: Platform
      accessToken: String
    ): Workspace!

    deleteWorkspace(workspaceId: Int!): Boolean!
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
    createdAt: String!
    workspaces: [Workspace]
    editAccessWorkspaces: [Workspace]
  }

  type Media {
    id: Int!
    type: String!
    title: String!
    description: String
    thumbnailUrl: String!
    uploadUrl: String!
    scheduledUploadAt: String
    createdAt: String!
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
    createdAt: String!
  }
`;
