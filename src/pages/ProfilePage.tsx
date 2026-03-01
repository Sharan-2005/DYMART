import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";
import {
  User, Mail, Lock, Trash2, Save, ArrowLeft,
  Eye, EyeOff, CheckCircle, AlertCircle, ShieldCheck, Package
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
// Matches your actual profiles schema:
// id, user_id, display_name, avatar_url, created_at, updated_at
interface Profile {
  display_name: string;
  avatar_url:   string;
}

type ToastType = "success" | "error";

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [profile,       setProfile]       = useState<Profile>({ display_name: "", avatar_url: "" });
  const [loading,       setLoading]       = useState(true);
  const [saving,        setSaving]        = useState(false);
  const [toast,         setToast]         = useState<{ msg: string; type: ToastType } | null>(null);

  // Password
  const [pwOpen,        setPwOpen]        = useState(false);
  const [newPw,         setNewPw]         = useState("");
  const [confirmPw,     setConfirmPw]     = useState("");
  const [showNew,       setShowNew]       = useState(false);
  const [changingPw,    setChangingPw]    = useState(false);

  // Delete
  const [deleteOpen,    setDeleteOpen]    = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleting,      setDeleting]      = useState(false);

  // ── Fetch ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("display_name, avatar_url")
        .eq("user_id", user.id)   // ✅ your schema uses user_id, not id
        .single();

      if (data) setProfile({ display_name: data.display_name ?? "", avatar_url: data.avatar_url ?? "" });
      setLoading(false);
    })();
  }, [user]);

  // ── Save profile ──────────────────────────────────────────────────────────
  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // upsert matching on user_id
    const { error } = await supabase
      .from("profiles")
      .upsert(
        { user_id: user!.id, display_name: profile.display_name, avatar_url: profile.avatar_url },
        { onConflict: "user_id" }
      );

    notify(error ? "Failed to save profile." : "Profile saved!", error ? "error" : "success");
    setSaving(false);
  };

  // ── Change password ───────────────────────────────────────────────────────
  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw !== confirmPw)  return notify("Passwords don't match.", "error");
    if (newPw.length < 8)     return notify("Password must be at least 8 characters.", "error");

    setChangingPw(true);
    const { error } = await supabase.auth.updateUser({ password: newPw });
    if (!error) { setNewPw(""); setConfirmPw(""); setPwOpen(false); }
    notify(error ? "Failed to update password." : "Password updated!", error ? "error" : "success");
    setChangingPw(false);
  };

  // ── Delete account ────────────────────────────────────────────────────────
  const deleteAccount = async () => {
    if (deleteConfirm !== "DELETE") return notify('Type "DELETE" to confirm.', "error");
    setDeleting(true);
    await supabase.from("profiles").delete().eq("user_id", user!.id);
    await signOut();
    navigate("/");
  };

  const notify = (msg: string, type: ToastType) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  if (loading) return (
    <div style={pageStyle}>
      <style>{css}</style>
      <div style={{ textAlign: "center", padding: "80px 0", color: "#94a3b8" }}>
        <div style={spinnerStyle} />
        <p style={{ marginTop: 16, fontSize: 14 }}>Loading profile…</p>
      </div>
    </div>
  );

  const initials = (profile.display_name || user?.email || "U")
    .split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div style={pageStyle}>
      <style>{css}</style>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 999,
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 18px", borderRadius: 14,
          background: toast.type === "success" ? "#f0fdf4" : "#fff5f5",
          border: `1px solid ${toast.type === "success" ? "#bbf7d0" : "#fecaca"}`,
          color: toast.type === "success" ? "#15803d" : "#dc2626",
          boxShadow: "0 8px 32px rgba(0,0,0,.1)",
          fontSize: 14, fontWeight: 600,
          animation: "fade-slide .2s ease",
        }}>
          {toast.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Back */}
      <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#64748b", textDecoration: "none", fontSize: 13, fontWeight: 500, marginBottom: 24 }}>
        <ArrowLeft size={14} /> Back to Home
      </Link>

      {/* Avatar header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <div style={{ width: 64, height: 64, borderRadius: 20, background: "linear-gradient(135deg,#38bdf8,#0284c7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "white", boxShadow: "0 6px 20px rgba(14,165,233,.35)", flexShrink: 0 }}>
          {initials}
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 4px", letterSpacing: "-0.03em" }}>
            {profile.display_name || "Your Profile"}
          </h1>
          <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>{user?.email}</p>
        </div>
      </div>

      {/* ── Personal info ── */}
      <div style={sectionStyle}>
        <div style={sectionHead}>
          <div style={iconWrap}><User size={16} color="#0284c7" /></div>
          <span style={sectionTitle}>Personal Information</span>
        </div>
        <form onSubmit={saveProfile} style={{ padding: 20 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Display Name</label>
            <input
              value={profile.display_name}
              onChange={e => setProfile(p => ({ ...p, display_name: e.target.value }))}
              placeholder="Your name"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                value={user?.email ?? ""}
                disabled
                style={{ ...inputStyle, paddingLeft: 36, background: "#f8fafc", color: "#94a3b8", cursor: "not-allowed" }}
              />
            </div>
            <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>Email cannot be changed here.</p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Avatar URL <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "#94a3b8" }}>(optional)</span></label>
            <input
              value={profile.avatar_url}
              onChange={e => setProfile(p => ({ ...p, avatar_url: e.target.value }))}
              placeholder="https://…"
              style={inputStyle}
            />
          </div>

          <button type="submit" disabled={saving} style={{ ...primaryBtn, opacity: saving ? 0.7 : 1 }}>
            {saving ? <div style={miniSpinner} /> : <Save size={14} />}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </div>

      {/* ── Change password ── */}
      <div style={sectionStyle}>
        <div style={{ ...sectionHead, cursor: "pointer" }} onClick={() => setPwOpen(v => !v)}>
          <div style={iconWrap}><Lock size={16} color="#0284c7" /></div>
          <span style={sectionTitle}>Change Password</span>
          <span style={{ marginLeft: "auto", fontSize: 12, color: "#94a3b8" }}>{pwOpen ? "▲ Close" : "▼ Open"}</span>
        </div>

        {pwOpen && (
          <form onSubmit={changePassword} style={{ padding: "0 20px 20px" }}>
            {/* New password */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>New Password <span style={{ color: "#94a3b8", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(min. 8 chars)</span></label>
              <div style={{ position: "relative" }}>
                <input
                  type={showNew ? "text" : "password"}
                  value={newPw}
                  onChange={e => setNewPw(e.target.value)}
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: 40 }}
                />
                <button type="button" onClick={() => setShowNew(v => !v)} style={eyeBtn}>
                  {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Confirm New Password</label>
              <input
                type="password"
                value={confirmPw}
                onChange={e => setConfirmPw(e.target.value)}
                placeholder="••••••••"
                style={{ ...inputStyle, borderColor: confirmPw && confirmPw !== newPw ? "#fca5a5" : undefined }}
              />
              {confirmPw && confirmPw !== newPw && (
                <p style={{ fontSize: 11, color: "#dc2626", marginTop: 4 }}>Passwords don't match.</p>
              )}
            </div>

            <button type="submit" disabled={changingPw} style={{ ...primaryBtn, opacity: changingPw ? 0.7 : 1 }}>
              {changingPw ? <div style={miniSpinner} /> : <ShieldCheck size={14} />}
              {changingPw ? "Updating…" : "Update Password"}
            </button>
          </form>
        )}
      </div>

      {/* ── Quick links ── */}
      <div style={sectionStyle}>
        <div style={sectionHead}>
          <div style={iconWrap}><Package size={16} color="#0284c7" /></div>
          <span style={sectionTitle}>Quick Links</span>
        </div>
        <div style={{ padding: "8px 12px 12px" }}>
          <Link
            to="/orders"
            style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: 12, textDecoration: "none", color: "#0f172a", transition: "background 140ms" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#e0f2fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📦</div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>My Orders</p>
              <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>View your order history</p>
            </div>
            <span style={{ marginLeft: "auto", color: "#94a3b8" }}>→</span>
          </Link>
        </div>
      </div>

      {/* ── Danger zone ── */}
      <div style={{ ...sectionStyle, borderColor: "#fecaca" }}>
        <div style={{ ...sectionHead, background: "#fff5f5", borderRadius: "16px 16px 0 0" }}>
          <div style={{ ...iconWrap, background: "#fee2e2" }}><Trash2 size={16} color="#dc2626" /></div>
          <span style={{ ...sectionTitle, color: "#dc2626" }}>Danger Zone</span>
        </div>
        <div style={{ padding: 20 }}>
          {!deleteOpen ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: "0 0 2px" }}>Delete Account</p>
                <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Permanently remove your account and all data.</p>
              </div>
              <button onClick={() => setDeleteOpen(true)} style={dangerBtn}>
                <Trash2 size={13} /> Delete Account
              </button>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: 14, color: "#dc2626", fontWeight: 600, margin: "0 0 8px" }}>⚠️ This action cannot be undone.</p>
              <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 14px" }}>Type <strong>DELETE</strong> to confirm.</p>
              <input
                value={deleteConfirm}
                onChange={e => setDeleteConfirm(e.target.value)}
                placeholder='Type "DELETE"'
                style={{ ...inputStyle, borderColor: "#fca5a5", marginBottom: 14 }}
              />
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => { setDeleteOpen(false); setDeleteConfirm(""); }} style={ghostBtn}>Cancel</button>
                <button onClick={deleteAccount} disabled={deleting || deleteConfirm !== "DELETE"} style={{ ...dangerBtn, opacity: deleteConfirm !== "DELETE" ? 0.4 : 1 }}>
                  {deleting ? <div style={miniSpinner} /> : <Trash2 size={13} />}
                  {deleting ? "Deleting…" : "Confirm Delete"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

// ── Styles ────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
  @keyframes spin      { to { transform: rotate(360deg); } }
  @keyframes fade-slide { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
  input:focus, textarea:focus { border-color: #38bdf8 !important; box-shadow: 0 0 0 3px rgba(56,189,248,.2) !important; outline: none; }
`;

const pageStyle:    React.CSSProperties = { maxWidth: 640, margin: "0 auto", padding: "100px 20px 60px", fontFamily: "'DM Sans',sans-serif" };
const sectionStyle: React.CSSProperties = { background: "white", borderRadius: 16, border: "1px solid #e2e8f0", marginBottom: 20, boxShadow: "0 2px 12px rgba(0,0,0,.05)", overflow: "hidden" };
const sectionHead:  React.CSSProperties = { display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", borderBottom: "1px solid #f1f5f9", background: "#fafbfc" };
const sectionTitle: React.CSSProperties = { fontSize: 15, fontWeight: 700, color: "#0f172a" };
const iconWrap:     React.CSSProperties = { width: 30, height: 30, borderRadius: 9, background: "#e0f2fe", display: "flex", alignItems: "center", justifyContent: "center" };
const labelStyle:   React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" };
const inputStyle:   React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14, color: "#0f172a", fontFamily: "'DM Sans',sans-serif", boxSizing: "border-box", transition: "border-color 150ms, box-shadow 150ms" };
const primaryBtn:   React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, background: "linear-gradient(135deg,#38bdf8,#0284c7)", color: "white", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 14px rgba(14,165,233,.35)", fontFamily: "'DM Sans',sans-serif" };
const ghostBtn:     React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 10, border: "1px solid #e2e8f0", background: "white", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#64748b", fontFamily: "'DM Sans',sans-serif" };
const dangerBtn:    React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 10, border: "1px solid #fecaca", background: "#fff5f5", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#dc2626", fontFamily: "'DM Sans',sans-serif" };
const eyeBtn:       React.CSSProperties = { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex", padding: 0 };
const spinnerStyle: React.CSSProperties = { width: 36, height: 36, border: "3px solid #e2e8f0", borderTopColor: "#38bdf8", borderRadius: "50%", margin: "0 auto", animation: "spin 0.8s linear infinite" };
const miniSpinner:  React.CSSProperties = { width: 14, height: 14, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite" };