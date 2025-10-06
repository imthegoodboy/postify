'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function TestAuthPage() {
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('password123')
  const [result, setResult] = useState('')

  const handleTestSignIn = async () => {
    try {
      setResult('Testing sign in...')
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      
      if (res?.error) {
        setResult(`Error: ${res.error}`)
      } else {
        setResult('Success! Sign in worked.')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      setResult(`Exception: ${message}`)
    }
  }

  const handleTestDB = async () => {
    try {
      setResult('Testing database connection...')
      const response = await fetch('/api/test-db')
      const data = await response.json()
      setResult(`DB Test: ${JSON.stringify(data)}`)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      setResult(`DB Error: ${message}`)
    }
  }

  const handleCreateTestUser = async () => {
    try {
      setResult('Creating test user...')
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        })
      })
      const data = await response.json()
      setResult(`Create User: ${JSON.stringify(data)}`)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      setResult(`Create Error: ${message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Authentication Test</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="space-y-2">
            <button
              onClick={handleTestDB}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Test Database Connection
            </button>
            
            <button
              onClick={handleCreateTestUser}
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Create Test User
            </button>
            
            <button
              onClick={handleTestSignIn}
              className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
            >
              Test Sign In
            </button>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Result:</label>
            <div className="p-3 bg-gray-100 rounded text-sm">
              {result || 'Click a button to test...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
