import React, { useState, useEffect, useRef } from "react";
import { Search, Settings, Mail, Moon, Sun, Send, Bitcoin } from "lucide-react";
import io from "socket.io-client";
import "."; // Ensure this file exists and has necessary styles
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
                  <Send size={20} />
                </button>
                <button onClick={sendMessage}>
                  <Bitcoin size={20} />
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
