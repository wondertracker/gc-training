"use client";
import { useState } from "react";
export function EmailButton({ id, en }: { id: string; en: boolean }) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <div className="no-print">
      <button
        className="secondary"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setStatus("");
          try {
            const response = await fetch("/api/send-certificate-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ certificateId: id }),
            });
            if (response.status === 409)
              setStatus(
                en
                  ? "Email delivery is not configured yet. You can save a PDF."
                  : "L’envoi par e-mail n’est pas encore configuré. Vous pouvez enregistrer un PDF.",
              );
            else if (response.ok)
              setStatus(
                en
                  ? "The sending service accepted the request. Check your inbox."
                  : "Le service d’envoi a accepté la demande. Consultez votre boîte mail.",
              );
            else throw new Error("send");
          } catch {
            setStatus(
              en
                ? "Could not send the email. Your record remains available here."
                : "L’e-mail n’a pas pu être envoyé. Votre attestation reste disponible ici.",
            );
          } finally {
            setBusy(false);
          }
        }}
      >
        {en ? "Send to my email" : "Recevoir par e-mail"}
      </button>
      <p className="save-status" role="status">
        {status}
      </p>
    </div>
  );
}
