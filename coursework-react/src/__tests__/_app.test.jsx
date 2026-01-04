import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App", () => {
  test("renders header / main title", () => {
    render(<App />);
    expect(screen.getByText(/find your next place/i)).toBeInTheDocument();
  });

  test("can open a property details view via View details link", async () => {
    const user = userEvent.setup();

    // Start clean
    window.location.hash = "";
    render(<App />);

    const viewLinks = screen.getAllByRole("link", { name: /view details/i });
    const href = viewLinks[0].getAttribute("href"); // e.g. "#prop5"

    // Click (for any onClick handlers)
    await user.click(viewLinks[0]);

    // Force hash navigation (for apps driven by location.hash)
    window.location.hash = href;

    // Fire events some apps listen to
    fireEvent(window, new HashChangeEvent("hashchange"));
    fireEvent(window, new PopStateEvent("popstate"));

    await waitFor(() => {
      const back =
        screen.queryByRole("button", { name: /back/i }) ||
        screen.queryByRole("link", { name: /back/i }) ||
        screen.queryByText(/back/i);

      expect(back).toBeInTheDocument();
    });
  });
});