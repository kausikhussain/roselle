export interface Reel {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  shadeId: string;
  shadeName: string;
  shadeHex: string;
  price: number;
  duration: string;
  quote: string;
  description: string;
  videoSrc?: string;
  posterSrc?: string;
}

export const ROSELLE_REELS: Reel[] = [
  {
    id: "reel-01",
    number: "01",
    title: "Six on one arm",
    subtitle: "The swatch bar",
    shadeId: "06",
    shadeName: "Mauve Velvet",
    shadeHex: "#854457",
    price: 26.0,
    duration: "0:19",
    quote: "A velvet stroke that glides with zero friction.",
    description: "Multi-shade arm swatch comparison showing the opaque one-swipe density of the Roselle Velvet collection.",
  },
  {
    id: "reel-02",
    number: "02",
    title: "Velvet, two ways",
    subtitle: "Studio pink",
    shadeId: "04",
    shadeName: "Rose Petal",
    shadeHex: "#D95B72",
    price: 26.0,
    duration: "0:15",
    quote: "Dabbed for a blurred petal stain, or swiped for full drama.",
    description: "Demonstrating the dual-texture versatility of the Rose Petal cream formula from soft diffuse French blotting to high-impact pigment.",
  },
  {
    id: "reel-03",
    number: "03",
    title: "Nude, off duty",
    subtitle: "Leather & liner",
    shadeId: "02",
    shadeName: "Barely Blush",
    shadeHex: "#E8A29A",
    price: 24.0,
    duration: "0:29",
    quote: "The only nude that doesn't wash you out in daylight.",
    description: "Minimalist backstage application with brown lip contouring and fresh glazed skin.",
  },
  {
    id: "reel-04",
    number: "04",
    title: "Fuchsia, up close",
    subtitle: "White room",
    shadeId: "05",
    shadeName: "Hot Flamingo",
    shadeHex: "#E62E6B",
    price: 26.0,
    duration: "0:24",
    quote: "Liquid mirror reflection with zero sticky drag.",
    description: "Ultra-macro 4K capture of the hyaluronic acid cushion and reflective shine matrix.",
  },
  {
    id: "reel-05",
    number: "05",
    title: "The eternal red",
    subtitle: "Gold & black",
    shadeId: "03",
    shadeName: "Ruby Rouge",
    shadeHex: "#8F1023",
    price: 28.0,
    duration: "0:27",
    quote: "Pure Parisian cinema in an acoustic click case.",
    description: "A tribute to Golden Age Hollywood red, precision-cut with an angled bullet bevel.",
  },
  {
    id: "reel-06",
    number: "06",
    title: "Love at first swipe",
    subtitle: "Five muses",
    shadeId: "01",
    shadeName: "Cherry Kiss",
    shadeHex: "#B21D3B",
    price: 28.0,
    duration: "0:15",
    quote: "Five faces, one velvet red. Long-wear that still feels like nothing.",
    description: "Diverse skin tones testing Cherry Kiss in direct flash and natural golden-hour daylight.",
  },
];
