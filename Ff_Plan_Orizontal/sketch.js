var Engine = Matter.Engine, Render = Matter.Render, Runner = Matter.Runner,
    Bodies = Matter.Bodies, Composite = Matter.Composite, Body = Matter.Body;

var engine = Engine.create();
engine.world.gravity.y = 0; 

var container = document.getElementById('sim-container');

// Detectam dimensiunile reale ale zonei negre din site-ul tau
var latimeSim = container.clientWidth;
var inaltimeSim = container.clientHeight;

var render = Render.create({
    element: container,
    engine: engine,
    options: {
        width: latimeSim, 
        height: inaltimeSim, 
        wireframes: false,
        background: '#0f0f13'
    }
});

// SOLUL: Îl punem exact la baza inaltimii detectate
var ground = Bodies.rectangle(latimeSim / 2, inaltimeSim - 20, latimeSim, 40, { 
    isStatic: true, 
    render: { fillStyle: '#222' } 
});

// MASINA: O punem sa stea pe solul de jos
var car = Bodies.rectangle(50, inaltimeSim - 52.5, 40, 25, { 
    friction: 0, frictionAir: 0, inertia: Infinity, render: { fillStyle: '#3498db' } 
});

Composite.add(engine.world, [car, ground]);
Render.run(render);
Runner.run(Runner.create(), engine);

let isMoving = false;
let v0_ms = 0;
let scale = 10;
let currentMu = 0.17; 

document.getElementById('click').onclick = function() {
    const m_in = document.getElementById('mass_input');
    const s_in = document.getElementById('speed_input');
    const mat_in = document.getElementById('material_select');

    if (m_in && s_in && mat_in) {
        v0_ms = parseFloat(s_in.value);
        currentMu = parseFloat(mat_in.value) * (0.98 + Math.random() * 0.04); 
        
        let d_teoretic = (v0_ms * v0_ms) / (2 * currentMu * 9.8);
        // Scara se adapteaza la latimea ecranului tau
        scale = (latimeSim - 100) / d_teoretic; 

        // Resetare pe verticala in functie de inaltimea containerului
        Body.setPosition(car, { x: 50, y: inaltimeSim - 52.5 });
        Body.setMass(car, parseFloat(m_in.value));
        Body.setVelocity(car, { x: (v0_ms * scale) / 60, y: 0 });
        isMoving = true;
    }
};

Matter.Events.on(engine, 'beforeUpdate', function() {
    if (isMoving) {
        let decel_px = (currentMu * 9.8 * scale) / 3600;
        let newV = car.velocity.x - decel_px;
        if (newV <= 0.05) { Body.setVelocity(car, { x: 0, y: 0 }); isMoving = false; } 
        else { Body.setVelocity(car, { x: newV, y: 0 }); }
    }
});

Matter.Events.on(render, 'afterRender', function() {
    const ctx = render.context;
    ctx.font = "bold 16px Arial"; ctx.fillStyle = "#fff";
    let d_metri = (car.position.x - 50) / scale;
    
    // Textele raman sus, masina ruleaza jos
    ctx.fillText("Masa: " + car.mass.toFixed(2) + " kg", 20, 30);
    ctx.fillText("v₀: " + v0_ms + " m/s", 20, 55);
    ctx.fillText("Distanta: " + d_metri.toFixed(2) + " m", 20, 80);

    if (!isMoving && d_metri > 0.1) {
        let mu_det = (v0_ms * v0_ms) / (2 * 9.8 * d_metri);
        ctx.fillStyle = "#00ff00";
        ctx.fillText("µ determinat: " + mu_det.toFixed(3), 20, 110);
    }
});