import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
};

export default function Stilstaan() {
    const vragen = [
        {
            kleur: "bg-amber-400",
            vraag: "Hoe gaat het echt met je vandaag?",
            antwoord: "Inzicht krijgen in je eigen gevoel is de eerste stap naar balans.",
            open: true,
        },
        {
            kleur: "bg-sky-400",
            vraag: "Vind je het lastig om nee te zeggen tegen anderen?",
            antwoord: "Sociale druk kan zwaar wegen. We bespreken hoe je bij jezelf blijft.",
            open: false,
        },
        {
            kleur: "bg-sky-400",
            vraag: "Vind je het lastig om nee te zeggen tegen anderen?",
            antwoord: "Sociale druk kan zwaar wegen. We bespreken hoe je bij jezelf blijft.",
            open: false,
        },
    ];

    return (
        <section className="py-16 md:py-24 max-w-4xl mx-auto px-6" id="stilstaan">
            <motion.div
                className="text-center mb-12 md:mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span className="text-[#e11d48] font-bold text-xs uppercase tracking-[0.4em]">Waarom Nu?</span>
                <h2 className="text-4xl md:text-5xl font-extrabold mt-4 text-[#263759] italic">Even stilstaan</h2>
                <p className="text-slate-500 mt-5 text-lg">
                    Soms is het goed om je af te vragen hoe je er echt voor staat.
                </p>
            </motion.div>

            <div className="space-y-4">
                {vragen.map((v, i) => (
                    <motion.details
                        key={v.vraag}
                        className="group border border-slate-100 rounded-2xl bg-white shadow-sm overflow-hidden"
                        open={v.open}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <summary className="flex justify-between items-center p-5 md:p-6 cursor-pointer list-none font-bold text-slate-800 text-base md:text-lg">
                            <span className="flex items-center gap-4">
                                <span className={`w-3 h-3 shrink-0 rounded-full ${v.kleur}`}></span>
                                {v.vraag}
                            </span>
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="px-12 md:px-14 pb-6 text-slate-500 text-sm md:text-base">{v.antwoord}</div>
                    </motion.details>
                ))}
            </div>
        </section>
    );
}
