import OpenAI from "openai";
import sample_resume from "@/data/sample_resume-empty.json";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
  organization: process.env.OPEN_AI_ORG_ID,
});

export async function sendChatCompletion(prompts: ChatMessageParams[]) {
  console.log("Sending request to OpenAI");
  const completion = await openai.chat.completions.create({
    messages: prompts,
    model: "gpt-3.5-turbo",
    temperature: 0,
  });

  console.log(completion.choices);

  return completion.choices[0].message.content;
}

type ChatMessageParams = {
  role: "system" | "user" | "assistant";
  content: string;
};

export function generateChatPrompt(resume: string): ChatMessageParams[] {
  //   const setup: ChatMessageParams = {
  //     role: "system",
  //     content:
  //       "You are a resume expert you will be assisting me in parsing and formatting resume data.",
  //   };
  //   const setJSON: ChatMessageParams = {
  //     role: "user",
  //     content: `Use the following JSON structure as a guide for creating a resume:\n${sample_resume}`,
  //   };
  //   const assistantAffirmation: ChatMessageParams = {
  //     role: "assistant",
  //     content: "Understood. I will use this JSON structure for future reference.",
  //   };
  //   const processText: ChatMessageParams = {
  //     role: "user",
  //     content: `Process the raw text from the following resume and use the data to generate a new resume JSON file based on the sample resume. If there is no relevant data for a particular field, set the data property to an empty string:\n${resume}`,
  //   };

  const singlePrompt: ChatMessageParams = {
    role: "system",
    content: `
    I have a sample JSON file that represents resume data. I also have raw text data from a resume. Parse the resume text data and fix any issues. Then input that data into the proper fields of the sample JSON file. Use the strict properties and data types that are in the sample JSON. If the text data does not have values for specific properties, set those properties to an empty string or array. Do not input anything into the job_description, cover_letter, or thank_you_letter sections, but keep them in the JSON file. Only output the final JSON.\n\nSample JSON: ${JSON.stringify(
      sample_resume
    )}\n\nRaw Text: ${resume}`,
  };

  return [singlePrompt];
}
