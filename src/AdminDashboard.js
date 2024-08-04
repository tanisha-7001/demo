import React, { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader';
import { generateClient } from 'aws-amplify/api';
import { createStudent, updateStudent, deleteStudent } from './graphql/mutations';
import { listStudents } from './graphql/queries';

const initialState = { name: '', rollNumber: '', marks: '', course: '' };
const client = generateClient();

const AdminDashboard = () => {
  const [formState, setFormState] = useState(initialState);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchStudents() {
    try {
      const result = await client.graphql({ query: listStudents });
      if (result.errors) {
        console.error('GraphQL errors:', result.errors);
      }
      const students = result.data?.listStudents?.items || [];
      setStudents(students);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  }

  async function handleCSVUpload(data) {
    for (let i = 1; i < data.length; i++) {
      const student = {
        name: data[i][0],
        rollNumber: data[i][1],
        marks: parseInt(data[i][2]),
        course: data[i][3],
      };
      await client.graphql({ query: createStudent, variables: { input: student } });
    }
    fetchStudents();
  }

  async function handleEdit(id, updatedStudent) {
    await client.graphql({ query: updateStudent, variables: { input: { id, ...updatedStudent } } });
    const updatedStudents = students.map((stu) => (stu.id === id ? { ...stu, ...updatedStudent } : stu));
    setStudents(updatedStudents);
  }

  async function handleDelete(id) {
    await client.graphql({ query: deleteStudent, variables: { input: { id } } });
    const updatedStudents = students.filter((stu) => stu.id !== id);
    setStudents(updatedStudents);
  }

  async function addStudent() {
    if (!formState.name || !formState.rollNumber || !formState.marks || !formState.course) return;
    const student = { ...formState };
    await client.graphql({ query: createStudent, variables: { input: student } });
    setStudents([...students, student]);
    setFormState(initialState);
  }

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <CSVReader
        cssClass="csv-reader-input"
        label="Select CSV with student details"
        onFileLoaded={handleCSVUpload}
        onError={(error) => console.error(error)}
        inputId="csvInput"
        inputStyle={{ color: 'red' }}
      />
      <div className="column">
        <h2>Add Student</h2>
        <label>Name</label>
        <input onChange={(event) => setInput('name', event.target.value)} value={formState.name} />
        <label>Roll Number</label>
        <input onChange={(event) => setInput('rollNumber', event.target.value)} value={formState.rollNumber} />
        <label>Marks</label>
        <input onChange={(event) => setInput('marks', event.target.value)} value={formState.marks} />
        <label>Course</label>
        <input onChange={(event) => setInput('course', event.target.value)} value={formState.course} />
        <button className="button" onClick={addStudent}> Add Student</button>
      </div>
      <div className="column">
        <h2>Students</h2>
        {students.map((student) => (
          <div key={student.id} className="studentInfo">
            <p>{`Name: ${student.name}, Roll Number: ${student.rollNumber}, Marks: ${student.marks}, Course: ${student.course}`}</p>
            <button className="deleteButton" onClick={() => handleDelete(student.id)}>Delete</button>
            <button className="editButton" onClick={() => handleEdit(student.id, { name: 'Updated Name', marks: 99, course: 'Updated Course' })}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
