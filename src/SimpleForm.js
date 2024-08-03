import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createEntry } from './graphql/mutations';

const SimpleForm = () => {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await API.graphql(graphqlOperation(createEntry, { input: { name: input } }));
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
