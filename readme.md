
# PSD to website demo

The PSD is in the `design` folder.

View the page at https://axit.jamestindal.co.uk/


## Features

No production dependencies

### Hover interactions

All interactive elements display a distinct visual change on hover, with the transition smoothly animating over 0.1 seconds.

### Scroll-to-top button

Appears only when the page is narrower than 768px, as the user scrolls into the tabs section. CSS-only - no JavaScript.

### Soft transition tabs

Uses CSS transitions. [js/tabs.js](js/tabs.js)

### In-page link scrolling

Links to sections on the same page scroll smoothly instead of instantly moving to the destination. This helps the user understand they are still on the same page. [js/anchor-link-scroll.js](js/anchor-link-scroll.js).

### Carousel for testimonials

Interactive testimonial carousel with drag-to-scroll, smooth snapping, and cross-browser-safe drag behavior, including a lightweight Safari user-select polyfill.

[js/polyfill-user-select-none.js](js/polyfill-user-select-none.js)
[js/drag-to-scroll.js](js/drag-to-scroll.js).
