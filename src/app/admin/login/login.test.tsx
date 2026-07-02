import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import AdminLogin from "./page";

// Mock Next.js router
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => "/admin/login",
}));

describe("AdminLogin Component", () => {
  beforeEach(() => {
    mockPush.mockClear();
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the login form elements", () => {
    render(<AdminLogin />);
    
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("displays validation error on invalid credentials", () => {
    render(<AdminLogin />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    // Fill incorrect details and click submit
    fireEvent.change(emailInput, { target: { value: "wrong@dropship.in" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpwd" } });
    fireEvent.click(submitButton);

    // Fast-forward auth delay timer synchronously inside act
    act(() => {
      vi.advanceTimersByTime(1200);
    });

    // Check DOM state immediately without waitFor
    expect(screen.getByText(/invalid email address or password/i)).toBeInTheDocument();
    expect(localStorage.getItem("admin_logged_in")).toBeNull();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("logs in successfully and redirects with correct credentials", () => {
    render(<AdminLogin />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    // Fill correct details and click submit
    fireEvent.change(emailInput, { target: { value: "admin@dropship.in" } });
    fireEvent.change(passwordInput, { target: { value: "admin123" } });
    fireEvent.click(submitButton);

    // Fast-forward auth delay timer synchronously inside act
    act(() => {
      vi.advanceTimersByTime(1200);
    });

    // Check localStorage state immediately
    expect(localStorage.getItem("admin_logged_in")).toBe("true");
    expect(mockPush).toHaveBeenCalledWith("/admin");
  });
});
