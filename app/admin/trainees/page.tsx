export const dynamic = "force-dynamic";
import Link from "next/link";
import { cookies } from "next/headers";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { MODULE_NUMBERS } from "@/lib/training/constants";
import { formatDateShort } from "@/lib/utils";
export default async function Participants({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const resolvedSearch = await searchParams;
  const s = await requireAdmin();
  const en = (await cookies()).get("gc-lang")?.value === "en";
  const query = (resolvedSearch.q || "").slice(0, 120);
  const sort = ["name", "date", "completion"].includes(resolvedSearch.sort || "")
    ? resolvedSearch.sort!
    : "name";
  const [profiles, sessions, progress, certs] = await Promise.all([
    s
      .from("profiles")
      .select("id,full_name,created_at,language")
      .neq("role", "admin"),
    s.from("training_sessions").select("id,user_id"),
    s
      .from("module_progress")
      .select("session_id,module_index,best_score,passed"),
    s.from("certificates").select("id,session_id,issued_at"),
  ]);
  if ([profiles, sessions, progress, certs].some((r) => r.error))
    return (
      <p className="wrap error" role="alert">
        {en
          ? "Participants could not be loaded."
          : "Les participants n’ont pas pu être chargés."}
      </p>
    );
  const rows = (profiles.data || [])
    .map((p) => {
      const session = sessions.data?.find((t) => t.user_id === p.id);
      const items =
        progress.data?.filter((t) => t.session_id === session?.id) || [];
      return {
        ...p,
        items,
        passed: items.filter((t) => t.passed).length,
        cert: certs.data?.find((t) => t.session_id === session?.id),
      };
    })
    .filter((p) =>
      (p.full_name || "").toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "date"
        ? Date.parse(b.created_at) - Date.parse(a.created_at)
        : sort === "completion"
          ? b.passed - a.passed
          : (a.full_name || "").localeCompare(b.full_name || ""),
    );
  return (
    <div className="wrap">
      <p className="eyebrow">Administration</p>
      <h1>{en ? "The participants." : "Les participants."}</h1>
      <p className="muted">
        {rows.length} {en ? "participants shown" : "participants affichés"}
      </p>
      <form className="actions" method="GET">
        <label htmlFor="participant-search" className="sr-only">
          {en ? "Search by name" : "Rechercher par nom"}
        </label>
        <input
          id="participant-search"
          name="q"
          defaultValue={query}
          placeholder={en ? "Search by name" : "Rechercher par nom"}
        />
        <label htmlFor="participant-sort" className="sr-only">
          {en ? "Sort" : "Trier"}
        </label>
        <select id="participant-sort" name="sort" defaultValue={sort}>
          <option value="name">{en ? "Name" : "Nom"}</option>
          <option value="date">
            {en ? "Registration date" : "Date d’inscription"}
          </option>
          <option value="completion">{en ? "Progress" : "Progression"}</option>
        </select>
        <button className="primary">{en ? "Search" : "Rechercher"}</button>
      </form>
      <div className="admin-table">
        <table>
          <caption className="sr-only">
            {en
              ? "Participant knowledge scores"
              : "Scores de connaissances des participants"}
          </caption>
          <thead>
            <tr>
              {[
                en ? "Name" : "Nom",
                en ? "Registered" : "Inscription",
                en ? "Passed" : "Validés",
                ...MODULE_NUMBERS,
                en ? "Completion record" : "Attestation",
              ].map((l) => (
                <th scope="col" key={l}>
                  {l}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td>
                  <Link href={`/admin/trainees/${p.id}`}>
                    {p.full_name ||
                      (en ? "Unnamed participant" : "Participant sans nom")}
                  </Link>
                </td>
                <td>{formatDateShort(p.created_at)}</td>
                <td>{p.passed}/6</td>
                {MODULE_NUMBERS.map((_, i) => (
                  <td key={i}>
                    {p.items.find((t) => t.module_index === i)?.best_score ===
                    undefined
                      ? "·"
                      : `${p.items.find((t) => t.module_index === i)?.best_score}/3`}
                  </td>
                ))}
                <td>
                  {p.cert ? (
                    <Link href={`/certificate/${p.cert.id}`}>
                      {formatDateShort(p.cert.issued_at)}
                    </Link>
                  ) : (
                    "·"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!rows.length && (
        <p>{en ? "No participants found." : "Aucun participant trouvé."}</p>
      )}
    </div>
  );
}
