import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../Styles/Login.module.css';

const Signup = () => {

    const [input, setInput] = useState({
        username:"",
        email:"",
        password:"",
    });
    const [acceptTerms, setAcceptTerms] = useState(false);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if (!acceptTerms) {
            alert("Please accept the terms & conditions");
            return;
        }
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    
        existingUsers.push(input);
    
        localStorage.setItem("users", JSON.stringify(existingUsers));
    
        navigate("/login");
    };    
    

  return (
    <div className={styles.log}>

    <h1 className={styles.header}>Sign Up!</h1>
    <form className={styles.sign} onSubmit={handleSignup}>
        <div className={styles.input}>
            <label>Username</label>
            <input 
                type="text"
                name="username"
                value={input.username}
                onChange={(e)=>setInput({
                    ...input, 
                    [e.target.name] : e.target.value,
                })}
                placeholder='Enter Name'
            />
        </div>
        <div className={styles.input}>
            <label>Email Address</label>
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
            <label>Password</label>
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

        <div className={styles.logterms}>
        <label>
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={() => setAcceptTerms(!acceptTerms)}
            />
            I Accept the Terms & Conditions
        </label>
        </div>
        <div>
            <button type="submit">Signup</button>
        </div>
    </form>

    <span>
        Already have an account? &nbsp;
        <Link to="/login"><u>Login Here!</u></Link>
    </span>

    </div>
  )
}

export default Signup;