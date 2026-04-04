import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";

export default function Producten() {
    const [producten, setProducten] = useState([]);

    useEffect(() => {
        const fetchProducten = async () => {
            const { data } = await supabase.from("producten").select("*");
            setProducten(data ?? []);
        };
        fetchProducten();
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-black text-[#263759] italic mb-12">Producten</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {producten.map((p, i) => (
                    <motion.div
                        key={p.id}
                        className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        {p.afbeelding && <img src={p.afbeelding} alt={p.naam} className="w-full h-48 object-cover" />}
                        <div className="p-6">
                            <h3 className="font-black text-[#263759] text-lg">{p.naam}</h3>
                            <p className="text-slate-500 text-sm mt-1">{p.beschrijving}</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="font-bold text-red-500">€{p.prijs}</span>
                                <div className="flex gap-2">
                                    {p.download_url && (
                                        <a
                                            href={p.download_url}
                                            download
                                            className="bg-[#263759] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-red-500 transition"
                                        >
                                            Download
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
