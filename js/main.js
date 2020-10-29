/**
 * Author: Elijah Sawyers
 * Date: 11/20/2020
 * Overview: AY 101-001 Creative Project.
 */

let STAR_COUNT  = 250;
let PLANET_SIZE = 15;
let NUM_PLANETS = 8;

/**
 * Main code.
 */
window.onload = () => {
  let body = document.getElementsByTagName("body")[0];
  let container = document.getElementById("astronomical-container");
  let speedSlider = document.getElementById("speed-slider");
  let earthSpeed = document.getElementById("earth-speed");
  let neptuneSpeed = document.getElementById("neptune-speed");
  let speedScale = 1.0;
  let midPoint = { x: container.clientWidth / 2 + container.offsetLeft, y: container.clientHeight / 2 };
  let planetPadding = (((container.clientHeight / 2) - (PLANET_SIZE * NUM_PLANETS)) / 7);
  let sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune;

  /*==================================================
  Event handlers
  ==================================================*/
  speedSlider.oninput = (e) => {
    speedScale = Number(e.target.value) / 100;
    earthSpeed.innerHTML = (3.65 / speedScale).toFixed(2);
    neptuneSpeed.innerHTML = (10 / speedScale).toFixed(2);
  }

  /*==================================================
  Initialize the solar system
  ==================================================*/

  // Init stars.
  stars(body);

  // Init planets.
  sun     = new AstronomicalObject("sun", container, midPoint.x, midPoint.y);
  mercury = new Planet("mercury", container, midPoint.x, midPoint.y - (planetPadding * 1), 0);
  venus   = new Planet("venus",   container, midPoint.x, midPoint.y - (planetPadding * 2), 0);
  earth   = new Planet("earth",   container, midPoint.x, midPoint.y - (planetPadding * 3), 0);
  mars    = new Planet("mars",    container, midPoint.x, midPoint.y - (planetPadding * 4), 0);
  jupiter = new Planet("jupiter", container, midPoint.x, midPoint.y - (planetPadding * 5), 0);
  saturn  = new Planet("saturn",  container, midPoint.x, midPoint.y - (planetPadding * 6), 0);
  uranus  = new Planet("uranus",  container, midPoint.x, midPoint.y - (planetPadding * 7), 0);
  neptune = new Planet("neptune", container, midPoint.x, midPoint.y - (planetPadding * 8), 0);

  // Fade in the scene.
  body.style.animation = "fade-in 2s ease-in forwards";

  // Start the orbital loop - 1 day is 10 miliseconds, so an earth year is 3.65 seconds.
  setInterval(() => {
    mercury.rotate(midPoint, -4.091 * speedScale);
    venus.rotate(midPoint, -1.600 * speedScale);
    earth.rotate(midPoint, -0.986 * speedScale);
    mars.rotate(midPoint, -0.524 * speedScale);
    jupiter.rotate(midPoint, -0.082 * speedScale);
    saturn.rotate(midPoint, -0.034 * speedScale);
    uranus.rotate(midPoint, -0.012 * speedScale);
    neptune.rotate(midPoint, -0.006 * speedScale);
  }, 10);
};

class AstronomicalObject {
  constructor(id, container, x, y) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.container = container;
    this.element = document.getElementById(id);
    this.setPosition(x, y);
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
  }

  rotate(point, degrees) {
    let radians = degrees * (Math.PI / 180);
    let newX = ((this.x - point.x) * Math.cos(radians)) - ((this.y - point.y) * Math.sin(radians)) + point.x;
    let newY = ((this.x - point.x) * Math.sin(radians)) + ((this.y - point.y) * Math.cos(radians)) + point.y;
    this.setPosition(newX, newY);
  }
}

class Planet extends AstronomicalObject {
  constructor(id, container, x, y, orbitSpeed) {
    super(id, container, x, y);
    this.orbitSpeed = orbitSpeed;
    this.setOrbitPath();
  }

  setOrbitPath() {
    if (this.orbitPath) { this.orbitPath.remove(); }
    let height = Math.abs(this.container.clientHeight / 2 - this.y) * 2;
    let width = height;
    this.orbitPath = document.createElement("div");
    this.orbitPath.classList.add("orbit-path");
    this.orbitPath.style.width = width + "px";
    this.orbitPath.style.height = height + "px";
    this.orbitPath.style.left = this.x - (width / 2) + (PLANET_SIZE / 2) + "px";
    this.orbitPath.style.top = this.y + (PLANET_SIZE / 2) + "px";
    this.orbitPath.style.borderRadius = width / 2 + "px";
    this.container.append(this.orbitPath);
  }
}

let stars = (element) => {
  for (let i = 0; i < STAR_COUNT; i++) {
    let star = document.createElement("i");
    let x = Math.floor(Math.random() * element.clientWidth);
    let y = Math.floor(Math.random() * element.clientHeight);
    let size = Math.random() * 2;

    star.classList.add("star");
    star.style.left = x + "px";
    star.style.top = y + "px";
    star.style.width = size + "px";
    star.style.height = size + "px";

    element.append(star);
  }
};
