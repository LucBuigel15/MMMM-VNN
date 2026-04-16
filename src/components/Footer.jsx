import { Mail, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-[#263759] text-white px-6 py-16 mt-20">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <a href="/">
                        <div className="font-bold text-lg tracking-tighter italic mb-4">
                            MINDER<span className="text-slate-400">MIDDELEN</span>
                        </div>
                    </a>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        ( Hier moet tekst komen, maar ik heb geen idee wat ik hier kan neerzetten )
                    </p>
                </div>

                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Navigatie</h4>
                    <ul className="space-y-3 text-sm font-medium">
                        <li>
                            <a href="/#verhalen" className="hover:text-red-400 transition">
                                Verhalen
                            </a>
                        </li>
                        <li>
                            <Link to="/producten" className="hover:text-red-400 transition">
                                Producten
                            </Link>
                        </li>
                        <li>
                            <a href="/#contact" className="hover:text-red-400 transition">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Contact</h4>
                    <ul className="space-y-3 text-sm font-medium">
                        <li>
                            <a
                                href="https://todo:linknaarvnn"
                                className="flex items-center gap-2 hover:text-red-400 transition"
                            >
                                <MessageCircle size={16} strokeWidth={2.5} /> Chatten
                            </a>
                        </li>
                        <li>
                            <a
                                href="tel:+31612345678"
                                className="flex items-center gap-2 hover:text-red-400 transition"
                            >
                                <Phone size={16} strokeWidth={2.5} /> Bellen
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:info@mindermiddelen.nl"
                                className="flex items-center gap-2 hover:text-red-400 transition"
                            >
                                <Mail size={16} strokeWidth={2.5} /> Mailen
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-5xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
                <p>© {new Date().getFullYear()} MinderMiddelen. Alle rechten voorbehouden.</p>
            </div>
        </footer>
    );
}
