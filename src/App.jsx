import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { Helmet } from "react-helmet-async";

const App = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [filter, setFilter] = useState("all");

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, priority) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      priority: priority,
    };
    setTodos([newTodo, ...todos]);
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const formattedDate = dateTime.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`min-h-screen pb-10 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <Helmet>
        <title>Task Master | Organize Your Day Efficiently</title>
        <meta
          name="description"
          content="Task Master is a powerful React Todo App with Dark Mode, Progress Tracking, and Priority management."
        />
        <meta name="keywords" content="Todo App, React, Task Master" />
        <meta name="author" content="Sarfaraz" />
        <meta property="og:title" content="Task Master" />
        <meta
          property="og:description"
          content="Manage your tasks with style."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-2xl mx-auto">
        {/* --- STICKY HEADER SECTION --- */}
        <div
          className={`sticky top-0 z-50 py-2 px-4 mb-4 shadow-sm transition-colors duration-300
            ${
              darkMode
                ? "bg-gray-900/95 border-b border-gray-800"
                : "bg-gray-100/95 border-b border-gray-200"
            } 
            backdrop-blur-md flex flex-row justify-between items-center`}
        >
          {/* Left Side: Title & Date (Stacked Compactly) */}
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-3xl font-bold text-blue-500 leading-tight">
              Task Master 📝
            </h1>

            {/* Date & Time - Small Subtitle */}
            <div
              className={`text-[10px] sm:text-sm font-medium flex gap-2 items-center mt-0.5 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <span>{formattedDate}</span>
              <span className="text-blue-400 font-mono">• {formattedTime}</span>
            </div>
          </div>

          {/* Right Side: Theme Toggle Button (Compact) */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 sm:p-3 rounded-lg transition-colors ml-2 ${
              darkMode
                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700 border border-gray-700"
                : "bg-white text-gray-800 shadow-md hover:bg-gray-200 border border-gray-200"
            }`}
          >
            {darkMode ? (
              <Sun size={20} className="sm:w-6 sm:h-6" />
            ) : (
              <Moon size={20} className="sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
        {/* --- HEADER END --- */}
        {/* --- HEADER END --- */}

        {/* Content Container (Padding di hai taaki kinare se chipke nahi) */}
        <div className="px-4">
          {/* PROGRESS BAR */}
          <div
            className={`mb-6 sm:mb-8 p-4 rounded-xl border ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200 shadow-sm"
            }`}
          >
            <div className="flex justify-between mb-2">
              <span
                className={`text-xs sm:text-sm font-semibold ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Daily Progress
              </span>
              <span
                className={`text-xs sm:text-sm font-semibold ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {completedTasks} / {totalTasks} Done
              </span>
            </div>
            <div
              className={`w-full rounded-full h-2 sm:h-3 ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <div
                className="bg-green-500 h-2 sm:h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <TodoForm addTodo={addTodo} darkMode={darkMode} />

          {/* FILTERS */}
          <div className="flex gap-2 mb-4 bg-gray-800/10 p-1 rounded-lg overflow-x-auto">
            {["all", "active", "completed"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`flex-1 py-2 px-4 text-xs sm:text-sm font-medium rounded-md capitalize whitespace-nowrap transition-all duration-200 ${
                  filter === type
                    ? "bg-blue-600 text-white shadow-lg"
                    : darkMode
                    ? "text-gray-400 hover:bg-gray-800"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* LIST */}
          <div className="space-y-2 mt-2 overflow-hidden pb-10">
            <AnimatePresence mode="popLayout">
              {filteredTodos.length === 0 ? (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`text-center mt-10 ${
                    darkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  No tasks found.
                </motion.p>
              ) : (
                filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                    darkMode={darkMode}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
