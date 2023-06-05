import React, { useState, useEffect } from "react";

export default function Contacts({ contacts, changeChat }) {
  // console.log("eeeeeeeee")
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);


  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserName && currentUserName && (
        <div style={{backgroundColor:"#c8d9f8"}}>
          <div className="contacts">
          {/* {console.log(contacts,"contacts21e")} */}
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="username" style={{'backgroundColor':'blue'}}>
              <h2>{currentUserName} your userName</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

