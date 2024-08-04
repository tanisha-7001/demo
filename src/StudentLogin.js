import { withAuthenticator } from '@aws-amplify/ui-react';
import StudentDashboard from './StudentDashboard.js';
import React from 'react';
import '@aws-amplify/ui-react/styles.css';


function StudentLogin({ signOut, user }) {
  return (
    <>
      <StudentDashboard/>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(StudentLogin);