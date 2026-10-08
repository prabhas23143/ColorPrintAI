import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, BookOpen, Layers, Check } from 'lucide-react';
import { BookSettings, GradeStandard } from '../types/coloring';
import { GRADE_STANDARDS, QUICK_TOPICS } from '../data/standards';

interface Props {
  settings: BookSettings;
  onUpdateSettings: (settings: Partial<BookSettings>) => void;
  onGenerate: () => void;
  isLoading: boolean;
  loadingStepText?: string;
}

export const GeneratorForm: React.FC<Props> = ({
  settings,
  onUpdateSettings,
  onGenerate,
  isLoading,
  loadingStepText,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleTopicSelect = (sample: string) => {
    onUpdateSettings({ topic: sample });
  };

  return (
    <div className="relative rounded-3xl bg-white p-6 shadow-xl border border-stone-200">
      {/* Header of Form */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-500 text-white font-display text-sm font-bold shadow-sm">
              ✨
            </span>
            <h2 className="font-display text-xl font-bold text-stone-900">
              Coloring Book Creator
            </h2>
          </div>
          <p className="mt-1 text-xs text-stone-500">
            Tell us your topic, student standard grade, and page count to craft an A4 printable booklet.
          </p>
        </div>

        {/* A4 Size Guarantee Badge */}
        <div className="flex items-center gap-2 self-start rounded-2xl bg-amber-50/80 px-3.5 py-2 border border-amber-200/80">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500 text-white text-[10px] font-bold">
            A4
          </div>
          <div className="text-left">
            <p className="text-[11px] font-bold text-amber-900 leading-tight">Always True A4 Size</p>
            <p className="text-[10px] text-amber-700">210 × 297 mm • Print-Ready</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* 1. TOPIC INPUT */}
        <div>
          <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-700">
            <span>1. What topic would you like?</span>
            <span className="text-[11px] font-normal text-stone-400">Randomizes diverse animals & scenes</span>
          </label>
          <div className="relative mt-2">
            <input
              type="text"
              value={settings.topic}
              onChange={(e) => onUpdateSettings({ topic: e.target.value })}
              placeholder="e.g. Jungle (will generate tigers, monkeys, elephants & toucans)"
              className="w-full rounded-2xl border-2 border-stone-200 bg-stone-50/50 px-4 py-3.5 text-base font-semibold text-stone-900 placeholder-stone-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100 transition shadow-sm"
              disabled={isLoading}
            />
          </div>

          {/* Quick Inspiration Pills */}
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-stone-400 mr-1">Quick Picks:</span>
            {QUICK_TOPICS.map((topic) => (
              <button
                key={topic.label}
                type="button"
                onClick={() => handleTopicSelect(topic.label)}
                disabled={isLoading}
                className={`flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-semibold transition ${
                  settings.topic.toLowerCase() === topic.label.toLowerCase()
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                <span>{topic.emoji}</span>
                <span>{topic.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. WHICH STANDARD / GRADE IS THE STUDENT */}
        <div>
          <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-700">
            <span>2. Which Standard / Grade is the student?</span>
            <span className="text-[11px] font-normal text-stone-400">Adapts outline thickness & scene complexity</span>
          </label>

          <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {GRADE_STANDARDS.map((std) => {
              const isSelected = settings.standard === std.id;
              return (
                <button
                  key={std.id}
                  type="button"
                  onClick={() => onUpdateSettings({ standard: std.id as GradeStandard })}
                  disabled={isLoading}
                  className={`relative flex flex-col justify-between rounded-2xl p-3.5 text-left transition-all border-2 ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/50 shadow-md ring-2 ring-amber-200/60'
                      : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-stone-900 leading-tight">
                        {std.label}
                      </span>
                      {isSelected && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] font-semibold text-amber-700">
                      {std.ageRange}
                    </p>
                    <p className="mt-1 text-[10px] text-stone-500 leading-snug">
                      {std.complexityText}
                    </p>
                  </div>

                  {/* Visual Stroke Thickness Preview */}
                  <div className="mt-3 border-t border-stone-200/80 pt-2">
                    <div className="flex items-center justify-between text-[9px] text-stone-400">
                      <span>Outline:</span>
                      <span className="font-mono">{std.strokeWidth}px</span>
                    </div>
                    <div className="mt-1 flex h-4 items-center">
                      <div
                        className="w-full rounded-full bg-stone-900 transition-all"
                        style={{ height: `${std.strokeWidth}px` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. HOW MANY IMAGES ARE REQUIRED */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-stone-50/70 p-4 rounded-2xl border border-stone-200/80">
          <div className="md:col-span-7">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
              3. How many images are required?
            </label>
            <p className="text-xs text-stone-500 mt-0.5">
              Generates varied randomized scenes across your topic (e.g. 4 pages of Jungle gives tiger, monkey, elephant, toucan).
            </p>
          </div>

          <div className="md:col-span-5 flex items-center justify-end gap-3">
            {/* Quick buttons */}
            <div className="flex items-center gap-1">
              {[2, 3, 4, 6].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => onUpdateSettings({ pageCount: num })}
                  disabled={isLoading}
                  className={`h-9 w-9 rounded-xl text-xs font-bold transition ${
                    settings.pageCount === num
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Stepper / Slider */}
            <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 border border-stone-200 shadow-sm">
              <button
                type="button"
                onClick={() => onUpdateSettings({ pageCount: Math.max(1, settings.pageCount - 1) })}
                disabled={isLoading || settings.pageCount <= 1}
                className="h-6 w-6 rounded-lg text-stone-600 hover:bg-stone-100 font-bold text-sm disabled:opacity-30"
              >
                -
              </button>
              <span className="font-display text-base font-extrabold text-stone-900 w-6 text-center">
                {settings.pageCount}
              </span>
              <button
                type="button"
                onClick={() => onUpdateSettings({ pageCount: Math.min(10, settings.pageCount + 1) })}
                disabled={isLoading || settings.pageCount >= 10}
                className="h-6 w-6 rounded-lg text-stone-600 hover:bg-stone-100 font-bold text-sm disabled:opacity-30"
              >
                +
              </button>
              <span className="text-[11px] text-stone-400 font-semibold pl-1">Pages</span>
            </div>
          </div>
        </div>

        {/* Collapsible Booklet Options */}
        <div>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-800 transition"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>{showAdvanced ? 'Hide Book Customizations' : 'More Options (Book Title, Borders, Engine)'}</span>
          </button>

          {showAdvanced && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl bg-stone-50 p-4 border border-stone-200">
              {/* Border Style */}
              <div>
                <label className="text-xs font-bold text-stone-600">Page Border Style</label>
                <select
                  value={settings.borderStyle}
                  onChange={(e) => onUpdateSettings({ borderStyle: e.target.value as any })}
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-stone-800 focus:border-amber-500 focus:outline-none"
                >
                  <option value="classic">Classic Double Line</option>
                  <option value="dots">Dotted Pattern</option>
                  <option value="corner">Corner Flourish</option>
                  <option value="minimal">Minimal Single Border</option>
                  <option value="none">No Border Frame</option>
                </select>
              </div>

              {/* Generation Mode */}
              <div>
                <label className="text-xs font-bold text-stone-600">Artwork Engine</label>
                <select
                  value={settings.generationMode}
                  onChange={(e) => onUpdateSettings({ generationMode: e.target.value as any })}
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-stone-800 focus:border-amber-500 focus:outline-none"
                >
                  <option value="smart-auto">Smart Auto (Best Quality + Instant Fallback)</option>
                  <option value="ai-image">Gemini AI High-Def Raster Art</option>
                  <option value="ai-svg">Gemini Vector SVG Art</option>
                </select>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-col justify-center gap-2 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.includeCover}
                    onChange={(e) => onUpdateSettings({ includeCover: e.target.checked })}
                    className="rounded accent-amber-500 h-4 w-4"
                  />
                  <span>Include Front Cover Page</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.includeCaptions}
                    onChange={(e) => onUpdateSettings({ includeCaptions: e.target.checked })}
                    className="rounded accent-amber-500 h-4 w-4"
                  />
                  <span>Print Educational Trivia Footers</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* GENERATE BUTTON */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onGenerate}
            disabled={isLoading || !settings.topic.trim()}
            className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 py-4 px-6 font-display text-lg font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/35 hover:scale-[1.005] active:scale-[0.995] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>{loadingStepText || 'Crafting Coloring Pages...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
                <span>
                  Generate {settings.pageCount} A4 Coloring {settings.pageCount === 1 ? 'Page' : 'Pages'} for "{settings.topic || 'Your Topic'}"
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
