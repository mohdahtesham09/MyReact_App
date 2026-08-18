import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const rawKey = process.env.GROQ_API_KEY || '';
const apiKey = rawKey.replace(/^["']|["']$/g, '').trim();

console.log('Testing Groq Key:', apiKey.substring(0, 10) + '...');

const groq = new Groq({ apiKey });

async function listModels() {
  try {
    const list = await groq.models.list();
    console.log('--- Available Groq Models ---');
    list.data.forEach(m => console.log(`- ${m.id}`));
  } catch (err) {
    console.error('Groq Models List Error:', err);
  }
}

listModels();
