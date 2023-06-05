import React, { useState, useEffect } from "react";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <>
      <h1>
        Welcome, <span>{userName}!</span>
        <p>
          Please select a chat to Start messaging.
        </p>
      </h1>
    </>

  );
}
