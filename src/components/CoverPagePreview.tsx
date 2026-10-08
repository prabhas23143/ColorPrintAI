import React from 'react';
import { BookOpen, User, Calendar, CheckSquare, Square } from 'lucide-react';
import { BookSettings, ColoringPage } from '../types/coloring';
import { GRADE_STANDARDS } from '../data/standards';

interface Props {
  settings: BookSettings;
  onUpdateSettings: (settings: Partial<BookSettings>) => void;
  pages: ColoringPage[];
}

export const CoverPagePreview: React.FC<Props> = ({
  settings,
  onUpdateSettings,
  pages,
}) => {
  const standardInfo = GRADE_STANDARDS.find((s) => s.id === settings.standard);
  const samplePage = pages[0];

  return (
    <div className="flex flex-col rounded-3xl bg-white p-5 shadow-md border border-stone-200">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-amber-600" />
          <h3 className="font-display font-bold text-stone-900 text-sm">
            Printable Booklet Cover Page
          </h3>
        </div>
        <button
          onClick={() => onUpdateSettings({ includeCover: !settings.includeCover })}
          className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 hover:bg-amber-100 transition"
        >
          {settings.includeCover ? (
            <>
              <CheckSquare className="h-4 w-4 text-amber-600" />
              <span>Cover Included in PDF</span>
            </>
          ) : (
            <>
              <Square className="h-4 w-4 text-stone-400" />
              <span className="text-stone-500">Add Cover Page</span>
            </>
          )}
        </button>
      </div>

      {settings.includeCover ? (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Cover Paper Mockup */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative aspect-a4 w-48 rounded-xl bg-amber-50/50 p-3 shadow-md border-2 border-stone-800 flex flex-col justify-between text-center">
              <div className="border border-stone-400 p-2 h-full flex flex-col justify-between rounded">
                <div>
                  <p className="text-[7px] font-bold tracking-widest text-stone-500 uppercase">
                    COLORING BOOK SERIES
                  </p>
                  <h4 className="font-display font-bold text-[11px] text-stone-900 leading-tight mt-1 line-clamp-2">
                    {settings.bookTitle || `${settings.topic} Coloring Book`}
                  </h4>
                  <p className="text-[7px] text-stone-600 mt-0.5">
                    {standardInfo?.label}
                  </p>
                </div>

                {/* Center artwork thumbnail */}
                <div className="my-1 h-20 w-full overflow-hidden rounded border border-dashed border-stone-300 flex items-center justify-center bg-white p-1">
                  {samplePage?.imageUrl ? (
                    <img
                      src={samplePage.imageUrl}
                      alt="Cover Preview"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-contain"
                    />
                  ) : samplePage?.svgContent ? (
                    <div
                      className="h-full w-full flex items-center justify-center [&>svg]:h-full [&>svg]:w-full"
                      dangerouslySetInnerHTML={{ __html: samplePage.svgContent }}
                    />
                  ) : (
                    <span className="text-xs">🎨</span>
                  )}
                </div>

                <div className="border-t border-stone-300 pt-1 text-[7px] text-stone-600">
                  <p className="font-semibold truncate">
                    Artist: {settings.studentName || '_______________'}
                  </p>
                  <p className="text-[6px] text-stone-400 mt-0.5">
                    {pages.length} Printable A4 Pages
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Cover Settings */}
          <div className="md:col-span-7 space-y-3">
            <div>
              <label className="text-xs font-bold text-stone-600">Booklet Title on Cover</label>
              <input
                type="text"
                value={settings.bookTitle}
                onChange={(e) => onUpdateSettings({ bookTitle: e.target.value })}
                placeholder="e.g. Jungle Animals Adventure"
                className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-sm font-semibold text-stone-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-600 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-stone-400" />
                Student / Child's Name (Optional)
              </label>
              <input
                type="text"
                value={settings.studentName}
                onChange={(e) => onUpdateSettings({ studentName: e.target.value })}
                placeholder="e.g. Leo Sharma (Grade 2)"
                className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-sm text-stone-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
              <p className="mt-1 text-[11px] text-stone-500">
                Printed on the Artist Certificate on the front cover and page footers.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs text-stone-600">
              <Calendar className="h-4 w-4 text-amber-600" />
              <span>Standard: <strong>{standardInfo?.label}</strong> ({standardInfo?.ageRange})</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3 text-center py-4 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
          <p className="text-xs text-stone-500">
            Cover page is currently excluded. Click "Add Cover Page" above to include a printable certificate cover sheet.
          </p>
        </div>
      )}
    </div>
  );
};
