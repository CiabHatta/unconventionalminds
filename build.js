#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CONTENT_FILE = path.join(__dirname, 'content-simple.json');
const TEMPLATE_FILE = path.join(__dirname, 'index.template.html');
const OUTPUT_FILE = path.join(__dirname, 'index.html');

console.log('🚀 Building from template...');
const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
let html = fs.readFileSync(TEMPLATE_FILE, 'utf8');

function r(old, val) {
  html = html.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), val || '');
}

// Meta
r('<title>UNCONVENTIONAL MINDS - Robotics Venture Studio</title>', `<title>${content.meta.title}</title>`);
r('We bridge the gap between Lab & Market. From zero to Exit in 24 Months.', content.meta.description);

// Home
r('01 // VENTURE_STUDIO.UM', content.sections.home.tag);
r('BUILD', content.sections.home.title.line1);
r('PHYSICAL', content.sections.home.title.line2);
r('ASSETS.', content.sections.home.title.line3);
r('[ MARKET_DRIVEN ]', content.sections.home.tags[0]);
r('[ ART_INSPIRED ]', content.sections.home.tags[1]);
r('[ TECH_BUILT ]', content.sections.home.tags[2]);
r('ROBOTICS VENTURE STUDIO.', content.sections.home.description.strong);
r('We bridge the gap between Lab & Market.<br>\nFrom zero to Exit in 24 Months.', content.sections.home.description.text);

// OS Section
r('02 // UM_OS25.UM', content.sections.os.tag);
r('SYSTEM ARCHITECTURE', content.sections.os.title);
r('Our proprietary operating model. Three distinct engines.', content.sections.os.subtitle);

// OS Cards
r('STARTUP<br>CREATION', content.sections.os.cards[0].title);
r('We create our own startups. <br> We focus on a market need and we develop the entire business. <br> All around the user.', content.sections.os.cards[0].description);
r('[ UNCONVENTIONAL ENGINE ]', content.sections.os.cards[0].label);
r('CORPORATE<br>TECHING', content.sections.os.cards[1].title);
r('We partner with enterprises since the beginning. <br> We build the business and product together.', content.sections.os.cards[1].description);
r('[ SaaS ENGINE ]', content.sections.os.cards[1].label);
r('HARD TECH<br>SOLUTIONS', content.sections.os.cards[2].title);
r('Need Help? <br> Unconventional is here for you, with all services needed to build an incredible product.', content.sections.os.cards[2].description);
r('[ SERVICE ENGINE ]', content.sections.os.cards[2].label);

// Protocol
r('BETTER, FASTER, STRONGER.', content.sections.protocol.title);
r('Building hardware is difficult, but we have a method validated in years of Robotics', content.sections.protocol.subtitle);
r('STEP 01 // 4 WKS', content.sections.protocol.steps[0].number);
r('DISCOVER', content.sections.protocol.steps[0].title);
r('We scan the market in search for a human need.<br> This is our starting point for create a user centered product.', content.sections.protocol.steps[0].description);
r('STEP 02 // 2 MO', content.sections.protocol.steps[1].number);
r('DESIGN', content.sections.protocol.steps[1].title);
r('We design a functional solution, never seen.<br> The MVP design is focused on aesthetics and services<br> With the human in the center.', content.sections.protocol.steps[1].description);
r('STEP 03 // 6 MO', content.sections.protocol.steps[2].number);
r('TECH', content.sections.protocol.steps[2].title);
r('Brutal Engineering.<br> We develop from zero the solutions, using modular and scalable approach. <br> We don\'t build prototypes, but products.', content.sections.protocol.steps[2].description);
r('STEP 04 // +7 MO', content.sections.protocol.steps[3].number);
r('DEPLOY', content.sections.protocol.steps[3].title);
r('Startup launch.<br> Validation through pilot projects in real world, with real context, with exit mentality', content.sections.protocol.steps[3].description);

// Investors
r('HARD TECH IS<br>THE ONLY ASSET<br>CLASS THAT MATTERS.', content.sections.investors.title);
r('Software is saturated. Atoms are the new frontier.', content.sections.investors.subtitle);
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
