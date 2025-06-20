export function generateRandomColor(): string {
  const colors = [
    "#ff6b6b", // Red
    "#4ecdc4", // Teal
    "#45b7d1", // Blue
    "#96ceb4", // Green
    "#feca57", // Yellow
    "#ff9ff3", // Pink
    "#54a0ff", // Light Blue
    "#5f27cd", // Purple
    "#00d2d3", // Cyan
    "#ff9f43", // Orange
    "#10ac84", // Emerald
    "#ee5a24", // Dark Orange
    "#575fcf", // Indigo
    "#0abde3", // Sky Blue
    "#48dbfb", // Light Cyan
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}

export function generateRandomColorWithOpacity(opacity: number = 1): string {
  const color = generateRandomColor();
  if (opacity === 1) return color;

  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function generateRandomColorFromPalette(palette: string[]): string {
  return palette[Math.floor(Math.random() * palette.length)];
}
