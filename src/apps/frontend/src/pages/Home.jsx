import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/tasksApi";
import TaskDetails from "./TaskDetails";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState(null);

  const [newTitle, setNewTitle] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Load tasks
  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Create
  const addTask = async () => {
    if (!newTitle.trim()) return;

    try {
      await createTask({ title: newTitle });
      setNewTitle("");
      loadTasks();
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  // Edit
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.title);
  };

  const saveEdit = async (id) => {
    try {
      await updateTask(id, { title: editingText });
      setEditingId(null);
      loadTasks();
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  // Delete
  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      if (selected?.id === id) setSelected(null);
      loadTasks();
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-linear-to-br from-blue-500 via-indigo-500 to-purple-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
          {/* LEFT PANEL */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tasks</h2>

              {/* Task List */}
              <div className="space-y-4 mb-8">
                {tasks.map((t) => (
                  <div
                    key={t.id}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-gray-50 ${
                      selected?.id === t.id ? "bg-blue-50 border border-blue-200" : "border border-transparent"
                    }`}
                  >
                    <button
                      onClick={() => setSelected(t)}
                      className="flex-1 text-left"
                    >
                      {editingId === t.id ? (
                        <input
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="w-full text-gray-700 font-normal px-2 py-1 border-b-2 border-blue-500 outline-none bg-transparent"
                          autoFocus
                        />
                      ) : (
                        <span className="text-gray-700 font-normal">{t.title}</span>
                      )}
                    </button>

                    {editingId === t.id ? (
                      <button
                        onClick={() => saveEdit(t.id)}
                        className="text-sm text-white bg-green-500 hover:bg-green-600 px-4 py-1.5 rounded-lg transition"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(t)}
                        className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-4 py-1.5 rounded-lg transition"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => removeTask(t.id)}
                      className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Task */}
              <div className="flex gap-3 items-center pt-6 border-t border-gray-100">
                <input
                  className="flex-1 text-gray-700 font-light text-lg outline-none placeholder-gray-300 px-2"
                  placeholder="New task title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />

                <button
                  onClick={addTask}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-95 font-medium"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 w-full">
            <div className="bg-white rounded-2xl shadow-md p-8 w-full">
              {selected ? (
                <TaskDetails task={selected} />
              ) : (
                <div className="text-gray-400 text-center py-8">Select a task to view details.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;