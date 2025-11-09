import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "../../src/apps/frontend/src/pages/Home.jsx";
import * as tasksApi from "../../src/apps/frontend/src/api/tasksApi.js";

// ✅ Mock API response
vi.spyOn(tasksApi, "getTasks").mockResolvedValue({
  data: [
    { id: 1, title: "Test Task", description: "Sample desc" },
  ],
});

describe("UI Tests", () => {
  it("renders tasks from API", async () => {
    render(<Home />);

    const task = await screen.findByText(/Test Task/i);
    expect(task).toBeDefined();
  });
});
