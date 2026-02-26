// src/pages/Signup.jsx
import React, { useState } from 'react';
import { registerUser } from '../api/authService';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const user = await registerUser(email, password, name);
    if (user) alert('Signup successful!');
  };

  return (
    <form onSubmit={handleSignup}>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;