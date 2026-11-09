# Prompts

One short prompt per section. Paste them in order into a coding assistant, starting from an empty Vite project with `three`, `gsap` and `lenis` installed. The brand is **Roselle**, a made-up lipstick label. Palette is ruby and wine reds with rose-gold accents, Bodoni Moda for display type and Inter for body text.

## 1. Preloader
Build a full-screen intro where liquid lipstick floods the screen, the Roselle logo surfaces on the glossy sheet, then arches push up through the liquid and drain away to reveal the site.
Play a pre-rendered clip shot on flat green and key the green out live in a WebGL shader, so a plain MP4 works everywhere.
Start playing the moment loading finishes, with no pauses. Fall back to an animated WebP, or a coded shader version, if video is blocked.
The logo then flies into the nav bar.

## 2. Sale hero
Make a Black Friday hero: a warm, spot-lit room with two glowing "BLACK FRIDAY" light boxes on the back wall and a stack of round pedestals in the centre.
The main lipstick stands in the middle and the other shades fan out on both sides, tilted. Add prev and next buttons.
Show a huge "30% off everything" headline, the shade name and number, the struck-through old price and the sale price, and a "Shop the sale" button.
Use a separate small WebGL scene that only renders while it is on screen.

## 3. Inside (four chapters)
Pin a section where one 3D lipstick sits on the left and the chapter text sits on the right: 01 The Case, 02 The Twist, 03 The Formula, 04 The Finish.
Scrolling moves the camera and the lipstick through each pose: the cap lifts off, the bullet twists up, and ingredient cutouts such as pigment powder, shea butter and rose-hip oil orbit it.
Draw hotspot labels with leader lines that follow the 3D parts, and a row of chapter buttons with progress rings under the text.
A rose-gold arch frames the product, with drifting petals.

## 4. Ribbon swirl
Right after the last chapter, close the lipstick and spin it while a glossy red ribbon wraps around it in an S-shape.
The ribbon draws itself from the top down as you scroll, and a tornado of petals swirls around it.
Give this section its own scroll room so the ribbon finishes before the next section arrives, then fade the swirl out into the shop.

## 5. Muse arc
Create a ring of ten editorial lipstick portrait cards seen from the inside, drifting slowly sideways.
Cards pause when the pointer is on them, and can be dragged or flicked. Each card shows a number, a title, a short blurb, the shade, its price and an "Add +" button.
Run a looping line of mixed bold and italic type along the curve under the cards.
Add two buttons below: "Shop all shades" and "Find your match", side by side on one row.

## 6. Muse film
Make one landscape film that plays alone in the middle of a dark stage inside gold corner brackets, under a "Feel the velvet" headline.
Put a blurred copy of the same film behind it so the colour spills into the room, and two columns of stills drifting past on either side.
Play only while it is on screen, with a sound chip to turn audio on, and a "Shop the collection" button underneath.

## 7. Swatch bar
Build one tall card per shade in a tilted carousel. Each card has a huge shade name, the real 3D lipstick uncapped, a floating prop that peeks out and another that pops up on hover (cherry, heart, powder), hydration, shine, pigment and wear bars, a price and a round "+" button.
Cards tilt toward the pointer, hovering paints a swatch, and the "+" drops the shade into a bag with a live count in the nav.
Each card takes the colours of its own shade.

## 8. Lip reels
Create a film-strip band under a dashed sprocket line: a coverflow of nine-by-sixteen model reels that drifts on its own, curves back into the dark at the edges, pauses on hover and can be dragged, flung or scrolled sideways.
Cards show a reel number, a timer, a play button, shade tag, title and a progress bar. Add previous, pause and next controls.

## 9. Reel viewer
Tapping a reel opens a full-screen, Instagram-stories style viewer: a blurred backdrop, a story progress bar on top, the roselle avatar and a sound toggle.
The reel itself plays in a tall card, with its shade, a headline, a short line, the price, an "Add to bag" button and an "All shades" link.
Neighbouring reels peek in at the sides. Tap the sides to skip, hold to pause, swipe down to close.

## 10. Shade finder
Draw a photoreal lip try-on as one SVG: skin tone, pores, lip shading, creases and a glossy highlight, with an "arm swatch" chip in the corner.
On the right, show the shade name, finish, key ingredients and price, a row of six skin-tone dots and eight shade pills.
Changing either one tweens the colours smoothly. A "See it in 3D" button scrolls back and spins that shade to the front of the 3D carousel.

## 11. The edit
Make an editorial "Top 7 Roselle Shades for Winter 2026" still life: cream pedestals at staggered heights in a warm studio, dry branches behind them and a slanted window of light.
The real 3D lipsticks, rendered upright, stand on the pedestal tops.
Hovering a lipstick opens a small card with its number, finish, name, key ingredients and price, plus a "+" button to add it to the bag.
Build everything in container-query units so the whole set scales as one picture.

## 12. Site-wide polish
Smooth scrolling with Lenis, with GSAP ScrollTrigger scrubbing every scene. Headings rise word by word out of a line mask as they scroll in.
Add a custom floating nav pill that highlights the current section, a bag button with a count, and a scroll-percent readout at the bottom.
Sharper 3D on phones, a Low Power Mode fallback, and a layout that works on mobile.
