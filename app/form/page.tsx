"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface User {
  firstName: string;
  lastName: string;
  birthDate: string;
}

export default function Home() {
  const [form, setForm] = useState<User>({
    firstName: "",
    lastName: "",
    birthDate: "",
  });
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = JSON.parse(
      localStorage.getItem("users") ?? "[]"
    ) as User[];
    setUsers(storedUsers);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = { ...form };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setForm({ firstName: "", lastName: "", birthDate: "" });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Form</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block mb-1">ชื่อ:</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">นามสกุล:</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">วันเกิด:</label>
          <input
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
          บันทึก
        </button>
      </form>
      <h2 className="text-xl font-bold mb-2">User List</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ชื่อ</th>
            <th className="px-4 py-2">นามสกุล</th>
            <th className="px-4 py-2">วันเกิด</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{user.firstName}</td>
              <td className="border px-4 py-2">{user.lastName}</td>
              <td className="border px-4 py-2">{user.birthDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
