function generateWave() {
const container = document.getElementById('wave-container');

const width = window.innerWidth;
const height = window.innerHeight;

const ns = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(ns, "svg");
svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
svg.setAttribute("preserveAspectRatio", "none");

const defs = document.createElementNS(ns, "defs");
const linearGradient = document.createElementNS(ns, "linearGradient");
linearGradient.setAttribute("id", "waveGradient");
linearGradient.setAttribute("x1", "0%");
linearGradient.setAttribute("y1", "0%");
linearGradient.setAttribute("x2", "100%");
linearGradient.setAttribute("y2", "0%");

const stops = [
    { offset: "0%", color: "#F01084", opacity: "0.5" },
    { offset: "100%", color: "#EF7326", opacity: "0.2" }
];

stops.forEach(s => {
    const stop = document.createElementNS(ns, "stop");
    stop.setAttribute("offset", s.offset);
    stop.setAttribute("stop-color", s.color);
    stop.setAttribute("stop-opacity", s.opacity);
    linearGradient.appendChild(stop);
});

defs.appendChild(linearGradient);
svg.appendChild(defs);

const group = document.createElementNS(ns, "g");
group.classList.add("wave-group");

const lineCount = 20; 
const startY = height * 0.65;

for(let i = 0; i < lineCount; i++) {
    const path = document.createElementNS(ns, "path");
    
    const progress = i / lineCount;
    const freq = 0.002 + (progress * 0.0005);
    const amp = 80 + (Math.sin(progress * Math.PI) * 50);

    let d = `M -100 ${startY}`; 
    
    for(let x = 0; x <= width + 100; x += 30) {
        const globalSwoop = Math.sin(x * 0.0015) * (height * 0.25);
        const envelope = Math.sin(x * 0.002) * 1.5;
        const detail = Math.sin((x * freq) + (i * 0.15)) * amp * envelope;
        const stackOffset = (i * 4) - (lineCount * 2);

        const y = startY + globalSwoop + detail + stackOffset - (x * 0.15);

        d += ` L ${x} ${y}`;
    }

    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "url(#waveGradient)");
    path.setAttribute("stroke-width", "1.2"); 
    path.setAttribute("opacity", "0.7");
    
    group.appendChild(path);
}

svg.appendChild(group);

container.innerHTML = ""; 
container.appendChild(svg);
}

generateWave();
    let timeout;
    window.addEventListener('resize', () => {
        clearTimeout(timeout);
        timeout = setTimeout(generateWave, 100);
});