import { randomUUID } from 'node:crypto';
import pinecone from '../config/pinecone.js';
import { chunkText } from '../utils/chunkText.js';

const MODEL = 'llama-text-embed-v2';
const DIMENSION = 1024;

export async function ingestPolicy({
  text,
  fileName,
  companyId,
}) {
  if (!text?.trim()) {
    throw new Error('No readable text found in policy document');
  }

  const chunks = chunkText(text);

  if (!chunks.length) {
    throw new Error('Could not create policy chunks');
  }

  const vectors = [];
  const batchSize = 50;

  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);

  const response = await pinecone.inference.embed({
  model: MODEL,
  inputs: batch,
  parameters: {
    input_type: 'passage',
    truncate: 'END',
    dimension: DIMENSION,
  },
});
    for (let j = 0; j < batch.length; j++) {
      const values = response.data[j].values;

      if (values.length !== DIMENSION) {
        throw new Error('Embedding dimension mismatch');
      }

      vectors.push({
        id: randomUUID(),
        values,
        metadata: {
          companyId: String(companyId),
          fileName,
          chunkIndex: i + j,
          text: batch[j],
        },
      });
    }
  }

  const namespace = pinecone
    .index(process.env.PINECONE_INDEX_NAME)
    .namespace(String(companyId));

  for (let i = 0; i < vectors.length; i += 100) {
    await namespace.upsert({
      records: vectors.slice(i, i + 100),
    });
  }

  return {
    fileName,
    chunksCreated: chunks.length,
  };
}