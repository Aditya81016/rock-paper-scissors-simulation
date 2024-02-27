let frameRate = 10;
let size = 30;
let quantity = 20;
let speed = 100;

let timeoutInterval = 1;

const params = window.location.search.substring(1).split("&");
params.forEach((param) => {
  param = param.split("=");
  switch (param[0]) {
    case "frameRate":
      frameRate = param[1];
      break;
    case "size":
      size = param[1];
      break;
    case "quantity":
      quantity = param[1];
      break;
    case "speed":
      speed = param[1];
      break;
    case "timeoutInterval":
      timeoutInterval = param[1];
      break;
  }
});

export { frameRate, size, quantity, speed, timeoutInterval };
