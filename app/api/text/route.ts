import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';
import dotenv from 'dotenv';

dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);
    
    const input = {
      top_k: 0,
      top_p: 1,
      prompt: body.prompt,
      max_tokens: 512,
      temperature: 0.5,
      system_prompt: "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
      length_penalty: 1,
      max_new_tokens: 500,
      min_new_tokens: -1,
      prompt_template: "<s>[INST] <<SYS>>\n{system_prompt}\n<</SYS>>\n\n{prompt} [/INST]",
      presence_penalty: 0,
      log_performance_metrics: false,
    };

    let fullResponse = '';

    for await (const event of replicate.stream("meta/llama-2-70b-chat", { input })) {
      fullResponse += event.toString(); // Accumulate the response
    }

    console.log('Full Response:', fullResponse);
    return NextResponse.json({ data: fullResponse });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(error);
  }
}
