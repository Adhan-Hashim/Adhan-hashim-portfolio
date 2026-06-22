const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');
const corruptIndex = css.indexOf(' / *   - - -   M O B I L E');
if (corruptIndex !== -1) {
  css = css.substring(0, corruptIndex);
}

const toAppend = `
/* --- MOBILE LAYOUT OVERRIDES --- */
@media (max-width: 768px) {
  /* Hero */
  .hero-section-mobile-override {
    flex-direction: column !important;
    justify-content: center !important;
    padding-top: 150px !important;
  }
  .hero-main-title {
    position: relative;
    z-index: 10 !important;
    text-align: center;
    font-size: clamp(4rem, 16vw, 6rem) !important;
  }
  .hero-sketch-text-mobile {
    display: none !important;
  }
  .hero-subtitle-mobile {
    text-align: left;
    margin-top: 20px !important;
    font-size: 0.9rem !important;
    max-width: 90% !important;
    margin-left: 0 !important;
  }
  .hero-portrait-mobile {
    position: absolute !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    bottom: auto !important;
    top: 15% !important;
    width: 280px !important;
    z-index: 0 !important;
  }
  .hero-portrait-mobile img {
    mask-image: none !important;
    -webkit-mask-image: none !important;
    border-radius: 50% !important;
    object-fit: cover;
  }
  .hero-portrait-mobile svg {
    display: none !important;
  }

  /* Work */
  .work-header-mobile {
    text-align: left !important;
  }
  .work-header-mobile h2 {
    font-size: clamp(2.5rem, 8vw, 4rem) !important;
  }
  .work-card-mobile {
    flex-direction: row !important;
    height: 180px !important;
    padding: 0 !important;
  }
  .work-card-content-mobile {
    padding: 20px 15px !important;
  }
  .work-card-title-mobile {
    font-size: 1.2rem !important;
    margin-bottom: 5px !important;
  }
  .work-card-desc-mobile {
    font-size: 0.7rem !important;
    line-height: 1.4 !important;
  }
  .work-card-actions-mobile {
    gap: 10px !important;
  }

  /* Tools */
  .uppercase-mobile {
    text-transform: uppercase !important;
  }

  /* Creative Marquee */
  .creative-marquee-title-mobile {
    text-align: center;
    line-height: 1 !important;
  }
  .show-mobile-inline {
    display: block !important;
  }
}
`;

fs.writeFileSync('src/index.css', css + toAppend);
console.log('Done fixing index.css');
