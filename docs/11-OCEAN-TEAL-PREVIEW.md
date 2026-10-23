# 11 · Ocean Teal preview (hero + Oladoc header only)

Palette: Turquoise `#2CA89F`, Ocean Teal `#066078`, Deep Ink `#203A3D`, Warm Ivory `#FFFAF6`, Sea Mist `#DCEFEB`. Scoped with `.palette-ocean` in `src/index.css` (nav, home hero, Oladoc case header). The rest of the site still uses Editorial Ivory until this is approved.

| Pair | Ratio |
|---|---|
| Deep Ink on ivory / on mist | 11.68 / 10.14 |
| Secondary text `#4A5E60` on ivory / mist | 6.62 / 5.75 |
| Ocean Teal on ivory / mist | 6.86 / 5.96 |
| White on Ocean Teal (buttons) | 7.11 |
| Turquoise on ivory | 2.81, so decoration only |

Gradient: turquoise to ocean teal at 135 degrees (`#2CA89F`, `#1A8490`, `#066078`), used on the product stage behind the screens, the portrait disc and the heartbeat rule. No text sits on it.

Profile photo: the repository copy (`src/assets/ruqqya_img.png`) is a cut-out with a transparent background, not the gradient original. It is used unaltered over the gradient disc. The original gradient photo is not in the repository, so the gradient was built from your five hex values, not sampled from the image. Send the original if you want me to sample it.

## Rolled out site-wide (24 Oct 2026, after approval of the preview)
Ocean Teal is now the global palette in `src/index.css`. Warm Ivory grounds, Sea Mist for secondary sections and stages, Deep Ink text, Ocean Teal buttons and links, Turquoise for marks. The contact section uses the turquoise-to-ocean gradient (text sits on the ocean-teal side, white 7.1:1); the footer is Deep Ink. Checked at 390, 820 and 1440 px on six pages: no overflow, no broken images, no script errors. Lighthouse: home 78 mobile / 94 desktop, Oladoc 84 / 99, accessibility 100 on all, 0 contrast failures, CLS 0.
