"use client";

import { useActionState } from "react";
import { submitInquiry, type ContactState } from "@/app/(site)/contact/actions";

const copy = {
  en: {
    name: "Name", email: "Email", organization: "Organization", subject: "Subject", message: "Message", send: "Send message", sending: "Sending…",
    errors: { missing: "Please fill in your name, email and message.", email: "Please enter a valid email address.", rate: "Too many messages. Please try again later or email us directly.", server: "Your message could not be sent. Please email us directly." },
    privacy: "Do not include personal health information.",
  },
  fr: {
    name: "Nom", email: "Courriel", organization: "Organisation", subject: "Objet", message: "Message", send: "Envoyer", sending: "Envoi…",
    errors: { missing: "Veuillez indiquer votre nom, votre courriel et votre message.", email: "Veuillez saisir une adresse courriel valide.", rate: "Trop de messages. Réessayez plus tard ou écrivez-nous directement.", server: "Votre message n’a pas pu être envoyé. Écrivez-nous directement." },
    privacy: "N’incluez aucun renseignement personnel sur la santé.",
  },
};

export function ContactForm({ locale, subjects, sentMessage }: { locale: "en" | "fr"; subjects: string[]; sentMessage: string }) {
  const t = copy[locale];
  const [state, action, pending] = useActionState<ContactState, FormData>(submitInquiry, { status: "idle" });

  if (state.status === "sent") return <p className="contact-form-status is-ok" role="status">{sentMessage}</p>;

  return (
    <form className="contact-form" action={action}>
      {state.status === "error" && state.error ? <p className="contact-form-status" role="alert">{t.errors[state.error]}</p> : null}
      <input type="hidden" name="locale" value={locale} />
      <div className="contact-form-hp" aria-hidden="true">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label><span>{t.name} *</span><input type="text" name="name" required maxLength={200} autoComplete="name" /></label>
      <label><span>{t.email} *</span><input type="email" name="email" required maxLength={254} autoComplete="email" /></label>
      <label><span>{t.organization}</span><input type="text" name="organization" maxLength={200} autoComplete="organization" /></label>
      <label><span>{t.subject}</span><select name="subject" defaultValue={subjects[0]}>{subjects.map((subject) => <option key={subject}>{subject}</option>)}</select></label>
      <label className="contact-form-wide"><span>{t.message} *</span><textarea name="message" required maxLength={5000} rows={6} /></label>
      <div className="contact-form-wide contact-form-foot">
        <small>{t.privacy}</small>
        <button className="button-primary" type="submit" disabled={pending}>{pending ? t.sending : t.send}</button>
      </div>
    </form>
  );
}
