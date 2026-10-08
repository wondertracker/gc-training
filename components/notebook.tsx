"use client";
import { useState } from "react";
import { MODULES } from "@/lib/training/data";
import { readDraft, draftKey, useDraft } from "@/lib/training/local-notes";
import { useBrowserReady } from "@/lib/training/browser-storage";
import { usePreferences } from "./preferences";
import Link from "next/link";
export function Notebook({
  userId,
  preview = false,
}: {
  userId: string;
  preview?: boolean;
}) {
  const { lang } = usePreferences();
  const en = lang === "en";
  const [status, setStatus] = useState("");
  const [exportText, setExportText] = useState("");
  const ready = useBrowserReady();
  const modules = MODULES(lang);
  function exportNotes() {
    try {
      const body = [
        "GRANDE CHARTE · " + (en ? "My notebook" : "Mon carnet"),
        ...modules.map((m, i) => {
          const d = readDraft(userId, i);
          return `${m.number}. ${m.label}\n\n${en ? "Personal note" : "Note personnelle"}\n${d.note}\n\n${en ? "Situation response" : "Réponse en situation"}\n${d.scenario}`;
        }),
      ].join("\n\n");
      setExportText(body);
      const url = URL.createObjectURL(
        new Blob([body], { type: "text/plain;charset=utf-8" }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = "Grande-Charte-mon-carnet.txt";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch {
      setStatus(
        en
          ? "Export is unavailable. Copy your notes below."
          : "L’export est indisponible. Copiez vos notes ci-dessous.",
      );
    }
  }
  return (
    <div className="reading">
      <p className="eyebrow">
        {en ? "Make the programme your own" : "Faire vôtre le parcours"}
      </p>
      <h1>{en ? "My notebook." : "Mon carnet."}</h1>
      <p className="muted">
        {en
          ? "Your notes and practice responses stay on this device, under your account’s identifier. They are not shared with the House or synchronised between devices. Export them to keep a copy."
          : "Vos notes et réponses d’entraînement restent sur cet appareil, sous l’identifiant de votre compte. Elles ne sont ni transmises à la Maison ni synchronisées entre appareils. Exportez-les pour en garder une copie."}
      </p>
      <div className="actions">
        <button className="primary" onClick={exportNotes} disabled={!ready}>
          {en ? "Export my notebook" : "Exporter mon carnet"} ↗
        </button>
        <button
          className="secondary"
          onClick={() => {
            if (
              !window.confirm(
                en
                  ? "Clear your notes and drafts on this device? Your account scores will be preserved."
                  : "Effacer vos notes et brouillons sur cet appareil ? Les scores de votre compte seront conservés.",
              )
            )
              return;
            try {
              modules.forEach((_, i) =>
                localStorage.removeItem(draftKey(userId, i)),
              );
              window.dispatchEvent(new Event("gc-storage"));
              setStatus(
                en ? "Local notebook cleared." : "Carnet local effacé.",
              );
            } catch {
              setStatus(
                en
                  ? "Could not clear local notes."
                  : "Les notes locales n’ont pas pu être effacées.",
              );
            }
          }}
        >
          {en ? "Clear local notes" : "Effacer les notes locales"}
        </button>
      </div>
      <p role="status" className="save-status">
        {status}
      </p>
      {exportText && (
        <section className="note">
          <label htmlFor="export-copy">
            {en
              ? "Text version. Copy it if the download does not start."
              : "Version texte. Copiez-la si le téléchargement ne démarre pas."}
          </label>
          <textarea id="export-copy" readOnly value={exportText} rows={12} />
        </section>
      )}
      {modules.map((m, i) => (
        <NotebookEntry
          key={i}
          userId={userId}
          index={i}
          label={`${m.number} · ${m.label}`}
          en={en}
          preview={preview}
        />
      ))}
    </div>
  );
}
function NotebookEntry({
  userId,
  index,
  label,
  en,
  preview,
}: {
  userId: string;
  index: number;
  label: string;
  en: boolean;
  preview: boolean;
}) {
  const { draft, update, ready, saved } = useDraft(userId, index);
  return (
    <section className="notebook-entry">
      <h2>{label}</h2>
      <label htmlFor={`note-${index}`}>
        {en ? "Personal note" : "Note personnelle"}
      </label>
      <textarea
        id={`note-${index}`}
        disabled={!ready}
        value={draft.note}
        onChange={(e) => update({ note: e.target.value })}
      />
      {!saved && (
        <p role="status" className="error">
          {en
            ? "Local saving unavailable. Copy this note."
            : "Enregistrement local indisponible. Copiez cette note."}
        </p>
      )}
      {draft.scenario && (
        <details>
          <summary>
            {en ? "My practice response" : "Ma réponse en situation"}
          </summary>
          <p style={{ whiteSpace: "pre-wrap" }}>{draft.scenario}</p>
        </details>
      )}
      <Link href={`${preview ? "/preview" : ""}/module/${index}`}>
        {en ? "Return to the module" : "Retrouver le module"} ↗
      </Link>
    </section>
  );
}
