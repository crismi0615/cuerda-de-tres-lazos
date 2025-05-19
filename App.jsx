import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PASSWORD = "amor123";

export default function App() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem("messages")) || []);
  const [memory, setMemory] = useState("");
  const [goal, setGoal] = useState("");
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const handleLogin = () => {
    if (passwordInput === PASSWORD) {
      setAccessGranted(true);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const handleAddMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, date: new Date().toLocaleDateString() }]);
      setNewMessage("");
    }
  };

  if (!accessGranted) {
    return (
      <div className="h-screen flex items-center justify-center bg-pink-100">
        <div className="p-6 w-80 text-center bg-white rounded-lg shadow-lg">
          <h1 className="text-xl font-bold mb-4">Cuerda de Tres Lazos 💞</h1>
          <input
            type="password"
            placeholder="Contraseña"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="mb-4 p-2 w-full border rounded"
          />
          <button
            onClick={handleLogin}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div className="min-h-screen p-4 bg-pink-50 text-gray-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-3xl font-bold text-center mb-6">Cuerda de Tres Lazos 💞</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Mensajes */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Mensajes de Amor 💌</h2>
          <div className="space-y-2 max-h-40 overflow-y-auto mb-2">
            {messages.map((msg, i) => (
              <div key={i} className="bg-pink-100 p-2 rounded-xl">
                <p>{msg.text}</p>
                <span className="text-xs text-gray-500">{msg.date}</span>
              </div>
            ))}
          </div>
          <input
            placeholder="Escribe un mensaje bonito..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="mt-2 p-2 w-full border rounded"
          />
          <button
            onClick={handleAddMessage}
            className="mt-2 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Agregar
          </button>
        </div>

        {/* Recuerdos */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Recuerdos Compartidos 📸</h2>
          <textarea
            className="w-full border rounded-lg p-2 h-40 bg-pink-50"
            placeholder="Escriban aquí un recuerdo lindo que compartieron..."
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
          />
        </div>

        {/* Metas */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Metas Juntos 🎯</h2>
          <textarea
            className="w-full border rounded-lg p-2 h-40 bg-pink-50"
            placeholder="¿Qué sueñan lograr juntos?"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
      </div>
    </motion.div>
  );
}