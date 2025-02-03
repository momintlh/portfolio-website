import GlassCard from "./GlassCards";

interface CardProps {
    title: string;
    description: string;
    rotation: string;
    cardId: number;
}

function CardWithGradientBorder(props: CardProps) {
    return (
        <div
            className="rounded-2xl p-[3px] inline-block" // Adjust padding for border thickness
            style={{
                // This background uses three radial gradients.
                background: `
          radial-gradient(circle at top left, #ff7e5f, transparent 70%),
          radial-gradient(circle at top right, #feb47b, transparent 70%),
          radial-gradient(circle at bottom, #86A8E7, transparent 70%)
        `,
            }}
        >
            <GlassCard {...props} />
        </div>
    );
}

export default CardWithGradientBorder;
