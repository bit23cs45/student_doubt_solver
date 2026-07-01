const OpenAI = require("openai");
const Chat = require("../models/Chat");
const { model } = require("mongoose");


const askQuestion = async (req, res) => {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_KEY?.trim(),
      baseURL: "https://openrouter.ai/api/v1"
    });
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is Required",
      });
    }

    const response = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages:[
        {
          role: "system",
          content: "You're a helpful teacher for beginner student. Explain the answer in simple Hinglish languages with example."
        },
        {
          role: "user",
          content: question
        }
      ]
    });
    const answer = response.choices[0].message.content;
    // const response = await client.responses.create({
    //   model: "gpt-5.5",
    //   input: `You're a helpful teacher for beginner student. Explain the answer in simple Hinglish languages with example. Question: 
    //         ${question}`,
    // });
    // const answer = response.output_text;
    const chat = await Chat.create({ question, answer });
    res.status(201).json({
      success: true,
      message: "Hamara Jawab",
      data: chat,
    });
  } catch (err) {
    console.log("ASK Question error", err);
    res.status(500).json({
      success: false,
      message: "Failed to Answer Question",
    });
  }
};

const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find().toSorted({ createdAt: -1 });
    res.status(200).json({
      success: true,
      total: chats.length,
      data: chats,
    });
  } catch (err) {
    console.log("Unable to Load Chats", err);
    res.status(500).json({
      success: false,
      message: "Unable to Get Chat Logs",
    });
  }
};

const deleteAllChats = async (req, res) => {
  try {
    await Chat.deleteMany();
    res.status(200).json({
      success: true,
      message: "All CHats Deleted",
    });
  } catch (err) {
    console.log("Unable to Delete Chats", err);
    res.status(500).json({
      success: false,
      message: "Unable to Delete Chats",
    });
  }
};

module.exports = {askQuestion, getAllChats, deleteAllChats};