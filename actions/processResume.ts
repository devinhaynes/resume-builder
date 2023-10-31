"use server";

import * as pdfjs from "pdfjs-dist";
// @ts-ignore
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import fs from "fs";
import { TextItem } from "pdfjs-dist/types/src/display/api";
import { sendChatCompletion, generateChatPrompt } from "@/lib/openai";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

type ProcessError = {
  message: string;
};

export async function processResume(
  formData: FormData
): Promise<string | ProcessError> {
  // Process uploaded PDF file
  const file = formData.get("resume_upload") as File;

  const buffer = await file.arrayBuffer();

  fs.appendFileSync("data/resume.pdf", Buffer.from(buffer));

  // Read PDF Text
  const text = (await getPDFText("data/resume.pdf")).join("");

  // console.log(text);

  const prompts = generateChatPrompt(text);

  // // Send to OpenAI for formatting
  const chatResponseMessage = await sendChatCompletion(prompts);

  if (chatResponseMessage) {
    return JSON.parse(chatResponseMessage);
  }

  return { message: "Unable to process resume data" };
}

async function getPDFText(pdfUrl: string) {
  var pdfDoc = pdfjs.getDocument(pdfUrl);

  const pdf = await pdfDoc.promise;

  // get all pages text
  let maxPages = pdf._pdfInfo.numPages;

  const countPromises = [...Array(maxPages)].map(async (_, i) => {
    let page = await pdf.getPage(i + 1);
    let textContent = await page.getTextContent();
    const text = textContent.items
      .map((item) => {
        if (typeof item === "object" && "str" in item) {
          item = item as TextItem;
          return item.str;
        }
      })
      .join(" ");

    return text;
  });

  return Promise.all(countPromises);
}
