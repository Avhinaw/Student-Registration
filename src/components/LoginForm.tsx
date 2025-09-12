import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import api from "../utils/api";
import { useNavigate } from "react-router-dom"; // ✅ added
import { toast } from "sonner";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ added

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Fetch users from db.json
      const res = await api.get("/students");
      const students = res.data;

      // Check if email + password match
      const user = students.find(
        (s: any) => s.email === email && s.password === password
      );

      if (user) {
        toast("Login successful!")
        navigate("/students"); // ✅ redirect after login
      } else {
        toast("Invalid email or password")
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen w-full h-full relative flex items-center justify-center">
      <div className="bg-gray-800/50 backdrop-blur-sm fixed z-10 w-[90%] lg:w-1/3 h-1/2 rounded-[var(--radius-md)] flex flex-col items-center gap-4 py-5">
        {/* Header */}
        <div className="space-y-1 text-center pb-4">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-64 py-5 px-3 bg-gray-700/50 border-none rounded-[var(--radius-sm)] text-white placeholder-gray-400 focus:ring-2 focus:ring-[var(--primary)]"
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-64 py-5 px-3 bg-gray-700/50 border-none rounded-[var(--radius-sm)] text-white placeholder-gray-400 focus:ring-2 focus:ring-[var(--primary)]"
          />

          <a
            href="#"
            className="text-end text-sm text-gray-400 hover:text-[var(--primary)]"
          >
            Forget Password?
          </a>

          <Button type="submit" className="text-black font-bold">
            Login
          </Button>
        </form>

        {/* Footer */}
        <p className="text-gray-400 text-sm">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-[var(--primary)] hover:underline">
            Register now
          </a>
        </p>
      </div>
    </div>
  );
}
