import React, { useEffect } from 'react';
import styles from '../styles/Home.module.css';

require('dotenv').config()


const Home = () => {
  useEffect(() => {
    // Define your API key
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

    // Function to handle the API request
    async function getMessage() {
      const submitButton = document.querySelector("#submit");
      const outputElement = document.querySelector('#output');
      const inputElement = document.querySelector("#userInput");

      console.log("clicked");

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: inputElement.value }],
          max_tokens: 50,
        })
      };

      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();
        console.log(data);
        outputElement.textContent = data.choices[0].message.content;
      } catch (error) {
        console.error(error);
      }
    }

    // Attach a click event listener to the submit button
    const submitButton = document.querySelector("#submit");
    submitButton.addEventListener("click", getMessage);

    // Return a cleanup function to remove the event listener
    return () => {
      submitButton.removeEventListener("click", getMessage);
    };
  }, []); // Empty dependency array ensures it runs only once on component mount

  return (
    <div className={styles.terminal}>
      <div className={styles.title} id="title">
        TerminalGPT
        <p className={styles.output} id="output">
          Hello! I am TerminalGPT, a language model trained to provide assistance and answer questions. How can I assist you today?
        </p>
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.inputField} type="text" id="userInput" placeholder="Type a command" />
        <button className={styles.buttonSubmit} id="submit">Submit</button>
      </div>
    </div>
  );
};

export default Home;
