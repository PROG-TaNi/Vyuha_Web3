import React, { useState, useEffect, useRef } from "react";
import { Search, Settings, Mail, Moon, Sun, Send, Bitcoin } from 'lucide-react';
import io from 'socket.io-client';
import './App.css'; // Make sure to import your CSS here
import ParticlesCanvas from './particle'; // Adjust the path as necessary

const contacts = [
  {
    id: "1",
    name: "Tarush Nigam",
    avatar: "https://imgs.search.brave.com/ZlMA1xyb5O_WINlJ1KTJPjXirJamlkRY4vG4wWqequQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvY29vbC1wcm9m/aWxlLXBpY3R1cmUt/ODdoNDZnY29iamw1/ZTR4dS5qcGc?height=32&width=32",
    lastMessage: "I am Frustated ",
    time: "2m ago",
    unread: 2,
  },
  {
    id: "2",
    name: "Adwaita Patane",
    avatar: "https://imgs.search.brave.com/QzYZ_UfWNkutumqJkDVEip6puzNhmN0zEbKb5gzuwwQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY29v/bC1wcm9maWxlLXBp/Y3R1cmUtNzdqdWZm/YndvaXZzaTFzMy5q/cGc?height=32&width=32",
    lastMessage: "Backend 2 din me ho jayega",
    time: "1h ago",
  },
  {
    id: "3",
    name: "Krushna Tarde",
    avatar: "https://imgs.search.brave.com/C-3ECNAs8qgaKqabiedl6gDn8ygKX0VuenvBLRUZGLM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY29v/bC1wcm9maWxlLXBp/Y3R1cmUtZzNuenhz/OW12cndrdDdldy5q/cGc?height=32&width=32",
    lastMessage: "Bhai PADHNA HAI  ",
    time: "2h ago",
  },
  {
    id: "4",
    name: "Krutika ",
    avatar: "https://imgs.search.brave.com/ibDrh0svlEQSUGa3puxDTjIrL0JicUs9Zev1B1BUx0Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY29v/bC1wcm9maWxlLXBp/Y3R1cmVzLWZhY2Vs/ZXNzLXdoaXRlLW1h/bi1sbmU5em1ocWxj/aGxjcGM3LmpwZw?height=32&width=32",
    lastMessage: " GO RANGA!!!!",
    time: "1d ago",
  }
];


const socket = io('http://localhost:3000'); // Connect to the WebSocket server

export default function MessagesPage() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const messagesContainerRef = useRef(null); // Ref for messages container

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    setFilteredContacts(
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('chat message', (msg) => {
      const replyMessage = {
        id: Date.now().toString(),
        senderId: msg.senderId,
        text: msg.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Update messages for the selected contact with the incoming message
      setMessages(prevMessages => ({
        ...prevMessages,
        [msg.contactId]: [...(prevMessages[msg.contactId] || []), replyMessage]
      }));

      if (selectedContact?.id === msg.contactId) {
        scrollToBottom(); // Scroll to the bottom if the contact is selected
      }
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off('chat message');
    };
  }, [selectedContact]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const sendMessage = () => {
    if (message.trim() !== "" && selectedContact) {
      const newMessage = {
        id: Date.now().toString(),
        senderId: 'currentUser',
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Update messages for the selected contact
      setMessages(prevMessages => ({
        ...prevMessages,
        [selectedContact.id]: [...(prevMessages[selectedContact.id] || []), newMessage]
      }));

      // Emit the message to the WebSocket server
      socket.emit('chat message', { text: message, contactId: selectedContact.id, senderId: 'currentUser' });

      setMessage("");
      scrollToBottom(); // Scroll to the bottom after sending a message
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight - 10;
    }
  };

  return (
    <div className="app">
      {/* Particles Background */}
      <ParticlesCanvas />

      {/* Navigation Bar */}
      <nav className={`navbar ${darkMode ? 'opacity-70' : 'opacity-100'}`}>
        <div className="nav-left">
          <Mail className="h-6 w-6 text-purple-600" />
          <span className="app-title">{darkMode ? "VYU:" : "VYU:"}</span>
        </div>
        <div className="flex items-center space-x-20">
          <button className="text-gray-600 hover:text-gray-800">H O M E</button>
          <button className="text-gray-600 hover:text-gray-800">C O N N E C T</button>
          <button className="text-gray-600 hover:text-gray-800">C O N T A C T S</button>
        </div>

        <div className="nav-right">
          <button onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <div className="avatar">
            <img src="https://imgs.search.brave.com/ofPeJBl9o2_cLktaum8ZtMsdZh8mYw6HZBz5MQs0AL8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nb29k/aWVzLmljb25zOC5j/b20vd2ViL2NvbW1v/bi9hdXRvY29tcGxl/dGUvZG9tYWlucy9w/aG90b3Muc3Zn" alt="User Avatar" />
          </div>
        </div>
      </nav>

      <div className="main-content">
        {/* Sidebar */}
        <div className={`sidebar ${darkMode ? 'opacity-70' : 'opacity-100'}`}>
          <div className="sidebar-header">
            <h2 className="text-xl font-semibold text-purple-600">Messages</h2>
            <button className="p-2">
              <Settings className="h-5 w-5" />
            </button>
          </div>
          <div className="search-container">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search messages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="contacts-list">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`contact-item ${selectedContact?.id === contact.id ? "active" : ""}`}
              >
                <div className="contact-avatar">
                  <img src={contact.avatar} alt={contact.name} />
                </div>
                <div className="contact-info">
                  <span className="contact-name">{contact.name}</span>
                  <span className="contact-last-message">{contact.lastMessage}</span>
                </div>
                {contact.unread && (
                  <span className="unread-badge">{contact.unread}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="chat-area">
          {selectedContact ? (
            <>
              <div className="chat-header">
                <div className="contact-avatar">
                  <img src={selectedContact.avatar} alt={selectedContact.name} />
                </div>
                <div>
                  <h3 className="contact-name">{selectedContact.name}</h3>
                  <p className="text-sm text-muted-foreground">Active now</p>
                </div>
              </div>
              <div className="messages-container" ref={messagesContainerRef}>
                {(messages[selectedContact.id] || []).map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`message ${msg.senderId === 'currentUser' ? 'sent' : 'received'}`}
                  >
                    <p>{msg.text}</p>
                    <span className="message-timestamp">{msg.timestamp}</span>
                  </div>
                ))}
              </div>
              <div className="message-input-container">
                <input
                  type="text"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>
                  <Send className="send-button" size={20} color="white" />
                </button>
                <button  onClick={sendMessage}>
                  <Bitcoin className= "bitcoin-button" size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <Mail className="h-12 w-12 mb-4" />
              <p className="text-center">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
