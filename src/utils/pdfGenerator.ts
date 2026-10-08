import { jsPDF } from 'jspdf';
import { BookSettings, ColoringPage } from '../types/coloring';
import { GRADE_STANDARDS } from '../data/standards';

// A4 dimensions in mm
const A4_WIDTH = 210;
const A4_HEIGHT = 297;
const MARGIN = 12; // 12mm print-safe margin

/**
 * Converts an SVG string into a high-resolution PNG data URL via Canvas
 */
async function svgToImageDataUrl(svgString: string, targetWidth = 1650, targetHeight = 2333): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error('Canvas context not available'));
          return;
        }

        // Fill pure white background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL('image/png', 1.0));
      };

      img.onerror = (e) => {
        URL.revokeObjectURL(url);
        reject(new Error(`Failed to load SVG into image: ${e}`));
      };

      img.src = url;
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Loads a raster image URL into a printable Data URL
 */
async function loadImageDataUrl(url: string): Promise<string> {
  if (url.startsWith('data:image/')) {
    return url;
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 1200;
      canvas.height = img.naturalHeight || 1600;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas'));
        return;
      }
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/jpeg', 0.95));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export interface PdfExportProgress {
  step: string;
  percent: number;
}

export async function exportColoringBookToPdf(
  pages: ColoringPage[],
  settings: BookSettings,
  onProgress?: (progress: PdfExportProgress) => void
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const standardInfo = GRADE_STANDARDS.find((s) => s.id === settings.standard);
  const totalSteps = (settings.includeCover ? 1 : 0) + pages.length + 1;
  let currentStep = 0;

  const updateProgress = (stepName: string) => {
    currentStep++;
    if (onProgress) {
      onProgress({
        step: stepName,
        percent: Math.round((currentStep / totalSteps) * 100),
      });
    }
  };

  let isFirstPage = true;

  // 1. Optional Printable Cover Page
  if (settings.includeCover) {
    updateProgress('Creating printable cover page...');
    
    // Outer decorative borders
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1.2);
    doc.rect(MARGIN, MARGIN, A4_WIDTH - MARGIN * 2, A4_HEIGHT - MARGIN * 2);

    doc.setLineWidth(0.4);
    doc.rect(MARGIN + 3, MARGIN + 3, A4_WIDTH - (MARGIN + 3) * 2, A4_HEIGHT - (MARGIN + 3) * 2);

    // Decorative corner flourishes
    const corners = [
      [MARGIN + 6, MARGIN + 6],
      [A4_WIDTH - MARGIN - 6, MARGIN + 6],
      [MARGIN + 6, A4_HEIGHT - MARGIN - 6],
      [A4_WIDTH - MARGIN - 6, A4_HEIGHT - MARGIN - 6],
    ];
    corners.forEach(([cx, cy]) => {
      doc.circle(cx, cy, 2, 'S');
    });

    // Top Header Banner
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(60, 60, 60);
    doc.text('COLORING BOOK ADVENTURE', A4_WIDTH / 2, MARGIN + 18, { align: 'center' });

    // Main Book Title
    const title = settings.bookTitle.toUpperCase() || `${settings.topic.toUpperCase()} COLORING BOOK`;
    doc.setFontSize(26);
    doc.setTextColor(0, 0, 0);
    doc.text(title, A4_WIDTH / 2, MARGIN + 32, { align: 'center', maxWidth: A4_WIDTH - 40 });

    // Subtitle / Standard badge
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    const standardText = standardInfo ? `${standardInfo.label} (${standardInfo.ageRange})` : 'All Ages';
    doc.text(`Designed for ${standardText}`, A4_WIDTH / 2, MARGIN + 42, { align: 'center' });

    // Center Coloring Illustration (use page 1 or decorative cover frame)
    const coverBoxWidth = A4_WIDTH - 60;
    const coverBoxHeight = 120;
    const coverBoxX = 30;
    const coverBoxY = 60;

    doc.setDrawColor(180, 180, 180);
    doc.setLineDashPattern([2, 2], 0);
    doc.rect(coverBoxX, coverBoxY, coverBoxWidth, coverBoxHeight);
    doc.setLineDashPattern([], 0); // reset

    // If first page has an image, render preview inside cover box
    const firstPage = pages[0];
    if (firstPage) {
      try {
        let imgData: string | null = null;
        if (firstPage.imageUrl) {
          imgData = await loadImageDataUrl(firstPage.imageUrl);
        } else if (firstPage.svgContent) {
          imgData = await svgToImageDataUrl(firstPage.svgContent, 800, 1131);
        }

        if (imgData) {
          doc.addImage(
            imgData,
            'PNG',
            coverBoxX + 5,
            coverBoxY + 5,
            coverBoxWidth - 10,
            coverBoxHeight - 10,
            '',
            'FAST'
          );
        }
      } catch (e) {
        console.warn('Could not draw cover page thumbnail:', e);
      }
    }

    // "Color me!" prompt text under thumbnail
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Color the cover and make it your own masterpiece!', A4_WIDTH / 2, coverBoxY + coverBoxHeight + 8, {
      align: 'center',
    });

    // Student / Artist Information Box
    const infoY = 210;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.6);
    doc.rect(MARGIN + 15, infoY, A4_WIDTH - (MARGIN + 15) * 2, 45, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('ARTIST CERTIFICATE', A4_WIDTH / 2, infoY + 10, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(
      `Artist Name: ${settings.studentName ? settings.studentName : '____________________________________'}`,
      MARGIN + 25,
      infoY + 22
    );
    doc.text(
      'Date Completed: _______________________    Grade: _________________',
      MARGIN + 25,
      infoY + 34
    );

    // Footer of cover page
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(`Includes ${pages.length} High-Definition A4 Printable Illustrations`, A4_WIDTH / 2, A4_HEIGHT - MARGIN - 10, {
      align: 'center',
    });
    doc.text('ColorCraft Studio • Premium Educational Coloring Series', A4_WIDTH / 2, A4_HEIGHT - MARGIN - 5, {
      align: 'center',
    });

    isFirstPage = false;
  }

  // 2. Coloring Book Pages
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    updateProgress(`Rendering Page ${i + 1} of ${pages.length}: ${page.title}...`);

    if (!isFirstPage) {
      doc.addPage('a4', 'portrait');
    }
    isFirstPage = false;

    // Page Border
    const pageMargin = MARGIN;
    const contentWidth = A4_WIDTH - pageMargin * 2;
    const contentHeight = A4_HEIGHT - pageMargin * 2;

    if (settings.borderStyle === 'classic') {
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.8);
      doc.rect(pageMargin, pageMargin, contentWidth, contentHeight);
      doc.setLineWidth(0.3);
      doc.rect(pageMargin + 2, pageMargin + 2, contentWidth - 4, contentHeight - 4);
    } else if (settings.borderStyle === 'dots') {
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.6);
      doc.setLineDashPattern([2, 3], 0);
      doc.rect(pageMargin, pageMargin, contentWidth, contentHeight);
      doc.setLineDashPattern([], 0);
    } else if (settings.borderStyle === 'corner') {
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(1.0);
      const cLen = 15;
      // Top left
      doc.line(pageMargin, pageMargin, pageMargin + cLen, pageMargin);
      doc.line(pageMargin, pageMargin, pageMargin, pageMargin + cLen);
      // Top right
      doc.line(A4_WIDTH - pageMargin, pageMargin, A4_WIDTH - pageMargin - cLen, pageMargin);
      doc.line(A4_WIDTH - pageMargin, pageMargin, A4_WIDTH - pageMargin, pageMargin + cLen);
      // Bottom left
      doc.line(pageMargin, A4_HEIGHT - pageMargin, pageMargin + cLen, A4_HEIGHT - pageMargin);
      doc.line(pageMargin, A4_HEIGHT - pageMargin, pageMargin, A4_HEIGHT - pageMargin - cLen);
      // Bottom right
      doc.line(A4_WIDTH - pageMargin, A4_HEIGHT - pageMargin, A4_WIDTH - pageMargin - cLen, A4_HEIGHT - pageMargin);
      doc.line(A4_WIDTH - pageMargin, A4_HEIGHT - pageMargin, A4_WIDTH - pageMargin, A4_HEIGHT - pageMargin - cLen);
    }

    // Top Header: Title & Page Number
    const headerY = pageMargin + 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(20, 20, 20);
    doc.text(page.title, pageMargin + 8, headerY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Page ${i + 1} of ${pages.length}`, A4_WIDTH - pageMargin - 8, headerY, { align: 'right' });

    // Decorative divider line under header
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(pageMargin + 8, headerY + 3, A4_WIDTH - pageMargin - 8, headerY + 3);

    // Compute Image Area
    // A4 width: 210mm. Target image width: ~170mm. A4 ratio: 1:1.414.
    const imgX = pageMargin + 8;
    const imgY = headerY + 6;
    const imgWidth = A4_WIDTH - (pageMargin + 8) * 2; // ~170mm
    const imgHeight = 225; // 225mm leaves ~30mm for bottom captions and margins

    try {
      let imgData: string | null = null;
      if (page.imageUrl) {
        imgData = await loadImageDataUrl(page.imageUrl);
      } else if (page.svgContent) {
        // High-DPI 300 DPI conversion (170mm @ 300 DPI is approx 2000px)
        imgData = await svgToImageDataUrl(page.svgContent, 1650, 2333);
      }

      if (imgData) {
        doc.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight, '', 'FAST');
      } else {
        // Fallback placeholder box
        doc.setDrawColor(180, 180, 180);
        doc.rect(imgX, imgY, imgWidth, imgHeight);
        doc.setFontSize(12);
        doc.setTextColor(120, 120, 120);
        doc.text(`Illustration for "${page.title}"`, imgX + imgWidth / 2, imgY + imgHeight / 2, {
          align: 'center',
        });
      }
    } catch (err) {
      console.error(`Error rendering page ${i + 1} image:`, err);
    }

    // Bottom Footer / Educational Caption / Student Signature
    const footerY = imgY + imgHeight + 6;

    if (settings.includeCaptions && page.educationalCaption) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9.5);
      doc.setTextColor(50, 50, 50);
      doc.text(page.educationalCaption, A4_WIDTH / 2, footerY, {
        align: 'center',
        maxWidth: contentWidth - 20,
      });
    }

    // Bottom Metadata Line: Student Name / Date / Page Branding
    const subFooterY = A4_HEIGHT - pageMargin - 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    const studentInfoText = settings.studentName ? `Coloring Artist: ${settings.studentName}` : 'ColorCraft A4 Printable';
    doc.text(studentInfoText, pageMargin + 8, subFooterY);
    doc.text('Always Print in A4 (Fit to Page / 100%)', A4_WIDTH - pageMargin - 8, subFooterY, {
      align: 'right',
    });
  }

  updateProgress('Saving your PDF file...');
  const cleanTitle = (settings.bookTitle || settings.topic || 'Coloring_Book')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 30);
  doc.save(`${cleanTitle}_A4_Coloring_Book.pdf`);
}
