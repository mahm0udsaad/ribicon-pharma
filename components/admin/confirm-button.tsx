"use client";

// A one-button form that asks for confirmation before running a destructive Server Action.
export function ConfirmButton({ action, id, label = "Delete", message }: { action: (formData: FormData) => Promise<void>; id: number; label?: string; message: string }) {
  return (
    <form action={action} onSubmit={(event) => { if (!window.confirm(message)) event.preventDefault(); }}>
      <input type="hidden" name="id" value={id} />
      <button className="admin-btn-danger" type="submit">{label}</button>
    </form>
  );
}
