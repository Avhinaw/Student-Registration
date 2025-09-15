import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import api from "../utils/api";
import { decryptData, encryptData } from "../utils/crypto";
import { toast } from "sonner";
import { CirclePlus, Pencil, Trash } from "lucide-react";

export default function StudentList() {
  interface Student {
    id?: number;
    fullName: string;
    email: string;
    phone: string;
    dob: string;
    gender: "Male" | "Female";
    address: string;
    course: string;
    password: string;
  }
  const [students, setStudents] = useState<{ id: number; data: string }[]>([]);
  const [decryptedStudents, setDecryptedStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Fetch students
    const fetchStudents = async () => {
      try {
        const res = await api.get("/students");
    
        setStudents(res.data);
    
        const decrypted = res.data.map((s: any) => ({
          id: s.id,
          fullName: decryptData(s.fullName),
          email: decryptData(s.email),
          phone: decryptData(s.phone),
          address: decryptData(s.address),
          course: decryptData(s.course),
        }));
    
        setDecryptedStudents(decrypted);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
  

  useEffect(() => {
    fetchStudents();
  }, []);

  // Delete student
  const handleDelete = async (id: number) => {
    try {
      console.log(id);
      
      await api.delete(`/students/${id}`);
      toast("Student deleted");
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingStudent) return;

    try {
      const encryptedData = {
        id: editingStudent.id!,
      fullName: encryptData(editingStudent.fullName),
      email: encryptData(editingStudent.email),
      phone: encryptData(editingStudent.phone),
      course: encryptData(editingStudent.course),
        };

      const original = students.find((s) => s.id === editingStudent.id);

      if (!original) return;

      await api.patch(`/students/${original.id}`, encryptedData); // used patch to only re-edit those who are edited by user

      setEditingStudent(null);
      fetchStudents();
      toast("upadated successfully");
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div className="bg-[var(--background)] min-h-screen h-full w-full text-white">
      <div className="lg:px-40 py-6 space-y-2 text-center">
        <h1 className="text-2xl font-bold">Student Directory</h1>
        <h3 className="text-gray-400 text-sm">
          Manage student records, including enrollment details and contact
          information.
        </h3>
        <a
          href="/register"
          className="text-[var(--primary)] hover:underline mt-2 text-end flex gap-2 items-center w-full justify-end"
        >
          <CirclePlus /> Add New Student
        </a>
      </div>

      <div className="bg-[var(--foreground)] rounded-2xl lg:px-6 px-0 py-6 w-full lg:w-[80%] m-auto h-full">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="lg:p-4 p-2 font-semibold text-gray-300">Name</th>
              <th className="lg:p-4 p-2 font-semibold text-gray-300 hidden lg:block">Email</th>
              <th className="lg:p-4 p-2 font-semibold text-gray-300">Phone</th>
              <th className="lg:p-4 p-2 font-semibold text-gray-300">Course</th>
              <th className="p-4lg:p-4 p-2 font-semibold text-gray-300 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 lg:text-lg text-xs">
            {decryptedStudents.map((stu, idx) => (
              <tr key={idx}>
                <td className="lg:p-4 p-2">{stu.fullName}</td>
                <td className="lg:p-4 p-2 text-gray-400 hidden lg:block">{stu.email}</td>
                <td className="lg:p-4 p-2 text-gray-400">{stu.phone}</td>
                <td className="lg:p-4 p-2 text-gray-400">{stu.course}</td>
                <td className="lg:p-4 p-2 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingStudent(stu)}
                      className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      <span className="text-blue-400">
                      <Pencil size={18} />
                      </span>
                    </button>
                    <button
                      onClick={() => handleDelete(students[idx].id)}
                      className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      <span className="text-red-400">
                      <Trash size={18} />
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {decryptedStudents.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-[400px] space-y-4">
            <h2 className="text-xl font-bold">Edit Student</h2>
            <Input
              type="text"
              value={editingStudent.fullName}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, fullName: e.target.value })
              }
              placeholder="Full Name"
              className="bg-gray-700"
            />
            <Input
              type="email"
              value={editingStudent.email}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, email: e.target.value })
              }
              placeholder="Email"
              className="bg-gray-700"
            />
            <Input
              type="text"
              value={editingStudent.phone}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, phone: e.target.value })
              }
              placeholder="Phone"
              className="bg-gray-700"
            />
            <Input
              type="text"
              value={editingStudent.course}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, course: e.target.value })
              }
              placeholder="Course"
              className="bg-gray-700"
            />

            <div className="flex justify-end gap-2">
              <Button onClick={() => setEditingStudent(null)}>Cancel</Button>
              <Button onClick={handleSaveEdit} className="bg-blue-500 text-white">
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
