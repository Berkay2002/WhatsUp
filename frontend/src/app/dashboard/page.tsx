"use client"; // Enable client-side rendering

import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  // Log out function
  const handleLogout = () => {
    authContext?.logout(); // Clear auth state and localStorage
    router.push('/login'); // Redirect to login after logout
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard area where you can chat with other users.</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
