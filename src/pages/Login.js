import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../Styles/Login.module.css';

const Login = () => {
    const [input, setInput] = useState({
        email:"",
        password:"",
    });
    const navigate = useNavigate();

    const handleLogin = (e) => {
      e.preventDefault();
  
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  
      if (existingUsers.length === 0) {
          alert("No users registered. Please sign up first.");
          return;
      }

      const user = existingUsers.find((u) => u.email === input.email);
  
      if (user && user.password === input.password) {
          localStorage.setItem("loggedIn", true);
          navigate("/");
      } else {
          alert("Wrong email or password");
      }
  };
  

  return (
    <div className={styles.log}>
    
    <h1 className={styles.header}>Log In!</h1>
    <form className={styles.sign} onSubmit={handleLogin}>
        <div className={styles.input}>
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={(e)=>setInput({
                ...input,
                [e.target.name] : e.target.value,
            })}
            placeholder='Enter Email'
          />
        </div>

        <div className={styles.input}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={(e)=>setInput({
                ...input,
                [e.target.name] : e.target.value,
            })}
            placeholder='Enter Password'
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
    </form>

    <span>
      Don't have an account? &nbsp;
      <Link to="/signup"><u>Register Here!</u></Link>
    </span>

    </div>
  )
}

export default Login;