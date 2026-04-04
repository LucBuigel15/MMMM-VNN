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
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setLoginError(error.message);
        else {
            setLoginError("");
            setUser(data.user);
            fetchProducten();
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
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

    if (loading) return <div className="p-20 text-center">Laden...</div>;

    if (!user) {
        return (
            <div className="max-w-md mx-auto px-6 py-20 text-center">
                <h1 className="text-3xl font-black text-[#263759] italic mb-8">Admin Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Wachtwoord"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {loginError && (
                        <p className="text-red-500 text-sm font-semibold bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-left">
                            E-Mail of wachtwoord is niet goed.
                        </p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-[#263759] text-white font-bold py-3 rounded-full hover:bg-red-500 transition"
                    >
                        Log in
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-black text-[#263759] italic">Admin</h1>
                <button
                    onClick={handleLogout}
                    className="text-sm font-bold text-red-500 border border-red-500 px-4 py-2 rounded-full hover:bg-red-50"
                >
                    Uitloggen
                </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 mb-16 space-y-4">
                <h2 className="font-bold text-lg text-[#263759]">Product toevoegen</h2>
                {["naam", "beschrijving", "prijs"].map((veld) => (
                    <input
                        key={veld}
                        placeholder={veld}
                        value={form[veld]}
                        onChange={(e) => setForm({ ...form, [veld]: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm"
                    />
                ))}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-slate-200 rounded-xl px-4 py-3 bg-white">
                        <label className="text-xs text-slate-500 block mb-1">Product Foto</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setAfbeelding(e.target.files[0])}
                            className="text-sm w-full"
                        />
                    </div>
                    <div className="border border-slate-200 rounded-xl px-4 py-3 bg-white">
                        <label className="text-xs text-slate-500 block mb-1">Download Bestand (PDF, ZIP, etc.)</label>
                        <input
                            type="file"
                            onChange={(e) => setDownloadBestand(e.target.files[0])}
                            className="text-sm w-full"
                        />
                    </div>
                </div>

                <button
                    onClick={voegToe}
                    className="bg-[#263759] text-white font-bold px-6 py-3 rounded-full hover:bg-red-500 transition w-full"
                >
                    Toevoegen
                </button>
            </div>

            <div className="space-y-4">
                <h2 className="font-bold text-lg text-[#263759]">Producten beheren</h2>
                {producten.map((p) => (
                    <motion.div
                        key={p.id}
                        className="flex justify-between items-center bg-white border border-slate-100 rounded-2xl px-6 py-4 shadow-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-4">
                            {p.afbeelding && <img src={p.afbeelding} className="w-12 h-12 rounded-xl object-cover" />}
                            <div>
                                <p className="font-black text-[#263759]">{p.naam}</p>
                                <p className="text-slate-400 text-sm">
                                    €{p.prijs} {p.download_url && "• Bestand gekoppeld"}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => verwijder(p.id)}
                            className="text-xs text-white bg-red-500 hover:bg-red-600 font-bold px-4 py-2 rounded-full transition"
                        >
                            Verwijderen
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
