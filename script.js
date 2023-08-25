    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const paddleWidth = 300;
    const paddleHeight = 50;
    const ballSize = 20;

    let paddleX = (canvas.width - paddleWidth) / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height - paddleHeight - ballSize;
    let ballSpeedX = 5;
    let ballSpeedY = -5;

    function draw() {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw paddle
      ctx.fillStyle = "#fff";
      ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);

      // Draw ball
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.closePath();

      // Move the ball
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Bounce off walls
      if (ballX + ballSize > canvas.width || ballX - ballSize < 0) {
        ballSpeedX *= -1;
      }
      if (ballY - ballSize < 0) {
        ballSpeedY *= -1;
      }

      // Bounce off paddle
      if (
        ballY + ballSize > canvas.height - paddleHeight &&
        ballX > paddleX &&
        ballX < paddleX + paddleWidth
      ) {
        ballSpeedY *= -1;
      }

      // Game loop
      requestAnimationFrame(draw);
    }

    function movePaddle(e) {
      const mouseX = e.clientX - canvas.offsetLeft;
      paddleX = Math.min(Math.max(mouseX - paddleWidth / 2, 0), canvas.width - paddleWidth);
    }

    canvas.addEventListener("mousemove", movePaddle);

    // Start the game loop
    draw();