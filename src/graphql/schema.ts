import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    hello: String!
    #my profile returning all User type
    me: User
    posts(take: Int!, skip: Int!): [Post!]!
    profile(userId: ID!): Profile
    comments: [Comment!]!
  }

  type Mutation {
    postCreate(post: PostInput!): PostPayload!
    postUpdate(postId: ID!, post: PostInput!): PostPayload!
    postPublished(postId: ID!): PostPayload!
    postUnPublished(postId: ID!): PostPayload!
    likesCreate(postId: ID!): LikePostPayload!
    postDelete(postId: ID!): PostPayload!
    commentCreate(comment: CommentInput!): CommentPayload!
    professionCreate(profession: ProfessionInput!): ProfessionPayload!
    professionDelete(professionId: ID!): ProfessionPayload!
    profileCreate(profile: ProfileInput!): ProfilePayload!
    profileUpdate(profileId: ID!, profile: ProfileInput!): ProfilePayload!
    signup(name: String!, credentials: CredentialsInput!): AuthPayload!
    signin(credentials: CredentialsInput!): AuthPayload!
  }

  type Post {
    id: ID!
    title: String!
    #an array for likes
    likes: [LikedPost]!
    comments: [Comment]!
    content: String!
    createdAt: String!
    published: Boolean!
    #relation to User Type
    user: User!
  }

  #we create mutations for liked post soon
  type LikedPost {
    id: ID!
    likedAt: String!
    user: User!
  }

  type Comment {
    id: Int!
    text: String!
    user: User!
    postId: Int!
    createdAt: String!
  }

  type Profession {
    id: ID!
    role: String!
    #relation to User
    user: User!
  }

  type User {
    id: ID!
    name: String!
    #this is will updating on db in every signup
    email: String
    image: String
    # likes: [LikedPost]!
    posts(take: Int!, skip: Int!): [Post!]!
    profession: [Profession!]!
  }

  type Profile {
    id: ID!
    bio: String!
    #relation to User
    isMyProfile: Boolean!
    user: User!
  }

  type Account {
    id: ID!
    providerType: String!
    providerId: String!
    #relation to User
    user: User!
  }

  type UserError {
    message: String!
  }

  type AuthPayload {
    userErrors: [UserError!]!
    token: String
    account: Account
  }

  type PostPayload {
    userErrors: [UserError!]!
    post: Post
  }

  type LikePostPayload {
    userErrors: [UserError!]!
    likes: LikedPost
  }

  type ProfessionPayload {
    userErrors: [UserError!]!
    profession: Profession
  }

  type ProfilePayload {
    userErrors: [UserError!]!
    profile: Profile
  }

  type CommentPayload {
    userErrors: [UserError!]!
    comment: Comment
  }

  input PostInput {
    title: String
    content: String
  }

  input CommentInput {
    text: String
    postId: Int
  }

  input ProfessionInput {
    role: String
  }

  input ProfileInput {
    bio: String
  }

  input CredentialsInput {
    email: String!
    password: String!
  }
`;
