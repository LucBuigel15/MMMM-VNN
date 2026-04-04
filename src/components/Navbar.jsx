import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <motion.div
                className="sticky top-6 left-0 right-0 z-50 px-4"
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <nav className="max-w-5xl mx-auto bg-[#263759] py-3 px-6 md:px-8 flex justify-between items-center rounded-full shadow-2xl">
                    <a href="/">
                        <div className="font-bold text-sm md:text-lg tracking-tighter italic text-white">
                            MINDER<span className="text-slate-400">MIDDELEN</span>
                        </div>
                    </a>
                    <div className="hidden md:flex space-x-8 text-[12px] font-bold text-white/90 uppercase tracking-widest">
                        <a href="#" className="hover:text-red-400 transition">
                            Over ons
                        </a>
                        <a href="/#verhalen" className="hover:text-red-400 transition">
                            Verhalen
                        </a>
                        <Link to="/producten" className="hover:text-red-400 transition">
                            Producten
                        </Link>
                        <a href="/#contact" className="hover:text-red-400 transition">
                            Contact
                        </a>
                    </div>

                    <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)}>
                        <motion.span
                            className="block w-5 h-0.5 bg-white"
                            animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.span
                            className="block w-5 h-0.5 bg-white"
                            animate={open ? { opacity: 0 } : { opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.span
                            className="block w-5 h-0.5 bg-white"
                            animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.2 }}
                        />
                    </button>
                </nav>

                {/* Mobile menu dropdown */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            className="md:hidden mt-2 max-w-5xl mx-auto bg-[#263759] rounded-2xl shadow-2xl overflow-hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {["Over ons", "Verhalen", "Producten", "Contact"].map((item, i) => (
                                <motion.a
                                    key={item}
                                    href={
                                        item === "Verhalen"
                                            ? "#verhalen"
                                            : item === "Producten"
                                              ? "/producten"
                                              : item === "Contact"
                                                ? "#contact"
                                                : "#"
                                    }
                                    className="block px-8 py-4 text-white/90 font-bold text-sm uppercase tracking-widest hover:text-red-400 hover:bg-white/5 transition border-b border-white/10 last:border-0"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => setOpen(false)}
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
