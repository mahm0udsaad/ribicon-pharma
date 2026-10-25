"use client";

import { useEffect } from "react";

// Shown instead of the browser's blank "This page couldn't load" when an admin page fails.
export default function AdminError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ maxWidth: 520, margin: "80px auto", padding: "0 16px" }}>
      <section className="admin-card">
        <h2>Something went wrong loading this page</h2>
        <p>This is usually temporary. Try again; your saved changes are not lost.</p>
        {error.digest && <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>Error reference: {error.digest}</p>}
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button className="admin-btn" type="button" onClick={() => retry()}>Try again</button>
          <a className="admin-btn-secondary" href="/admin">Go to dashboard</a>
        </div>
      </section>
    </div>
  );
}
