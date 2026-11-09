# ROSELLE — Visual & Multimedia Asset Requirements

**Document:** `docs/ASSET_REQUIREMENTS.md`  
**Brand:** ROSELLE (Roselle Lip Lab)  

---

## 1. Asset Strategy & Optimization Policy

Roselle combines **procedural WebGL 3D graphics** with **curated high-resolution editorial photography, video, and vector graphics**:
1. **Procedural 3D Lipstick:** Rendered in Three.js directly via code (lathed geometries, PBR materials, dynamic vertex attributes). No 3D model downloads needed for the core lipstick, ensuring instantaneous initial load times.
2. **Procedural Swirl & Petals:** Ribbon spline curves and instanced petal meshes generated in WebGL memory.
3. **Photography & Lookbooks:** High-definition editorial portraiture and product stills optimized into WebP format with responsive srcset dimensions.
4. **Cinematic Video:** Lightweight MP4 clips with H.264/AAC encoding, pre-buffered with `playsInline` and silent muted looping.

---

## 2. Asset Inventory & Mapping

| Asset ID | Location / Usage | Visual Description | Format & Spec |
|----------|------------------|--------------------|---------------|
| `roselle-logo.svg` | Header / Footer / Packaging | Roselle custom serif logotype with stylized botanical rose crest | Clean Vector SVG |
| `muse-01.webp` | Muse Arc (Card 01) | Off-duty model holding lipstick, fresh glowing skin | 800x1200 WebP |
| `muse-02.webp` | Muse Arc (Card 02) | Evening velvet red carpet look, crimson satin | 800x1200 WebP |
| `muse-03.webp` | Muse Arc (Card 03) | Extreme macro portrait showing berry noir velvet texture | 800x1200 WebP |
| `muse-04.webp` | Muse Arc (Card 04) | Playful laughing muse with glossy hot flamingo lips | 800x1200 WebP |
| `muse-film-hero.mp4` / `poster.webp` | Muse Film Center Stage | Editorial campaign video of muse applying velvet bullet | 1080p / 720p H.264 MP4 + Poster |
| `reel-01.mp4` to `reel-06.mp4` | Lip Reels Coverflow | 9:16 vertical model swatch, blotting, and wear tests | 720x1280 vertical MP4 |
| `prop-cherry.webp` | Swatch Bar Prop | Glossy black cherries with stem | Transparent PNG / WebP |
| `prop-heart.webp` | Swatch Bar Prop | Translucent blown-glass pink heart | Transparent PNG / WebP |
| `prop-powder.webp` | Swatch Bar Prop | Soft silk powder compact | Transparent PNG / WebP |
| `ingredient-pigment.webp` | Inside Chapter 3 | Orbital pure micronized crimson pigment powder | Transparent PNG / WebP |
| `ingredient-shea.webp` | Inside Chapter 3 | Whipped raw organic shea butter dollop | Transparent PNG / WebP |
| `ingredient-vit-e.webp` | Inside Chapter 3 | Glowing golden antioxidant softgel capsules | Transparent PNG / WebP |
| `ingredient-rosehip.webp` | Inside Chapter 3 | Fresh wild rose-hip berries with leaves | Transparent PNG / WebP |

---

## 3. Responsive Breakpoints & Fallbacks
- **Desktop (1440px+):** Full WebGL procedural scenes, dynamic shadows, high-res textures, full video playback.
- **Tablet (768px - 1024px):** Scaled 3D camera FOV, adjusted ribbon bounds, optimized touch drag gestures.
- **Mobile (< 768px):** Tailored portrait layouts, vertical stacking, optimized WebGL pixel ratio (`Math.min(window.devicePixelRatio, 2)`), touch swipe controls for reels and arc.
- **Low Power Mode / Reduced Motion:** Graceful fallback disabling continuous ambient petal rotation, replacing video background glow with static gradient blur, and honoring `prefers-reduced-motion`.
