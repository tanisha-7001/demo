import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api'; // Ensure this path is correct
import { createEntry } from './graphql/mutations'; // Ensure this path is correct

const client = generateClient(); // Create your client instance

const SimpleForm = () => {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Ensure that client.graphql supports the given API call format
      await client.graphql({
        query: createEntry, // The mutation query
        variables: { input: { name: input } } // The input variables
      });
      setMessage('Entry created successfully!');
    } catch (error) {
      setMessage('Error creating entry.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Submit a Name</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SimpleForm;
