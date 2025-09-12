import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import api from "../utils/api"; // <-- axios helper we created
import { toast } from "sonner";

export default function StudentForm() {
  const [student, setStudent] = useState({
    fullName: "",
    phone: "",
    dob: "",
    gender: "Male",
    email: "",
    password: "",
    address: "",
    course: "",
  });

  // handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/students", student); // send data to json-server
      toast("Student registered successfully!")
      setStudent({
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
    }
  };

  return (
    <div className="w-full min-h-screen h-full bg-gray-900 text-white">
      <div className="w-1/2 m-auto py-10 px-8 h-full">
        <h1 className="text-2xl font-bold text-center">Register New Student</h1>

        <form onSubmit={handleSubmit} className="space-y-5 py-10 px-10">
          {/* Name + Phone */}
          <div className="flex justify-between">
            <div className="w-1/2 flex flex-col gap-2">
              <label>Student Name</label>
              <Input
                type="text"
                name="fullName"
                value={student.fullName}
                onChange={handleChange}
                placeholder="Full name"
                className="w-64 py-5 px-3 bg-gray-700/50 border-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Phone Number</label>
              <Input
                type="text"
                name="phone"
                value={student.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-64 py-5 px-3 bg-gray-700/50 border-none"
              />
            </div>
          </div>

          {/* DOB + Gender */}
          <div className="flex justify-between">
            <div className="w-1/2 flex flex-col gap-2">
              <label>DOB</label>
              <Input
                type="date"
                name="dob"
                value={student.dob}
                onChange={handleChange}
                className="w-64 py-2 px-3 bg-gray-700/50 border-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Gender</label>
              <select
                name="gender"
                value={student.gender}
                onChange={handleChange}
                className="w-64 py-2 px-3 bg-gray-700/50 rounded-md"
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>

          {/* Email + Password */}
          <div className="flex justify-between">
            <div className="w-1/2 flex flex-col gap-2">
              <label>Email</label>
              <Input
                type="email"
                name="email"
                value={student.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-64 py-5 px-3 bg-gray-700/50 border-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Password</label>
              <Input
                type="password"
                name="password"
                value={student.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-64 py-5 px-3 bg-gray-700/50 border-none"
              />
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <label>Address</label>
            <Input
              type="text"
              name="address"
              value={student.address}
              onChange={handleChange}
              placeholder="Address"
              className="py-5 px-3 bg-gray-700/50 border-none"
            />
          </div>

          {/* Course */}
          <div className="flex flex-col gap-2">
            <label>Course Enrolled</label>
            <select
              name="course"
              value={student.course}
              onChange={handleChange}
              className="py-2 px-3 bg-gray-700/50 rounded-sm"
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
          </div>

          {/* Submit */}
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