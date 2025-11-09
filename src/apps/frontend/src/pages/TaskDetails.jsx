import { useState } from "react";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

export default function TaskDetails({ task }) {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {task.title}
      </h2>

      {/* Comment form */}
      <CommentForm
        taskId={task.id}
        onSuccess={() => setRefresh((x) => x + 1)}
      />

      {/* Comments list */}
      <div className="mt-6 w-full">
        <CommentList taskId={task.id} refreshTrigger={refresh} />
      </div>
    </div>
  );
}
