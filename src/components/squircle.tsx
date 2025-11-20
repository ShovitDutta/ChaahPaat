const palette = { bg: "#FFFFFF", card: "#E8F5E0", squircle: "#D9F0CC", accent: "#A8D88A", dark: "#1D1A05", shadow: "#142506" };
export function Squircle({
    children,
    className = "",
    innerClassName = "",
    ariaLabel,
    id,
}: {
    children: React.ReactNode;
    className?: string;
    innerClassName?: string;
    ariaLabel?: string;
    id?: string;
}) {
    return (
        <section className={`relative w-full ${className}`} aria-label={ariaLabel} id={id} style={{ backgroundColor: palette.squircle, borderRadius: "2rem", border: `3px solid ${palette.dark}15` }}>
            <div className={`relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 ${innerClassName}`} style={{ minHeight: 120 }}>
                {children}
            </div>
        </section>
    );
}
