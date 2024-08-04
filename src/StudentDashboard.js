import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { listStudents } from './graphql/queries';

const client = generateClient();

const StudentDashboard = ({ signOut, user }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      console.log("User object: ", user); // Log the user object

      if (user && user.attributes && user.attributes['custom:rollNumber']) {
        const rollNumber = user.attributes['custom:rollNumber'];
        console.log("Roll Number: ", rollNumber); // Log the roll number

        const result = await client.graphql({ query: listStudents });
        const students = result.data.listStudents.items;
        const studentInfo = students.find((stu) => stu.rollNumber === rollNumber);
        setStudent(studentInfo);
      } else {
        console.error("User object does not have the custom:rollNumber attribute");
      }
    };

    fetchStudentData();
  }, [user]);

  if (!student) return <div>Loading...</div>;

  return (
    <div>
      <h1>{student.name}</h1>
      <p>Roll Number: {student.rollNumber}</p>
      <p>Marks: {student.marks}</p>
      <p>Course: {student.course}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default withAuthenticator(StudentDashboard);
