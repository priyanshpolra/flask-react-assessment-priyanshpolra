import { useEffect, useState } from "react";
import { getComments, deleteComment, updateComment } from "../api/commentsApi";

export default function CommentList({ taskId, refreshTrigger }) {
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [text, setText] = useState("");

  const loadComments = async () => {
    try {
      const res = await getComments(taskId);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  };

  useEffect(() => {
    if (taskId) loadComments();
  }, [taskId, refreshTrigger]);

  const startEdit = (c) => {
    setEditingId(c.id);
    setText(c.content);
  };

  const save = async () => {
    try {
      await updateComment(editingId, { content: text });
      setEditingId(null);
      setText("");
      loadComments();
    } catch (err) {
      console.error("Failed to update comment", err);
    }
  };

  const cancel = () => {
    setEditingId(null);
    setText("");
  };

  const remove = async (id) => {
    try {
      await deleteComment(id);
      loadComments();
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  if (!comments?.length)
    return (
      <p className="mt-4 text-zinc-500 italic">
        No comments yet — be the first to write!
      </p>
    );

  return (
    <div className="space-y-4 w-full">
      {comments.map((c) => (
        <div
          key={c.id}
          className="
            flex w-full items-center gap-4 
            rounded-2xl border border-gray-200 
            bg-white p-4 shadow-sm 
            hover:shadow-md transition
          "
        >
          {editingId === c.id ? (
            <input
              className="
                flex-1 rounded-xl border border-blue-300 
                bg-white px-4 py-2 text-zinc-700 
                outline-none focus:ring-2 focus:ring-blue-400
              "
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
            />
          ) : (
            <p className="flex-1 text-zinc-700 text-base">{c.content}</p>
          )}

          <div className="flex gap-2">
            {editingId === c.id ? (
              <>
                <button
                  onClick={save}
                  className="
                    rounded-xl bg-emerald-600 
                    px-4 py-2 text-white font-medium 
                    hover:bg-emerald-700 transition
                  "
                >
                  Save
                </button>

                <button
                  onClick={cancel}
                  className="
                    rounded-xl bg-gray-200 
                    px-4 py-2 text-zinc-700 font-medium 
                    hover:bg-gray-300 transition
                  "
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => startEdit(c)}
                  className="
                    rounded-xl bg-amber-400 
                    px-4 py-2 text-white font-medium 
                    hover:bg-amber-500 transition
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => remove(c.id)}
                  className="
                    rounded-xl bg-rose-600 
                    px-4 py-2 text-white font-medium 
                    hover:bg-rose-700 transition
                  "
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
