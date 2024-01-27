// MovieChat.js
import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../../Context/Context';
import Layout from '../../Layout/Layout';

const MovieChat = () => {
  const { userInfo } = useContext(UserContext);
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');

  const handleAddRoom = () => {
    if (newRoomName.trim() !== '') {
      socket.emit('add-room', { roomName: newRoomName });
      setNewRoomName('');
    }
  };

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('rooms', (availableRooms) => {
        setRooms(availableRooms);
      });

      socket.on('user-joined', ({ roomName, username }) => {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { system: true, text: `${username} joined the room ${roomName}.` },
        ]);
      });

      socket.on('user-left', ({ roomName, username }) => {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { system: true, text: `${username} left the room ${roomName}.` },
        ]);
      });

      socket.on('send-message', ({ topic, message }) => {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { username: message.username, text: message.text },
        ]);
      });

      socket.on('room-added', ({ roomName }) => {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { system: true, text: `Room "${roomName}" has been added.` },
        ]);
        setRooms((prevRooms) => [...prevRooms, { name: roomName, users: [] }]);
      });
    }
  }, [socket]);

  const handleJoinRoom = (roomName) => {
    setCurrentRoom(roomName);
    socket.emit('join-room', { roomName, username: userInfo?.fullName });
  };

  const handleLeaveRoom = () => {
    socket.emit('leave-room', { roomName: currentRoom, username: userInfo?.fullName });
    setCurrentRoom('');
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {  
      if (currentRoom) {
        socket.emit('send-message', { topic: currentRoom, message: { username: userInfo?.fullName, text: message } });
        setMessage('');
      } else {
        console.log('User is not currently in any room');
      }
    }
  };

  const userRooms = rooms.filter((room) => room.users.includes(userInfo?.fullName));

  return (
    <Layout>
      <div className="container mx-auto mt-8 max-w-3xl">
        <div className="bg-dry py-4 border border-gray-800 text-center rounded-lg">
          <h2 className="text-2xl font-bold ">Join The Realtime Discussion</h2>
        </div> 
        <div className="mt-4 py-4 bg-main m-6 p-6 text-center rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Add New Room:</h3>
          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Enter room name..."
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              className="border text-black bg-dryGray border-gray-600 px-2 py-1 mr-2"
            />
            <button
              className="bg-dry transitions border border-subMain hover:bg-subMain py-2 px-4 rounded-full"
              onClick={handleAddRoom}
            >
              Add Room
            </button>
          </div>
        </div>  
        <div className="flex py-4">
          <div className="pr-16">
            <h3 className="text-lg text-white font-semibold mb-2">Available Rooms:</h3>
            <ul>
              {rooms.map((room) => (
                !userRooms.find((userRoom) => userRoom.name === room.name) && (
                  <li key={room.name} className="mb-2">
                    {room.name} ({room.users.length} users){' '}
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleJoinRoom(room.name)}
                    >
                      Choose
                    </button>
                  </li>
                )
              ))}
            </ul>
          </div>
          <div className="py-4">
            <h3 className="text-lg text-white font-semibold mb-2">Your Rooms:</h3>
            <ul>
              {userRooms.map((room) => (
                <li key={room.name} className="mb-2">
                  {room.name} ({room.users.length} users){' '}
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleJoinRoom(room.name)}
                  >
                    Choose
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {currentRoom && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Room: {currentRoom}</h3>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={handleLeaveRoom}
            >
              Leave Room
            </button>
            <div className="mt-4">
              <ul>
                {chatMessages.map((msg, index) => (
                  <li
                    key={index}
                    className={`mb-2 ${msg.system ? 'italic text-gray-600' : ''}`}
                  >
                    {msg.system ? <i>{msg.text}</i> : `${msg.username}: ${msg.text}`}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border text-black border-gray-300 px-2 py-1 mr-2"
              />
              <button
                className="bg-green-500 text-white px-2 py-1 rounded"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MovieChat;
