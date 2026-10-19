import { Pinecone } from '@pinecone-database/pinecone';
import environment from './environment.js';

const pinecone = new Pinecone({
  apiKey: environment.pineconeApiKey,
});

export const policyIndex = pinecone.index(
  environment.pineconeIndexName
);

export default pinecone;