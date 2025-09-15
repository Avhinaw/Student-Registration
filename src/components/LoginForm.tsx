import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { decryptData } from "../utils/crypto";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function LoginForm() {

  const [email, setEmail] = useState(""); // state for email
  const [password, setPassword] = useState(""); // for password
  const [showPassword, setShowPassword] = useState(false); // toggle
  const navigate = useNavigate(); // to nav to student page

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await api.get(`/students`);
  
      const student = res.data[0];
      const decryptedEmail = decryptData(student.email);
      const decryptedPassword = decryptData(student.password);
  
      if (decryptedEmail == email && decryptedPassword === password) {
        toast.success("Login successful!");
        navigate("/students");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong!");
    }
  };
  
  

  return (
    <div className="bg-[var(--background)] text-white min-h-screen w-full h-full relative flex items-center justify-center">
      <div className="bg-[var(--foreground)] backdrop-blur-sm fixed z-10 w-[90%] lg:w-1/3 h-1/2 rounded-[var(--radius-md)] flex flex-col items-center gap-4 py-5">
        <div className="space-y-1 text-center pb-4">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-64 py-5 px-3 bg-gray-700/50 border-none rounded-[var(--radius-sm)] text-white placeholder-gray-400"
          />

          <div className="relative w-64">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-5 px-3 bg-gray-700/50 border-none rounded-[var(--radius-sm)] text-white placeholder-gray-400 focus:ring-2 focus:ring-[var(--primary)]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--primary)]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

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

        <p className="text-gray-400 text-sm">
          Don't have an account? 
          <a href="/register" className="text-[var(--primary)] hover:underline">
            Register now
          </a>
        </p>
      </div>
    </div>
  );
}
