import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Successfully signed up!');
      navigate('/dashboard'); // Navigate to the dashboard after successful signup
    } catch (error) {
      console.error('Error during signup:', error.message);
      alert('Error: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Create Your Account</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
