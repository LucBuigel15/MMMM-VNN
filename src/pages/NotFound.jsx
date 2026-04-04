export default function NotFound() {
    return (
        <div className="px-6 text-center flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-6xl font-black text-[#263759] italic mb-4">Error 404</h1>
            <p className="text-slate-400 mb-8">Deze pagina bestaat niet.</p>
            <a
                href="/"
                className="bg-[#263759] text-white font-bold px-6 py-3 rounded-full hover:bg-red-500 transition"
            >
                Terug naar home
            </a>
        </div>
    );
}
