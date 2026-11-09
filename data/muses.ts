export interface Muse {
  id: string;
  number: string;
  category: string;
  finish: string;
  title: string;
  blurb: string;
  shadeId: string;
  shadeName: string;
  shadeHex: string;
  price: number;
  imagePrompt: string;
}

export const ROSELLE_MUSES: Muse[] = [
  {
    id: "muse-01",
    number: "01",
    category: "OFF DUTY",
    finish: "SATIN",
    title: "Bare, with bite",
    blurb: "A barely-there nude, worn with chrome and a straight face.",
    shadeId: "02",
    shadeName: "BARELY BLUSH",
    shadeHex: "#E8A29A",
    price: 24.0,
    imagePrompt: "Editorial beauty portrait, golden hour, model holding lipstick, fresh glowing skin, subtle lip gloss nude",
  },
  {
    id: "muse-02",
    number: "02",
    category: "EVENING",
    finish: "VELVET",
    title: "Red carpet, red mouth",
    blurb: "Satin dress, velvet lip. Same red, head to toe.",
    shadeId: "01",
    shadeName: "CHERRY KISS",
    shadeHex: "#B21D3B",
    price: 28.0,
    imagePrompt: "Luxury gala portrait, model in silk gown with bold cherry velvet lipstick",
  },
  {
    id: "muse-03",
    number: "03",
    category: "MACRO",
    finish: "MATTE",
    title: "Hush",
    blurb: "Berry noir, close enough to read the finish.",
    shadeId: "08",
    shadeName: "BERRY NOIR",
    shadeHex: "#521A2A",
    price: 28.0,
    imagePrompt: "Extreme close-up macro portrait of dark berry lips, velvety texture",
  },
  {
    id: "muse-04",
    number: "04",
    category: "PLAY",
    finish: "GLOSS",
    title: "Loud & glossy",
    blurb: "Mirror gloss in hot fuchsia. Laughing is part of the look.",
    shadeId: "05",
    shadeName: "HOT FLAMINGO",
    shadeHex: "#E62E6B",
    price: 26.0,
    imagePrompt: "Joyful high-fashion candid shot of model with vibrant fuchsia lip gloss",
  },
  {
    id: "muse-05",
    number: "05",
    category: "EDITORIAL",
    finish: "MATTE",
    title: "Atelier scarlet",
    blurb: "Precise graphic contouring with classical Parisian restraint.",
    shadeId: "03",
    shadeName: "RUBY ROUGE",
    shadeHex: "#8F1023",
    price: 28.0,
    imagePrompt: "High-contrast couture studio portrait, bold red lipstick, gold jewelry",
  },
  {
    id: "muse-06",
    number: "06",
    category: "PARISIAN",
    finish: "CREAM",
    title: "Morning café blush",
    blurb: "Diffused petal edges blotted with the tip of a ring finger.",
    shadeId: "04",
    shadeName: "ROSE PETAL",
    shadeHex: "#D95B72",
    price: 26.0,
    imagePrompt: "Soft natural light portrait of woman with soft blurred rose lips",
  },
  {
    id: "muse-07",
    number: "07",
    category: "GOLDEN HOUR",
    finish: "SATIN",
    title: "Warm terracotta nectar",
    blurb: "Sun-drenched citrus undertones that radiate warmth.",
    shadeId: "07",
    shadeName: "CORAL CRUSH",
    shadeHex: "#DE5B50",
    price: 25.0,
    imagePrompt: "Mediterranean summer portrait, sun-kissed skin, coral satin lips",
  },
  {
    id: "muse-08",
    number: "08",
    category: "NOCTURNE",
    finish: "VELVET",
    title: "The 90s revival",
    blurb: "Deep smoked mauve contour with a nonchalant modern ease.",
    shadeId: "06",
    shadeName: "MAUVE VELVET",
    shadeHex: "#854457",
    price: 26.0,
    imagePrompt: "90s supermodel studio portrait, muted mauve lipstick, dramatic lighting",
  },
];
