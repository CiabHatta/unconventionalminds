#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CONTENT_FILE = path.join(__dirname, 'content-simple.json');
const TEMPLATE_FILE = path.join(__dirname, 'index.template.html');
const OUTPUT_FILE = path.join(__dirname, 'index.html');

console.log('🚀 Building from template...');
const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
let html = fs.readFileSync(TEMPLATE_FILE, 'utf8');

// Replace function - sostituisce SEMPRE, anche se non trova match
function r(searchValue, replaceValue) {
  const escapedSearch = searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(escapedSearch, 'g');

  // Se trova il match, sostituisce
  if (html.includes(searchValue)) {
    html = html.replace(pattern, replaceValue || '');
  } else {
    // Se non trova match, avvisa ma non fallisce
    console.warn(`⚠️  Warning: Could not find "${searchValue.substring(0, 50)}..." in template`);
  }
}

// Meta
r('<title>UNCONVENTIONAL MINDS - Robotics Venture Studio</title>', `<title>${content.meta.title}</title>`);
r('We build robotics ventures.<br>\nFrom zero to Exit.', content.meta.description);

// Home - Replace più specifici prima (stringhe più lunghe)
r('01 // VENTURE_STUDIO.UM', content.sections.home.tag);
r('[ MARKET_DRIVEN ]', content.sections.home.tags[0]);
r('[ ART_INSPIRED ]', content.sections.home.tags[1]);
r('[ TECH_BUILT ]', content.sections.home.tags[2]);
r('ROBOTICS VENTURE STUDIO.', content.sections.home.description.strong);
r('We build robotics ventures.<br>\nFrom zero to Exit.', content.sections.home.description.text);
// Hero title - usa il contesto completo per evitare sostituzioni globali
r('<h1 class="hero-title">TECH<br><span>WITH</span><br>SOUL.</h1>',
  `<h1 class="hero-title">${content.sections.home.title.line1}<br><span>${content.sections.home.title.line2}</span><br>${content.sections.home.title.line3}</h1>`);

// OS Section
r('02 // UM_OS25.UM', content.sections.os.tag);
r('SYSTEM ARCHITECTURE', content.sections.os.title);
r('Our proprietary operating model. Three distinct engines.', content.sections.os.subtitle);

// OS Cards - usa contesto completo per titoli con TECH
r('<h3>STARTUP<br>CREATION</h3>',
  `<h3>${content.sections.os.cards[0].title}</h3>`);
r('We create our own startups. <br> We focus on a market need and we develop the entire business. <br> All around the user.', content.sections.os.cards[0].description);
r('[ UNCONVENTIONAL ENGINE ]', content.sections.os.cards[0].label);

r('<h3>CORPORATE<br>TECHING</h3>',
  `<h3>${content.sections.os.cards[1].title}</h3>`);
r('We partner with enterprises since the beginning. <br> We build the business and product together.', content.sections.os.cards[1].description);
r('[ SaaS ENGINE ]', content.sections.os.cards[1].label);

r('<h3>HARD TECH<br>SOLUTIONS</h3>',
  `<h3>${content.sections.os.cards[2].title}</h3>`);
r('Need Help? <br> Unconventional is here for you, with all services needed to build an incredible product.', content.sections.os.cards[2].description);
r('[ SERVICE ENGINE ]', content.sections.os.cards[2].label);

// Protocol
r('BETTER, FASTER, STRONGER.', content.sections.protocol.title);
r('Building hardware is difficult, but we have a method validated in years of Robotics', content.sections.protocol.subtitle);
// Steps - usa contesto completo per evitare sostituzioni globali
r('<span class="p-num">STEP 01 // 4 WKS</span><h4 class="p-title">DISCOVER</h4>',
  `<span class="p-num">${content.sections.protocol.steps[0].number}</span><h4 class="p-title">${content.sections.protocol.steps[0].title}</h4>`);
r('We scan the market in search for a human need.<br> This is our starting point for create a user centered product.', content.sections.protocol.steps[0].description);

r('<span class="p-num">STEP 02 // 2 MO</span><h4 class="p-title">DESIGN</h4>',
  `<span class="p-num">${content.sections.protocol.steps[1].number}</span><h4 class="p-title">${content.sections.protocol.steps[1].title}</h4>`);
r('We design a functional solution, never seen.<br> The MVP design is focused on aesthetics and services<br> With the human in the center.', content.sections.protocol.steps[1].description);

r('<span class="p-num">STEP 03 // 6 MO</span><h4 class="p-title">TECH</h4>',
  `<span class="p-num">${content.sections.protocol.steps[2].number}</span><h4 class="p-title">${content.sections.protocol.steps[2].title}</h4>`);
r('Brutal Engineering.<br> We develop from zero the solutions, using modular and scalable approach. <br> We don\'t build prototypes, but products.', content.sections.protocol.steps[2].description);

r('<span class="p-num">STEP 04 // +7 MO</span><h4 class="p-title">DEPLOY</h4>',
  `<span class="p-num">${content.sections.protocol.steps[3].number}</span><h4 class="p-title">${content.sections.protocol.steps[3].title}</h4>`);
r('Startup launch.<br> Validation through pilot projects in real world, with real context, with exit mentality', content.sections.protocol.steps[3].description);

// Investors
r('HARD TECH IS<br>THE ONLY ASSET<br> THAT MATTERS.', content.sections.investors.title);
r('We live in a hardware world, with hardware problems that requires hardware solutions. <br> We are building a new ecosystem of helpful robotics solution, human centered.', content.sections.investors.subtitle);
r('ROUND SIZE 1 M€', `${content.sections.investors.stats[0].label} ${content.sections.investors.stats[0].value}`);
r(' TARGET EXIT 24 MO', ` ${content.sections.investors.stats[1].label} ${content.sections.investors.stats[1].value}`);

// Contact
r('JOIN<br><span class="highlight">THE</span><br>STUDIO', content.sections.contact.title);
r('Three paths. One destination.', content.sections.contact.subtitle);
r('[ NEED EXECUTION? ]', content.sections.contact.buttons[0].subtitle);
r('CORPORATE', content.sections.contact.buttons[0].title);
r('[ JOIN PIPELINE ]', content.sections.contact.buttons[1].subtitle);
r('FOUNDER', content.sections.contact.buttons[1].title);
r('[ SEEKING ALPHA ]', content.sections.contact.buttons[2].subtitle);
r('INVESTOR', content.sections.contact.buttons[2].title);
r('mailto:info@unconventional.studio', content.sections.contact.buttons[0].link);
r('mailto:founders@unconventional.studio', content.sections.contact.buttons[1].link);
r('mailto:invest@unconventional.studio', content.sections.contact.buttons[2].link);

// Footer
r('UM_OS25 // UNCONVENTIONAL MINDS S.R.L. / GENOVA / ITALY', content.footer.text);

// Generate config.js with logo texts
const configJs = `// Auto-generated by build.js - DO NOT EDIT
const LOGO_CONFIG = ${JSON.stringify({
  logoBySection: content.header.logoBySection
}, null, 2)};
`;
fs.writeFileSync(path.join(__dirname, 'js/config.js'), configJs);

fs.writeFileSync(OUTPUT_FILE, html);
console.log('✅ Build complete!');
