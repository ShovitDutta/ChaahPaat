const palette = { bg: "#F2F8F0", card: "#E0EBD0", squircle: "#CDE0B4", accent: "#88B04B", dark: "#203015", shadow: "#152010" };
export function Squircle(props: {
    children: React.ReactNode;
    className?: string;
    innerClassName?: string;
    backgroundColor?: string;
    ariaLabel?: string;
    id?: string;
    maxWidth?: string;
}) {
    const {
        children,
        className = "",
        innerClassName = "",
        backgroundColor = palette.squircle,
        ariaLabel,
        id,
        maxWidth = "max-w-6xl",
    } = props;
    return (
        <section className={`relative w-full ${className}`} aria-label={ariaLabel} id={id} style={{ backgroundColor: backgroundColor, borderRadius: "2rem" }}>
            <div className={`relative mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 ${maxWidth} ${innerClassName}`} style={{ minHeight: 120 }}>
                {children}
            </div>
        </section>
    );
}