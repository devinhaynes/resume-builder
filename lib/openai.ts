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
    temperature: 0.2,
  });

  console.log(completion.choices[0].message);

  return completion.choices[0].message;
}

type ChatMessageParams = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function generateChatPrompt(
  resume: string,
  job_description?: string
): Promise<OpenAI.Chat.Completions.ChatCompletionMessage> {
  const setup: ChatMessageParams = {
    role: "system",
    content:
      "You are a successful career coach who specializes in assisting people improve their resumes.",
  };

  const initialPrompt: ChatMessageParams = {
    role: "user",
    content: `Using the following resume, improve the summary and work experience items so they sound more professional and more appealing to a hiring manager:"""\n${JSON.stringify(
      resume
    )}"""`,
  };

  const initialResponse = await sendChatCompletion([setup, initialPrompt]);

  const secondaryPrompt = `Add the resume information, including the enhanced summary and work experience, into the following JSON structure:"""${JSON.stringify(
    sample_resume
  )}"""\nOnly output the JSON.`;

  const json = await sendChatCompletion([
    setup,
    initialPrompt,
    { role: "assistant", content: initialResponse.content! },
    { role: "user", content: secondaryPrompt },
  ]);

  const final = job_description
    ? await sendChatCompletion([
        setup,
        initialPrompt,
        { role: "assistant", content: initialResponse.content! },
        { role: "user", content: secondaryPrompt },
        { role: "assistant", content: json.content! },
        {
          role: "user",
          content: `Use the job description information to enhance the work experience responsibilities and summary using key words and ideas from the job posting:"""${job_description}"""`,
        },
      ])
    : json;

  return final;
}
