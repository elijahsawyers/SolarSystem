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
  let currentButtonSelected;
  let body = document.getElementsByTagName("body")[0];
  let container = document.getElementById("astronomical-container");
  let speedSlider = document.getElementById("speed-slider");
  let earthSpeed = document.getElementById("earth-speed");
  let neptuneSpeed = document.getElementById("neptune-speed");
  let menuButtons = document.getElementsByClassName("button");
  let speedText = document.getElementById("speed-text");
  let sizeText = document.getElementById("size-text");
  let distanceText = document.getElementById("distance-text");
  let midPoint = { x: container.clientWidth / 2 + container.offsetLeft, y: container.clientHeight / 2 };
  let planetPadding = (((container.clientHeight / 2) - (PLANET_SIZE * NUM_PLANETS)) / 7);
  let sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune;
  let speedScale = 1.0;
  let speedInterval;

  /*==================================================
  Event handlers
  ==================================================*/

  speedSlider.oninput = (e) => {
    speedScale = Number(e.target.value) / 100;
    earthSpeed.innerHTML = (3.65 / speedScale).toFixed(2);
    neptuneSpeed.innerHTML = (10 / speedScale).toFixed(2);
  }

  for (let i = 0; i < menuButtons.length; i++) {
    menuButtons[i].onclick = (e) => {
      menuButtons[currentButtonSelected].classList.remove("selected");
      menuButtons[i].classList.add("selected");

      switch (i) {
        case 0:
          initSpeed();
          break;
        case 1:
          initSize();
          break;
        case 2:
          initDistance();
          break;
      }
    }
  }

  /*==================================================
  Display state methods
  ==================================================*/

  let createArrow = (left, top) => {
    let arrow = document.createElement("div");
    arrow.classList.add("arrow");
    arrow.style.left = left + "px";
    arrow.style.top = top + "px";
    let leftEl = document.createElement("div");
    leftEl.classList.add("left");
    let rightEl = document.createElement("div");
    rightEl.classList.add("right");
    arrow.append(leftEl);
    arrow.append(rightEl);
    return arrow;
  };

  let initSpeed = () => {
    if (currentButtonSelected == 0) { return; }
    let orbitPaths = document.getElementsByClassName("orbit-path");
    for (let i = 0; i < orbitPaths.length; i++) { orbitPaths[i].classList.remove("hidden"); }
    let arrows = document.getElementsByClassName("arrow");
    while(arrows.length) { arrows[0].remove(); }
    speedSlider.classList.remove("no-display");
    sizeText.classList.add("no-display");
    distanceText.classList.add("no-display");
    speedText.classList.remove("no-display");
    sun.setSize(15, 15);
    mercury.setSize(15, 15);
    venus.setSize(15, 15);
    earth.setSize(15, 15);
    mars.setSize(15, 15);
    jupiter.setSize(15, 15);
    saturn.setSize(15, 15);
    uranus.setSize(15, 15);
    neptune.setSize(15, 15);
    sun.setPosition(midPoint.x, midPoint.y);
    mercury.setPosition(midPoint.x, midPoint.y - (planetPadding * 1));
    venus.setPosition(midPoint.x, midPoint.y - (planetPadding * 2));
    earth.setPosition(midPoint.x, midPoint.y - (planetPadding * 3));
    mars.setPosition(midPoint.x, midPoint.y - (planetPadding * 4));
    jupiter.setPosition(midPoint.x, midPoint.y - (planetPadding * 5));
    saturn.setPosition(midPoint.x, midPoint.y - (planetPadding * 6));
    uranus.setPosition(midPoint.x, midPoint.y - (planetPadding * 7));
    neptune.setPosition(midPoint.x, midPoint.y - (planetPadding * 8));
    speedInterval = setInterval(() => { // Start the orbital loop - 1 day is 10 miliseconds, so an earth year is 3.65 seconds.
      mercury.rotate(midPoint, -4.091 * speedScale);
      venus.rotate(midPoint, -1.600 * speedScale);
      earth.rotate(midPoint, -0.986 * speedScale);
      mars.rotate(midPoint, -0.524 * speedScale);
      jupiter.rotate(midPoint, -0.082 * speedScale);
      saturn.rotate(midPoint, -0.034 * speedScale);
      uranus.rotate(midPoint, -0.012 * speedScale);
      neptune.rotate(midPoint, -0.006 * speedScale);
    }, 10);
    currentButtonSelected = 0;
  };

  let initSize = () => {
    let orbitPaths = document.getElementsByClassName("orbit-path");
    for (let i = 0; i < orbitPaths.length; i++) { orbitPaths[i].classList.add("hidden"); }
    let arrows = document.getElementsByClassName("arrow");
    while(arrows.length) { arrows[0].remove(); }
    speedSlider.classList.add("no-display");
    window.clearInterval(speedInterval);
    speedText.classList.add("no-display");
    distanceText.classList.add("no-display");
    sizeText.classList.remove("no-display");
    sun.setSize(864, 864); sun.setPosition(window.innerWidth - 150, midPoint.y - (864 / 2));
    mercury.setSize(3.03, 3.03); mercury.setPosition(window.innerWidth - (50 * 4), midPoint.y - (3.03 / 2));
    venus.setSize(7.52, 7.52); venus.setPosition(window.innerWidth - (50 * 5), midPoint.y - (7.52 / 2));
    earth.setSize(7.92, 7.92); earth.setPosition(window.innerWidth - (50 * 6), midPoint.y - (7.92 / 2));
    mars.setSize(4.21, 4.21); mars.setPosition(window.innerWidth - (50 * 7), midPoint.y - (4.21 / 2));
    jupiter.setSize(86.89, 86.89); jupiter.setPosition(window.innerWidth - (50 * 8) - 86.89, midPoint.y - (86.89 / 2));
    saturn.setSize(72.37, 72.37); saturn.setPosition(window.innerWidth - (50 * 9) - (86.89 + 72.37), midPoint.y - (72.37 / 2));
    uranus.setSize(31.52, 31.52); uranus.setPosition(window.innerWidth - (50 * 10) - (86.89 + 72.37 + 31.52), midPoint.y - (31.52 / 2));
    neptune.setSize(30.60, 30.60); neptune.setPosition(window.innerWidth - (50 * 11) - (86.89 + 72.37 + 31.52 + 30.60), midPoint.y - (30.60 / 2));
    container.append(createArrow(window.innerWidth - (50 * 4), midPoint.y - (3.03 / 2) - 45));
    container.append(createArrow(window.innerWidth - (50 * 5), midPoint.y - (7.52 / 2) - 45));
    container.append(createArrow(window.innerWidth - (50 * 6), midPoint.y - (7.92 / 2) - 45));
    container.append(createArrow(window.innerWidth - (50 * 7), midPoint.y - (4.21 / 2) - 45));
    currentButtonSelected = 1;
  };

  let initDistance = () => {
    let orbitPaths = document.getElementsByClassName("orbit-path");
    for (let i = 0; i < orbitPaths.length; i++) { orbitPaths[i].classList.add("hidden"); }
    let arrows = document.getElementsByClassName("arrow");
    while(arrows.length) { arrows[0].remove(); }
    speedSlider.classList.add("no-display");
    sizeText.classList.add("no-display");
    speedText.classList.add("no-display");
    distanceText.classList.remove("no-display");
    window.clearInterval(speedInterval);
    sun.setSize(5, 5);
    mercury.setSize(5, 5);
    venus.setSize(5, 5);
    earth.setSize(5, 5);
    mars.setSize(5, 5);
    jupiter.setSize(5, 5);
    saturn.setSize(5, 5);
    uranus.setSize(5, 5);
    neptune.setSize(5, 5);
    let au = 27.5;
    let startingX = 100 + window.innerWidth - container.clientWidth;
    sun.setPosition(startingX, midPoint.y);
    mercury.setPosition(startingX + (au * 0.31), midPoint.y);
    venus.setPosition(startingX + (au * 0.72), midPoint.y);
    earth.setPosition(startingX + au, midPoint.y);
    mars.setPosition(startingX + (au * 1.44), midPoint.y);
    jupiter.setPosition(startingX + (au * 5.12), midPoint.y);
    saturn.setPosition(startingX + (au * 9.98), midPoint.y);
    uranus.setPosition(startingX + (au * 19.7), midPoint.y);
    neptune.setPosition(startingX + (au * 29.92), midPoint.y);
    container.append(createArrow(startingX + (au * 5.12), midPoint.y - 42.5));
    container.append(createArrow(startingX + (au * 9.98), midPoint.y - 42.5));
    container.append(createArrow(startingX + (au * 19.7), midPoint.y - 42.5));
    container.append(createArrow(startingX + (au * 29.92), midPoint.y - 42.5));
    currentButtonSelected = 2;
  };

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

  // Init the speed display.
  initSpeed();
  currentButtonSelected = 0;
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

  setSize(height, width) {
    this.element.style.height = height + "px";
    this.element.style.width = width + "px";
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
