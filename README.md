
# Market Analysis of Stock Price Chatbot

This Node.js application allows users to enter a stock symbol and ask questions about market analysis based on historical stock price data. The app uses the Yahoo Finance API to fetch historical data and leverages a ChatGroq model API to provide market insights.

## Features

- Fetch historical stock price data from Yahoo Finance.
- Provide interactive responses to user queries using an LLM (ChatGroq API).
- Simple web interface using Express for input and output.

## Requirements

To run this application, you need to have the following:

- Node.js (v14 or higher)
- An API key for the ChatGroq model (store it in `.env` as `PANDASAI_API_KEY`)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/nodejs_app.git
   ```

2. Navigate into the project directory:
   ```bash
   cd nodejs_app
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Set up your environment variable by creating a `.env` file and adding your API key:
   ```
   PANDASAI_API_KEY=your-api-key-here
   ```

## Usage

1. Start the application:
   ```bash
   npm start
   ```

2. Visit `http://localhost:3000` in your web browser.

3. Enter a stock symbol (e.g., AAPL) and ask a question related to market analysis.

## Dependencies

- [Express](https://expressjs.com/)
- [Yahoo Finance](https://www.npmjs.com/package/yahoo-finance)
- [Axios](https://www.npmjs.com/package/axios)
- [Dotenv](https://www.npmjs.com/package/dotenv)

## License

This project is licensed under the MIT License.
