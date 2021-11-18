import React from "react";
import { render, screen } from "@testing-library/react";
import {createMemoryHistory} from 'history'
import Authentication from "./index";
import {Router} from "react-router-dom";

jest.mock("../../common/firebaseUtils", () => ({
    startFirebaseUI: () => <div>Mock</div>
}))

test("renders", async () => {
  localStorage.removeItem("auth_token");
  render(<Authentication />);

  const signIn = screen.queryByText(/Sign in/i);
  expect(signIn).toBeInTheDocument();
});

test("redirects if logged in", async () => {
    const history = createMemoryHistory()
    const pushSpy = jest.spyOn(history, 'push')

    localStorage.setItem("auth_token", "test token");
    render(
        <Router history={history}>
            <Authentication />
        </Router>
    );

    expect(pushSpy).toBeCalled();
});