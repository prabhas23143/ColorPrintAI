// High-quality black-and-white vector line art coloring illustrations
// Designed strictly for A4 portrait aspect ratio (viewBox="0 0 600 848")
// 100% printable black stroke outlines (#000000) on pure white (#ffffff) background

export interface PresetIllustration {
  id: string;
  topicTag: string;
  title: string;
  subject: string;
  sceneDescription: string;
  educationalCaption: string;
  difficultyNote: string;
  svg: string;
}

export const PRESET_ILLUSTRATIONS: PresetIllustration[] = [
  // JUNGLE SCENES (specifically matching user request example!)
  {
    id: 'jungle_tiger_1',
    topicTag: 'jungle',
    title: 'The Playful Bengal Tiger',
    subject: 'Bengal Tiger',
    sceneDescription: 'A friendly young tiger cub resting among giant monstera leaves and tropical flowers, watching a butterfly.',
    educationalCaption: 'Did you know? Every tiger in the world has unique stripes, just like human fingerprints!',
    difficultyNote: 'Bold Outlines • Great for Markers',
    svg: `<svg viewBox="0 0 600 848" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="848" fill="#FFFFFF"/>
  <!-- Decorative Frame -->
  <rect x="25" y="25" width="550" height="798" fill="none" stroke="#000000" stroke-width="4" rx="8"/>
  <rect x="33" y="33" width="534" height="782" fill="none" stroke="#000000" stroke-width="1.5" rx="6"/>

  <!-- Jungle Canopy Leaves Top -->
  <path d="M40,50 Q100,120 180,80 Q140,50 40,50 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <path d="M40,50 Q110,80 180,80" fill="none" stroke="#000000" stroke-width="2"/>
  <path d="M560,50 Q480,130 400,90 Q460,50 560,50 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <path d="M560,50 Q480,90 400,90" fill="none" stroke="#000000" stroke-width="2"/>

  <!-- Sun in sky -->
  <circle cx="300" cy="130" r="50" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <path d="M300,65 L300,45 M300,195 L300,215 M235,130 L215,130 M365,130 L385,130 M254,84 L240,70 M346,176 L360,190 M254,176 L240,190 M346,84 L360,70" stroke="#000000" stroke-width="3" stroke-linecap="round"/>

  <!-- Butterfly -->
  <g transform="translate(420, 260)">
    <ellipse cx="0" cy="0" rx="3" ry="16" fill="#000000"/>
    <path d="M-3,-10 Q-25,-30 -40,-15 Q-40,10 -3,0 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
    <path d="M3,-10 Q25,-30 40,-15 Q40,10 3,0 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
    <path d="M-3,2 Q-20,15 -15,30 Q-5,32 -3,12 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
    <path d="M3,2 Q20,15 15,30 Q5,32 3,12 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
    <path d="M-2,-16 Q-10,-28 -14,-32 M2,-16 Q10,-28 14,-32" fill="none" stroke="#000000" stroke-width="2"/>
  </g>

  <!-- Big Monstera Leaves Left -->
  <path d="M35,380 C80,300 190,320 200,430 C205,520 100,560 40,540 Z" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <path d="M35,380 C110,430 200,430" fill="none" stroke="#000000" stroke-width="2.5"/>
  <path d="M120,400 Q150,380 180,385" fill="none" stroke="#000000" stroke-width="2"/>
  <path d="M130,440 Q160,470 185,465" fill="none" stroke="#000000" stroke-width="2"/>

  <!-- Big Monstera Leaves Right -->
  <path d="M565,390 C510,310 410,330 400,440 C395,530 500,570 565,550 Z" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <path d="M565,390 C490,440 400,440" fill="none" stroke="#000000" stroke-width="2.5"/>

  <!-- Main Tiger Character -->
  <!-- Tiger Ears -->
  <ellipse cx="230" cy="340" rx="28" ry="32" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <ellipse cx="230" cy="340" rx="14" ry="18" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>
  <ellipse cx="370" cy="340" rx="28" ry="32" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <ellipse cx="370" cy="340" rx="14" ry="18" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>

  <!-- Tiger Head -->
  <path d="M210,410 C180,410 180,470 215,500 C240,520 270,525 300,525 C330,525 360,520 385,500 C420,470 420,410 390,410 C390,360 350,330 300,330 C250,330 210,360 210,410 Z" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>

  <!-- Tiger Cheeks Fluff -->
  <path d="M185,450 L160,460 L185,480 L165,495 L195,510" fill="none" stroke="#000000" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M415,450 L440,460 L415,480 L435,495 L405,510" fill="none" stroke="#000000" stroke-width="3.5" stroke-linecap="round"/>

  <!-- Forehead Stripes -->
  <path d="M300,340 L300,380" stroke="#000000" stroke-width="4" stroke-linecap="round"/>
  <path d="M280,355 L320,355" stroke="#000000" stroke-width="4" stroke-linecap="round"/>
  <path d="M275,375 L325,375" stroke="#000000" stroke-width="4" stroke-linecap="round"/>
  <!-- Side Face Stripes -->
  <path d="M205,430 L235,440" stroke="#000000" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M200,455 L230,460" stroke="#000000" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M395,430 L365,440" stroke="#000000" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M400,455 L370,460" stroke="#000000" stroke-width="3.5" stroke-linecap="round"/>

  <!-- Tiger Big Cute Eyes -->
  <ellipse cx="255" cy="425" rx="20" ry="24" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <circle cx="260" cy="423" r="10" fill="#000000"/>
  <circle cx="264" cy="418" r="3.5" fill="#FFFFFF"/>
  
  <ellipse cx="345" cy="425" rx="20" ry="24" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <circle cx="340" cy="423" r="10" fill="#000000"/>
  <circle cx="336" cy="418" r="3.5" fill="#FFFFFF"/>

  <!-- Cute Nose and Smile -->
  <polygon points="300,470 286,450 314,450" fill="#FFFFFF" stroke="#000000" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M300,470 L300,485" stroke="#000000" stroke-width="3.5"/>
  <path d="M300,485 Q280,505 265,490" fill="none" stroke="#000000" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M300,485 Q320,505 335,490" fill="none" stroke="#000000" stroke-width="3.5" stroke-linecap="round"/>

  <!-- Whiskers -->
  <path d="M255,475 L200,470 M255,485 L195,490 M255,495 L205,510" stroke="#000000" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M345,475 L400,470 M345,485 L405,490 M345,495 L395,510" stroke="#000000" stroke-width="2.5" stroke-linecap="round"/>

  <!-- Tiger Body -->
  <path d="M230,515 C210,540 180,620 180,690 C180,710 420,710 420,690 C420,620 390,540 370,515 Z" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>
  <!-- Chest white area -->
  <path d="M260,525 Q300,560 340,525 Q350,620 300,640 Q250,620 260,525 Z" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>

  <!-- Front Paws -->
  <rect x="220" y="630" width="50" height="75" rx="24" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <path d="M236,680 L236,702 M253,680 L253,702" stroke="#000000" stroke-width="3" stroke-linecap="round"/>
  
  <rect x="330" y="630" width="50" height="75" rx="24" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <path d="M346,680 L346,702 M363,680 L363,702" stroke="#000000" stroke-width="3" stroke-linecap="round"/>

  <!-- Body Stripes -->
  <path d="M190,580 L225,595 M185,620 L220,630 M410,580 L375,595 M415,620 L380,630" stroke="#000000" stroke-width="3.5" stroke-linecap="round"/>

  <!-- Ground & Jungle Grass -->
  <path d="M40,705 Q150,690 300,700 Q450,710 560,695 L560,780 L40,780 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <path d="M70,700 L85,660 L100,700 M110,695 L125,650 L140,695 M460,700 L475,655 L490,700 M500,698 L515,660 L530,698" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round"/>

  <!-- Wild Flowers -->
  <g transform="translate(100, 725)">
    <circle cx="0" cy="0" r="10" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>
    <circle cx="0" cy="-18" r="9" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
    <circle cx="18" cy="0" r="9" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
    <circle cx="0" cy="18" r="9" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
    <circle cx="-18" cy="0" r="9" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
  </g>
  <g transform="translate(500, 725)">
    <circle cx="0" cy="0" r="10" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>
    <circle cx="0" cy="-18" r="9" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
    <circle cx="18" cy="0" r="9" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
    <circle cx="0" cy="18" r="9" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
    <circle cx="-18" cy="0" r="9" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
  </g>
</svg>`
  },
  {
    id: 'jungle_monkey_2',
    topicTag: 'jungle',
    title: 'The Swinging Jungle Monkey',
    subject: 'Chimpanzee Monkey',
    sceneDescription: 'A cheerful monkey swinging from sturdy jungle lianas with tropical bananas and lush canopy leaves.',
    educationalCaption: 'Did you know? Monkeys use their long tails for balance and climbing trees high in the jungle canopy!',
    difficultyNote: 'Playful Action • Easy Fill Shapes',
    svg: `<svg viewBox="0 0 600 848" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="848" fill="#FFFFFF"/>
  <rect x="25" y="25" width="550" height="798" fill="none" stroke="#000000" stroke-width="4" rx="8"/>
  <rect x="33" y="33" width="534" height="782" fill="none" stroke="#000000" stroke-width="1.5" rx="6"/>

  <!-- Top Vine Across Page -->
  <path d="M40,110 Q200,180 380,100 Q480,60 560,110" fill="none" stroke="#000000" stroke-width="8" stroke-linecap="round"/>
  <path d="M120,135 Q100,200 90,260" fill="none" stroke="#000000" stroke-width="5" stroke-linecap="round"/>
  <path d="M450,85 Q490,160 510,240" fill="none" stroke="#000000" stroke-width="5" stroke-linecap="round"/>

  <!-- Hanging Vines leaves -->
  <path d="M140,135 Q180,160 170,190 Q130,170 140,135 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <path d="M430,95 Q400,120 410,150 Q450,130 430,95 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>

  <!-- Vine monkey is holding -->
  <path d="M280,125 Q270,220 280,310" fill="none" stroke="#000000" stroke-width="7" stroke-linecap="round"/>

  <!-- Monkey Left Arm reaching up to vine -->
  <path d="M280,310 C270,300 240,310 240,340 C240,370 270,380 270,400" fill="none" stroke="#000000" stroke-width="14" stroke-linecap="round"/>
  <!-- Hand gripping -->
  <circle cx="280" cy="308" r="16" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>

  <!-- Monkey Tail -->
  <path d="M380,520 C460,540 500,480 470,410 C450,360 390,370 410,420" fill="none" stroke="#000000" stroke-width="12" stroke-linecap="round"/>

  <!-- Monkey Ears -->
  <circle cx="225" cy="360" r="28" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <circle cx="225" cy="360" r="16" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>
  <circle cx="375" cy="360" r="28" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <circle cx="375" cy="360" r="16" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>

  <!-- Monkey Head -->
  <ellipse cx="300" cy="370" rx="65" ry="58" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>
  
  <!-- Face Mask Area -->
  <path d="M255,365 C255,340 280,335 300,350 C320,335 345,340 345,365 C345,410 255,410 255,365 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>

  <!-- Eyes -->
  <circle cx="280" cy="360" r="12" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <circle cx="283" cy="360" r="6" fill="#000000"/>
  <circle cx="285" cy="357" r="2" fill="#FFFFFF"/>
  <circle cx="320" cy="360" r="12" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <circle cx="317" cy="360" r="6" fill="#000000"/>
  <circle cx="315" cy="357" r="2" fill="#FFFFFF"/>

  <!-- Snout & Big Grin -->
  <ellipse cx="300" cy="395" rx="38" ry="26" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <ellipse cx="294" cy="385" rx="3" ry="5" fill="#000000"/>
  <ellipse cx="306" cy="385" rx="3" ry="5" fill="#000000"/>
  <path d="M275,398 Q300,422 325,398" fill="none" stroke="#000000" stroke-width="3.5" stroke-linecap="round"/>

  <!-- Monkey Body -->
  <ellipse cx="310" cy="485" rx="60" ry="75" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>
  <ellipse cx="310" cy="495" rx="40" ry="50" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>

  <!-- Right Hand holding Banana -->
  <path d="M350,440 C390,450 410,420 400,390" fill="none" stroke="#000000" stroke-width="13" stroke-linecap="round"/>
  <circle cx="400" cy="385" r="15" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <!-- Banana -->
  <path d="M385,360 Q430,370 425,415 Q415,395 385,360 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>

  <!-- Legs -->
  <path d="M275,540 C260,590 230,600 220,640" fill="none" stroke="#000000" stroke-width="14" stroke-linecap="round"/>
  <ellipse cx="215" cy="645" rx="20" ry="14" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>

  <path d="M345,540 C360,590 380,600 390,640" fill="none" stroke="#000000" stroke-width="14" stroke-linecap="round"/>
  <ellipse cx="395" cy="645" rx="20" ry="14" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>

  <!-- Jungle Palm & Tree base at bottom -->
  <path d="M40,710 Q180,680 320,705 Q450,725 560,700 L560,780 L40,780 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <!-- Giant tropical ferns bottom left -->
  <path d="M40,680 Q120,620 160,650 Q100,710 40,680 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <path d="M40,730 Q140,690 190,730 Q120,770 40,730 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>

  <!-- Banana bunch bottom right -->
  <g transform="translate(480, 720)">
    <path d="M-20,-10 Q10,-35 40,-10 Q15,-10 -20,-10 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
    <path d="M-25,10 Q5,-15 35,10 Q10,10 -25,10 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
    <path d="M-30,30 Q0,5 30,30 Q5,30 -30,30 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  </g>
</svg>`
  },
  {
    id: 'jungle_elephant_3',
    topicTag: 'jungle',
    title: 'The Gentle River Elephant',
    subject: 'Baby Elephant',
    sceneDescription: 'A cute young elephant splashing water joyfully with its trunk beside a jungle river with lily pads.',
    educationalCaption: 'Did you know? An elephant’s trunk has over 40,000 muscles and can suck up several gallons of water at once!',
    difficultyNote: 'Clear Contours • Big Fun Areas',
    svg: `<svg viewBox="0 0 600 848" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="848" fill="#FFFFFF"/>
  <rect x="25" y="25" width="550" height="798" fill="none" stroke="#000000" stroke-width="4" rx="8"/>
  <rect x="33" y="33" width="534" height="782" fill="none" stroke="#000000" stroke-width="1.5" rx="6"/>

  <!-- Distant Jungle Mountains -->
  <path d="M40,280 L160,180 L290,290 L420,170 L560,280" fill="none" stroke="#000000" stroke-width="3.5"/>

  <!-- Fluffy Clouds -->
  <path d="M90,140 C80,120 110,90 140,100 C150,80 190,80 200,100 C220,95 240,115 230,135 C240,155 210,165 190,160 C170,170 140,170 120,160 C100,165 80,155 90,140 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <path d="M370,120 C360,100 390,70 420,80 C430,60 470,60 480,80 C500,75 520,95 510,115 C520,135 490,145 470,140 C450,150 420,150 400,140 C380,145 360,135 370,120 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>

  <!-- Elephant Huge Cute Ears -->
  <path d="M220,380 C140,320 110,480 180,540 C210,560 240,540 240,500 Z" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>
  <path d="M380,380 C460,320 490,480 420,540 C390,560 360,540 360,500 Z" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>

  <!-- Elephant Body -->
  <ellipse cx="300" cy="530" rx="120" ry="110" fill="#FFFFFF" stroke="#000000" stroke-width="5"/>

  <!-- Elephant Head -->
  <circle cx="300" cy="420" r="75" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>

  <!-- Elephant Cute Eyes -->
  <ellipse cx="265" cy="405" rx="14" ry="18" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <circle cx="267" cy="405" r="7" fill="#000000"/>
  <circle cx="270" cy="401" r="2.5" fill="#FFFFFF"/>

  <ellipse cx="335" cy="405" rx="14" ry="18" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <circle cx="333" cy="405" r="7" fill="#000000"/>
  <circle cx="330" cy="401" r="2.5" fill="#FFFFFF"/>

  <!-- Little Head Tuft -->
  <path d="M295,345 L292,320 M300,345 L300,315 M305,345 L308,320" stroke="#000000" stroke-width="3" stroke-linecap="round"/>

  <!-- Elephant Trunk Curled Upwards Joyfully -->
  <path d="M290,450 C280,500 260,550 280,580 C300,600 340,590 350,550 C360,510 330,490 320,490 C300,490 300,530 320,540" fill="none" stroke="#000000" stroke-width="16" stroke-linecap="round"/>
  <!-- Wrinkle lines on trunk -->
  <path d="M272,485 L288,482 M270,510 L286,508 M272,535 L288,532" stroke="#000000" stroke-width="2.5" stroke-linecap="round"/>

  <!-- Water Drops Sprayed from Trunk -->
  <path d="M350,440 Q360,420 350,400 Q340,420 350,440 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <path d="M380,420 Q390,395 380,375 Q370,395 380,420 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <path d="M410,450 Q420,430 410,410 Q400,430 410,450 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <circle cx="330" cy="380" r="6" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>
  <circle cx="395" cy="470" r="5" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>

  <!-- Legs -->
  <rect x="230" y="580" width="45" height="110" rx="20" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>
  <path d="M236,660 Q242,650 248,660 M248,660 Q254,650 260,660 M260,660 Q266,650 272,660" fill="none" stroke="#000000" stroke-width="3"/>

  <rect x="325" y="580" width="45" height="110" rx="20" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>
  <path d="M331,660 Q337,650 343,660 M343,660 Q349,650 355,660 M355,660 Q361,650 367,660" fill="none" stroke="#000000" stroke-width="3"/>

  <!-- River and Water Ripples -->
  <path d="M40,670 C160,640 440,640 560,670 L560,780 L40,780 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <path d="M90,700 Q150,690 210,700" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round"/>
  <path d="M390,700 Q460,690 530,700" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round"/>
  <path d="M150,740 Q220,730 290,740" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round"/>

  <!-- Water Lily Pad with Flower -->
  <g transform="translate(140, 725)">
    <path d="M-40,0 C-40,-25 40,-25 40,0 C40,25 -5,25 0,0 C5,25 -40,25 -40,0 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
    <!-- Lotus Flower -->
    <path d="M-15,-5 C-25,-25 0,-35 0,-15 C0,-35 25,-25 15,-5 Z" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>
  </g>
</svg>`
  },
  {
    id: 'jungle_toucan_4',
    topicTag: 'jungle',
    title: 'The Rainforest Toucan',
    subject: 'Toucan Bird',
    sceneDescription: 'A magnificent toucan with a giant striped bill sitting gracefully on a blooming jungle branch with hibiscus flowers.',
    educationalCaption: 'Did you know? A toucan’s colorful beak looks heavy, but it is actually hollow and lightweight like a honeycomb!',
    difficultyNote: 'Gorgeous Beak • Clean Patterns',
    svg: `<svg viewBox="0 0 600 848" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="848" fill="#FFFFFF"/>
  <rect x="25" y="25" width="550" height="798" fill="none" stroke="#000000" stroke-width="4" rx="8"/>
  <rect x="33" y="33" width="534" height="782" fill="none" stroke="#000000" stroke-width="1.5" rx="6"/>

  <!-- Sun Rays & Tropical Sky -->
  <circle cx="120" cy="120" r="55" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <path d="M120,40 L120,20 M120,200 L120,220 M40,120 L20,120 M200,120 L220,120 M65,65 L50,50 M175,175 L190,190 M65,175 L50,190 M175,65 L190,50" stroke="#000000" stroke-width="3" stroke-linecap="round"/>

  <!-- Thick Jungle Branch -->
  <path d="M40,540 C180,510 360,530 560,490 L560,530 C360,570 180,550 40,580 Z" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>
  <!-- Branch Texture -->
  <path d="M120,535 Q200,530 280,540 M340,535 Q440,520 520,515" fill="none" stroke="#000000" stroke-width="2"/>

  <!-- Big Toucan Body -->
  <path d="M220,320 C220,260 270,220 320,220 C360,220 390,250 390,320 C390,440 370,520 330,550 C290,550 220,500 220,320 Z" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>

  <!-- White Chest Patch -->
  <path d="M250,270 C280,260 330,260 340,290 C350,330 330,390 280,410 C240,410 235,340 250,270 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>

  <!-- Long Tail Feathers -->
  <path d="M270,530 L250,680 L280,690 L295,540" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <path d="M285,530 L275,700 L305,710 L315,540" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>

  <!-- Eye Patch & Big Cute Eye -->
  <circle cx="305" cy="285" r="22" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <circle cx="305" cy="285" r="11" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <circle cx="305" cy="285" r="6" fill="#000000"/>
  <circle cx="307" cy="282" r="2" fill="#FFFFFF"/>

  <!-- Massive Curved Bill / Beak -->
  <path d="M330,250 C410,240 510,290 520,350 C480,390 390,360 330,340 Z" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>
  <!-- Beak dividing mouth line -->
  <path d="M330,300 C410,305 480,325 520,350" fill="none" stroke="#000000" stroke-width="3"/>
  <!-- Decorative Beak Stripes to Color In -->
  <path d="M380,255 L380,320" stroke="#000000" stroke-width="3.5"/>
  <path d="M430,270 L430,335" stroke="#000000" stroke-width="3.5"/>
  <path d="M475,295 L475,345" stroke="#000000" stroke-width="3.5"/>

  <!-- Bird Feet gripping Branch -->
  <ellipse cx="280" cy="535" rx="12" ry="16" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <ellipse cx="320" cy="530" rx="12" ry="16" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>

  <!-- Tropical Hibiscus Flowers on Branch -->
  <g transform="translate(180, 520)">
    <circle cx="0" cy="0" r="12" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
    <path d="M-28,-10 C-40,-35 -15,-45 0,-25 C15,-45 40,-35 28,-10 C45,10 25,35 0,25 C-25,35 -45,10 -28,-10 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  </g>
  <g transform="translate(460, 490)">
    <circle cx="0" cy="0" r="10" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
    <path d="M-22,-8 C-32,-28 -12,-36 0,-20 C12,-36 32,-28 22,-8 C36,8 20,28 0,20 C-20,28 -36,8 -22,-8 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  </g>

  <!-- Giant Hanging Leaves at Bottom -->
  <path d="M80,570 C140,650 180,740 160,780 C120,750 70,680 80,570 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <path d="M420,545 C480,620 520,720 500,770 C460,730 420,650 420,545 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
</svg>`
  },

  // OCEAN SCENES
  {
    id: 'ocean_dolphin_1',
    topicTag: 'ocean',
    title: 'The Joyful Leaping Dolphin',
    subject: 'Bottle-nose Dolphin',
    sceneDescription: 'A playful dolphin leaping over gentle sea waves with smiling sun and seabirds.',
    educationalCaption: 'Did you know? Dolphins communicate with each other using a special language of clicks, whistles, and squeaks!',
    difficultyNote: 'Flowing Waves • Easy Shapes',
    svg: `<svg viewBox="0 0 600 848" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="848" fill="#FFFFFF"/>
  <rect x="25" y="25" width="550" height="798" fill="none" stroke="#000000" stroke-width="4" rx="8"/>
  <rect x="33" y="33" width="534" height="782" fill="none" stroke="#000000" stroke-width="1.5" rx="6"/>

  <!-- Warm Sun -->
  <circle cx="470" cy="130" r="45" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <path d="M470,70 L470,50 M470,190 L470,210 M410,130 L390,130 M530,130 L550,130 M428,88 L415,75 M512,172 L525,185 M428,172 L415,185 M512,88 L525,75" stroke="#000000" stroke-width="3" stroke-linecap="round"/>

  <!-- Flying Seagulls -->
  <path d="M120,130 Q140,110 160,130 Q180,110 200,130" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round"/>
  <path d="M230,170 Q245,155 260,170 Q275,155 290,170" fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round"/>

  <!-- Leaping Dolphin Body -->
  <path d="M160,460 C180,310 290,220 420,240 C460,250 480,280 470,300 C450,330 380,380 290,440 C220,490 190,520 160,460 Z" fill="#FFFFFF" stroke="#000000" stroke-width="5"/>

  <!-- Dolphin Beak & Smile -->
  <path d="M460,265 C480,270 500,280 495,290 C480,295 465,290 450,285" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <path d="M455,285 Q470,295 485,285" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round"/>

  <!-- Cute Eye -->
  <circle cx="430" cy="275" r="10" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <circle cx="432" cy="275" r="5" fill="#000000"/>
  <circle cx="434" cy="273" r="1.5" fill="#FFFFFF"/>

  <!-- Blowhole -->
  <ellipse cx="380" cy="245" rx="4" ry="2" fill="#000000"/>

  <!-- Dorsal Fin (Top) -->
  <path d="M340,230 C350,180 390,190 385,235 Z" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>

  <!-- Flippers (Pectoral) -->
  <path d="M340,360 C370,410 395,430 390,440 C380,445 355,420 330,380 Z" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>

  <!-- Fluke / Tail -->
  <path d="M165,475 C130,460 90,430 95,410 C115,415 145,445 160,470 C165,490 145,520 120,535 C105,510 135,485 165,475 Z" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>

  <!-- Water Splash around Dolphin -->
  <path d="M180,510 Q210,480 200,450 Q230,470 230,510" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <circle cx="215" cy="430" r="6" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>
  <circle cx="170" cy="420" r="5" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>
  <circle cx="240" cy="450" r="4" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>

  <!-- Big Ocean Waves -->
  <path d="M40,560 Q120,500 200,560 Q280,620 360,560 Q440,500 520,560 L560,560 L560,780 L40,780 Z" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <path d="M40,640 Q130,580 220,640 Q310,700 400,640 Q490,580 560,630" fill="none" stroke="#000000" stroke-width="3.5"/>
  <path d="M40,710 Q140,660 240,710 Q340,760 440,710 Q500,680 560,705" fill="none" stroke="#000000" stroke-width="3.5"/>

  <!-- Friendly Fish in Wave -->
  <g transform="translate(140, 680)">
    <path d="M-25,0 Q0,-18 25,0 Q0,18 -25,0 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
    <polygon points="-25,0 -40,-12 -40,12" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
    <circle cx="15" cy="-2" r="3" fill="#000000"/>
  </g>
  <g transform="translate(460, 725)">
    <path d="M-20,0 Q0,-14 20,0 Q0,14 -20,0 Z" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>
    <polygon points="-20,0 -32,-9 -32,9" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>
    <circle cx="12" cy="-2" r="2.5" fill="#000000"/>
  </g>
</svg>`
  },

  // SPACE SCENES
  {
    id: 'space_astronaut_1',
    topicTag: 'space',
    title: 'The Brave Space Explorer',
    subject: 'Astronaut & Moon',
    sceneDescription: 'A courageous astronaut floating happily near the moon, pointing toward ringed planet Saturn and distant stars.',
    educationalCaption: 'Did you know? Because there is no wind or rain on the moon, astronaut footprints will stay there for millions of years!',
    difficultyNote: 'Cosmic Adventure • Fun Details',
    svg: `<svg viewBox="0 0 600 848" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="848" fill="#FFFFFF"/>
  <rect x="25" y="25" width="550" height="798" fill="none" stroke="#000000" stroke-width="4" rx="8"/>
  <rect x="33" y="33" width="534" height="782" fill="none" stroke="#000000" stroke-width="1.5" rx="6"/>

  <!-- Stars across space -->
  <g stroke="#000000" stroke-width="2.5" fill="#FFFFFF">
    <!-- Star 1 -->
    <path d="M100,100 L105,115 L120,120 L105,125 L100,140 L95,125 L80,120 L95,115 Z"/>
    <!-- Star 2 -->
    <path d="M480,110 L484,122 L496,126 L484,130 L480,142 L476,130 L464,126 L476,122 Z"/>
    <!-- Star 3 -->
    <path d="M140,320 L144,332 L156,336 L144,340 L140,352 L136,340 L124,336 L136,332 Z"/>
    <!-- Star 4 -->
    <path d="M500,420 L505,435 L520,440 L505,445 L500,460 L495,445 L480,440 L495,435 Z"/>
  </g>

  <!-- Saturn Planet Top Right -->
  <g transform="translate(440, 220)">
    <circle cx="0" cy="0" r="45" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
    <ellipse cx="0" cy="0" rx="90" ry="24" fill="none" stroke="#000000" stroke-width="4.5"/>
    <ellipse cx="0" cy="0" rx="78" ry="18" fill="none" stroke="#000000" stroke-width="2.5"/>
  </g>

  <!-- Astronaut Helmet -->
  <rect x="230" y="220" width="140" height="130" rx="55" fill="#FFFFFF" stroke="#000000" stroke-width="5"/>
  <!-- Helmet Visor -->
  <rect x="250" y="245" width="100" height="75" rx="35" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <!-- Visor Reflection -->
  <path d="M270,265 Q290,255 310,260" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round"/>

  <!-- Helmet Antenna -->
  <line x1="300" y1="220" x2="300" y2="180" stroke="#000000" stroke-width="4"/>
  <circle cx="300" cy="175" r="8" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>

  <!-- Astronaut Body Suit -->
  <rect x="235" y="340" width="130" height="140" rx="40" fill="#FFFFFF" stroke="#000000" stroke-width="5"/>
  <!-- Chest Control Box -->
  <rect x="270" y="375" width="60" height="50" rx="10" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <circle cx="285" cy="395" r="6" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>
  <circle cx="305" cy="395" r="6" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>
  <line x1="280" y1="412" x2="315" y2="412" stroke="#000000" stroke-width="3"/>

  <!-- Oxygen Backpack -->
  <rect x="200" y="320" width="35" height="150" rx="15" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>
  <rect x="365" y="320" width="35" height="150" rx="15" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>

  <!-- Floating Arms & Gloves -->
  <!-- Left Arm waving -->
  <path d="M235,360 C180,340 140,280 150,250" fill="none" stroke="#000000" stroke-width="20" stroke-linecap="round"/>
  <circle cx="150" cy="245" r="18" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <path d="M140,240 L135,225" stroke="#000000" stroke-width="4" stroke-linecap="round"/>

  <!-- Right Arm with Flag -->
  <path d="M365,360 C420,380 440,430 435,460" fill="none" stroke="#000000" stroke-width="20" stroke-linecap="round"/>
  <circle cx="435" cy="465" r="18" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <!-- Flag Pole & Flag -->
  <line x1="435" y1="360" x2="435" y2="520" stroke="#000000" stroke-width="4"/>
  <polygon points="435,360 515,385 435,410" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>

  <!-- Legs & Boots -->
  <path d="M265,475 L250,580 L230,590" fill="none" stroke="#000000" stroke-width="22" stroke-linecap="round"/>
  <ellipse cx="230" cy="595" rx="25" ry="18" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>

  <path d="M335,475 L350,580 L370,590" fill="none" stroke="#000000" stroke-width="22" stroke-linecap="round"/>
  <ellipse cx="370" cy="595" rx="25" ry="18" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>

  <!-- Tether Line -->
  <path d="M210,430 Q160,500 120,460 Q80,420 50,470" fill="none" stroke="#000000" stroke-width="4"/>

  <!-- Moon Surface & Craters at Bottom -->
  <path d="M40,680 C180,620 420,620 560,680 L560,780 L40,780 Z" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>
  <!-- Craters -->
  <ellipse cx="140" cy="710" rx="35" ry="15" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <ellipse cx="310" cy="670" rx="45" ry="18" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <ellipse cx="480" cy="720" rx="30" ry="12" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
</svg>`
  },

  // DINOSAUR SCENES
  {
    id: 'dino_trex_1',
    topicTag: 'dinosaurs',
    title: 'The Friendly Prehistoric T-Rex',
    subject: 'Tyrannosaurus Rex',
    sceneDescription: 'A cheerful smiling T-Rex dinosaur stomping through prehistoric fern bushes with ancient volcanoes in the background.',
    educationalCaption: 'Did you know? Tyrannosaurus Rex had teeth as long as large bananas, measuring up to 12 inches!',
    difficultyNote: 'Bold Dinosaur • Prehistoric Adventure',
    svg: `<svg viewBox="0 0 600 848" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="848" fill="#FFFFFF"/>
  <rect x="25" y="25" width="550" height="798" fill="none" stroke="#000000" stroke-width="4" rx="8"/>
  <rect x="33" y="33" width="534" height="782" fill="none" stroke="#000000" stroke-width="1.5" rx="6"/>

  <!-- Volcano in Background -->
  <polygon points="120,340 180,210 240,340" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <path d="M170,210 Q180,180 175,150 Q185,120 180,90" fill="none" stroke="#000000" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M190,210 Q200,180 205,150" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round"/>

  <!-- Sun -->
  <circle cx="480" cy="130" r="45" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <path d="M480,70 L480,50 M480,190 L480,210 M420,130 L400,130 M540,130 L560,130" stroke="#000000" stroke-width="3" stroke-linecap="round"/>

  <!-- Flying Pterodactyl in Sky -->
  <path d="M300,140 Q330,120 360,130 L375,120 L365,140 Q395,130 420,150 L360,155 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>

  <!-- T-Rex Tail -->
  <path d="M410,480 C500,490 530,440 540,390 C510,420 460,430 400,450" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>

  <!-- T-Rex Body -->
  <ellipse cx="320" cy="460" rx="95" ry="110" fill="#FFFFFF" stroke="#000000" stroke-width="5"/>
  <!-- Belly Curve -->
  <path d="M250,420 Q280,540 370,520" fill="none" stroke="#000000" stroke-width="3"/>

  <!-- T-Rex Head and Snout -->
  <path d="M280,350 C260,260 210,230 150,250 C110,265 100,310 130,340 C170,360 210,360 270,390 Z" fill="#FFFFFF" stroke="#000000" stroke-width="5"/>

  <!-- Big Friendly Eye -->
  <circle cx="185" cy="275" r="16" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <circle cx="187" cy="275" r="8" fill="#000000"/>
  <circle cx="190" cy="272" r="2.5" fill="#FFFFFF"/>

  <!-- Smiling Teeth -->
  <path d="M125,320 Q160,345 200,335" fill="none" stroke="#000000" stroke-width="4" stroke-linecap="round"/>
  <polygon points="140,325 145,335 150,326" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
  <polygon points="155,328 160,338 165,329" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
  <polygon points="170,330 175,340 180,331" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>

  <!-- Tiny Cute Arms -->
  <path d="M260,420 Q225,430 220,450" fill="none" stroke="#000000" stroke-width="12" stroke-linecap="round"/>
  <polygon points="215,445 210,458 222,455" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>

  <!-- Back Plates / Spikes -->
  <polygon points="280,300 295,280 300,305" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <polygon points="320,340 340,320 342,350" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <polygon points="365,375 385,355 388,385" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <polygon points="410,410 430,390 433,420" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>

  <!-- Big Stomping Legs & Claws -->
  <path d="M310,540 C320,590 310,640 280,670" fill="none" stroke="#000000" stroke-width="24" stroke-linecap="round"/>
  <!-- Left Foot -->
  <ellipse cx="270" cy="675" rx="35" ry="18" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <polygon points="240,670 230,685 245,682" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>
  <polygon points="255,673 250,688 262,684" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>
  <polygon points="275,673 275,688 285,684" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>

  <path d="M380,520 C400,580 400,620 420,660" fill="none" stroke="#000000" stroke-width="24" stroke-linecap="round"/>
  <!-- Right Foot -->
  <ellipse cx="425" cy="665" rx="35" ry="18" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <polygon points="400,660 395,675 410,672" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>
  <polygon points="415,663 415,678 425,674" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>
  <polygon points="435,663 440,678 448,674" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>

  <!-- Prehistoric Fern Leaves -->
  <path d="M40,680 Q100,620 140,660 Q80,720 40,680 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <path d="M460,680 Q520,610 560,650 Q510,720 460,680 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
  <!-- Ground -->
  <path d="M40,700 Q150,685 300,700 Q450,715 560,700 L560,780 L40,780 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3.5"/>
</svg>`
  },

  // FAIRYTALE CASTLE
  {
    id: 'fairytale_castle_1',
    topicTag: 'fairytale',
    title: 'The Enchanted Fairytale Castle',
    subject: 'Royal Castle & Rainbow',
    sceneDescription: 'A majestic fairy tale castle perched atop a blooming hill under a magnificent rainbow with flying birds.',
    educationalCaption: 'Did you know? In old times, castle towers were built round so there were no weak corners for walls to crumble!',
    difficultyNote: 'Magical Towers • Beautiful Flags',
    svg: `<svg viewBox="0 0 600 848" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="848" fill="#FFFFFF"/>
  <rect x="25" y="25" width="550" height="798" fill="none" stroke="#000000" stroke-width="4" rx="8"/>
  <rect x="33" y="33" width="534" height="782" fill="none" stroke="#000000" stroke-width="1.5" rx="6"/>

  <!-- Rainbow Across Sky -->
  <path d="M60,340 C100,100 500,100 540,340" fill="none" stroke="#000000" stroke-width="4"/>
  <path d="M80,340 C120,130 480,130 520,340" fill="none" stroke="#000000" stroke-width="3"/>
  <path d="M100,340 C140,160 460,160 500,340" fill="none" stroke="#000000" stroke-width="3"/>

  <!-- Clouds at base of rainbow -->
  <path d="M40,330 C40,300 70,290 90,300 C110,290 140,300 130,330 C150,340 140,370 120,370 L50,370 C30,360 30,340 40,330 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <path d="M470,330 C470,300 500,290 520,300 C540,290 560,300 560,330 C565,340 550,370 530,370 L480,370 C460,360 460,340 470,330 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>

  <!-- Central Great Tower -->
  <rect x="250" y="270" width="100" height="180" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>
  <!-- Central Spire Cone Roof -->
  <polygon points="300,160 235,270 365,270" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>
  <line x1="300" y1="160" x2="300" y2="120" stroke="#000000" stroke-width="3"/>
  <polygon points="300,120 335,135 300,150" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>

  <!-- Left Tower -->
  <rect x="150" y="320" width="70" height="180" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <polygon points="185,220 135,320 235,320" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <line x1="185" y1="220" x2="185" y2="190" stroke="#000000" stroke-width="2.5"/>
  <polygon points="185,190 215,202 185,214" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>

  <!-- Right Tower -->
  <rect x="380" y="320" width="70" height="180" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <polygon points="415,220 365,320 465,320" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <line x1="415" y1="220" x2="415" y2="190" stroke="#000000" stroke-width="2.5"/>
  <polygon points="415,190 445,202 415,214" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>

  <!-- Castle Battlements / Crenellations -->
  <rect x="220" y="380" width="160" height="120" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>
  <path d="M220,380 L220,365 L240,365 L240,380 L260,380 L260,365 L280,365 L280,380 L300,380 L300,365 L320,365 L320,380 L340,380 L340,365 L360,365 L360,380 L380,380" fill="none" stroke="#000000" stroke-width="3"/>

  <!-- Arched Windows -->
  <path d="M285,320 A15,15 0 0,1 315,320 L315,350 L285,350 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <path d="M175,370 A10,10 0 0,1 195,370 L195,395 L175,395 Z" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>
  <path d="M405,370 A10,10 0 0,1 425,370 L425,395 L405,395 Z" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>

  <!-- Great Arched Wooden Gate -->
  <path d="M275,440 A25,25 0 0,1 325,440 L325,500 L275,500 Z" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  <line x1="300" y1="415" x2="300" y2="500" stroke="#000000" stroke-width="3"/>
  <path d="M280,450 L320,450 M280,475 L320,475" stroke="#000000" stroke-width="2.5"/>

  <!-- Castle Hill with Stone Texture -->
  <path d="M40,560 C180,480 420,480 560,560 L560,780 L40,780 Z" fill="#FFFFFF" stroke="#000000" stroke-width="4.5"/>

  <!-- Winding Path to Castle -->
  <path d="M275,500 Q260,560 300,620 Q350,680 280,780" fill="none" stroke="#000000" stroke-width="3"/>
  <path d="M325,500 Q310,560 360,620 Q420,680 340,780" fill="none" stroke="#000000" stroke-width="3"/>

  <!-- Flowers on the Hill -->
  <g transform="translate(120, 640)">
    <circle cx="0" cy="0" r="8" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
    <circle cx="0" cy="-14" r="6" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
    <circle cx="14" cy="0" r="6" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
    <circle cx="0" cy="14" r="6" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
    <circle cx="-14" cy="0" r="6" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
  </g>
  <g transform="translate(480, 650)">
    <circle cx="0" cy="0" r="8" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
    <circle cx="0" cy="-14" r="6" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
    <circle cx="14" cy="0" r="6" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
    <circle cx="0" cy="14" r="6" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
    <circle cx="-14" cy="0" r="6" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
  </g>
</svg>`
  }
];

// Helper to find matching preset or generate dynamic fallback
export function getPresetForTopicAndScene(topic: string, index: number): PresetIllustration {
  const lower = topic.toLowerCase();
  let matches = PRESET_ILLUSTRATIONS.filter(p => lower.includes(p.topicTag));

  if (matches.length === 0) {
    // If no direct tag matches, use general presets
    matches = PRESET_ILLUSTRATIONS;
  }

  // Pick index modulo matching count to cycle through varied scenes
  return matches[index % matches.length];
}
