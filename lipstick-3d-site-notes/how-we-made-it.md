# How we made it

Roselle is a made-up lipstick brand, built as a scroll-driven 3D concept site. The idea came first, then the sections, then the pieces that make them move.

## Stack
- **Vite** for the dev server and the build.
- **Three.js** for every 3D scene (lipstick, props, swirl).
- **GSAP + ScrollTrigger** to tie scroll position to animation.
- **Lenis** for smooth scrolling.
- **Cloudflare Workers (static assets)** to host it, with a tiny worker that serves videos with Range requests so iOS Safari can play them.
- Plain JavaScript and CSS. No framework.

## 1. Start with the idea
We picked a theme (a Black Friday lipstick launch), a name, a palette (ruby red, wine and rose gold) and a type pair (Bodoni Moda and Inter). Then we listed the sections we wanted the page to walk through, one idea each: sale, anatomy of a lipstick, swirl, muse portraits, film, shop, reels, shade finder and an editorial finish.

## 2. The lipstick is code, not a model
The hero product is built in code from lathed profiles, so it stays perfectly round at any zoom. One lipstick object carries the cap, the case, the gold ring and the bullet, with an "open" value (cap lifted) and a "twist" value (bullet raised). Each shade is just a colour set. Because it is procedural, there are no product photos and no licensing issues.

## 3. One shared 3D scene, many poses
A single canvas stays fixed over the page. Every scroll section gives the active lipstick a "pose" (position, rotation, scale, open, twist), and the scene blends between poses as you scroll. The hero fly-in, the four "Inside" chapters and the swirl are all poses. HTML text and labels sit on top and fade in and out on the same scroll values.

## 4. Scroll as the timeline
One GSAP timeline is scrubbed by the page scroll. Each section writes a number from 0 to 1 into a shared state object (`story`, `step`, `storm`, `shop`, and so on). The 3D scene and the DOM both just read those numbers every frame. Giving the swirl its own tall section is what lets the ribbon finish before the shop arrives.

## 5. The ribbon
The S-shaped ribbon is a tube along a spiral curve, flattened in the vertex data to look like glossy tape. It is revealed by changing the geometry draw range, so it "pours" from the top down as you scroll. Petals are instanced meshes whirling in a loop.

## 6. The preloader
The liquid intro was rendered offline as a clip on flat green. In the browser it plays in a hidden video, and a WebGL shader keys the green out each frame, so a plain MP4 works everywhere. To avoid a stutter at the start, the video is primed (muted play, pause, rewind to frame 0) and then played the instant loading finishes. If video is blocked, an animated WebP or a coded liquid shader takes over.

## 7. Cards, rings and strips
The Muse Arc, Lip Reels and Swatch Bar are all variations on the same idea: cards positioned on a curve from one number (how far along the strip you are), with a slow auto-drift that pauses on hover and can be dragged or flicked. The Muse Film is a single video with a blurred copy behind it and two columns of drifting stills.

## 8. The try-on is an SVG
The shade finder draws the skin, lips, creases and gloss as stacked SVG layers (gradients, filters and noise). Colours are set from JavaScript, so changing the skin tone or shade tweens smoothly, with no images needed.

## 9. Open-source assets
Props (cherry, heart, powder compact and others) are low-poly models from Poly Pizza and Poly Haven, re-skinned with glossy materials at runtime. Every credit is kept in a `CREDITS.txt` file in the project.

## 10. Polish
- Text rises word by word as it scrolls in.
- The 3D is rendered sharper on phones, with a fallback for Low Power Mode.
- Mobile gets its own poses, sizes and text placement.
- Deploying is one command: build, then `wrangler deploy`.
