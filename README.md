# Portfolio

A personal portfolio website built from scratch with HTML, CSS, and vanilla JavaScript.

This project is part of my front-end development journey. Rather than reaching for a framework or a template, I built every layout, breakpoint, and interaction by hand — so that I actually understood flexbox, CSS Grid, the cascade, and DOM events instead of just configuring them.

No build step. No dependencies. No `node_modules`. Three files.

**Live site:** https://opizzey.github.io/Portfolio/

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [What I Learned](#what-i-learned)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Single-page navigation
Four sections — Home, About, Portfolio, Contact — live in one HTML document. Clicking a nav link shows the matching section and hides the rest, with no page reload and no router library. The active link updates automatically so you always know where you are.

### Responsive layout
The design adapts across three breakpoints. On wide screens a fixed vertical sidebar sits beside the content; on narrower screens it becomes a horizontal bar and every side-by-side row stacks into a column.

| Breakpoint | What changes |
|---|---|
| `1250px` | Sidebar becomes a horizontal top bar; Home and About sections stack vertically |
| `1050px` | Portfolio grid drops from two columns to one |
| `600px`  | Heading sizes scale down for small screens |

### Fluid media
Images use the `width: 100%` + `max-width` + `aspect-ratio` pattern, so they shrink with their container and keep their proportions instead of squashing. The embedded map is width-driven from CSS rather than a hardcoded HTML attribute.

### CSS-only animation
The organic "blob" shapes around each image come from an animated `border-radius` keyframe (`morph`) — no images, no SVG, no JavaScript.

### Layout techniques
Flexbox handles the page shell and the section layouts; CSS Grid handles the portfolio gallery.

---

## Tech Stack

| Technology | Used for |
|---|---|
| **HTML5** | Semantic structure — `nav`, `main`, `section`, `form` |
| **CSS3** | Flexbox, Grid, custom media queries, keyframe animations, `aspect-ratio` |
| **JavaScript (ES6)** | Section switching, active-state management, `classList`, template literals, `for...of` |
| **Google Fonts** | Poppins typeface |
| **Google Maps Embed** | Location map in the Contact section |
| **Unsplash** | Placeholder imagery (hotlinked) |

No frameworks, no preprocessors, no bundler.

---

## Installation

There is nothing to install. The project is static HTML, CSS, and JavaScript with no dependencies and no build step.

### Option 1 — Open the file directly

```bash
git clone https://github.com/Opizzey/Portfolio.git
cd Portfolio
```

Then open `index.html` in any browser. Double-clicking it works.

### Option 2 — Serve it locally (recommended)

Opening a file over `file://` works for this project, but a local server better matches how the site behaves once deployed. Pick whichever you have:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# VS Code
# Install the "Live Server" extension, then right-click index.html → "Open with Live Server"
```

Then visit `http://localhost:8000`.

Live Server is the most convenient of the three while developing, since it reloads the page every time you save.

### Requirements

Any modern browser. The CSS uses `aspect-ratio` and `gap` in Grid, which means Chrome/Edge 88+, Firefox 89+, or Safari 15+. There is no Internet Explorer support.

An internet connection is needed for the Google font, the Unsplash images, and the embedded map — the layout itself works offline, but it will render unstyled text where those assets would be.

---

## Usage

### Viewing the site

Open the page and use the sidebar to move between sections. Only one section is visible at a time.

### Testing responsiveness

1. Open DevTools (`F12`)
2. Toggle the device toolbar (`Ctrl+Shift+M`)
3. Enter widths manually rather than dragging — repeatable numbers make it far easier to tell whether a breakpoint fired

Useful widths to check: **1400px** (sidebar layout), **1100px** (stacked nav, two-column gallery), **1000px** (single-column gallery), **375px** (phone).

### Adding a new section

The navigation works by convention: **a link's `href` must match its section's `class`.** To add a "Blog" section:

1. Add the nav link inside the `<ul>` in `index.html`:
   ```html
   <li><a href="#blog">Blog</a></li>
   ```
2. Add the section inside `<main>`:
   ```html
   <section class="blog">
       <h2>Blog</h2>
   </section>
   ```

That is all. `app.js` picks it up automatically — it reads every nav link and derives the section selector from the `href`, so no JavaScript changes are needed.

### Swapping in your own images

Replace the `src` on any `<img>` in `index.html`. To use local files instead of Unsplash, create an `images/` folder and point at it:

```html
<img src="images/profile.jpg" alt="Profile photo">
```

Sizing is handled entirely in CSS, so images of any dimensions will fit. `object-fit: cover` crops rather than distorts.

---

## Code Structure

```
portfolio/
├── index.html      # All markup — nav + four sections
├── app.css         # All styling — reset, layout, sections, animation, breakpoints
├── app.js          # Section switching and active-link state
├── .gitignore
└── README.md
```

### `index.html`

```
body
└── .wrapper                 flex container — the whole page shell
    ├── nav                  sidebar: name, links, copyright
    └── main
        ├── section.home     avatar + intro + social link
        ├── section.about    large image + two paragraphs
        ├── section.portfolio  h2 + .photos grid (4 images)
        └── section.contact  map + text + contact form
```

### `app.css`

The file is organised top to bottom, general to specific, with breakpoints last. This ordering matters: later rules win ties in the cascade, so media queries must come after the rules they override.

| Section | Purpose |
|---|---|
| `RESET` | Box sizing, margin/padding reset, sane image and form defaults |
| `APP GLOBAL` | Typography, link colours, `.wrapper` flex shell |
| `NAV` | Sidebar layout, link hover underline effect |
| `MAIN` | Shared section rules — max width, centring, heading sizes |
| `MAIN: HOME` … `MAIN: CONTACT` | Per-section layout |
| `ANIMATIONS` | The `morph` keyframe |
| `RESPONSIVENESS` | Three media queries, in descending width order |

### `app.js`

One function, `onClick()`, called once on load. It runs in two distinct phases:

**Phase 1 (page load)** — find all nav links, attach a click listener to each.

**Phase 2 (each click)** — hide every section and clear every active link, then show the clicked section and mark its link active.

The link between HTML and JS is this expression:

```js
`.${link.getAttribute("href").substring(1)}`
```

It turns `href="#about"` into the CSS selector `".about"`, which finds `<section class="about">`. That naming convention is the hinge the whole script turns on.

---

## Configuration

There is no config file — everything is edited directly in the source. These are the values most worth knowing about.

### Colours

Defined inline throughout `app.css`. To retheme, find and replace:

| Value | Role |
|---|---|
| `#f9da85` | Accent — active link, image borders, button background |
| `#ffca3a` | Button hover |
| `#ecca6b` | Button border |
| `black` | Nav background, headings |
| `#383838` | Body text |
| `#999999` | Muted nav text |

If you plan to change these often, promoting them to CSS custom properties on `:root` is the natural next step — one definition per colour instead of several scattered occurrences.

### Breakpoints

In the `RESPONSIVENESS` section at the bottom of `app.css`:

- `1250px` — where the sidebar becomes a top bar. Chosen because the sidebar's `15%` width minus its fixed `32px` padding leaves too little room for the name below roughly this point.
- `1050px` — where the portfolio grid becomes single-column.
- `600px` — where headings shrink.

### Content width

`main section` has `max-width: 900px`. Raise it for a wider layout; every section follows.

### Sidebar proportions

`nav` is `width: 15%` and `main` is `width: 85%` above the top breakpoint. These two must sum to 100%.

### Portfolio grid

`main section.portfolio .photos` uses `grid-template-columns: repeat(2, 1fr)` — exactly two equal columns. For a gallery that reflows on its own instead, `repeat(auto-fit, minmax(280px, 1fr))` adjusts the column count automatically and removes the need for the `1050px` breakpoint.

### Image proportions

Set via `aspect-ratio`: `10 / 9` for the About image, `7 / 5` for portfolio thumbnails. Use `1 / 1` for squares.

### Map location

Get a new embed URL from Google Maps (**Share → Embed a map**) and replace the iframe `src` in the Contact section. Keep `class="map"` — the CSS width depends on it.

### Font

Changed via the `@import` at the top of `app.css` plus the `font-family` on `body`. Both need updating together.

---

## Troubleshooting

Every entry below is a bug that actually occurred while building this. They are all worth recognising on sight.

### A CSS rule seems to do nothing

**Check the selector first.** A missing dot is the most common cause — `.form` matches `class="form"`, while `form` matches the `<form>` tag. They are not interchangeable, and a selector that matches nothing fails silently.

Open DevTools and click the element:

- **Rule not listed at all** → your selector doesn't match. Fix the selector.
- **Rule listed but struck through** → something more specific is beating it. Fix specificity.

### A media query rule is ignored

Media queries add **no specificity**. `@media (max-width: 600px) { .photos { ... } }` still loses to a base rule written as `main section.portfolio .photos { ... }`, because two classes beat one — regardless of which comes later in the file.

**Fix:** use the *exact same selector* inside the media query as the rule you're overriding. Same specificity, later position, override wins.

### A declaration is silently dropped

Two usual causes:

1. **Missing semicolon.** The parser reads to the next `;`, so an omitted one merges two declarations into a single invalid one — and *both* are discarded. When a property mysteriously does nothing, look at the line above it.
2. **Typo in the property or value.** `font-family: 40px` and `font-size: 16x` are both invalid and both ignored without warning.

DevTools shows invalid declarations struck through with a warning triangle. Scan for those.

### A `flex-basis` breaks when the layout stacks

`flex: 0 0 250px` sizes the **main axis**, and the main axis flips when `flex-direction` changes. In a row it's a width; in a column it's a height. Flipping to `column` in a media query silently converts every width constraint into a height constraint.

**Fix:** reset the item with `flex: none` inside the breakpoint where you stack it.

### Content overflows sideways on mobile

Look for fixed pixel widths that are forbidden to shrink — `flex: 0 0 500px`, `width: 350px`, or an `<iframe width="850">` attribute. The middle `0` in that flex shorthand is `flex-shrink: 0`, which means "never get smaller, even if I don't fit."

**Fix:** `width: 100%` with a `max-width` cap, and `flex: 1` or `flex: none` instead of a locked basis.

### An embedded iframe is too small

An `<iframe>` with no width attribute defaults to **300px**. Removing a hardcoded `width="850"` fixes overflow but leaves the frame tiny — you also need `width: 100%` in CSS.

### `repeat(auto-fit, minmax(280px, 1fr))` gives the wrong column count

It gives as many columns as fit, which is arithmetic, not a preference: in a 900px container, three 280px columns plus gaps fit but four do not. If you want a specific count, state it — `repeat(2, 1fr)`.

That `280px` floor is also a hard minimum: in a container narrower than 280px the column stays 280px and **overflows**. Guard it with `minmax(min(280px, 100%), 1fr)`.

### Clicking a nav link does nothing, or throws

The `href` must match the section's `class`. `href="#about"` requires `<section class="about">`. A rename on one side without the other breaks the lookup, and `querySelector` returns `null`.

### The active highlight doesn't move

The class has to be moved by JavaScript — writing `class="active"` in the HTML only sets the starting state. The pattern is: remove it from **all** links, then add it to the clicked one, in that order. Reversing the order strips off what you just applied.

### A stylesheet rule loses to something invisible

`element.style.display = "flex"` writes an **inline style** onto the element, and inline styles beat any stylesheet rule short of `!important`. That's intentional here — it's how sections override `display: none` — but it explains rules that appear overridden by nothing.

---

## What I Learned

The parts that took real effort to understand:

- **`max-width` is a ceiling, not a target.** Setting `max-width: 100%` on a `width: 15%` element changes nothing — the declaration applies perfectly and does nothing at all, which makes it a genuinely confusing bug.
- **Percentage widths with fixed padding shrink faster than they look.** A `15%` sidebar with `32px` padding runs out of room for its own content well before you'd expect, because the padding is a constant eating a growing share of a shrinking box.
- **Breakpoints belong where *your* content breaks**, not at memorised device widths. Different problems need different breakpoints — hence three here rather than one.
- **`let` in a loop is what makes closures behave.** Each iteration gets its own binding, so each event listener remembers its own element. With `var`, all four listeners would share one variable and every one would point at the last link.
- **Specificity beats source order.** A later rule only wins if its selector is at least as specific.

---

## Contributing

This is a personal learning project, so it isn't looking for feature contributions. That said, bug reports and suggestions are genuinely welcome — especially if something is broken on a device or browser I haven't tested.

### Reporting a bug

Open an issue including:

- What you expected versus what happened
- Your browser and version
- Your **viewport width** (layout bugs are almost always width-specific)
- A screenshot if it's visual

### Submitting a change

1. Fork the repository
2. Create a branch — `git checkout -b fix/nav-overflow`
3. Make your change
4. Test at 1400px, 1100px, 1000px, and 375px, and click through all four sections
5. Commit with a message that explains the *why*, not just the *what*
6. Open a pull request describing the problem it solves

### Style conventions

- 4-space indentation in all three files
- CSS follows the existing general-to-specific order, with media queries last
- Selectors are written to match the existing pattern (`main section.contact .form`)
- No dependencies, no build step — please keep it that way

---

## License

Released under the MIT License. You are free to use this as a starting point for your own portfolio.

The imagery is from [Unsplash](https://unsplash.com) under the Unsplash License and is hotlinked rather than bundled — swap it for your own before deploying anything public.

> **Note:** add a `LICENSE` file to the repository root to make this official. GitHub offers MIT as a template under **Add file → Create new file → LICENSE**.

---

## Roadmap

Ideas for the next iteration:

- [ ] CSS custom properties for the colour palette
- [ ] Replace `style.display` toggling with a single CSS class
- [ ] Real form submission (Formspree or Netlify Forms — the form currently posts nowhere)
- [ ] Hamburger menu on mobile in place of the stacked bar
- [ ] Keyboard-accessible navigation with visible focus states
- [ ] Self-hosted images with `loading="lazy"` and `srcset`
- [ ] `prefers-reduced-motion` support for the `morph` animation (the rule is drafted but commented out)
- [ ] Real project entries in place of placeholder photos

---

Built by **Dennis Opiyo** ([@Opizzey](https://github.com/Opizzey)) · [LinkedIn](https://www.linkedin.com/in/dennis-opiyo-8725b8146/)
