interface ColorBar {
  id: string;
  color: string;
}

const COLOR_BARS: ColorBar[] = [
  { id: "b", color: "#2980b9" },
  { id: "g", color: "#27ae60" },
  { id: "r", color: "#c0392b" },
];

interface ColorBarsProps {
  onHover: (color: string) => void;
  onLeave: () => void;
}

export default function ColorBars({ onHover, onLeave }: ColorBarsProps) {
  return (
    <>
      <div className="gradient-bar" />
      {COLOR_BARS.map((bar) => (
        <div
          key={bar.id}
          className="colors"
          id={bar.id}
          onMouseEnter={() => onHover(bar.color)}
          onMouseLeave={onLeave}
        />
      ))}
    </>
  );
}
