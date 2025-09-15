import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import api from "../utils/api";
import { toast } from "sonner";
import { encryptData } from "../utils/crypto";
import { Eye, EyeOff } from "lucide-react";

export default function StudentForm() {
  interface Student {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    dob: string;
    gender: "Male" | "Female";
    address: string;
    course: string;
    password: string;
  }

  const [student, setStudent] = useState<Student>({
    // id: "",
    fullName: "",
    phone: "",
    dob: "",
    gender: "Male",
    email: "",
    password: "",
    address: "",
    course: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Student, string>>>(
    {}
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  // validation form
  const validate = () => {
    const newErrors: Partial<Record<keyof Student, string>> = {};

    if (!student.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!student.phone.trim())
      newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(student.phone))
      newErrors.phone = "Phone must be 10 digits";

    if (!student.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(student.email))
      newErrors.email = "Email is invalid";

    if (!student.password) newErrors.password = "Password is required";
    else if (student.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!student.dob) newErrors.dob = "Date of birth is required";
    if (!student.address.trim()) newErrors.address = "Address is required";
    if (!student.course) newErrors.course = "Please select a course";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return; // stop submission if validation fails
  
    try {
      const encrypted = {
        id: String(Date.now()),
        fullName: encryptData(student.fullName),
        phone: encryptData(student.phone),
        dob: encryptData(student.dob),
        gender: encryptData(student.gender),
        email: encryptData(student.email),
        password: encryptData(student.password),
        address: encryptData(student.address),
        course: encryptData(student.course),
      };
  
      await api.post("/students", encrypted);
  
      toast.success("Student registered successfully!");

      setStudent({
        // id: "",
        fullName: "",
        phone: "",
        dob: "",
        gender: "Male",
        email: "",
        password: "",
        address: "",
        course: "",
      });
    } catch (error) {
      console.error("Error registering student:", error);
      toast.error("Failed to register student");
    }
  };
  

  return (
    <div className="w-full min-h-screen max-h-full h-full bg-[var(--background)] text-white">
      <div className="lg:w-1/2 m-auto py-10 px-8">
        <h1 className="text-2xl font-bold text-center">
          Register New Student
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5 py-10 px-10">
          <div className="flex justify-between flex-wrap gap-5 lg:gap-0">
            <div className="flex flex-col gap-1">
              <label>Student Name</label>
              <Input
                name="fullName"
                value={student.fullName}
                onChange={handleChange}
                placeholder="Full name"
                className="w-64 py-2 px-3 bg-[var(--foreground)] border-none"
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm">{errors.fullName}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label>Phone Number</label>
              <Input
                name="phone"
                value={student.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-64 py-2 px-3 bg-[var(--foreground)] border-none"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}
            </div>
          </div>

          <div className="flex justify-between flex-wrap gap-5 lg:gap-0">
            <div className="flex flex-col gap-1">
              <label>DOB</label>
              <Input
                type="date"
                name="dob"
                value={student.dob}
                onChange={handleChange}
                className="w-64 py-2 px-3 bg-[var(--foreground)] border-none"
              />
              {errors.dob && (
                <span className="text-red-500 text-sm">{errors.dob}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label>Gender</label>
              <select
                name="gender"
                value={student.gender}
                onChange={handleChange}
                className="w-64 py-2 px-3 bg-[var(--foreground)] rounded-md"
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between flex-wrap gap-5 lg:gap-0">
            <div className="flex flex-col gap-1">
              <label>Email</label>
              <Input
                type="email"
                name="email"
                value={student.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-64 py-2 px-3 bg-[var(--foreground)] border-none"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-col gap-1 relative">
              <label>Password</label>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={student.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-64 py-2 px-3 bg-[var(--foreground)] border-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label>Address</label>
            <Input
              name="address"
              value={student.address}
              onChange={handleChange}
              placeholder="Address"
              className="py-2 px-3 bg-[var(--foreground)] border-none"
            />
            {errors.address && (
              <span className="text-red-500 text-sm">{errors.address}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label>Course Enrolled</label>
            <select
              name="course"
              value={student.course}
              onChange={handleChange}
              className="py-2 px-3 bg-[var(--foreground)] rounded-sm"
            >
              <option value="">Select course</option>
              <option>Full stack web</option>
              <option>Frontend</option>
              <option>Android</option>
              <option>Blockchain</option>
              <option>DevOps</option>
              <option>AI/ML</option>
              <option>Data Analytics</option>
            </select>
            {errors.course && (
              <span className="text-red-500 text-sm">{errors.course}</span>
            )}
          </div>

          <div className="text-end">
            <Button type="submit" className="text-black font-bold">
              Create Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
