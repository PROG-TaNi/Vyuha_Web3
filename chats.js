import React, { useState, useEffect, useRef } from "react";
import { Search, Settings, Mail, Moon, Sun, Send, Bitcoin, Trophy } from 'lucide-react';
import io from "socket.io-client";
import ParticlesCanvas from "./particle"; // Adjust the path if necessary

// Example contact list
const contacts = [
  {
    id: "1",
    name: "Tarush Nigam",
    avatar: "https://via.placeholder.com/32",
    lastMessage: "I am Frustrated",
    time: "2m ago",
    unread: 2,
  },
  {
    id: "2",
    name: "Adwaita Patane",
    avatar: "https://via.placeholder.com/32",
    lastMessage: "Backend 2 din me ho jayega",
    time: "1h ago",
  },
  {
    id: "3",
    name: "Krushna Tarde",
    avatar: "https://via.placeholder.com/32",
    lastMessage: "Bhai PADHNA HAI",
    time: "2h ago",
  },
  {
    id: "4",
    name: "Krutika",
    avatar: "https://via.placeholder.com/32",
    lastMessage: "GO RANGA!!!!",
    time: "1d ago",
  },
];

const socket = io("http://localhost:3000"); // Update the server URL if necessary

export default function MessagesPage() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState([0, 0, 0]); // Progress for 3 steps
  const messagesContainerRef = useRef(null); // Ref for messages container

  // Dark mode toggle effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Filter contacts by search query
  useEffect(() => {
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  // Handle incoming messages from the server
  useEffect(() => {
    socket.on("chat message", (msg) => {
      const newMessage = {
        id: Date.now().toString(),
        senderId: msg.senderId,
        text: msg.text,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prevMessages) => ({
        ...prevMessages,
        [msg.contactId]: [...(prevMessages[msg.contactId] || []), newMessage],
      }));

      if (selectedContact?.id === msg.contactId) {
        scrollToBottom(); // Auto-scroll to the latest message
      }
    });

    return () => {
      socket.off("chat message");
    };
  }, [selectedContact]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Send message function
  const sendMessage = () => {
    if (message.trim() !== "" && selectedContact) {
      const newMessage = {
        id: Date.now().toString(),
        senderId: "currentUser",
        text: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedContact.id]: [...(prevMessages[selectedContact.id] || []), newMessage],
      }));

      socket.emit("chat message", {
        text: message,
        contactId: selectedContact.id,
        senderId: "currentUser",
      });

      setMessage("");
      scrollToBottom();
    }
  };

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const getStepColor = (index, currentProgress) => {
    const colors = ['#FF6B6B', '#FFA500', '#4ECDC4'];
    if (currentProgress >= 100) return colors[index];
    if (index === 0 && currentProgress < 25) return '#FF6B6B';
    if (index === 1 && currentProgress >= 25 && currentProgress < 50) return '#FFA500';
    if (index === 2 && currentProgress >= 50) return '#4ECDC4';
    return '#f0f0f0';
  };

  useEffect(() => {
    // Simulating progress updates from the backend
    const interval = setInterval(() => {
      setProgress(prev => prev.map((p, i) => {
        if (i === 0 && p < 25) return Math.min(p + Math.random() * 5, 25);
        if (i === 1 && p < 50) return Math.min(p + Math.random() * 5, 50);
        if (i === 2) return Math.min(p + Math.random() * 5, 100);
        return p;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      {/* Particles Background */}
      <ParticlesCanvas />

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-left">
          <Mail className="h-6 w-6 text-purple-600" />
          <span className="app-title">VYU:</span>
        </div>
        <div className="nav-center">
          <button>H O M E</button>
          <button>C O N N E C T</button>
          <button>C O N T A C T S</button>
        </div>
        <div className="nav-right">
          <button onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <div className="avatar">
            <img
              src="https://via.placeholder.com/32"
              alt="User Avatar"
            />
          </div>
        </div>
      </nav>

      <div className="main-content">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>Messages</h2>
            <Settings className="icon" />
          </div>
          <div className="search-container">
            <Search className="icon" />
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
                className={`contact-item ${
                  selectedContact?.id === contact.id ? "active" : ""
                }`}
              >
                <img src={contact.avatar} alt={contact.name} />
                <div className="contact-info">
                  <span>{contact.name}</span>
                  <span>{contact.lastMessage}</span>
                </div>
                {contact.unread && <span className="unread-badge">{contact.unread}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {selectedContact ? (
            <>
              <div className="chat-header">
                <img src={selectedContact.avatar} alt={selectedContact.name} />
                <div>
                  <h3>{selectedContact.name}</h3>
                  <p>Active now</p>
                </div>
                <div className="trophy-container">
                  <Trophy
                    className="trophy-icon"
                    size={24}
                    onClick={() => setShowProgressBar(!showProgressBar)}
                  />
                  {showProgressBar && (
                    <div className="progress-bar-container">
                      <div className="progress-bar">
                        {progress.map((step, index) => (
                          <React.Fragment key={index}>
                            <div
                              className="progress-step"
                              style={{ 
                                width: `${index === 0 ? 25 : index === 1 ? 25 : 50}%`,
                                backgroundColor: getStepColor(index, step)
                              }}
                            />
                            <div 
                              className="progress-circle"
                              style={{
                                left: `${index === 0 ? 25 : index === 1 ? 50 : 100}%`,
                                backgroundColor: getStepColor(index, step)
                              }}
                            />
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="messages-container" ref={messagesContainerRef}>
                {(messages[selectedContact.id] || []).map((msg) => (
                  <div
                    key={msg.id}
                    className={`message ${
                      msg.senderId === "currentUser" ? "sent" : "received"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span>{msg.timestamp}</span>
                  </div>
                ))}
              </div>
              <div className="message-input-container">
                <input
                  type="text"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button onClick={sendMessage}>
                  <Send className="send-button " size={20} />
                </button>

                <button onClick={sendMessage}>
                  <Bitcoin className="bitcoin-button " size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <Mail size={48} />
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// CSS styles
const styles = `
:root {
    --background: #ffffff;
    --foreground: #000000;
    --accent: #f3f4f6;
    --muted-foreground: #6b7280;
    --border: #e5e7eb;
    --purple: #9333ea;
  }
  
  .dark {
    --background: #111827;
    --foreground: #ffffff;
    --accent: #1f2937;
    --muted-foreground: #9ca3af;
    --border: #374151;
  }
  
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: var(--background);
    color: var(--foreground);
  }
  
  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    
  }
  
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid var(--border);
    color: #fffdfd;
  }
  
  .nav-left, .nav-center, .nav-right {
    display: flex;
    align-items: center;
    gap: 1rem;
    
  }
  
  
  .app-title {
    font-size: 1.25rem;
    font-weight: 600;
    background: linear-gradient(to right, #8015e3, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--foreground);
  }
  
  .avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    overflow: hidden;
  }
  
  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .main-content {
    display: flex;
    flex: 1;
    overflow: hidden;
  }
  
  .sidebar {
    width: 30rem;
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
  }
  
  .sidebar-header {
    padding: 1rem;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .search-container {
    padding: 1rem;
    position: relative;
    margin-top: 0.01rem;
  }
  
  .search-container input {
    width: 75%;
    padding: 0.5rem 0.5rem 0.5rem 2rem;
    border: 1px solid var(--border);
    border-radius: 0.25rem;
    background-color: var(--background);
    color: var(--foreground);
  }
  
  .search-container i {
    position: absolute;
    left: 1.5rem;
    top: 30%;
    transform: translateY(-50%);
    color: var(--muted-foreground);
  }
  
  .contacts-list {
    flex: 1;
    overflow-y: auto;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .contact-item:hover {
    background-color: var(--accent);
  }
  
  .contact-item.active {
    background-color: var(--accent);
  }
  
  .contact-avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    overflow: hidden;
  }
  
  .contact-info {
    flex: 1;
  }
  
  .contact-name {
    font-weight: 600;
  }
  
  .contact-last-message {
    font-size: 0.875rem;
    color: var(--muted-foreground);
  }
  
  .unread-badge {
    background-color: var(--purple);
    color: rgb(252, 252, 252);
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
  }
  
  .chat-area {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 2px;
    border-left: 1px solid #eaeaea; /* Optional: Add a border to separate the chat area */
    justify-content: center; /* Center vertically */
    /* Center horizontally */
  }
  
  .flex-1 {
    flex: 1;
  }
  
  .text-muted-foreground {
    color:rgba(255, 255, 255, 0); /* Example muted color */
  }
  .chat-header {
    padding: 1rem;
    border-bottom: 10px solid var(--border);
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 3rem;
  }
  
  .messages-container {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
  }
  
  .message {
    max-width: 70%;
    padding: 0.75rem;
    border-radius: 0.5rem;
  }
  
  .message.sent {
    align-self: flex-end;
    background: linear-gradient(to right, var(--purple), #3b82f6);
    color: white;
  }
  
  .message.received {
    align-self: flex-start;
    background-color: var(--accent);
  }
  
  .message-timestamp {
    font-size: 0.75rem;
    opacity: 0.7;
  }
  
  .message-input-container {
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    border-top: 1px solid var(--border);
  }
  
  .message-input-container input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid var(--border);
    border-radius: 0.25rem;
    background-color: var(--background);
    color: var(--foreground);
  }
  
  .message-input-container button {
    padding: 0.5rem 1rem;
    background-color: var(--green);
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }
  
  .text-purple-600 {
    color: var(--purple);
  }
  .messages-container {
    flex: 1;
    overflow-y: auto; /* Allow vertical scrolling */
    padding: 10px;
    border: 1px solid #eaeaea; /* Optional: Add a border */
    border-radius: 8px; /* Optional: Add rounded corners */
  }
  
  
  .chat-area {
    position: relative;
    background-color: rgba(255, 255, 255, 0); /* Adjust as needed */
    border-radius: 8px;
    overflow: hidden;
  }
  
  .navbar{
    background-color: white;
  }
  
  
  .sidebar {
    transition: opacity 0.3s ease;
    background-color: #ffffff;
  }
  
  .dark .navbar {
    opacity: 0.7; /* Reduced opacity in dark mode */
    background-color: rgba(6, 6, 6, 0.912) ;
  }
  
  .dark .sidebar {
    opacity: 0.7; /* Reduced opacity in dark mode */
    background-color: rgba(0, 0, 0, 0.893) ;
  }
  
  .chat-header{
    background-color: white;
  }
  
  .dark .chat-header{
    background-color: rgba(0, 0, 0, 0.785);
  }
  
  .text-sm {
    color: rgba(10, 244, 10, 0.781);
  }
  
  .send-button {
      background-color: rgb(13, 243, 28);
      padding: 1rem 1rem;
      border-radius: 10px;
  }
  
  .bitcoin-button {
    background-color: #f56a00;
    padding: 1rem 1rem;
    border-radius: 10px;
  }

  .bitcoin-button:hover {
    background-color: #ec5408; /* Darker shade of the original color on hover */
  }

  .send-button:hover {
    background-color: #09b918; /* Darker shade of the original color on hover */
  }

  .trophy-container {
    position: fixed;
    left: 1400px;
  }

  .trophy-icon {
    cursor: pointer;
    color: #3b82f6;
  }
  
  .dark .trophy-icon {
  color:rgb(118, 5, 255);
  }

  .progress-bar-container {
    position: absolute;
    top: 55px;
    right: -55px;
    width: 900px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    

  }

    .dark .progress-bar-container{
    background-color: rgb(69, 5, 129);
    border-color: rgb(132, 0, 255); ;
 
}

  .progress-bar {
    height: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
    overflow: visible;
    display: flex;
    position: relative;
  }

  .progress-step {
    height: 100%;
    transition: width 0.5s ease-in-out, background-color 2s ease-in-out;
  }

  .progress-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: background-color 0.5s ease-in-out;
  }

  .dark.progress-bar {
    background-color: rgb(118, 5, 255);
  }

`;

export const injectStyles = () => {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
};

// Call the function to inject styles
injectStyles();

