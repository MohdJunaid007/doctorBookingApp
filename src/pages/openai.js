import axios from "axios";
// const { Configuration, OpenAIApi } = require("openai");
import OpenAI from 'openai';
// import {API_KEY} from '../../env'
// require('dotenv').config()
// import dotenv from 'dotenv'



const OPENAI_API_KEY = process.env.API_KEY;
console.log("hii--", OPENAI_API_KEY);
// const configuration = new Configuration({
//     apiKey: OPENAI_API_KEY,
// });
const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true
});
// const openai = new OpenAIApi(configuration);

export async function sendMessageToOpenAI(message) {
    // const response = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: message,
    //     temperature: 0.9,
    //     max_tokens: 256,
    //     top_p: 1,
    //     frequency_penalty: 0,
    //     presence_penalty: 0,
    // });
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": "Hello!" }],
    });
    console.log(chatCompletion.choices[0].message.content);
    // return response.data.choices[0].text;
    return chatCompletion.choices[0].message.content;
}