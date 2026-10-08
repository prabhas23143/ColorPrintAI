import React from 'react';
import { Printer, FileDown, Sparkles } from 'lucide-react';
import { ColoringPage } from '../types/coloring';

interface Props {
  pages: ColoringPage[];
  onExportPdf: () => void;
  onPrint: () => void;
  isExportingPdf: boolean;
  exportStepText?: string;
  exportPercent?: number;
}

export const Header: React.FC<Props> = ({
  pages,
  onExportPdf,
  onPrint,
  isExportingPdf,
  exportStepText,
  exportPercent,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-amber-200/60 bg-amber-50/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20 font-display text-xl font-bold">
            🎨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl font-extrabold tracking-tight text-stone-900 sm:text-2xl">
                ColorCraft
              </h1>
              <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-500/20">
                A4 Studio
              </span>
            </div>
            <p className="hidden text-xs text-stone-500 sm:block">
              Printable AI Coloring Book Generator • Standard Grade Adaptive
            </p>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Print Button */}
          <button
            onClick={onPrint}
            disabled={pages.length === 0}
            className="flex items-center gap-1.5 rounded-2xl bg-white px-3.5 py-2 text-xs font-bold text-stone-700 shadow-sm border border-stone-200 hover:bg-stone-50 hover:text-stone-900 transition disabled:opacity-50"
            title="Print pages directly in browser (A4 portrait)"
          >
            <Printer className="h-4 w-4 text-stone-600" />
            <span className="hidden sm:inline">Print Booklet</span>
          </button>

          {/* Export PDF Button */}
          <button
            onClick={onExportPdf}
            disabled={pages.length === 0 || isExportingPdf}
            className="flex items-center gap-2 rounded-2xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-amber-600/20 hover:bg-amber-700 transition disabled:opacity-50"
          >
            {isExportingPdf ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>
                  {exportStepText || 'Exporting PDF...'} {exportPercent ? `(${exportPercent}%)` : ''}
                </span>
              </>
            ) : (
              <>
                <FileDown className="h-4 w-4" />
                <span>Export A4 PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
