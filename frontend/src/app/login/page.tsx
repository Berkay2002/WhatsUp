"use client"; // This directive marks this file as a Client Component

import { useState } from 'react';
import axiosInstance from '@/lib/axios';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Store JWT token
        router.push('/dashboard'); // Redirect to dashboard after successful login
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Error logging in');
      } else {
        setError('Error logging in');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>} {/* Display any error messages */}
    </form>
  );
}
