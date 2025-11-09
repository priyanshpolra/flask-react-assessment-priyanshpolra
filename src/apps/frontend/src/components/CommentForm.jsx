import { useState } from "react";
import { createComment } from "../api/commentsApi";

export default function CommentForm({ taskId, onSuccess }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setLoading(true);
      await createComment(taskId, { content });
      setContent("");
      onSuccess?.();  // reload comments
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}
      className="flex w-full gap-3 items-center mt-4"
    >
      <input className="flex-1 rounded-xl border border-transparent bg-white px-4 py-3 shadow-sm outline-none
             text-base focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
        placeholder="Write a comment…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button disabled={loading}
        className=" rounded-xl  bg-blue-600 px-6 py-3 text-white font-medium shadow hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {loading ? "Adding…" : "Add"}
      </button>
    </form>
  );
}
