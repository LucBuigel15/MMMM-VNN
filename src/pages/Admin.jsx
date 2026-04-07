import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";

export default function Admin() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [producten, setProducten] = useState([]);
    const [form, setForm] = useState({ naam: "", beschrijving: "", prijs: "" });
    const [afbeelding, setAfbeelding] = useState(null);
    const [downloadBestand, setDownloadBestand] = useState(null);
    const [loginError, setLoginError] = useState("");
    const [stap, setStap] = useState("login");
    const [otpCode, setOtpCode] = useState("");
    const [otpLoading, setOtpLoading] = useState(false);

    const fetchProducten = async () => {
        const { data } = await supabase.from("producten").select("*");
        setProducten(data ?? []);
    };

    useEffect(() => {
        const checkUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
            if (user) fetchProducten();
        };
        checkUser();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError("");
        setOtpLoading(true);

        // Stap 1: Controleer wachtwoord
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setLoginError("E-Mail of wachtwoord is niet goed.");
            setOtpLoading(false);
            return;
        }

        // Stap 2: Stuur de 6-cijferige OTP code
        const { error: otpError } = await supabase.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: false, // Voorkomt dat nieuwe accounts per ongeluk worden aangemaakt
            },
        });

        setOtpLoading(false);

        if (otpError) {
            setLoginError("Verificatie code kon niet worden verstuurd: " + otpError.message);
            return;
        }

        setStap("email-otp");
    };

    const handleEmailVerify = async (e) => {
        e.preventDefault();
        setLoginError("");
        setOtpLoading(true);

        const { data, error } = await supabase.auth.verifyOtp({
            email,
            token: otpCode,
            type: "email",
        });

        setOtpLoading(false);

        if (error) {
            setLoginError("Code is onjuist of verlopen. Probeer opnieuw.");
            return;
        }

        setUser(data.user);
        fetchProducten();
    };

    const handleResendOtp = async () => {
        setLoginError("");
        setOtpLoading(true);
        const { error } = await supabase.auth.signInWithOtp({ email });
        setOtpLoading(false);
        if (error) setLoginError("Opnieuw versturen mislukt: " + error.message);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setStap("login");
        setOtpCode("");
    };

    const voegToe = async () => {
        try {
            let afbeeldingUrl = null;
            let downloadUrl = null;

            if (afbeelding) {
                const naam = `${Date.now()}-${afbeelding.name}`;
                const { error } = await supabase.storage.from("afbeeldingen").upload(naam, afbeelding);
                if (error) throw error;
                afbeeldingUrl = supabase.storage.from("afbeeldingen").getPublicUrl(naam).data.publicUrl;
            }

            if (downloadBestand) {
                const naam = `${Date.now()}-${downloadBestand.name}`;
                const { error } = await supabase.storage.from("downloads").upload(naam, downloadBestand);
                if (error) throw error;
                downloadUrl = supabase.storage.from("downloads").getPublicUrl(naam).data.publicUrl;
            }

            const { error: insertError } = await supabase.from("producten").insert([
                {
                    ...form,
                    prijs: parseFloat(form.prijs) || 0,
                    afbeelding: afbeeldingUrl,
                    download_url: downloadUrl,
                },
            ]);

            if (insertError) throw insertError;

            setForm({ naam: "", beschrijving: "", prijs: "" });
            setAfbeelding(null);
            setDownloadBestand(null);
            fetchProducten();
            alert("Succesvol toegevoegd!");
        } catch (error) {
            alert(error.message);
        }
    };

    const verwijder = async (id) => {
        await supabase.from("producten").delete().eq("id", id);
        fetchProducten();
    };

    if (loading) {
        return <div className="p-20 text-center text-slate-400">Laden...</div>;
    }

    if (!user && stap === "login") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white px-6">
                <div className="w-full max-w-md text-center">
                    <h1 className="text-3xl font-black text-[#263759] italic mb-2 mt-2">Admin Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#263759]"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Wachtwoord"
                            value={password}
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#263759]"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {loginError && (
                            <p className="text-red-500 text-sm font-semibold bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-left">
                                {loginError}
                            </p>
                        )}
                        <button
                            type="submit"
                            disabled={otpLoading}
                            className="w-full bg-[#263759] text-white font-bold py-3 rounded-full hover:bg-red-500 transition disabled:opacity-50"
                        >
                            {otpLoading ? "Bezig..." : "Log in & stuur code"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (!user && stap === "email-otp") {
        return (
            /* Dezelfde container voor consistentie tijdens het invoeren van de code */
            <div className="min-h-screen flex items-center justify-center bg-white px-6">
                <div className="w-full max-w-md text-center">
                    <h1 className="text-3xl font-black text-[#263759] italic mb-2">Code invoeren</h1>
                    <p className="text-slate-400 text-sm mb-8">
                        Voer de 6-cijferige code in gestuurd naar <br />
                        <span className="font-semibold text-slate-600">{email}</span>.
                    </p>
                    <form onSubmit={handleEmailVerify} className="space-y-4">
                        <input
                            type="text"
                            placeholder="000000"
                            maxLength={6}
                            value={otpCode}
                            className="w-full border border-slate-200 rounded-xl px-4 py-4 text-center tracking-[0.5em] text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-[#263759]"
                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                        />
                        {loginError && (
                            <p className="text-red-500 text-sm font-semibold bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                                {loginError}
                            </p>
                        )}
                        <button
                            type="submit"
                            disabled={otpLoading || otpCode.length < 6}
                            className="w-full bg-[#263759] text-white font-bold py-3 rounded-full hover:bg-red-500 transition disabled:opacity-50"
                        >
                            {otpLoading ? "Verifiëren..." : "Bevestigen"}
                        </button>
                        <div className="flex justify-between text-sm pt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setStap("login");
                                    setLoginError("");
                                    setOtpCode("");
                                }}
                                className="text-slate-400 hover:text-slate-600 transition"
                            >
                                ← Terug
                            </button>
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={otpLoading}
                                className="text-[#263759] font-semibold hover:text-red-500 transition disabled:opacity-50"
                            >
                                Opnieuw versturen
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-black text-[#263759] italic">Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="text-sm font-bold text-red-500 border border-red-500 px-4 py-2 rounded-full hover:bg-red-50 transition"
                >
                    Uitloggen
                </button>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 mb-16 shadow-sm border border-slate-100">
                <h2 className="font-bold text-xl text-[#263759] mb-6">Nieuw Product</h2>
                <div className="space-y-4">
                    {["naam", "beschrijving", "prijs"].map((veld) => (
                        <input
                            key={veld}
                            placeholder={veld.charAt(0).toUpperCase() + veld.slice(1)}
                            value={form[veld]}
                            onChange={(e) => setForm({ ...form, [veld]: e.target.value })}
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#263759]"
                        />
                    ))}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-slate-200 rounded-xl px-4 py-3 bg-white">
                            <label className="text-xs text-slate-500 block mb-1 font-bold">PRODUCT FOTO</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setAfbeelding(e.target.files[0])}
                                className="text-xs w-full file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                            />
                        </div>
                        <div className="border border-slate-200 rounded-xl px-4 py-3 bg-white">
                            <label className="text-xs text-slate-500 block mb-1 font-bold">BESTAND (PDF/ZIP)</label>
                            <input
                                type="file"
                                onChange={(e) => setDownloadBestand(e.target.files[0])}
                                className="text-xs w-full file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                            />
                        </div>
                    </div>
                    <button
                        onClick={voegToe}
                        className="bg-[#263759] text-white font-bold px-6 py-4 rounded-full hover:bg-red-500 transition w-full shadow-lg shadow-blue-900/10"
                    >
                        Product Toevoegen
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="font-bold text-xl text-[#263759] mb-4">Producten Beheren</h2>
                {producten.length === 0 && <p className="text-slate-400">Geen producten gevonden.</p>}
                {producten.map((p) => (
                    <motion.div
                        key={p.id}
                        className="flex justify-between items-center bg-white border border-slate-100 rounded-2xl px-6 py-4 shadow-sm hover:border-slate-200 transition"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center gap-4">
                            {p.afbeelding ? (
                                <img src={p.afbeelding} className="w-12 h-12 rounded-xl object-cover bg-slate-100" />
                            ) : (
                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                                    Geen
                                </div>
                            )}
                            <div>
                                <p className="font-black text-[#263759] leading-tight">{p.naam}</p>
                                <p className="text-slate-400 text-sm">
                                    €{p.prijs}{" "}
                                    {p.download_url && <span className="ml-2 text-green-500 text-xs">✓ Bestand</span>}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                if (confirm("Zeker weten?")) verwijder(p.id);
                            }}
                            className="text-xs text-red-500 hover:bg-red-50 font-bold px-4 py-2 rounded-full border border-red-100 transition"
                        >
                            Verwijderen
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
