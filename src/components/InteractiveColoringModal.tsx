import React, { useRef, useState, useEffect, useCallback } from 'react';
import { X, Undo, Download, Eraser, Paintbrush, RotateCcw } from 'lucide-react';
import { ColoringPage } from '../types/coloring';

interface Props {
  page: ColoringPage;
  onClose: () => void;
}

const CRAYON_PALETTE = [
  '#FF3B30', // Red
  '#FF9500', // Orange
  '#FFCC00', // Yellow
  '#34C759', // Green
  '#00C7BE', // Teal
  '#30B0C7', // Sky
  '#007AFF', // Blue
  '#5856D6', // Indigo
  '#AF52DE', // Purple
  '#FF2D55', // Pink
  '#A2845E', // Brown
  '#8E8E93', // Gray
  '#000000', // Black
  '#FFFFFF', // White / Eraser
];

export const InteractiveColoringModal: React.FC<Props> = ({ page, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#FF3B30');
  const [brushSize, setBrushSize] = useState<number>(14);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const historyRef = useRef<ImageData[]>([]);
  const [canUndo, setCanUndo] = useState<boolean>(false);

  // Initialize canvas with blank page art
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const baseImg = new Image();
    baseImg.crossOrigin = 'anonymous';

    const renderArt = (src: string) => {
      baseImg.onload = () => {
        // A4 ratio 600 x 848
        canvas.width = 600;
        canvas.height = 848;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);
        // Save initial state
        const initialData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        historyRef.current = [initialData];
        setCanUndo(false);
      };
      baseImg.src = src;
    };

    if (page.imageUrl) {
      renderArt(page.imageUrl);
    } else if (page.svgContent) {
      const blob = new Blob([page.svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      renderArt(url);
    }
  }, [page]);

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const state = ctx.getImageData(0, 0, canvas.width, canvas.height);
    historyRef.current.push(state);
    if (historyRef.current.length > 20) {
      historyRef.current.shift();
    }
    setCanUndo(true);
  }, []);

  const handleUndo = () => {
    if (historyRef.current.length <= 1) return;
    historyRef.current.pop(); // Remove current state
    const previous = historyRef.current[historyRef.current.length - 1];
    const canvas = canvasRef.current;
    if (!canvas || !previous) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.putImageData(previous, 0, 0);
    setCanUndo(historyRef.current.length > 1);
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveState();
    setIsDrawing(true);
    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isEraser ? '#FFFFFF' : selectedColor;
    ctx.lineWidth = brushSize;
    // Semitransparent crayon multiply mode so black outlines stay crisp!
    ctx.globalCompositeOperation = isEraser ? 'source-over' : 'multiply';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.closePath();
    ctx.globalCompositeOperation = 'source-over';
  };

  const handleDownloadColored = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${page.title.replace(/\s+/g, '_')}_Colored.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 p-4 backdrop-blur-sm">
      <div className="relative flex max-h-[95vh] w-full max-w-4xl flex-col rounded-3xl bg-white shadow-2xl overflow-hidden border border-stone-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-stone-200 bg-amber-50/60 px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-sm font-display text-lg font-bold">
              🎨
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-stone-900 leading-tight">
                Digital Coloring Studio
              </h2>
              <p className="text-xs text-stone-500">{page.title} • A4 Preview Canvas</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleUndo}
              disabled={!canUndo}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                canUndo
                  ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  : 'bg-stone-100/50 text-stone-400 cursor-not-allowed'
              }`}
              title="Undo stroke"
            >
              <Undo className="h-3.5 w-3.5" />
              Undo
            </button>
            <button
              onClick={handleDownloadColored}
              className="flex items-center gap-1.5 rounded-xl bg-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-amber-700 transition"
            >
              <Download className="h-3.5 w-3.5" />
              Save Artwork
            </button>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Studio Workspace */}
        <div className="flex flex-1 flex-col md:flex-row overflow-hidden bg-stone-100">
          {/* Canvas Center Stage */}
          <div className="flex flex-1 items-center justify-center overflow-auto p-4">
            <div className="relative aspect-a4 max-h-[70vh] rounded-xl bg-white shadow-lg border border-stone-300 overflow-hidden">
              <canvas
                ref={canvasRef}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={stopDraw}
                onMouseLeave={stopDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={stopDraw}
                className="h-full w-full touch-none cursor-crosshair object-contain bg-white"
              />
            </div>
          </div>

          {/* Crayon Tools Palette */}
          <div className="flex w-full md:w-64 flex-col gap-4 border-t md:border-t-0 md:border-l border-stone-200 bg-white p-4">
            {/* Tool Selection */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Tool</span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsEraser(false)}
                  className={`flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold transition ${
                    !isEraser
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <Paintbrush className="h-4 w-4" />
                  Crayon Brush
                </button>
                <button
                  onClick={() => setIsEraser(true)}
                  className={`flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold transition ${
                    isEraser
                      ? 'bg-stone-800 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <Eraser className="h-4 w-4" />
                  Eraser
                </button>
              </div>
            </div>

            {/* Brush Size Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-stone-600">
                <span>Brush Size</span>
                <span>{brushSize}px</span>
              </div>
              <input
                type="range"
                min="4"
                max="36"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="mt-2 w-full accent-amber-500"
              />
            </div>

            {/* Crayon Color Swatches */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Color Palette</span>
              <div className="mt-2 grid grid-cols-5 gap-2">
                {CRAYON_PALETTE.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setSelectedColor(color);
                      setIsEraser(false);
                    }}
                    style={{ backgroundColor: color }}
                    className={`h-9 w-9 rounded-full border-2 transition transform hover:scale-110 active:scale-95 shadow-sm ${
                      selectedColor === color && !isEraser
                        ? 'border-amber-600 ring-2 ring-amber-300 ring-offset-2'
                        : 'border-white'
                    }`}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Tip note */}
            <div className="mt-auto rounded-2xl bg-amber-50 p-3 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
              <span className="font-bold">💡 Coloring Tip:</span> Outlines stay crisp as you color underneath! When satisfied, export to PDF or print out blank pages for real crayons.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
