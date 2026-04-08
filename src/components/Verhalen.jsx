import { motion } from "framer-motion";
import { User } from "lucide-react";

const verhalen = [
    {
        quote: "Ik dacht dat ik alles onder controle had. Totdat ik merkte dat ik het nodig had om me een houding te geven.",
        naam: "Lisa, 22",
        rol: "Baliemedewerkster bedrijf X.",
    },
    {
        quote: "Met feestjes en TikTok, leek er een constante stroom van druk en vergelijking op de achtergrond.",
        naam: "Daan, 19",
        rol: "Student",
    },
    {
        quote: "Mijn vrienden merken dat ik veranderd ben. Maar ik voelde het zelf al veel eerder.",
        naam: "Moussa, 21",
        rol: "Ondernemer",
    },
];

export default function Verhalen() {
    return (
        <section className="bg-[#263759] py-20 md:py-32 px-6 rounded-t-4xl md:rounded-t-[3rem]" id="verhalen">
            <motion.div
                className="max-w-4xl mx-auto text-center text-white mb-12 md:mb-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span className="text-[#e11d48] font-bold text-xs uppercase tracking-widest">Verhalen</span>
                <h2 className="text-4xl md:text-5xl font-black mt-4 italic">Herken je dit?</h2>
            </motion.div>

            <div className="max-w-5xl mx-auto space-y-6">
                {verhalen.map((v, i) => (
                    <motion.div
                        key={v.naam}
                        className="bg-white p-8 md:p-10 rounded-4xl md:rounded-[2.5rem] flex flex-col md:flex-row items-start md:items-center shadow-xl"
                        initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                    >
                        <div className="flex-1 text-lg md:text-xl font-semibold text-slate-700 leading-snug">
                            "{v.quote}"
                        </div>
                        <div className="mt-6 md:mt-0 md:ml-12 flex items-center gap-4 md:border-l border-slate-100 md:pl-8 min-w-50">
                            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-xl">
                                <User strokeWidth={3} />
                            </div>
                            <div>
                                <div className="font-black text-slate-900 leading-none">{v.naam}</div>
                                <div className="text-[10px] text-slate-400 uppercase font-bold mt-1 tracking-tighter">
                                    {v.rol}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
