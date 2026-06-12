export default function Footer() {
    const columns = [
        {
            title: "Shop",
            links: ["Chikankari Suits", "Women Kurtis", "Sarees", "Lehengas", "Dupattas", "Sale"],
        },
        {
            title: "Help",
            links: ["Track My Order", "Returns & Exchange", "Sizing Guide", "FAQs", "Contact Us"],
        },
        {
            title: "Company",
            links: ["About Husnya", "Our Craft", "Blog", "Careers", "Privacy Policy"],
        },
    ];

    return (
        <footer className="bg-stone-900 text-stone-400 font-sans">

            {/* ── MAIN FOOTER GRID ── */}
            <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">

                {/* Brand Column */}
                <div className="col-span-2 md:col-span-1">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">🪡</span>
                        <span className="text-white text-xl font-serif font-bold tracking-tight">Husnya</span>
                    </div>
                    <p className="text-xs leading-relaxed mb-5 text-stone-500">
                        Authentic Lucknawi Chikankari & curated ethnic fashion — handcrafted with love from the heart of India.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-3">
                        {[
                            { label: "Instagram", path: "M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75z" },
                            { label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                            { label: "Pinterest", path: "M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.565 0-2.386-1.716-4.054-4.165-4.054-2.837 0-4.502 2.128-4.502 4.328 0 .857.33 1.776.742 2.279a.3.3 0 0 1 .069.285c-.076.313-.244.995-.277 1.134-.044.183-.145.222-.334.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.967-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" },
                        ].map((s) => (
                            <a key={s.label} href="#" aria-label={s.label}
                                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-rose-700 flex items-center justify-center transition">
                                <svg className="w-4 h-4 text-stone-400 hover:text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={s.path} />
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Nav Columns */}
                {columns.map((col) => (
                    <div key={col.title}>
                        <div className="text-white font-semibold uppercase tracking-wider text-xs mb-4">{col.title}</div>
                        <ul className="space-y-2.5">
                            {col.links.map((l) => (
                                <li key={l}>
                                    <a href="#" className="hover:text-rose-400 transition text-xs">{l}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* ── TRUST BADGES ── */}
            <div className="border-t border-stone-800">
                <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap justify-center gap-8 text-xs text-stone-500">
                    {[
                        { icon: "🔒", label: "Secure Payments" },
                        { icon: "🚚", label: "Fast Delivery" },
                        { icon: "↩️", label: "Easy Returns" },
                        { icon: "🌸", label: "100% Authentic" },
                        { icon: "💬", label: "24/7 Support" },
                    ].map((b) => (
                        <div key={b.label} className="flex items-center gap-1.5">
                            <span>{b.icon}</span>
                            <span>{b.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── BOTTOM BAR ── */}
            <div className="border-t border-stone-800 text-center py-4 text-xs text-stone-600">
                © {new Date().getFullYear()} <span className="text-stone-400 font-semibold">Husnya</span>. All rights reserved. Made with ❤️ in India.
            </div>
        </footer>
    );
}