import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function Comments({ taskId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = async () => {
    const res = await axios.get(`/tasks/${taskId}/comments`);
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, [taskId]);

  const handleAdd = async () => {
    await axios.post(`/tasks/${taskId}/comments`, { text });
    setText("");
    fetchComments();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/comments/${id}`);
    fetchComments();
  };

  return (
    <div>
      <h4>Comments</h4>

      {comments.map((c) => (
        <div key={c.id}>
          <p>{c.text}</p>
          <button onClick={() => handleDelete(c.id)}>Delete</button>
        </div>
      ))}

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add comment"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
