import React from 'react';
import { BookSettings, ColoringPage } from '../types/coloring';
import { GRADE_STANDARDS } from '../data/standards';

interface Props {
  pages: ColoringPage[];
  settings: BookSettings;
}

export const PrintView: React.FC<Props> = ({ pages, settings }) => {
  const standardInfo = GRADE_STANDARDS.find((s) => s.id === settings.standard);

  return (
    <div className="print-only hidden">
      {/* 1. Optional Cover Page */}
      {settings.includeCover && (
        <div className="a4-sheet page-break flex h-[297mm] w-[210mm] flex-col justify-between p-8 border-4 border-black box-border">
          <div className="text-center pt-8">
            <p className="text-sm font-bold tracking-widest uppercase">
              COLORING BOOK SERIES
            </p>
            <h1 className="text-3xl font-extrabold uppercase mt-4">
              {settings.bookTitle || `${settings.topic} COLORING BOOK`}
            </h1>
            <p className="text-base text-gray-700 mt-2 font-medium">
              Designed for {standardInfo?.label} ({standardInfo?.ageRange})
            </p>
          </div>

          {/* Cover thumbnail */}
          <div className="my-6 flex-1 flex items-center justify-center border-2 border-dashed border-gray-400 p-4 max-h-[140mm]">
            {pages[0]?.imageUrl ? (
              <img
                src={pages[0].imageUrl}
                alt="Cover"
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain"
              />
            ) : pages[0]?.svgContent ? (
              <div
                className="max-h-full max-w-full flex items-center justify-center [&>svg]:max-h-full [&>svg]:max-w-full"
                dangerouslySetInnerHTML={{ __html: pages[0].svgContent }}
              />
            ) : null}
          </div>

          {/* Artist Certificate */}
          <div className="border-2 border-black p-6 rounded-lg text-left">
            <h3 className="text-base font-bold text-center uppercase tracking-wider mb-4">
              Artist Certificate
            </h3>
            <p className="text-sm mb-2">
              <strong>Artist Name:</strong> {settings.studentName || '________________________________________'}
            </p>
            <p className="text-sm">
              <strong>Date Completed:</strong> _______________________ &nbsp;&nbsp;&nbsp;&nbsp; <strong>Grade:</strong> ____________
            </p>
          </div>

          <div className="text-center text-xs text-gray-500 pt-4">
            Includes {pages.length} Printable A4 Illustrations • ColorCraft Studio
          </div>
        </div>
      )}

      {/* 2. Coloring Pages */}
      {pages.map((page, index) => (
        <div
          key={page.id}
          className="a4-sheet page-break flex h-[297mm] w-[210mm] flex-col justify-between p-8 border-2 border-black box-border bg-white"
        >
          {/* Top Header */}
          <div className="flex justify-between items-center border-b-2 border-black pb-2">
            <h2 className="text-lg font-bold">{page.title}</h2>
            <span className="text-sm font-semibold">Page {index + 1} of {pages.length}</span>
          </div>

          {/* Central Artwork */}
          <div className="flex-1 flex items-center justify-center my-4 overflow-hidden">
            {page.imageUrl ? (
              <img
                src={page.imageUrl}
                alt={page.title}
                referrerPolicy="no-referrer"
                className="max-h-[220mm] max-w-full object-contain filter contrast-125"
              />
            ) : page.svgContent ? (
              <div
                className="max-h-[220mm] max-w-full flex items-center justify-center [&>svg]:max-h-[220mm] [&>svg]:w-auto [&>svg]:object-contain"
                dangerouslySetInnerHTML={{ __html: page.svgContent }}
              />
            ) : null}
          </div>

          {/* Bottom Educational Trivia */}
          <div className="border-t border-gray-400 pt-2 text-center">
            {settings.includeCaptions && page.educationalCaption && (
              <p className="text-xs italic text-gray-800 mb-1">
                "{page.educationalCaption}"
              </p>
            )}
            <div className="flex justify-between text-[10px] text-gray-500">
              <span>{settings.studentName ? `Artist: ${settings.studentName}` : 'ColorCraft A4 Printable'}</span>
              <span>Standard: {standardInfo?.label}</span>
              <span>A4 Portrait Worksheet</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
