import React, { useState } from 'react';
import api from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { data } = await api.get('/');
      const user = data.find(u => u.email === email && u.password === password);
      if (user) {
        alert('Login successful');
        // Save to localStorage if needed
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4 shadow">
            <h4 className="text-center mb-4">Login</h4>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
            <button className="btn btn-primary w-100" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;