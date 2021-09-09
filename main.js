function setup() {

	createCanvas(
		Math.floor(Math.max(window.innerWidth, window.innerHeight) / 8),
		Math.floor(Math.max(window.innerWidth, window.innerHeight) / 8)
	);
	loadPixels();
	background(0);
	
	var c = color(210, 255, 131);
	
	let yoff = 0;
	for (let y = 0; y < height; y++) {
		let xoff = 0;
		for (let x = 0; x < width * 4; x += 4) {
			xoff += 0.02;
			let i = width * 4 * y + x;
			pixels[i + 0] = red(c);
			pixels[i + 1] = green(c);
			pixels[i + 2] = blue(c);
			pixels[i + 3] = map(noise(xoff, yoff), 0.4, 0.6, 0, 255);
		}
		yoff += 0.02;
	}
	updatePixels();
	document.querySelector("#defaultCanvas0").classList.add("layer");
	// noLoop();
}

window.onload = function () {
	let typos = document.querySelectorAll(".titeltypo");
	let layers = document.querySelectorAll(".layer");
	let frames = document.querySelectorAll(".frame , main");
	let layersArray = Array.from(layers);
	let timetable = document.querySelector(".timetable");
	let infogrid = document.querySelector(".infogrid");
	let canvas = document.querySelector("#defaultCanvas0");
	let kreis = document.querySelector(".kreis");
	let cursor = document.querySelector(".cursor");
	var lastScrollTop = 0;
	let prevX = 0;
	let prevY = 0;
	let yTravelled = 0;
	let xTravelled = 0;
	let totalTravelled = 0;
	let countToChange = 400;

	let isOben = false;

	setTimeout(() => {
		frames.forEach((e) => {
			e.classList.add("mit-border");
		});
		frames[0].classList.add("bgImage");

		frames[1].style.display = "block";
	}, 500);

	document.addEventListener(
		"scroll",
		(e) => {
			console.log("scroll");
			var st = window.pageYOffset || document.documentElement.scrollTop;
			if (st > lastScrollTop) {
				console.log("dwnnnn");
			} else {
			}
			lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
		},
		false
	);
	let bool = false;

	document.addEventListener(
		"mousemove",
		(e) => {
			x = e.clientX;
			y = e.clientY;
			kreis.style.left = x + "px";
			kreis.style.top = y + "px";
			if (prevX && prevY) {
				xTravelled = Math.abs(prevX - x);
				yTravelled = Math.abs(prevY - y);
			}
			prevX = x;
			prevY = y;
			totalTravelled += xTravelled + yTravelled;

			if (totalTravelled >= countToChange) {
				updateScene(e);
				totalTravelled = 0;
			}
			// if (y >= window.innerHeight / 2) {
			// 	if (bool) {
			// 		// updateScene(e);
			// 		bool = false;
			// 	}
			// 	typos[0].classList.add("hidden");
			// 	typos[1].classList.remove("hidden");
			// } else {
			// 	if (!bool) {
			// 		// updateScene(e);
			// 		bool = true;
			// 	}
			// 	typos[0].classList.remove("hidden");
			// 	typos[1].classList.add("hidden");
			// }
		},
		false
	);

	document.addEventListener(
		"click",
		(e) => {
			toggleHochRunter();
		},
		false
	);

	document.addEventListener(
		"touchend",
		(e) => {
			// switchHidden(typos);
			shuffleZIndex();
			changeFog();
		},
		false
	);

	function toggleHochRunter() {
		console.log(isOben);
		if (isOben) {
			infogrid.style.display = "none";
			frames[0].classList.add("bgImage", "mit-border");
			frames.forEach((e) => {
				e.classList.add("mit-border");
			});
			document.querySelectorAll("h1").forEach((e)=>{
				e.style.display = "block"
			})
		} else {
			frames.forEach((e) => {
				e.classList.remove("mit-border");
			});
			document.querySelectorAll("h1").forEach((e)=>{
				e.style.display = "none"
			})
			frames[0].classList.remove("bgImage", "mit-border");
			infogrid.style.display = "grid";
		}
		isOben = !isOben;
	}

	function updateScene(e) {
		shuffleZIndex();
		let r = Math.random();
		if (r > 0.8) {
			switchHidden(typos);
			changeFog();
		} else if (r > 0.6) {
		}
		// setRandomPositon(timetable);
		// setRandomPositon(infotext);
	}

	function shuffleZIndex() {
		layers.forEach((e) => {
			let r = Math.floor(Math.random() * 50) + 11;
			e.style.zIndex = r;
		});
	}
	function changeFog() {
		// let mx = map_value(x, 0, window.innerWidth, 0, 1000);
		// let my = map_value(y, 0, window.innerHeight, 0, 1000);
		let = rx = -(Math.random() * 800);
		let = ry = -(Math.random() * 800);

		canvas.style.transform = "translate(" + rx + "%, " + ry + "%) scale(16)";
	}
	function switchHidden(arr) {
		arr[0].classList.toggle("hidden");
		arr[1].classList.toggle("hidden");
	}
	function setRandomPositon(elem) {
		console.log(elem);
		let rx = Math.floor(Math.random() * (window.innerWidth - elem.offsetWidth));
		let ry = Math.floor(
			Math.random() * (window.innerHeight - elem.offsetHeight - 200)
		);
		// elem.style.left = rx + "px";
		elem.style.top = ry + 100 + "px";
	}

	function map_value(value, low1, high1, low2, high2) {
		return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
	}
};
