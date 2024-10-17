const express = require("express");
const yahooFinance = require("yahoo-finance");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the port for the Express server
const PORT = process.env.PORT || 3000;

// Initialize the ChatGroq model (API call to your LLM)
const chatGroqAPI = async (question) => {
  const apiUrl = "https://api.groq.com/chat"; // Replace with the actual API endpoint for ChatGroq
  const response = await axios.post(
    apiUrl,
    {
      question: question,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PANDASAI_API_KEY}`, // Use your API key
      },
    }
  );
  return response.data;
};

// Endpoint for the main page
app.get("/", (req, res) => {
  res.send(`
    <h1>Market Analysis of Stock Price Chatbot</h1>
    <form method="post" action="/ask">
      <label for="company_symbol">Enter the company symbol (e.g., AAPL):</label><br>
      <input type="text" id="company_symbol" name="company_symbol"><br><br>
      <label for="user_query">Ask a question about the market:</label><br>
      <input type="text" id="user_query" name="user_query"><br><br>
      <input type="submit" value="Submit">
    </form>
  `);
});

// Post endpoint to process form data and provide response
app.post("/ask", async (req, res) => {
  const { company_symbol, user_query } = req.body;

  if (!company_symbol || !user_query) {
    res.send("Please provide a valid company symbol and question.");
    return;
  }

  try {
    // Fetch historical data for the company
    const companyData = await yahooFinance.historical({
      symbol: company_symbol,
      from: "2020-01-01",
      to: "2023-12-31",
    });

    // Send the data and question to ChatGroq for analysis
    const prompt = `Company: ${company_symbol}. Data: ${JSON.stringify(companyData)}. Question: ${user_query}`;
    const chatbotResponse = await chatGroqAPI(prompt);

    // Respond with the analysis
    res.send(`
      <h1>Market Analysis for ${company_symbol}</h1>
      <p>Question: ${user_query}</p>
      <p>Response: ${chatbotResponse}</p>
    `);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
