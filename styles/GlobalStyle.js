import { createGlobalStyle } from "styled-components";

/**
 * Design tokens live as CSS custom properties keyed on the body class that the
 * inline noflash script in _document.js sets before first paint. Colours never
 * pass through React, so the theme cannot flash or round-trip during hydration.
 * :root carries the light palette so the page is still correct with JS disabled.
 */
const GlobalStyle = createGlobalStyle`
:root {
  --ground:    #E2E8E6;
  --surface:   #EEF3F1;
  --surface-2: #E7EDEB;
  --rule:      #A9B9B7;
  --rule-soft: #C6D2D0;
  --ink:       #0B1417;
  --ink-dim:   #4A5C5E;
  --signal:    #8A4F0F;
  --signal-bg: rgba(138, 79, 15, 0.09);
  --flow:      #1F5F6D;
  --grid-line: rgba(11, 20, 23, 0.06);

  --f-display: "Saira Condensed", "Arial Narrow", Impact, sans-serif;
  --f-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  --step--1: clamp(0.68rem, 0.66rem + 0.1vw, 0.74rem);
  --step-0:  clamp(0.82rem, 0.79rem + 0.14vw, 0.9rem);
  --step-1:  clamp(0.95rem, 0.9rem + 0.24vw, 1.08rem);
  --step-2:  clamp(1.3rem, 1.15rem + 0.7vw, 1.75rem);
  --step-3:  clamp(2.4rem, 1.6rem + 3.6vw, 5.2rem);

  --gut: clamp(1.15rem, 0.7rem + 2.2vw, 3rem);
}

body.dark-mode {
  --ground:    #0B1417;
  --surface:   #111E22;
  --surface-2: #16262B;
  --rule:      #2C4147;
  --rule-soft: #1C2E33;
  --ink:       #D3DEDB;
  --ink-dim:   #8FA3A5;
  --signal:    #E8A33D;
  --signal-bg: rgba(232, 163, 61, 0.10);
  --flow:      #5FB3C4;
  --grid-line: rgba(96, 140, 148, 0.07);
}

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background-color: var(--ground);
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 46px 46px, 46px 46px;
  color: var(--ink);
  font-family: var(--f-mono);
  font-size: var(--step-0);
  line-height: 1.65;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  font-variant-numeric: tabular-nums;
}

h1, h2, h3, h4, p, dl, dd, dt, figure, ul {
  margin: 0;
}

a {
  color: inherit;
}

:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
`;

export default GlobalStyle;
