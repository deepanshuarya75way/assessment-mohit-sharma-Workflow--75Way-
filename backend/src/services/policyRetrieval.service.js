
import pinecone from '../config/pinecone.js';

const MODEL = 'llama-text-embed-v2';
const DIMENSION = 1024;

export async function searchPolicies(question, { companyId }) {
  if (!question?.trim() || !companyId) {
    console.log('Missing question or companyId:', {
      question,
      companyId,
    });
    return [];
  }

  const response = await pinecone.inference.embed({
    model: MODEL,
    inputs: [question],
    parameters: {
      input_type: 'query',
      truncate: 'END',
      dimension: DIMENSION,
    },
  });

  const queryVector = response.data[0].values;

  const namespace = pinecone
    .index(process.env.PINECONE_INDEX_NAME)
    .namespace(String(companyId));

  const result = await namespace.query({
    vector: queryVector,
    topK: 5,
    includeMetadata: true,
  });

  const matches = (result.matches || [])
    .filter((match) => match.metadata?.text)
    .map((match) => ({
      text: match.metadata.text,
      fileName: match.metadata.fileName,
      score: match.score,
    }));

  console.log('Searching namespace:', companyId);
  console.log('Retrieved policy chunks:', JSON.stringify(matches, null, 2));

  return matches;
}
