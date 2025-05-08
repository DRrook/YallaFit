import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const TestPage = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-black/40 flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Test Page</h1>
      <div className="bg-yalla-dark-gray p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
        <p className="mb-2">
          <span className="font-medium">Is Authenticated:</span>{' '}
          <span className={isAuthenticated ? 'text-green-500' : 'text-red-500'}>
            {isAuthenticated ? 'Yes' : 'No'}
          </span>
        </p>
        {user && (
          <>
            <h2 className="text-xl font-semibold mt-6 mb-4">User Information</h2>
            <p className="mb-2">
              <span className="font-medium">Name:</span> {user.name}
            </p>
            <p className="mb-2">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="mb-2">
              <span className="font-medium">Role:</span>{' '}
              <span className="capitalize">{user.role}</span>
            </p>
          </>
        )}
        <div className="mt-8 flex flex-col gap-4">
          <a 
            href="/" 
            className="bg-yalla-green text-black py-2 px-4 rounded text-center hover:bg-yalla-green/90"
          >
            Go to Home
          </a>
          <a 
            href="/dashboard" 
            className="bg-yalla-green text-black py-2 px-4 rounded text-center hover:bg-yalla-green/90"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
