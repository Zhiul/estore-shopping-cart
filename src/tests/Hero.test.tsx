import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import { Hero } from "../components/Hero";

describe("Hero component", () => {
  it("renders hero heading", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    const heading = screen.getByRole("heading", {
      name: "Build your dream PC",
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders hero paragraph", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    const paragraph = screen.queryByText(
      "Building your dream PC with our store components is an exciting experience that starts with choosing the right parts. Our store offers a wide range of high-quality components, including processors, graphics cards, motherboards, RAM and cases."
    );

    expect(paragraph).toBeInTheDocument();
  });
});
