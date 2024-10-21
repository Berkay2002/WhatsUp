// src/app/dashboard/layout.tsx
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="dashboard-layout">
            <header>
                <h1>Dashboard</h1>
                {/* You can add a navigation menu or user info here */}
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; 2024 Your Application</p>
            </footer>
        </div>
    );
}
