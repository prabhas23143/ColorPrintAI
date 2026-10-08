import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { BookSettings, ColoringPage } from './types/coloring';
import { PRESET_ILLUSTRATIONS, getPresetForTopicAndScene } from './data/presetLibrary';
import { GRADE_STANDARDS } from './data/standards';
import { exportColoringBookToPdf, PdfExportProgress } from './utils/pdfGenerator';
import { Header } from './components/Header';
import { GeneratorForm } from './components/GeneratorForm';
import { PageCard } from './components/PageCard';
import { CoverPagePreview } from './components/CoverPagePreview';
import { InteractiveColoringModal } from './components/InteractiveColoringModal';
import { EditPageModal } from './components/EditPageModal';
import { PrintView } from './components/PrintView';
import { Sparkles, Printer, FileDown, Plus, Shuffle, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Settings
  const [settings, setSettings] = useState<BookSettings>({
    topic: 'Jungle',
    standard: 'grade_1_2',
    pageCount: 4,
    bookTitle: 'The Jungle Safari Adventure',
    studentName: '',
    includeCover: true,
    includeCaptions: true,
    borderStyle: 'classic',
    generationMode: 'smart-auto',
  });

  // Pages state initialized with curated jungle animals (Tigers, Monkeys, Elephants, Toucans)
  const [pages, setPages] = useState<ColoringPage[]>([
    {
      id: 'page_init_1',
      pageNumber: 1,
      title: PRESET_ILLUSTRATIONS[0].title,
      subject: PRESET_ILLUSTRATIONS[0].subject,
      sceneDescription: PRESET_ILLUSTRATIONS[0].sceneDescription,
      imagePrompt: 'Coloring book page, black and white line art, tiger cub playing with butterflies',
      educationalCaption: PRESET_ILLUSTRATIONS[0].educationalCaption,
      difficultyNote: PRESET_ILLUSTRATIONS[0].difficultyNote,
      svgContent: PRESET_ILLUSTRATIONS[0].svg,
    },
    {
      id: 'page_init_2',
      pageNumber: 2,
      title: PRESET_ILLUSTRATIONS[1].title,
      subject: PRESET_ILLUSTRATIONS[1].subject,
      sceneDescription: PRESET_ILLUSTRATIONS[1].sceneDescription,
      imagePrompt: 'Coloring book page, black and white line art, chimpanzee monkey swinging from vines',
      educationalCaption: PRESET_ILLUSTRATIONS[1].educationalCaption,
      difficultyNote: PRESET_ILLUSTRATIONS[1].difficultyNote,
      svgContent: PRESET_ILLUSTRATIONS[1].svg,
    },
    {
      id: 'page_init_3',
      pageNumber: 3,
      title: PRESET_ILLUSTRATIONS[2].title,
      subject: PRESET_ILLUSTRATIONS[2].subject,
      sceneDescription: PRESET_ILLUSTRATIONS[2].sceneDescription,
      imagePrompt: 'Coloring book page, black and white line art, gentle river baby elephant splashing water',
      educationalCaption: PRESET_ILLUSTRATIONS[2].educationalCaption,
      difficultyNote: PRESET_ILLUSTRATIONS[2].difficultyNote,
      svgContent: PRESET_ILLUSTRATIONS[2].svg,
    },
    {
      id: 'page_init_4',
      pageNumber: 4,
      title: PRESET_ILLUSTRATIONS[3].title,
      subject: PRESET_ILLUSTRATIONS[3].subject,
      sceneDescription: PRESET_ILLUSTRATIONS[3].sceneDescription,
      imagePrompt: 'Coloring book page, black and white line art, rainforest toucan bird with hibiscus flowers',
      educationalCaption: PRESET_ILLUSTRATIONS[3].educationalCaption,
      difficultyNote: PRESET_ILLUSTRATIONS[3].difficultyNote,
      svgContent: PRESET_ILLUSTRATIONS[3].svg,
    },
  ]);

  // Loading & Export state
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStepText, setLoadingStepText] = useState('');
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportProgress, setExportProgress] = useState<PdfExportProgress | null>(null);

  // Modals state
  const [coloringPage, setColoringPage] = useState<ColoringPage | null>(null);
  const [editingPage, setEditingPage] = useState<ColoringPage | null>(null);

  const handleUpdateSettings = (partial: Partial<BookSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  // Generate artwork for a single page with resilient fallbacks
  const generatePageArtwork = async (
    page: ColoringPage,
    standard: string,
    mode: 'ai-image' | 'ai-svg' | 'smart-auto',
    topic: string,
    pageIndex: number
  ): Promise<Partial<ColoringPage>> => {
    // 1. Try Image Generation if requested or smart-auto
    if (mode === 'ai-image' || mode === 'smart-auto') {
      try {
        const response = await fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: page.imagePrompt || `${page.title}, ${page.sceneDescription}`,
            standard,
            title: page.title,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.imageUrl) {
            return { imageUrl: data.imageUrl, svgContent: undefined, error: undefined };
          }
        }
      } catch (e) {
        console.warn('Image generation network or server error, falling back:', e);
      }
    }

    // 2. Try Vector SVG Generation
    if (mode === 'ai-svg' || mode === 'smart-auto') {
      try {
        const response = await fetch('/api/generate-svg-art', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: page.sceneDescription || page.title,
            title: page.title,
            standard,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.svg) {
            return { svgContent: data.svg, imageUrl: undefined, error: undefined };
          }
        }
      } catch (e) {
        console.warn('SVG generation error, using preset library fallback:', e);
      }
    }

    // 3. Guaranteed High-Res Preset Fallback
    const preset = getPresetForTopicAndScene(topic, pageIndex);
    return {
      svgContent: preset.svg,
      imageUrl: undefined,
      error: undefined,
    };
  };

  // Main Generation Flow
  const handleGenerateBook = async () => {
    if (!settings.topic.trim()) return;

    setIsGenerating(true);
    setLoadingStepText(`Brainstorming ${settings.pageCount} varied scenes for "${settings.topic}"...`);

    try {
      // Step 1: Plan and randomize diverse scenes
      let plannedPages: ColoringPage[] = [];

      try {
        const planRes = await fetch('/api/plan-coloring-pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic: settings.topic,
            standard: settings.standard,
            count: settings.pageCount,
          }),
        });

        if (planRes.ok) {
          const planData = await planRes.json();
          if (planData.success && planData.pages && planData.pages.length > 0) {
            plannedPages = planData.pages.map((p: any) => ({
              ...p,
              isGenerating: true,
            }));
          }
        }
      } catch (e) {
        console.warn('Plan endpoint error, synthesizing local scene breakdown:', e);
      }

      // If planning failed, generate local randomized scenes
      if (plannedPages.length === 0) {
        for (let i = 0; i < settings.pageCount; i++) {
          const preset = getPresetForTopicAndScene(settings.topic, i);
          plannedPages.push({
            id: `page_${Date.now()}_${i + 1}`,
            pageNumber: i + 1,
            title: preset.title,
            subject: preset.subject,
            sceneDescription: preset.sceneDescription,
            imagePrompt: `Coloring page for ${settings.topic}: ${preset.title}`,
            educationalCaption: preset.educationalCaption,
            difficultyNote: preset.difficultyNote,
            isGenerating: true,
          });
        }
      }

      // Auto-update book title if empty or default
      if (!settings.bookTitle || settings.bookTitle.includes('Jungle') || settings.bookTitle.includes('Coloring Book')) {
        setSettings((prev) => ({
          ...prev,
          bookTitle: `The ${settings.topic} Adventure`,
        }));
      }

      setPages(plannedPages);

      // Step 2: Render each page illustration
      const updatedPages = [...plannedPages];

      for (let i = 0; i < updatedPages.length; i++) {
        setLoadingStepText(`Illustrating page ${i + 1} of ${updatedPages.length}: ${updatedPages[i].title}...`);

        const art = await generatePageArtwork(
          updatedPages[i],
          settings.standard,
          settings.generationMode,
          settings.topic,
          i
        );

        updatedPages[i] = {
          ...updatedPages[i],
          ...art,
          isGenerating: false,
        };

        // Update state progressively so user sees pages appear in real-time
        setPages([...updatedPages]);
      }

      // Confetti celebration
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (err: any) {
      console.error('Generation flow error:', err);
    } finally {
      setIsGenerating(false);
      setLoadingStepText('');
    }
  };

  // Regenerate an individual page
  const handleRegeneratePage = async (targetPage: ColoringPage) => {
    setPages((prev) =>
      prev.map((p) => (p.id === targetPage.id ? { ...p, isGenerating: true, error: undefined } : p))
    );

    try {
      const pageIndex = pages.findIndex((p) => p.id === targetPage.id);
      const art = await generatePageArtwork(
        targetPage,
        settings.standard,
        settings.generationMode,
        settings.topic,
        pageIndex + 1 // shift index to randomize different preset
      );

      setPages((prev) =>
        prev.map((p) => (p.id === targetPage.id ? { ...p, ...art, isGenerating: false } : p))
      );
    } catch (err: any) {
      setPages((prev) =>
        prev.map((p) =>
          p.id === targetPage.id
            ? { ...p, isGenerating: false, error: err.message || 'Regeneration failed' }
            : p
        )
      );
    }
  };

  // Save changes from Edit Page Modal
  const handleSavePageEdit = (updatedPage: ColoringPage) => {
    setPages((prev) => prev.map((p) => (p.id === updatedPage.id ? updatedPage : p)));
  };

  // PDF Export
  const handleExportPdf = async () => {
    if (pages.length === 0) return;
    setIsExportingPdf(true);
    setExportProgress({ step: 'Preparing pages...', percent: 5 });

    try {
      await exportColoringBookToPdf(pages, settings, (p) => {
        setExportProgress(p);
      });

      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Could not generate PDF. Please try again or use the browser Print button.');
    } finally {
      setIsExportingPdf(false);
      setExportProgress(null);
    }
  };

  // Native Print
  const handlePrint = () => {
    window.print();
  };

  const currentStandard = GRADE_STANDARDS.find((s) => s.id === settings.standard);

  return (
    <div className="min-h-screen bg-amber-50/30 text-stone-900 flex flex-col font-sans">
      {/* App Header */}
      <Header
        pages={pages}
        onExportPdf={handleExportPdf}
        onPrint={handlePrint}
        isExportingPdf={isExportingPdf}
        exportStepText={exportProgress?.step}
        exportPercent={exportProgress?.percent}
      />

      {/* Main Container */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6 no-print">
        {/* Hero Banner / Instructions */}
        <div className="mb-6 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 p-6 sm:p-8 text-white shadow-xl shadow-amber-500/15 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3">
              <span>✨ A4 Printable Coloring Engine</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Turn any topic into printable A4 coloring pages for your students.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-amber-100 max-w-2xl leading-relaxed">
              Simply specify a topic (like <span className="font-semibold underline decoration-amber-300">Jungle</span>), student standard grade, and number of pages. Our engine randomizes distinct exciting scenes—from playful tiger cubs to swinging monkeys—calibrated with age-appropriate outline thicknesses and ready for multi-page PDF booklet download.
            </p>
          </div>
        </div>

        {/* Generator Form Section */}
        <section className="mb-8">
          <GeneratorForm
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onGenerate={handleGenerateBook}
            isLoading={isGenerating}
            loadingStepText={loadingStepText}
          />
        </section>

        {/* Booklet Gallery Section */}
        <section className="space-y-6">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-100 text-xs font-bold text-amber-800">
                  {pages.length}
                </span>
                <h3 className="font-display text-xl font-bold text-stone-900">
                  {settings.bookTitle || 'Your Coloring Pages'}
                </h3>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Target: {currentStandard?.label} ({currentStandard?.ageRange}) • Outline weight: {currentStandard?.strokeWidth}px • Always A4 Portrait
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-sm border border-stone-200 hover:bg-stone-50 transition"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print Sheets</span>
              </button>
              <button
                onClick={handleExportPdf}
                disabled={isExportingPdf}
                className="flex items-center gap-1.5 rounded-xl bg-amber-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-amber-700 transition"
              >
                <FileDown className="h-3.5 w-3.5" />
                <span>Download PDF Booklet</span>
              </button>
            </div>
          </div>

          {/* Optional Cover Page Preview Card */}
          <CoverPagePreview
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            pages={pages}
          />

          {/* Grid of A4 Coloring Pages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pages.map((page) => (
              <PageCard
                key={page.id}
                page={page}
                onColor={setColoringPage}
                onEdit={setEditingPage}
                onRegenerate={handleRegeneratePage}
                borderStyle={settings.borderStyle}
              />
            ))}
          </div>
        </section>

        {/* Feature Highlights Footer */}
        <section className="mt-12 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-200/80">
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-stone-200">
            <span className="text-xl">🖨️</span>
            <h4 className="font-display text-sm font-bold text-stone-900 mt-2">True A4 Standard Size</h4>
            <p className="text-xs text-stone-500 mt-1">
              Every page is formatted exactly in the 1 : 1.414 international A4 ratio for seamless printing on any standard home or school printer.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-stone-200">
            <span className="text-xl">🎓</span>
            <h4 className="font-display text-sm font-bold text-stone-900 mt-2">Grade-Adaptive Contours</h4>
            <p className="text-xs text-stone-500 mt-1">
              Outlines adjust dynamically: extra-bold 5px lines for preschoolers' crayons, up to intricate 1.5px lines for middle & high schoolers.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-stone-200">
            <span className="text-xl">📦</span>
            <h4 className="font-display text-sm font-bold text-stone-900 mt-2">Multi-Page PDF Booklet</h4>
            <p className="text-xs text-stone-500 mt-1">
              Includes front cover certificate, title pages, educational trivia captions, and page numbers formatted ready for stapling.
            </p>
          </div>
        </section>
      </main>

      {/* Interactive Digital Coloring Modal */}
      {coloringPage && (
        <InteractiveColoringModal
          page={coloringPage}
          onClose={() => setColoringPage(null)}
        />
      )}

      {/* Edit Scene Modal */}
      {editingPage && (
        <EditPageModal
          page={editingPage}
          onSave={handleSavePageEdit}
          onClose={() => setEditingPage(null)}
          onRegenerate={handleRegeneratePage}
        />
      )}

      {/* Dedicated Print View (Activated on window.print()) */}
      <PrintView pages={pages} settings={settings} />
    </div>
  );
}
