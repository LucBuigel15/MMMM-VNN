import Hero from "../components/Hero";
import Stilstaan from "../components/Stilstaan";
import Verhalen from "../components/Verhalen";
import Contact from "../components/Contact";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
    const { hash } = useLocation();

    useEffect(() => {
        if (!hash) return;
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    }, [hash]);

    return (
        <>
            <Hero />
            <Stilstaan />
            <Verhalen />
            <Contact />
        </>
    );
}
