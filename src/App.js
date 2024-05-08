import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ContainerBoxes from './ContainerBoxes';

const socket = io('http://localhost:4000');

function ChatRoom() {
    const [message, setMessage] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState({});


    useEffect(() => {
      const handleMessage = (room, message) => {
        console.log(`room => ${room}`, `message => ${message}`);
        setMessages((prevMessages) => {
          return {
              ...prevMessages,
              [room]: [...(prevMessages[room] || []), message]
          };
        });
      };
  
      socket.on('chat message', handleMessage);
  
      return () => {
          // Clean up the event listener when the component unmounts
          socket.off('chat message', handleMessage);
      };
  }, []); // Empty dependency array ensures that the effect runs only once

    const sendMessage = () => {
        socket.emit('send message', room, message);
        setMessage('');
    };

    const joinRoom = () => {
        socket.emit('join room', room);
    };

    const leaveRoom = () => {
        socket.emit('leave room', room);
        setMessages((prevMessages) => {
          // Remove the key from prevMessages if it matches the desired key
          if (prevMessages.hasOwnProperty(room)) {
              const { [room]: removedKey, ...rest } = prevMessages;
              return rest;
          }
          return prevMessages;
      });
    };
    return (
        <div>
          <div className="input-box-container">
          <div className="input-container">
              <input
                  type="text"
                  value={room}
                  placeholder="Room name"
                  onChange={(e) => setRoom(e.target.value)}
                  className="input-field"
              />
              <button onClick={joinRoom} className="button">Join Room</button>
              <button onClick={leaveRoom} className="button">Leave Room</button>
          </div>

          <div className="input-container">
              <input
                  type="text"
                  value={message}
                  placeholder="Message"
                  onChange={(e) => setMessage(e.target.value)}
                  className="input-field"
              />
              <button onClick={sendMessage} className="button">Send Message</button>
          </div>
          </div>
          <div>
            {Object.keys(messages).length > 0 && <h1>Chat Room</h1> }
            <ContainerBoxes 
              messages={messages} 
            />
          </div>
        </div>
    );
}

export default ChatRoom;
