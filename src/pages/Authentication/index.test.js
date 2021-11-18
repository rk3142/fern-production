import React from "react";
import { render, screen } from "@testing-library/react";
import {createMemoryHistory} from 'history'
import Authentication from "./index";
import {Router} from "react-router-dom";

jest.mock("../../common/firebaseUtils", () => ({
    startFirebaseUI: () => <div>Mock</div>
}))

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
      push: jest.fn(),
    }),
}));

test("renders", async () => {
  localStorage.removeItem("auth_token");
  render(<Authentication />);

  const signIn = screen.queryByText(/Sign in/i);
  expect(signIn).toBeInTheDocument();
});
