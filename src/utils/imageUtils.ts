
export const downloadCanvasImage = (
  canvas: HTMLCanvasElement | null, 
  onSuccess: () => void,
  onError: () => void
) => {
  if (!canvas) return;
  
  try {
    const link = document.createElement('a');
    link.download = `edited-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    onSuccess();
  } catch (err) {
    onError();
  }
};

// Apply filter with intensity to an image
export const applyFilter = (filter: string, intensity: number): string => {
  switch(filter) {
    case 'brightness':
      return `brightness(${intensity}%)`;
    case 'saturation':
      return `saturate(${intensity}%)`;
    case 'inversion':
      // Convert intensity from 0-200 range to 0-1 range for inversion
      return `invert(${intensity / 200})`;
    case 'grayscale':
      // Convert intensity from 0-200 range to 0-1 range for grayscale
      return `grayscale(${intensity / 200})`;
    default:
      return '';
  }
};
