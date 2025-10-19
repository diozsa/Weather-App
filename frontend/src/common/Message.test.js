import React from "react";
import { render } from "@testing-library/react";
import Message from "./Message";

it("renders without crashing", function () {
  render(<Message />);
});

it("matches snapshot for danger", function () {
  let messages = ["Broken fragment", "This needs repairs"];
  const { asFragment } = render(<Message type="danger" messages={messages} />);
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot for success", function () {
  let messages = ["Everything runs smoothly!"];
  const { asFragment } = render(<Message type="success" messages={messages} />);
  expect(asFragment()).toMatchSnapshot();
});
