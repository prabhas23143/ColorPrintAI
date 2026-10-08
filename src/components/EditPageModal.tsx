import React, { useState } from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { ColoringPage } from '../types/coloring';

interface Props {
  page: ColoringPage;
  onSave: (updatedPage: ColoringPage) => void;
  onClose: () => void;
  onRegenerate: (page: ColoringPage) => void;
}

export const EditPageModal: React.FC<Props> = ({ page, onSave, onClose, onRegenerate }) => {
  const [title, setTitle] = useState(page.title);
  const [sceneDescription, setSceneDescription] = useState(page.sceneDescription);
  const [imagePrompt, setImagePrompt] = useState(page.imagePrompt);
  const [educationalCaption, setEducationalCaption] = useState(page.educationalCaption);

  const handleSave = () => {
    onSave({
      ...page,
      title,
      sceneDescription,
      imagePrompt,
      educationalCaption,
    });
    onClose();
  };

  const handleSaveAndRegenerate = () => {
    const updated = {
      ...page,
      title,
      sceneDescription,
      imagePrompt,
      educationalCaption,
    };
    onSave(updated);
    onRegenerate(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-stone-200">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-700 font-bold">
              #{page.pageNumber}
            </span>
            <h3 className="font-display text-lg font-bold text-stone-900">Customize Page Scene</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Page Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-sm font-semibold text-stone-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Scene Description</label>
            <textarea
              rows={2}
              value={sceneDescription}
              onChange={(e) => setSceneDescription(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-300 p-3 text-sm text-stone-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
              placeholder="Describe what is happening in the drawing..."
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500">AI Generation Prompt</label>
            <textarea
              rows={3}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-300 p-3 font-mono text-xs text-stone-700 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Educational Caption / Trivia</label>
            <input
              type="text"
              value={educationalCaption}
              onChange={(e) => setEducationalCaption(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-sm text-stone-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
              placeholder="Fun fact printed at the bottom of the page..."
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2.5 border-t border-stone-100 pt-4">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 rounded-xl border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50"
          >
            <Check className="h-4 w-4" />
            Save Details
          </button>
          <button
            onClick={handleSaveAndRegenerate}
            className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-amber-600"
          >
            <Sparkles className="h-4 w-4" />
            Regenerate Drawing
          </button>
        </div>
      </div>
    </div>
  );
};
