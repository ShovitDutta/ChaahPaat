"use client";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function TestAuthPage() {
  const { data: session, status } = useSession();
  const [dbStatus, setDbStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkDbConnection = async () => {
      try {
        const response = await fetch('/api/test/db');
        const data = await response.json();
        setDbStatus(data);
      } catch (error) {
        setDbStatus({ success: false, message: 'Failed to connect to DB', error: error.message });
      } finally {
        setLoading(false);
      }
    };

    checkDbConnection();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Auth.js + Drizzle Test Page</h1>

      {/* Database Status */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Database Connection Status</h2>
        {dbStatus ? (
          <div>
            <p><strong>Status:</strong> {dbStatus.success ? '✅ Connected' : '❌ Error'}</p>
            <p><strong>Message:</strong> {dbStatus.message}</p>
            {dbStatus.error && <p className="text-red-600"><strong>Error:</strong> {dbStatus.error}</p>}
          </div>
        ) : (
          <p>Checking database connection...</p>
        )}
      </div>

      {/* Auth Status */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Authentication Status</h2>
        <p><strong>Status:</strong> {status}</p>
        
        {status === "loading" && <p>Auth is loading...</p>}
        
        {session ? (
          <div>
            <p><strong>Signed in as:</strong> {session.user?.email || session.user?.name}</p>
            <p><strong>User ID:</strong> {session.user?.id}</p>
            <button 
              onClick={() => signOut()} 
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <p>Not signed in</p>
            <button 
              onClick={() => signIn('google')} 
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign in with Google
            </button>
          </div>
        )}
      </div>

      {/* Test Auth API */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Test Auth API Endpoint</h2>
        <p>Visit <code className="bg-gray-100 p-1 rounded">/api/test-auth</code> to verify session data</p>
      </div>

      {/* Instructions */}
      <div className="p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Testing Instructions</h2>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Sign in with Google using the button above</li>
          <li>Check the database connection status (should show connected)</li>
          <li>Check the authentication status (should show signed in)</li>
          <li>After signing in, visit /api/test-auth to see session details</li>
          <li>Check your Neon database to verify user data was created</li>
        </ol>
      </div>
    </div>
  );
}