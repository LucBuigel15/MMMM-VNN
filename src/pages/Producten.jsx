import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function Producten() {
    const [producten, setProducten] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const fetchProducten = async () => {
            const { data } = await supabase.from("producten").select("*");
            setProducten(data ?? []);
        };
        fetchProducten();
    }, []);

    const handleDownload = async (e, url, filename) => {
        e.stopPropagation();
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = filename || "download";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error(error);
            window.open(url, "_blank");
        }
    };

    const selected = producten.find((p) => p.id === selectedId);

    return (
        <div className="max-w-5xl mx-auto px-6 py-20 mt-10">
            <h1 className="text-4xl font-black text-[#263759] italic mb-12">Producten</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {producten.map((p, i) => (
                    <motion.div
                        key={p.id}
                        layoutId={`card-${p.id}`}
                        className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden cursor-pointer flex flex-col"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setSelectedId(p.id)}
                    >
                        {p.afbeelding && (
                            <motion.img
                                layoutId={`img-${p.id}`}
                                src={p.afbeelding}
                                alt={p.naam}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="p-6 flex flex-col grow">
                            <motion.h3 layoutId={`naam-${p.id}`} className="font-black text-[#263759] text-lg">
                                {p.naam}
                            </motion.h3>
                            <p className="text-slate-500 text-sm mt-1 line-clamp-2">{p.beschrijving}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && selected && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                        />

                        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
                            <motion.div
                                layoutId={`card-${selected.id}`}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-lg pointer-events-auto"
                            >
                                {selected.afbeelding && (
                                    <motion.img
                                        layoutId={`img-${selected.id}`}
                                        src={selected.afbeelding}
                                        alt={selected.naam}
                                        className="w-full max-h-80 object-contain bg-slate-50"
                                    />
                                )}
                                <div className="p-8">
                                    <motion.h3
                                        layoutId={`naam-${selected.id}`}
                                        className="font-black text-[#263759] text-2xl mb-3"
                                    >
                                        {selected.naam}
                                    </motion.h3>
                                    <p className="text-slate-500 text-base leading-relaxed">{selected.beschrijving}</p>
                                    <div className="flex justify-between items-center mt-6">
                                        <div className="flex gap-3">
                                            {selected.download_url && (
                                                <button
                                                    onClick={(e) =>
                                                        handleDownload(e, selected.download_url, selected.naam)
                                                    }
                                                    className="bg-[#263759] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-red-500 transition"
                                                >
                                                    Download
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setSelectedId(null)}
                                                className="border border-slate-200 text-slate-500 text-sm font-bold px-5 py-2.5 rounded-full hover:bg-slate-50 transition"
                                            >
                                                Sluiten
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
