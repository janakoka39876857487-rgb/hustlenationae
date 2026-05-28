import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast, Toaster } from "sonner";
import { Download, LogOut, MessageCircle, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Leads Dashboard — Hustle Nation" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Lead = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  country_code: string | null;
  phone: string | null;
  email: string | null;
  goal: string | null;
  start_time: string | null;
  speed: string | null;
  source: string;
  created_at: string;
};

function AdminPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "unauth" | "denied" | "ready">("loading");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [query, setQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if (active) setStatus("unauth");
        return;
      }
      // Try fetching leads; admin RLS will either return rows or empty
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000);

      if (!active) return;
      if (error) {
        toast.error(error.message);
        setStatus("denied");
        return;
      }
      // Verify admin role explicitly so we can show a clean access-denied
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!roles) {
        setStatus("denied");
        return;
      }
      setLeads((data as Lead[]) || []);
      setStatus("ready");
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (status === "unauth") navigate({ to: "/auth" });
  }, [status, navigate]);

  const sources = useMemo(() => {
    const s = new Set(leads.map((l) => l.source));
    return ["all", ...Array.from(s)];
  }, [leads]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (sourceFilter !== "all" && l.source !== sourceFilter) return false;
      if (!q) return true;
      return [l.first_name, l.last_name, l.phone, l.email, l.goal].some(
        (v) => v?.toLowerCase().includes(q),
      );
    });
  }, [leads, query, sourceFilter]);

  const exportCsv = () => {
    const header = ["Date", "First name", "Last name", "Country", "Phone", "Email", "Main Goal", "Training Preference", "Commitment Level", "Source"];
    const rows = filtered.map((l) => [
      new Date(l.created_at).toISOString(),
      l.first_name ?? "",
      l.last_name ?? "",
      l.country_code ?? "",
      l.phone ?? "",
      l.email ?? "",
      l.goal ?? "",
      l.start_time ?? "",
      l.speed ?? "",
      l.source,
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  if (status === "loading") {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading...</div>;
  }
  if (status === "denied") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
        <h1 className="font-display text-3xl">Access denied</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Your account is signed in but does not have admin access. Ask the site owner to grant you the <code>admin</code> role.
        </p>
        <button onClick={signOut} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary-hover">
          Sign out
        </button>
      </div>
    );
  }
  if (status !== "ready") return null;

  return (
    <div className="min-h-screen px-5 py-8 lg:px-10">
      <Toaster theme="dark" position="top-center" richColors />
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl tracking-wide">
              Leads <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-sm text-muted-foreground">{filtered.length} of {leads.length} leads</p>
          </div>
          <div className="flex gap-2">
            <button onClick={exportCsv} className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary-hover">
              <Download className="h-4 w-4" /> Export CSV
            </button>
            <button onClick={signOut} className="inline-flex h-10 items-center gap-2 rounded-md border border-white/10 px-4 text-sm text-foreground hover:bg-white/5">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </header>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, phone, email, goal"
              className="h-10 w-full rounded-md border border-white/10 bg-transparent pl-9 pr-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="h-10 rounded-md border border-white/10 bg-background px-3 text-sm outline-none focus:border-primary"
          >
            {sources.map((s) => (
              <option key={s} value={s}>{s === "all" ? "All sources" : s}</option>
            ))}
          </select>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Main Goal</th>
                <th className="px-4 py-3">Training Preference</th>
                <th className="px-4 py-3">Commitment Level</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => {
                const fullPhone = [l.country_code, l.phone].filter(Boolean).join(" ");
                const waNumber = (l.country_code || "") + (l.phone || "");
                const cleaned = waNumber.replace(/[^\d]/g, "");
                return (
                  <tr key={l.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                      {new Date(l.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{[l.first_name, l.last_name].filter(Boolean).join(" ") || "—"}</td>
                    <td className="whitespace-nowrap px-4 py-3">{fullPhone || "—"}</td>
                    <td className="px-4 py-3">{l.email || "—"}</td>
                    <td className="px-4 py-3">{l.goal || "—"}</td>
                    <td className="px-4 py-3">{l.start_time || "—"}</td>
                    <td className="px-4 py-3">{l.speed || "—"}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{l.source}</td>
                    <td className="px-4 py-3">
                      {cleaned && (() => {
                        const name = (l.first_name || "").trim();
                        const hi = name ? `Hi ${name},` : "Hi,";
                        const msg = `${hi} this is Hustle Nation. I tried to reach you but your details didn't come through on WhatsApp. Are you still interested in starting your fitness journey with us? If yes, when would you like to begin?`;
                        return (
                          <a
                            href={`https://wa.me/${cleaned}?text=${encodeURIComponent(msg)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary-hover"
                            aria-label="Send WhatsApp follow-up"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </a>
                        );
                      })()}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="px-4 py-12 text-center text-muted-foreground">No leads yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
