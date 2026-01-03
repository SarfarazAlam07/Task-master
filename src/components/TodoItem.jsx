import React, { useState } from "react";
import { Trash2, Check, Square, Edit2, Save, X } from "lucide-react";
import { motion } from "framer-motion";

const TodoItem = ({ todo, toggleComplete, deleteTodo, editTodo, darkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleSave = () => {
    if (newText.trim()) {
      editTodo(todo.id, newText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
  };

  const getPriorityColor = (p) => {
    if (p === "High") return "bg-red-500/10 text-red-500 border-red-500/20";
    if (p === "Medium")
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    if (p === "Low")
      return "bg-green-500/10 text-green-500 border-green-500/20";
    return "bg-gray-500/10 text-gray-500";
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 mb-3 rounded-lg border transition-colors duration-200 gap-3 sm:gap-0
    ${
      todo.completed
        ? darkMode
          ? "bg-gray-900 border-gray-800 opacity-60"
          : "bg-gray-200 border-gray-200 opacity-60"
        : darkMode
        ? "bg-gray-800 border-gray-700 hover:border-blue-500"
        : "bg-white border-gray-300 shadow-sm hover:border-blue-500"
    }`}
    >
      <div className="flex items-start sm:items-center gap-3 flex-1 w-full">
        <button
          onClick={() => toggleComplete(todo.id)}
          className={`mt-1 sm:mt-0 p-1 rounded transition-colors shrink-0 ${
            todo.completed
              ? "text-green-500"
              : darkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {todo.completed ? (
            <Check size={20} className="sm:w-6 sm:h-6" />
          ) : (
            <Square size={20} className="sm:w-6 sm:h-6" />
          )}
        </button>

        {isEditing ? (
          <div className="flex flex-1 gap-2 w-full">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className={`flex-1 px-2 py-1 rounded outline-none border w-full ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                  : "bg-gray-50 text-gray-900 border-gray-300 focus:border-blue-500"
              }`}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-1 w-full">
            <p
              className={`text-base sm:text-lg break-all ${
                todo.completed
                  ? "line-through text-gray-500"
                  : darkMode
                  ? "text-white"
                  : "text-gray-800"
              }`}
            >
              {todo.text}
            </p>

            {/* Priority Badge */}
            <span
              className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full border w-fit font-medium ${getPriorityColor(
                todo.priority || "Medium"
              )}`}
            >
              {todo.priority || "Medium"}
            </span>
          </div>
        )}
      </div>

      {/* Buttons: Mobile pe Right aligned rahenge par neeche bhi aa sakte hain agar content bada ho */}
      <div className="flex justify-end gap-2 ml-auto sm:ml-4 border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto border-gray-700/50">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-500 hover:text-green-400 p-2"
            >
              <Save size={20} />
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setNewText(todo.text);
              }}
              className="text-red-400 hover:text-red-300 p-2"
            >
              <X size={20} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className={`p-1 transition-colors ${
                darkMode
                  ? "text-gray-400 hover:text-blue-400"
                  : "text-gray-400 hover:text-blue-600"
              }`}
              disabled={todo.completed}
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default TodoItem;
