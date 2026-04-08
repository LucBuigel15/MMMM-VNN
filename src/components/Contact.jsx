import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";

const opties = [
    { icon: <MessageCircle strokeWidth={3} />, label: "Chatten", link: "https://todo:linknaarvnn" },
    { icon: <Phone strokeWidth={3} />, label: "Bellen", link: "tel:+0882343434" },
    { icon: <Mail strokeWidth={3} />, label: "Mailen", link: "mailto:info@example.com" },
];

export default function Contact() {
    return (
        <section className="py-20 md:py-32 text-center px-6" id="contact">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl md:text-5xl font-black text-[#263759] italic">Wil je erover praten?</h2>
                <p className="text-slate-500 mt-6 max-w-xl mx-auto text-lg font-medium">
                    Je kunt met ons chatten of bellen. Anoniem, zonder oordeel, gewoon direct.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
                {opties.map((o, i) => (
                    <motion.a
                        key={o.label}
                        href={o.link}
                        className="p-10 border border-slate-100 rounded-4xl hover:shadow-2xl transition-all bg-slate-50/50 group cursor-pointer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        whileHover={{ scale: 1.03 }}
                    >
                        <div className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-6 text-3xl group-hover:scale-110 transition-transform">
                            {o.icon}
                        </div>
                        <h3 className="font-black text-xl italic uppercase tracking-tighter">{o.label}</h3>
                    </motion.a>
                ))}
            </div>
        </section>
    );
}
