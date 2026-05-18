// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

const simulationDiv = window.parent.document.getElementById("simulation-mount");
const offset = document.getElementById("info").clientHeight + 20;

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: simulationDiv.clientWidth,
        height: simulationDiv.clientHeight - offset,
        wireframes: false
    }
});

var line1 = Bodies.rectangle((simulationDiv.clientWidth/2)-100, 380, 10, 400, { isStatic: true });
var line2 = Bodies.rectangle((simulationDiv.clientWidth/2)+100, 380, 10, 400, { isStatic: true });
var water = Bodies.circle((simulationDiv.clientWidth/2), 50, 10, {render: {fillStyle: 'blue',strokeStyle: "blue",lineWidth: 3}});
var ground = Bodies.rectangle((simulationDiv.clientWidth/2), 610, 810, 60, { isStatic: true });
var oil = Bodies.rectangle((simulationDiv.clientWidth/2),380, 182, 400, { isStatic: true, render: {fillStyle: 'rgba(240, 181, 5, 0.5)',lineWidth: 3}, collisionFilter: {
    category: 0x0001,
    mask: 0x0000
  }})
oil.isSensor = true;

var button = document.getElementById("reset");

button.onclick = function(){
  Matter.Body.set(water, 'position', { x: (simulationDiv.clientWidth/2), y: 50 })
  Matter.Body.set(water, "velocity", { x: 0,  y: 0})
};

// add all of the bodies to the world
Composite.add(engine.world, [line1, line2, oil, water, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

function loop() {
  document.getElementById("viteza").innerText = "Viteza=" + Math.round(water.velocity.y*100)/1000 + "m/s"
  if(water.position.y > 180 && water.velocity.y > 0.25)
    {
      Matter.Body.set(water, "velocity", {x:0, y:0.25});
    }
  requestAnimationFrame(loop);
}

loop();