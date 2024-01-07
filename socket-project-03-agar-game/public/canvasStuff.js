




const draw = () => {

	// console.log(`inside draw ...uiCurrentPlayer=[${JSON.stringify(uiCurrentPlayer)}]`);

	//reset the context traslate back to default
	context.setTransform(1, 0, 0, 1, 0, 0);

	//clearRect clears out the canvas, so we can draw on a clean canvas next frame/draw()
	context.clearRect(0, 0, canvas.width, canvas.height)

	//clamp the screen/vp to the players location (x,y)
	const camX = -uiCurrentPlayer.x + canvas.width / 2
	const camY = -uiCurrentPlayer.y + canvas.height / 2

	//translate moves the cavnas/context to where the player is at
	context.translate(camX, camY)


	//draw all the players
	uiPlayerList.forEach(p => {
		if (!p) {
			//if the playerData doesn't exist, this is an absobred player and we don't draw
			return
		}

		// console.log(`drawing players ...p=[${JSON.stringify(p)}]`);
		context.beginPath()
		context.fillStyle = 'rgb(255,0,0)' //p.color;
		context.arc(p.x, p.y, 100, 0, Math.PI * 2) //draw an arc/circle
		// context.arc(200,200,10,0,Math.PI*2) //draw an arc/circle
		//arg1 and arg2 are center x and centery of the arc
		//arg3 = radius of the circle
		//arg4 = where to start drawing in radians - 0 = 3:00
		//arg 5 = where to stop drawing in radians - Pi = 90deg
		context.fill();
		context.lineWidth = 100; //how wide to draw a line in pixels
		context.strokeStyle = 'rgb(0,255,0)' // draw a green line
		context.stroke() //draw the line (border)
	});

	//draw all the orbs
	uiOrbList.forEach(orb => {
		context.beginPath(); //this will start a new path
		context.fillStyle = 'rgb(255,255,255)' //orb.orbColor
		context.arc(orb.orbX, orb.orbY, orb.orbRadius, 0, Math.PI * 2);
		context.fill();
	})

	// requestAnimationFrame is like a controlled loop
	// it runs recursively, every paint/frame. If the framerate is 35 fps , then it gets called 35 times in 1 sec
	requestAnimationFrame(draw);
}


canvas.addEventListener('mousemove', (event) => {
	// console.log(event);

	const mousePosition = {
		x: event.clientX,
		y: event.clientY
	};

	let xVector = 0;
	let yVector = 0;

	const angleDeg = Math.atan2(mousePosition.y - (canvas.height / 2), mousePosition.x - (canvas.width / 2)) * 180 / Math.PI;
	if (angleDeg >= 0 && angleDeg < 90) {
		xVector = 1 - (angleDeg / 90);
		yVector = -(angleDeg / 90);
		// console.log("Mouse is in the lower right quardrant")
	} else if (angleDeg >= 90 && angleDeg <= 180) {
		xVector = -(angleDeg - 90) / 90;
		yVector = -(1 - ((angleDeg - 90) / 90));
		// console.log("Mouse is in the lower left quardrant")
	} else if (angleDeg >= -180 && angleDeg < -90) {
		xVector = (angleDeg + 90) / 90;
		yVector = (1 + ((angleDeg + 90) / 90));
		// console.log("Mouse is in the top left quardrant")
	} else if (angleDeg < 0 && angleDeg >= -90) {
		xVector = (angleDeg + 90) / 90;
		yVector = (1 - ((angleDeg + 90) / 90));
		// console.log("Mouse is in the top right quardrant")
	}

	uiCurrentPlayer.xVector = xVector ? xVector : .1;
	uiCurrentPlayer.yVector = yVector ? yVector : .1;
});