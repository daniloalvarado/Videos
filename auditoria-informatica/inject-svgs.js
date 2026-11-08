const fs = require('fs');

const svgFiles = [
    { file: "Imágenes/undraw_data-thief_d66l.svg", x: 250, y: 150 },
    { file: "Imágenes/Secure Server-pana.svg", x: 2170, y: 150 },
    { file: "Imágenes/undraw_sharing-ideas_toje.svg", x: 4090, y: 150 },
    { file: "Imágenes/undraw_working_n9u0.svg", x: 6010, y: 150 },
    { file: "Imágenes/undraw_business-pitch_h9yw.svg", x: 7930, y: 150 }
];

let injectedHTML = '\n<!-- Estaciones de SVG Inyectadas -->\n';

svgFiles.forEach((item, index) => {
    let svgContent = fs.readFileSync(item.file, 'utf8');
    
    // Remove the <?xml ... ?> if exists
    svgContent = svgContent.replace(/<\?xml.*?\?>/g, '');
    
    injectedHTML += `
    <g class="wb-svg wb-svg-${index + 1}" transform="translate(${item.x}, ${item.y})" stroke="#58a6ff" stroke-width="3" fill-opacity="0">
        ${svgContent}
    </g>\n`;
});

let html = fs.readFileSync('index.html', 'utf8');

// Replace everything inside <g id="scene4-whiteboard"> ... </g>
html = html.replace(
    /(<g id="scene4-whiteboard"[^>]*>)([\s\S]*?)(<\/g>)/,
    `$1${injectedHTML}$3`
);

fs.writeFileSync('index.html', html);
console.log('SVGs injected successfully!');
