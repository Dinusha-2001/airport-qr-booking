"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function TestSupabasePage() {
  const [message, setMessage] = useState("Click the button to test Supabase connection.");

  async function testConnection() {
    try {
      const { error } = await supabase.from("packages").select("*").limit(1);

      if (error) {
        setMessage(`Connected to Supabase, but table not ready yet: ${error.message}`);
      } else {
        setMessage("Supabase connection successful.");
      }
    } catch (err) {
      setMessage("Connection failed. Check your .env.local values.");
      console.error(err);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Supabase Test
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Test Supabase Connection
        </h1>

        <p className="mt-4 text-slate-600">{message}</p>

        <button
          type="button"
          onClick={testConnection}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Test Connection
        </button>
      </div>
    </main>
  );
}