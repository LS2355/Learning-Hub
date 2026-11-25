# Learning Hub design

## User constraint

Keep the navigation on the left. At narrow widths it becomes an icon rail, not a top or bottom bar.

## Interface

Learning Hub is a study tool: prioritize readable concepts and fast practice tracking. Use a charcoal and mint default palette, semantic theme variables, consistent line icons, and quiet typography. Theme modes are dark, light, and system. All ten accents work in both surface modes: mint, blue, violet, amber, rose, coral, cyan, lime, lavender, and slate. Palette names are shared between the picker and backup validation; each palette defines accent, accent ink, soft selection, borders, and featured-surface text roles.

Topic cards contain meaningful structural diagrams. Tables keep stable rows, tabular numbers, explicit labels, and editable notes. Use native dialogs for focus management and native controls for selection and range gestures.

## Motion

Press feedback uses 100–140 ms transform transitions. Dialog entries use 200 ms ease-out; keyboard search opens instantly. Card hover is a two-pixel lift on fine pointers. Filters, navigation, counters, and table rows update immediately. Respect system and in-app reduced-motion preferences. Avoid persistent decorative movement.

## Data states

Provide meaningful empty states, duplicate prevention, import validation, undo for problem removal, and confirmation before replacing or clearing a workspace. Demo data remains separate from saved user data.

## Logo loading signal

Use the original two-contour logo geometry from `client/src/lib/logo-trace.js` for the filled brand mark and the outline loader. The highlight follows each contour’s measured segment lengths with a smooth acceleration and deceleration; both pieces share one clock. The leading edge retains the outline’s width, and the delayed tail fades to transparent before a new cycle begins.

Use the loader for the startup splash, actual asynchronous waiting, and the explicit Appearance preview. The startup splash is authorized as a brand introduction: one trace, an overlapping smoky wordmark reveal, and a 300 ms fade, totaling approximately 2.5 seconds. Run it once per document load, never on sidebar navigation. Provide Skip intro and Escape; keep the underlying workspace inert and prevent scrolling until dismissal. Reduced motion uses a static mark and text with a 450 ms introduction. Keep the sidebar logo static. The preview offers pause/resume and three simultaneous sizes; IDs must remain instance-specific. System or in-app reduced motion stops the animation and leaves a readable full outline. Hidden tabs stop scheduling animation frames.

The default full cycle is 800 / 0.82 ms; head travel occupies 82% and tail lifetime 18%. Geometry is immutable; frame updates write SVG attributes directly instead of rerendering React. Clean up animation frames, visibility listeners, media queries, and mutation observers when the component unmounts.

### Splash fill reveal

The startup splash fades the original full-color logo in linearly with the outline animation clock: fill opacity is 0 at 0%, 0.5 at 50%, and 1 at 100%. The highlight is a separate layer and remains visible independently. Do not render a faint background outline in this mode. After the trace completes, hold the fully opaque logo until the splash exits. Reduced motion shows the completed full-color logo immediately.
