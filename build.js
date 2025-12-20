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
  html = html.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\]/g, '\$&'), 'g'), val || '');
}

r('<title>UNCONVENTIONAL MINDS - Robotics Venture Studio</title>', `<title>${content.meta.title}</title>`);
r('01 // VENTURE_STUDIO.UM', content.sections.home.tag);
r('BUILD', content.sections.home.title.line1);
r('PHYSICAL', content.sections.home.title.line2);  
r('ASSETS.', content.sections.home.title.line3);
r('ROBOTICS VENTURE STUDIO.', content.sections.home.description.strong);
r('02 // UM_OS25.UM', content.sections.os.tag);
r('SYSTEM ARCHITECTURE', content.sections.os.title);

fs.writeFileSync(OUTPUT_FILE, html);
console.log('✅ Build complete!');
