import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '20mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';

const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface PlanRequest {
  topic: string;
  standard: string;
  count: number;
  complexityOverride?: string;
}

interface PagePlan {
  id: string;
  pageNumber: number;
  title: string;
  subject: string;
  sceneDescription: string;
  imagePrompt: string;
  educationalCaption: string;
  difficultyNote: string;
}

// Map grade standard to age-appropriate prompt specifications
function getGradeGuideline(standard: string): { levelName: string; lineStyle: string; sceneComplexity: string } {
  switch (standard) {
    case 'prek_k':
      return {
        levelName: 'Preschool & Kindergarten (Ages 3-5, Standard Pre-K)',
        lineStyle: 'Extra-thick, bold, smooth continuous black outlines (at least 4px thick), very large open coloring areas, zero tiny intricate details, no small hatching, no crosshatching, cartoonish and friendly big shapes',
        sceneComplexity: 'Single centered cute main subject (e.g., cute chubby animal with big smile), very minimal background with just 2-3 large elements like a sun or giant leaf, big simple shapes easy for toddler crayons'
      };
    case 'grade_1_2':
      return {
        levelName: 'Lower Primary (Ages 6-8, Standards 1st - 2nd)',
        lineStyle: 'Crisp bold black outlines, clear defined boundaries, no shading, clean contours easy for color pencils and markers',
        sceneComplexity: 'Charming storytelling scene with 1-2 happy characters, clear contextual background (e.g. tree, rainbow, flowers, gentle hills), playful and engaging'
      };
    case 'grade_3_5':
      return {
        levelName: 'Upper Primary (Ages 8-11, Standards 3rd - 5th)',
        lineStyle: 'Medium-weight clean black outlines, defined textures (like animal fur stripes, leaf veins, scales), crisp vector line art, pure white background',
        sceneComplexity: 'Dynamic and action-filled scene with rich environment, multiple animals or focal points interacting, interesting natural or architectural backdrop'
      };
    case 'grade_6_8':
      return {
        levelName: 'Middle School (Ages 11-14, Standards 6th - 8th)',
        lineStyle: 'Fine to medium black ink line art, stylized comic/manga or realistic wildlife illustration, detailed contours, crisp line weighting without solid black fills',
        sceneComplexity: 'Complex composition, deep perspective, rich environmental details (dense jungle flora, intricate machinery, cosmic nebulae, ornate buildings)'
      };
    case 'grade_9_plus':
    default:
      return {
        levelName: 'High School & Advanced (Ages 14+, Standards 9th - 12+)',
        lineStyle: 'Intricate fine line art, adult coloring book aesthetic, delicate pen-and-ink contour lines, ornate zentangle or botanical detailing, high contrast pure black and white',
        sceneComplexity: 'Sophisticated artistic composition, dense ornamental patterns, highly detailed flora and fauna, layered depth suitable for fine-tip markers or watercolor'
      };
  }
}

// Fallback topic scenes generator when AI model is under high demand (503)
function generateFallbackPages(topic: string, standard: string, count: number, gradeInfo: any): PagePlan[] {
  const lower = topic.toLowerCase();
  let scenes: Array<{ title: string; subject: string; desc: string; fact: string }> = [];

  if (lower.includes('jungle') || lower.includes('safari') || lower.includes('rainforest')) {
    scenes = [
      {
        title: 'The Playful Bengal Tiger',
        subject: 'Bengal Tiger Cub',
        desc: 'A friendly young tiger cub playing among giant monstera leaves and jungle flowers.',
        fact: 'Every tiger has a completely unique pattern of stripes, just like human fingerprints!'
      },
      {
        title: 'The Swinging Jungle Monkey',
        subject: 'Chimpanzee Monkey',
        desc: 'A cheerful monkey swinging from sturdy jungle lianas with tropical bananas.',
        fact: 'Monkeys use their strong tails for balance while leaping through tree canopies!'
      },
      {
        title: 'The Gentle River Elephant',
        subject: 'Baby Elephant',
        desc: 'A cute young elephant splashing water joyfully with its trunk beside a jungle river.',
        fact: 'An elephant trunk contains over 40,000 muscles and can pick up a single blade of grass!'
      },
      {
        title: 'The Rainforest Toucan',
        subject: 'Tropical Toucan Bird',
        desc: 'A magnificent toucan with a giant colorful bill resting on blooming hibiscus branches.',
        fact: 'A toucan beak looks heavy, but it is actually hollow and lightweight like a honeycomb!'
      },
      {
        title: 'The Colorful Tree Chameleon',
        subject: 'Chameleon',
        desc: 'A curious chameleon resting on a curled branch, catching a tiny insect with its curly tail.',
        fact: 'Chameleons can move each eye separately to look in two different directions at once!'
      },
      {
        title: 'The Friendly Spotted Leopard',
        subject: 'Leopard',
        desc: 'A sleepy spotted leopard resting peacefully on a giant mossy jungle branch.',
        fact: 'Leopards are incredible climbers and often take naps high up in trees!'
      },
      {
        title: 'The River Crocodile & Water Lilies',
        subject: 'Smiling Crocodile',
        desc: 'A smiling baby crocodile swimming happily in a calm jungle river covered with water lilies.',
        fact: 'Crocodiles can hold their breath underwater for more than an hour!'
      },
      {
        title: 'The Jungle Giant Panda',
        subject: 'Panda Bear',
        desc: 'A cute panda sitting happily chewing on fresh green bamboo stalks in the misty jungle.',
        fact: 'Giant pandas spend up to 12 hours a day eating crunchy bamboo!'
      }
    ];
  } else if (lower.includes('ocean') || lower.includes('sea') || lower.includes('underwater') || lower.includes('marine')) {
    scenes = [
      {
        title: 'The Joyful Leaping Dolphin',
        subject: 'Bottle-nose Dolphin',
        desc: 'A playful dolphin leaping over gentle sea waves with smiling sun and seabirds.',
        fact: 'Dolphins communicate with each other using a special language of clicks and whistles!'
      },
      {
        title: 'The Ancient Sea Turtle',
        subject: 'Green Sea Turtle',
        desc: 'A peaceful sea turtle gliding over colorful coral reefs and swimming alongside starfish.',
        fact: 'Sea turtles have been swimming in Earth’s oceans for over 100 million years!'
      },
      {
        title: 'The Playful Giant Octopus',
        subject: 'Octopus',
        desc: 'A friendly octopus juggling sea shells and pearls on the sandy ocean floor.',
        fact: 'An octopus has three hearts and blue blood!'
      },
      {
        title: 'The Coral Reef Clownfish',
        subject: 'Clownfish & Anemone',
        desc: 'A little striped clownfish peeking out from the waving tentacles of a sea anemone.',
        fact: 'Clownfish are immune to sea anemone stings and keep each other safe!'
      },
      {
        title: 'The Gentle Blue Whale',
        subject: 'Blue Whale',
        desc: 'A giant friendly blue whale surfacing and blowing a big water spout into the sky.',
        fact: 'The blue whale is the largest animal ever known to have lived on Earth!'
      }
    ];
  } else if (lower.includes('space') || lower.includes('astronaut') || lower.includes('galaxy') || lower.includes('planet')) {
    scenes = [
      {
        title: 'The Brave Space Explorer',
        subject: 'Astronaut on Moon',
        desc: 'An astronaut floating near the moon, pointing toward Saturn and twinkling stars.',
        fact: 'Because there is no wind on the Moon, astronaut footprints will last for millions of years!'
      },
      {
        title: 'The Cosmic Rocket Ship',
        subject: 'Blasting Rocket',
        desc: 'A sleek rocket ship zooming past swirling planetary rings and comets.',
        fact: 'Rockets must travel at 25,000 miles per hour to break free of Earth’s gravity!'
      },
      {
        title: 'The Friendly Alien in Flying Saucer',
        subject: 'Cute Alien',
        desc: 'A cheerful three-eyed alien waving from a glowing flying saucer near cratered asteroids.',
        fact: 'Our solar system is just one of billions in the vast Milky Way galaxy!'
      },
      {
        title: 'The Solar System Orbit',
        subject: 'Planets & Sun',
        desc: 'A panoramic view of Earth, Mars, Jupiter, and Saturn orbiting the radiant sun.',
        fact: 'Jupiter is so huge that all the other planets in our solar system could fit inside it!'
      }
    ];
  } else if (lower.includes('dino') || lower.includes('prehistoric')) {
    scenes = [
      {
        title: 'The Friendly Prehistoric T-Rex',
        subject: 'Tyrannosaurus Rex',
        desc: 'A cheerful smiling T-Rex stomping through prehistoric fern bushes with ancient volcanoes.',
        fact: 'Tyrannosaurus Rex had teeth as long as large bananas, measuring up to 12 inches!'
      },
      {
        title: 'The Tall Gentle Brachiosaurus',
        subject: 'Brachiosaurus',
        desc: 'A long-necked Brachiosaurus gently eating leaves from the top of giant prehistoric conifers.',
        fact: 'Brachiosaurus was as tall as a four-story building!'
      },
      {
        title: 'The Three-Horned Triceratops',
        subject: 'Triceratops',
        desc: 'A baby Triceratops playing happily near a prehistoric river surrounded by ancient cycads.',
        fact: 'Triceratops had a large bony frill and three horns to protect itself from predators!'
      },
      {
        title: 'The Flying Pterodactyl',
        subject: 'Pterodactyl',
        desc: 'A magnificent flying reptile gliding high above prehistoric mountain peaks and waterfalls.',
        fact: 'Pterodactyl wings were made of tough skin stretched from an extra-long fourth finger!'
      }
    ];
  } else {
    // General procedural varied scenes for any custom topic
    const words = topic.split(' ').filter(Boolean);
    const mainNoun = words[0] || 'Adventure';
    scenes = [
      {
        title: `The Joyful ${mainNoun} Discovery`,
        subject: `${topic} Hero`,
        desc: `A delightful and cheerful scene showcasing ${topic} in a beautiful outdoor landscape.`,
        fact: `Exploring ${topic} inspires creativity and artistic imagination!`
      },
      {
        title: `A Wonderful Day with ${mainNoun}`,
        subject: `${topic} Friends`,
        desc: `Happy friendly characters exploring and having fun together around ${topic}.`,
        fact: `Coloring helps improve concentration, fine motor skills, and hand-eye coordination!`
      },
      {
        title: `The Great ${mainNoun} Adventure`,
        subject: `Magical ${topic}`,
        desc: `An exciting action-filled moment showing the wonders of ${topic} with decorative scenery.`,
        fact: `Every artist sees the world differently—choose any colors you love!`
      },
      {
        title: `The Peaceful ${mainNoun} Meadow`,
        subject: `Calm ${topic}`,
        desc: `A calm, scenic picture of ${topic} surrounded by flowers, trees, and bright sunshine.`,
        fact: `Art and coloring have been practiced by humans for thousands of years!`
      }
    ];
  }

  // Slice or cycle up to count
  const result: PagePlan[] = [];
  for (let i = 0; i < count; i++) {
    const s = scenes[i % scenes.length];
    result.push({
      id: `page_${Date.now()}_${i + 1}`,
      pageNumber: i + 1,
      title: i >= scenes.length ? `${s.title} (Part ${Math.floor(i / scenes.length) + 1})` : s.title,
      subject: s.subject,
      sceneDescription: s.desc,
      imagePrompt: `Coloring book page, black and white line art, pure white background, crisp outlines: ${s.title}, ${s.desc}`,
      educationalCaption: s.fact,
      difficultyNote: gradeInfo.levelName.split(' ')[0],
    });
  }

  return result;
}

// 1. Brainstorm and randomize scenes for the specified topic and standard
app.post('/api/plan-coloring-pages', async (req: Request, res: Response) => {
  const { topic = 'Jungle', standard = 'grade_1_2', count = 3 } = req.body as PlanRequest;
  const pageCount = Math.max(1, Math.min(10, Number(count) || 3));
  const gradeInfo = getGradeGuideline(standard);

  try {

    const prompt = `You are a master children's coloring book author and illustrator planner.
A teacher or parent requested a ${pageCount}-page printable A4 coloring book.
Topic: "${topic}"
Target Grade / Standard: ${gradeInfo.levelName}

Requirements:
1. Brainstorm ${pageCount} DISTINCT and exciting scenes exploring different aspects of the topic "${topic}".
   For example, if the topic is "Jungle":
   - Do NOT just generate 4 monkeys!
   - Vary the subjects: e.g. Page 1: Playful baby tiger with butterfly, Page 2: Chimpanzee swinging from thick liana vines, Page 3: Gentle elephant splashing in river with water lilies, Page 4: Toucan bird perched on branch near jungle waterfall.
   Randomize and select vibrant, varied, charming scenes that kids in this standard love!
2. Tailor strictly to ${gradeInfo.levelName}:
   Line Style instruction: ${gradeInfo.lineStyle}
   Complexity: ${gradeInfo.sceneComplexity}
3. Generate detailed image prompts engineered specifically for coloring book page generation (black and white line art only, clean contours, pure white background, no grayscale shading, no colored fills).
4. Return a valid JSON array of objects with exactly ${pageCount} items.

Format:
[
  {
    "pageNumber": 1,
    "title": "Short Catchy Page Title (e.g. The Playful Bengal Tiger)",
    "subject": "Main subject name (e.g. Bengal Tiger)",
    "sceneDescription": "1-2 sentence lively child-friendly description of what is happening in the picture.",
    "imagePrompt": "Coloring book page for children, black and white line art only, crisp bold black outlines, pure white background, no shading, no grayscale, no color, high contrast, A4 portrait printable: [detailed scene description matching the standard line thickness and elements]",
    "educationalCaption": "A fun 1-sentence kid-friendly educational fact or coloring prompt to print at the bottom of the page.",
    "difficultyNote": "Quick label like 'Bold Outlines • Toddler Friendly' or 'Detailed Contours'"
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.85,
      },
    });

    const responseText = response.text || '[]';
    let pages: any[] = [];
    try {
      pages = JSON.parse(responseText);
    } catch {
      // Clean markdown code blocks if present
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      pages = JSON.parse(cleaned);
    }

    // Format and guarantee structure
    const formattedPages: PagePlan[] = pages.slice(0, pageCount).map((p: any, idx: number) => ({
      id: `page_${Date.now()}_${idx + 1}`,
      pageNumber: p.pageNumber || idx + 1,
      title: p.title || `Coloring Page ${idx + 1}: ${topic}`,
      subject: p.subject || topic,
      sceneDescription: p.sceneDescription || `A wonderful scene featuring ${topic}`,
      imagePrompt: p.imagePrompt || `Coloring book page, black and white line art only, pure white background, crisp outlines: ${p.title || topic}`,
      educationalCaption: p.educationalCaption || `Have fun coloring this exciting ${topic} adventure!`,
      difficultyNote: p.difficultyNote || gradeInfo.levelName.split(' ')[0],
    }));

    res.json({
      success: true,
      topic,
      standard,
      gradeInfo,
      pages: formattedPages,
    });
  } catch (error: any) {
    console.warn('AI planning experienced an issue, activating intelligent scene randomizer:', error?.message);
    const fallbackPages = generateFallbackPages(topic, standard, pageCount, gradeInfo);
    res.json({
      success: true,
      topic,
      standard,
      gradeInfo,
      pages: fallbackPages,
      isFallback: true,
    });
  }
});

// 2. Generate a high-quality printable black-and-white coloring page image
app.post('/api/generate-image', async (req: Request, res: Response) => {
  try {
    const { prompt, standard = 'grade_1_2', title = 'Coloring Page' } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    const gradeInfo = getGradeGuideline(standard);

    // Strict prompt enforcement for pure black-and-white coloring book art in 3:4 portrait (A4 compatible)
    const refinedPrompt = `Black and white coloring book page illustration, clean crisp continuous black ink line art on pure solid white background, high contrast printable line drawing, 0% color, 0% grayscale shading, no tone gradients, clear distinct fillable enclosed line boundaries. Suitable for ${gradeInfo.levelName}. Line specification: ${gradeInfo.lineStyle}. Subject: ${prompt}. Centered portrait composition, printable educational coloring sheet.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [{ text: refinedPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: '3:4',
        },
      },
    });

    let imageUrl: string | null = null;
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          imageUrl = `data:${mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      return res.status(500).json({
        success: false,
        error: 'No image data returned from generation model',
      });
    }

    res.json({
      success: true,
      imageUrl,
      title,
    });
  } catch (error: any) {
    console.error('Error generating coloring page image:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate image',
      details: error.toString(),
    });
  }
});

// 3. Vector SVG line-art generation endpoint using gemini-3.8-flash for instant crisp vectors
app.post('/api/generate-svg-art', async (req: Request, res: Response) => {
  try {
    const { prompt, title = 'Coloring Page', standard = 'grade_1_2' } = req.body;
    const gradeInfo = getGradeGuideline(standard);

    const svgPrompt = `You are an expert vector SVG children's coloring page illustrator.
Generate a valid, standalone <svg> element for a coloring book page of: "${prompt}".
Target Audience: ${gradeInfo.levelName} (${gradeInfo.lineStyle}).

STRICT RULES:
1. Dimensions: viewBox="0 0 600 848" (standard A4 portrait ratio 1:1.414).
2. Background: <rect width="600" height="848" fill="#FFFFFF"/>
3. Style: ONLY black stroke outlines (stroke="#000000", stroke-width="3" or "4", stroke-linecap="round", stroke-linejoin="round") and fill="none" (or fill="#FFFFFF" for layering).
4. NEVER use any colors other than black (#000000) for strokes and white (#FFFFFF) for fills.
5. NO gradients, NO drop shadows, NO gray fills, NO solid black silhouette fills.
6. Make it a charming, complete, rich scene with clean enclosing contours that children can color in.
7. Include decorative page borders or header/footer title line if appropriate.
8. Output ONLY the raw <svg>...</svg> XML string, nothing else. No markdown, no explanations.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: svgPrompt,
    });

    let rawSvg = response.text || '';
    rawSvg = rawSvg.replace(/```xml/g, '').replace(/```svg/g, '').replace(/```/g, '').trim();

    const svgStart = rawSvg.indexOf('<svg');
    const svgEnd = rawSvg.lastIndexOf('</svg>');

    if (svgStart !== -1 && svgEnd !== -1) {
      rawSvg = rawSvg.substring(svgStart, svgEnd + 6);
      res.json({
        success: true,
        svg: rawSvg,
        title,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to extract valid SVG from model output',
      });
    }
  } catch (error: any) {
    console.error('Error generating SVG coloring page:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'SVG generation failed',
    });
  }
});

// Configure Vite middleware in development or static serving in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const PORT = Number(process.env.PORT) || 3000;

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎨 ColorCraft Server running at http://localhost:${PORT}`);
  });
}

startServer();
