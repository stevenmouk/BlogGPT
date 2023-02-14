import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${req.body}`,
      temperature: 0.7,
      max_tokens: 3500,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    let html = response.data;

    res.status(200).json({ result: html });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
