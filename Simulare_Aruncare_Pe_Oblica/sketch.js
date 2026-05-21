<<<<<<< HEAD
=======
// module aliases
>>>>>>> 0975bce7c7d3dcd8fd0a3bb583aa8465bd000181
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

<<<<<<< HEAD
=======
// create an engine
>>>>>>> 0975bce7c7d3dcd8fd0a3bb583aa8465bd000181
var engine = Engine.create();

const simulationDiv = window.parent.document.getElementById("simulation-mount");
const offset = document.getElementById("info").clientHeight + 35;
console.log(offset)

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: simulationDiv.clientWidth,
        height: simulationDiv.clientHeight - offset,
        wireframes: false,
        hasBounds: true
    }
});

const width = simulationDiv.clientWidth;
const height = simulationDiv.clientHeight - offset;
const groundY = height * 0.95;
<<<<<<< HEAD
const circleY = groundY - 40;
=======
const circleY = height * 0.9;
>>>>>>> 0975bce7c7d3dcd8fd0a3bb583aa8465bd000181
const borderHeight = height * 1.2;

let canPress = true;
let del = [];

<<<<<<< HEAD
=======
// create two boxes and a ground
>>>>>>> 0975bce7c7d3dcd8fd0a3bb583aa8465bd000181
var ground = Bodies.rectangle(width/2, groundY, width+20, 60, { isStatic: true });

var circleA = Bodies.circle((width/2)-(width/2.5), circleY, 10);

var border = Bodies.rectangle(width, (height/2), 30, borderHeight, { isStatic: true });

const camWidth = render.options.width;
const camHeight = render.options.height;

const targetX = ground.position.x - camWidth / 2;
const targetY = ground.position.y - (camHeight / 2)-(height/2)+(height/12);

render.bounds.min.x = targetX;
render.bounds.min.y = targetY;

render.bounds.max.x = targetX + camWidth;
render.bounds.max.y = targetY + camHeight;

<<<<<<< HEAD
Composite.add(engine.world, [circleA, ground, border]);

Render.run(render);

var runner = Runner.create();
=======
// add all of the bodies to the world
Composite.add(engine.world, [circleA, ground, border]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();
// run the engine
>>>>>>> 0975bce7c7d3dcd8fd0a3bb583aa8465bd000181
Runner.run(runner, engine);

const butt = document.getElementById("click");

butt.onclick = function () {
  del.forEach(b => Matter.Composite.remove(engine.world, b));
  del = [];

  let angleDeg = parseFloat(document.getElementById("angle").value);
  let speed = parseFloat(document.getElementById("speed").value / 100);
  let angle = angleDeg * Math.PI / 180;

  let vx0 = Math.cos(angle) * speed * 100;
  let vy0 = -Math.sin(angle) * speed * 100;

<<<<<<< HEAD
  const g = engine.world.gravity.y * engine.world.gravity.scale * 1000;
  const launchHeight = circleY;
  const groundHeight = groundY;
  const discriminant = vy0 * vy0 - 2 * g * (launchHeight - groundHeight);
  let timeToGround = NaN;
  if (discriminant >= 0) {
    timeToGround = (-vy0 + Math.sqrt(discriminant)) / g;
  }

  const maxHeight = (vy0 * vy0) / (2 * g);
  const range = timeToGround > 0 ? vx0 * timeToGround : 0;

  document.getElementById("max-height").innerText =
    "Înălțime maximă: " + maxHeight.toFixed(1) + " px";
  document.getElementById("range").innerText =
    "Bătaie: " + range.toFixed(1) + " px";

=======
>>>>>>> 0975bce7c7d3dcd8fd0a3bb583aa8465bd000181
  let simEngine = Matter.Engine.create();
  simEngine.world.gravity.y = engine.world.gravity.y;
  simEngine.world.gravity.scale = engine.world.gravity.scale;

  let simGround = Bodies.rectangle(width/2, groundY, width+20, 60, { isStatic: true });
  let simBorder = Bodies.rectangle(width, (height/2), 30, borderHeight, { isStatic: true });
  let temp = Bodies.circle((width/2)-(width/2.5), circleY, 10);

  Composite.add(simEngine.world, [temp, simGround, simBorder]);

  Matter.Body.setVelocity(temp, {
    x: vx0,
    y: vy0
  });

  let steps = 120;
  let sampleEvery = 1;
  
  for (let i = 0; i < steps; i++) {
    Matter.Engine.update(simEngine, 1000 / 60);

    if (i % sampleEvery === 0) {
        let c = Bodies.circle(temp.position.x, temp.position.y, 1, {
            isStatic: true,
            collisionFilter: {
                category: 0x0001,
                mask: 0x0000
            }
        });

        del.push(c);
        Composite.add(engine.world, c);
    }

    const groundTop = groundY - 30;

    if (temp.position.y >= groundTop - temp.circleRadius) {
        break;
    }
}

  if (canPress) {
    canPress = false;

    Matter.Body.setStatic(circleA, true);
<<<<<<< HEAD
    Matter.Body.setPosition(circleA, { x: ((width/2)-(width/2.5)), y: circleY });
=======
    Matter.Body.setPosition(circleA, { x: ((width/2)-(width/2.5)), y: (height - 80) });
>>>>>>> 0975bce7c7d3dcd8fd0a3bb583aa8465bd000181

    setTimeout(() => {
      Matter.Body.setStatic(circleA, false);

      Matter.Body.setVelocity(circleA, {
        x: vx0,
        y: vy0
      });

      canPress = true;
    }, 2000);
  }
};