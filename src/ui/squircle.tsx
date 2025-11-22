const palette = { bg: "#FCFDF5", card: "#EFF5E6", squircle: "#D6E8C6", accent: "#7FA850", dark: "#2A3820", shadow: "#1C2615" };
export function Squircle(props: {
    children: React.ReactNode;
    className?: string;
    innerClassName?: string;
    backgroundColor?: string;
    ariaLabel?: string;
    id?: string;
}) {
    const {
        children,
        className = "",
        innerClassName = "",
        backgroundColor = palette.squircle,
        ariaLabel,
        id,
    } = props;
    return (
        <section className={`relative w-full ${className}`} aria-label={ariaLabel} id={id} style={{ backgroundColor: backgroundColor, borderRadius: "2rem" }}>
            <div className={`relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 ${innerClassName}`} style={{ minHeight: 120 }}>
                {children}
            </div>
        </section>
    );
}