import { motion } from "framer-motion";

export default function Hero() {
    return (
        <>
            <header className="relative min-h-screen flex flex-col justify-center overflow-hidden">
                <motion.div
                    className="absolute w-full h-full z-0 flex items-center justify-center"
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <img
                        src="/img/hero-banner-pc.png"
                        alt="hero-banner"
                        className="hidden md:block w-full object-cover"
                    />
                    <img
                        src="/img/hero-banner-phone.png"
                        alt="hero-banner-mobile"
                        className="block md:hidden w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white" />
                </motion.div>

                <motion.a
                    href="#stilstaan"
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-black hover:text-red-400 transition duration-200 animate-bounce drop-shadow-lg"
                    >
                        <path d="M12 5v14" />
                        <path d="m19 12-7 7-7-7" />
                    </svg>
                </motion.a>
            </header>
        </>
    );
}
