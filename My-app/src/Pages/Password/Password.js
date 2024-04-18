import React, { useState } from "react";
import "./Password.css"
function PasswordForm({ onSubmit }) {
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(password);
  };

  return (
    <div className="PasswordFormContainer">
      <form onSubmit={handleSubmit} className="PasswordForm">
        <label htmlFor="password">Enter Password:</label>
        <br />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PasswordForm;
