import React, { useState } from "react";
import { Plus } from "lucide-react";

function TodoForm({ addTodo, darkMode }) {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTodo(input, priority);
    setInput("");
    setPriority("Medium");
  };

  return (
    // Mobile: flex-col (Vertical), Desktop: flex-row (Horizontal)
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6 sm:mb-8">
      
      {/* DROPDOWN: Mobile pe Full Width */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className={`p-3 rounded-lg border outline-none cursor-pointer transition w-full sm:w-auto
        ${darkMode 
            ? "bg-gray-800 text-white border-gray-700 focus:border-blue-500" 
            : "bg-white text-gray-900 border-gray-300 shadow-sm focus:border-blue-500"
        }`}
      >
        <option value="High">🔴 High</option>
        <option value="Medium">🟡 Medium</option>
        <option value="Low">🟢 Low</option>
      </select>

      {/* INPUT: Always grows to fill space */}
      <input
        type="text"
        placeholder="Add a new Task.."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={`flex-1 p-3 rounded-lg border focus:outline-none focus:border-blue-500 transition px-4 w-full
        ${darkMode 
            ? "bg-gray-800 text-white border-gray-700" 
            : "bg-white text-gray-900 border-gray-300 shadow-sm"
        }`}
      />

      {/* BUTTON: Mobile pe Full Width, Desktop pe Auto */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition duration-200 flex items-center justify-center w-full sm:w-auto"
      >
        <Plus size={24} />
      </button>
    </form>
  );
}

export default TodoForm;