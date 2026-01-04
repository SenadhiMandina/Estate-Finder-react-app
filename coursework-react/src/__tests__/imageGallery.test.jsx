import React from "react";
import { render, screen } from "@testing-library/react";
import ImageGallery from "../components/ImageGallery";

describe("ImageGallery", () => {
  test("renders images (main + thumbnails)", () => {
    render(<ImageGallery images={["/a.jpg", "/b.jpg"]} />);

    // Robust: just ensure at least 2 images exist
    expect(screen.getAllByRole("img").length).toBeGreaterThanOrEqual(2);
  });
});