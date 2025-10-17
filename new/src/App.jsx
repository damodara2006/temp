import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HOME from "./HOME.jpg";
import anirudh from "./anirudh.jpeg";
import chinmayi from "./chinmayi.jpg";
import "./App.css";

function App() {
  const linkStyle = {
    color: "red",
    fontWeight: "bold",
    marginRight: "15px",
    textDecoration: "none",
    transition: "0.3s",
  };

  return (
    <BrowserRouter>
      <nav style={styles.nav}>
        <h1 style={styles.logo}>Festify⚡</h1>
        <div style={styles.linksContainer}>
          {["/", "/Products", "/Services", "/Contact", "/User", "/Todo"].map(
            (path, i) => (
              <Link
                key={i}
                to={path}
                style={linkStyle}
                onMouseOver={(e) => (e.target.style.color = "white")}
                onMouseOut={(e) => (e.target.style.color = "red")}
              >
                {path === "/" ? "Home" : path.replace("/", "")}
              </Link>
            )
          )}
        </div>
      </nav>

      <div style={styles.pageContainer}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user" element={<User />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const styles = {
  nav: {
    backgroundColor: "black",
    padding: "10px 20px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    color: "red",
    fontFamily: "Arial Black",
    fontSize: "1.8rem",
    margin: "0",
  },
  linksContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
  },
  pageContainer: {
    backgroundColor: "black",
    minHeight: "100vh",
    color: "white",
    padding: "20px",
    boxSizing: "border-box",
  },
};

function Home() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ margin: "50px 0", color: "red" }}>
        Ready to lose yourself in the music ?
      </h2>
      <img
        src={HOME}
        alt="Home"
        style={{
          maxWidth: "90%",
          height: "auto",
          border: "5px solid red",
          borderRadius: "10px",
          boxShadow: "0px 0px 20px red",
        }}
      />
    </div>
  );
}

function Products() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ margin: "50px 0", color: "red" }}>Grab your tickets soon!</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {[anirudh, chinmayi].map((img, i) => (
          <img
            key={i}
            src={img}
            alt="concert"
            style={{
              width: "90%",
              maxWidth: "400px",
              height: "auto",
              border: "5px solid red",
              borderRadius: "10px",
              boxShadow: "0px 0px 20px red",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Services() {
  const services = [
    { title: "Ticket Booking", desc: "Book your concert tickets instantly." },
    { title: "VIP Passes", desc: "Get exclusive access to premium events." },
    { title: "Event Notifications", desc: "Never miss your favorite events." },
    { title: "Merchandise", desc: "Buy official merchandise online." },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ margin: "50px 0", color: "red" }}>Our Services</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {services.map((s, idx) => (
          <div
            key={idx}
            style={{
              border: "2px solid red",
              borderRadius: "10px",
              padding: "20px",
              width: "90%",
              maxWidth: "250px",
              boxShadow: "0px 0px 20px red",
              color: "white",
              backgroundColor: "#111",
            }}
          >
            <h3 style={{ color: "red" }}>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ margin: "50px 0", color: "red" }}>Contact Us</h2>
      <div style={{ color: "white" }}>
        <p>Email: support@festify.com</p>
        <p>Phone: +91 98765 43210</p>
      </div>
    </div>
  );
}

function User() {
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    async function fetchUserBasedOnId() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      const data = await response.json();
      setUserData(data);
    }
    if (userId) fetchUserBasedOnId();
  }, [userId]);

  return (
    <div style={{ textAlign: "center" }}>
      <input
        type="number"
        placeholder="Enter ID to get user"
        style={inputStyle}
        onChange={(e) => setUserId(e.target.value)}
      />
      {userData.name && <h3 style={{ color: "red" }}>Name: {userData.name}</h3>}
    </div>
  );
}

const inputStyle = {
  marginTop: "20px",
  padding: "10px",
  marginRight: "10px",
  border: "2px solid red",
  backgroundColor: "black",
  color: "white",
  borderRadius: "5px",
  maxWidth: "90%",
  width: "300px",
};

function Todo() {
  const [todos, setTodos] = useState([]);
  const [current, setCurrent] = useState("");

  function addTodo() {
    const trimmed = current.trim();
    if (!trimmed) return;
    setTodos((prev) => [trimmed, ...prev]);
    setCurrent("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") addTodo();
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ color: "red" }}>Todo List</h2>
      <div>
        <input
          type="text"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter todo"
          style={inputStyle}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "10px",
            color: "white",
            backgroundColor: "red",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
          Add
        </button>
      </div>
      <div
        style={{
          marginTop: "20px",
          textAlign: "left",
          display: "inline-block",
          minWidth: "320px",
          maxWidth: "90%",
        }}
      >
        <h3 style={{ color: "red" }}>Recently added Todos</h3>
        {todos.length === 0 ? (
          <p>--No todos yet--</p>
        ) : (
          todos.map((t, idx) => <div key={idx}>{t}</div>)
        )}
      </div>
    </div>
  );
}

export default App;