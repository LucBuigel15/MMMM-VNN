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
            </header>
        </>
    );
}
