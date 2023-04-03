import { OpenAI } from 'langchain';

const model = new OpenAI({
  modelName: 'gpt-4',
  openAIApiKey: process.env.OPENAI_API_KEY,
});
const res = await model.call("What's a good idea for an application to build with GPT-3?");
console.log(res);
