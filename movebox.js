
// Check if the necessary sensors are available
if ('Accelerometer' in window && 'Gyroscope' in window) {
  let accel = new Accelerometer({frequency: 60});
  let gyro = new Gyroscope({frequency: 60});

  let vx = 0, vy = 0; // Velocity components
  let px = window.innerWidth / 2, py = window.innerHeight / 2; // Initial position

  accel.addEventListener('reading', e => {
    // Update velocity based on acceleration
    vx += accel.x * 0.1; // Modify the 0.1 factor to adjust sensitivity
    vy += accel.y * 0.1;
  });

  gyro.addEventListener('reading', () => {
    // Update box position based on velocity
    px += vx;
    py += vy;

    // Keep the box within the bounds of the window
    px = Math.max(0, Math.min(window.innerWidth - 50, px));
    py = Math.max(0, Math.min(window.innerHeight - 50, py));

    // Update the position of the box
    document.getElementById('box').style.transform = `translate(${px - window.innerWidth / 2}px, ${py - window.innerHeight / 2}px)`;
  });

  accel.start();
  gyro.start();
} else {
  console.log('Accelerometer or Gyroscope not supported');
}
