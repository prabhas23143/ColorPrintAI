import React from 'react';
import { RefreshCw, Download, Palette, Edit3, AlertCircle } from 'lucide-react';
import { ColoringPage } from '../types/coloring';

interface Props {
  page: ColoringPage;
  onColor: (page: ColoringPage) => void;
  onEdit: (page: ColoringPage) => void;
  onRegenerate: (page: ColoringPage) => void;
  borderStyle: 'classic' | 'dots' | 'corner' | 'minimal' | 'none';
}

export const PageCard: React.FC<Props> = ({
  page,
  onColor,
  onEdit,
  onRegenerate,
  borderStyle,
}) => {
  const handleDownloadSingle = () => {
    if (page.imageUrl) {
      const link = document.createElement('a');
      link.href = page.imageUrl;
      link.download = `${page.title.replace(/\s+/g, '_')}_A4.png`;
      link.click();
    } else if (page.svgContent) {
      const blob = new Blob([page.svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${page.title.replace(/\s+/g, '_')}_A4.svg`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const getBorderClasses = () => {
    switch (borderStyle) {
      case 'classic':
        return 'border-2 border-stone-900';
      case 'dots':
        return 'border-2 border-dashed border-stone-900';
      case 'corner':
        return 'border border-stone-300 ring-2 ring-stone-900 ring-inset';
      case 'minimal':
        return 'border border-stone-200';
      case 'none':
      default:
        return 'border border-transparent';
    }
  };

  return (
    <div className="group relative flex flex-col rounded-3xl bg-white p-4 shadow-md transition-all hover:shadow-xl border border-stone-200/90">
      {/* Top Header Row */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-100 text-xs font-bold text-amber-800">
            {page.pageNumber}
          </span>
          <h3 className="font-display font-bold text-stone-800 text-sm truncate max-w-[180px]" title={page.title}>
            {page.title}
          </h3>
        </div>
        <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-500">
          A4 Portrait
        </span>
      </div>

      {/* Main A4 Printable Paper Canvas Container */}
      <div className="relative mt-3 flex aspect-a4 w-full flex-col justify-between overflow-hidden rounded-2xl bg-white p-3 shadow-inner border border-stone-200/70">
        {/* Decorative Internal Page Border */}
        <div className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl bg-white p-2.5 ${getBorderClasses()}`}>
          {/* Internal Sheet Header */}
          <div className="flex items-center justify-between border-b border-stone-200 pb-1 text-[10px] text-stone-500">
            <span className="font-bold text-stone-700 truncate max-w-[140px]">{page.title}</span>
            <span className="font-mono">Page {page.pageNumber}</span>
          </div>

          {/* Central Artwork */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden my-1">
            {page.isGenerating ? (
              <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                <div className="relative flex h-12 w-12 items-center justify-center">
                  <div className="absolute h-12 w-12 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin" />
                  <span className="text-lg">✏️</span>
                </div>
                <p className="font-display text-xs font-bold text-stone-700">Drawing outlines...</p>
                <p className="text-[10px] text-stone-400 max-w-[140px] line-clamp-2">{page.subject}</p>
              </div>
            ) : page.error ? (
              <div className="flex flex-col items-center justify-center gap-2 p-4 text-center text-rose-500">
                <AlertCircle className="h-6 w-6" />
                <p className="text-xs font-semibold">Generation Notice</p>
                <p className="text-[10px] text-stone-500">{page.error}</p>
                <button
                  onClick={() => onRegenerate(page)}
                  className="mt-1 rounded-lg bg-stone-100 px-2.5 py-1 text-[11px] font-bold text-stone-700 hover:bg-stone-200"
                >
                  Try Again
                </button>
              </div>
            ) : page.imageUrl ? (
              <img
                src={page.imageUrl}
                alt={page.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain filter contrast-125"
              />
            ) : page.svgContent ? (
              <div
                className="h-full w-full flex items-center justify-center [&>svg]:h-full [&>svg]:w-full [&>svg]:object-contain"
                dangerouslySetInnerHTML={{ __html: page.svgContent }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-stone-400">
                <p className="text-xs">No artwork rendered yet</p>
              </div>
            )}
          </div>

          {/* Sheet Educational Caption Footer */}
          {page.educationalCaption && (
            <div className="border-t border-stone-200 pt-1 text-center">
              <p className="font-serif italic text-[9px] text-stone-600 line-clamp-2 leading-tight">
                "{page.educationalCaption}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-3 flex items-center justify-between gap-1 pt-1">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onColor(page)}
            disabled={page.isGenerating}
            className="flex items-center gap-1 rounded-xl bg-amber-50 px-2.5 py-1.5 text-xs font-bold text-amber-700 hover:bg-amber-100 transition"
            title="Color digitally in browser"
          >
            <Palette className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Color</span>
          </button>
          <button
            onClick={() => onEdit(page)}
            className="flex items-center gap-1 rounded-xl bg-stone-100 px-2.5 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-200 transition"
            title="Edit scene description or prompt"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onRegenerate(page)}
            disabled={page.isGenerating}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 transition disabled:opacity-50"
            title="Regenerate this page with a new variation"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${page.isGenerating ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleDownloadSingle}
            disabled={page.isGenerating}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 transition"
            title="Download individual A4 image file"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
