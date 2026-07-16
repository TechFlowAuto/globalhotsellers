'use client';

import { useState, useEffect } from 'react';

interface Subscriber {
  email: string;
  name: string;
  subscribedAt: string;
  source: string;
}

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('token');
    if (t) {
      setToken(t);
      fetchSubscribers(t);
    }
  }, []);

  async function fetchSubscribers(t: string) {
    try {
      const res = await fetch(`/api/subscribers?token=${t}`);
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data.subscribers);
        setTotal(data.total);
        setLoggedIn(true);
      }
    } catch (e) {
      console.error('Failed to fetch', e);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    fetchSubscribers(token);
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            🔐 Subscriber Admin
          </h1>
          <p className="text-gray-500 mb-6">Enter your admin token to continue</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Admin Token"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            📬 Subscribers ({total})
          </h1>
          <a
            href={`/api/subscribers?token=${token}`}
            target="_blank"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            JSON API →
          </a>
        </div>

        {subscribers.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <p className="text-gray-500 text-lg">No subscribers yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">#</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Email</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Name</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">{i + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{s.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{s.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(s.subscribedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 text-xs text-gray-400 text-center">
          Data stored in Vercel KV
        </p>
      </div>
    </div>
  );
}
