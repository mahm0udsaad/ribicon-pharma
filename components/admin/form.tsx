"use client";

import { useActionState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";

export type FormState = { error?: string; ok?: string } | undefined;
type Action = (state: FormState, formData: FormData) => Promise<FormState>;

// Wraps a Server Action form: shows its error/success message and a pending submit button.
export function AdminForm({ action, children, submitLabel = "Save", extraActions }: { action: Action; children: ReactNode; submitLabel?: string; extraActions?: ReactNode }) {
  const [state, formAction] = useActionState(action, undefined);
  return (
    <form action={formAction} className="admin-form">
      {state?.error ? <p className="admin-alert" role="alert">{state.error}</p> : null}
      {state?.ok ? <p className="admin-alert is-ok" role="status">{state.ok}</p> : null}
      {children}
      <div className="admin-form-actions">
        <SubmitButton label={submitLabel} />
        {extraActions}
      </div>
    </form>
  );
}

export function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return <button className="admin-btn" type="submit" disabled={pending}>{pending ? "Saving…" : label}</button>;
}
