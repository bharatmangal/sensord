// Check if necessary sensors are available
if ('LinearAccelerationSensor' in window && 'AbsoluteOrientationSensor' in window) {
  const accel = new LinearAccelerationSensor({frequency: 60});
  const orientation = new AbsoluteOrientationSensor({frequency: 60});
  let vx = 0, vy = 0; // Velocity components
  let px = window.innerWidth / 2, py = window.innerHeight / 2; // Initial position

  orientation.addEventListener('reading', () => {
    // Use quaternion for more accurate direction data
    let q = orientation.quaternion;
    
    // Convert quaternion to degrees to understand device orientation
    const toDegrees = angle => angle * 180 / Math.PI;
    const roll = toDegrees(Math.atan2(2.0 * (q[0] * q[1] + q[2] * q[3]), 1.0 - 2.0 * (q[1] * q[1] + q[2] * q[2])));
    const pitch = toDegrees(Math.asin(2.0 * (q[0] * q[2] - q[3] * q[1])));
    const yaw = toDegrees(Math.atan2(2.0 * (q[0] * q[3] + q[1] * q[2]), 1.0 - 2.0 * (q[2] * q[2] + q[3] * q[3])));

    // Assuming yaw gives the direction in horizontal plane
    vx += accel.x * Math.cos(yaw * Math.PI / 180);
    vy += accel.x * Math.sin(yaw * Math.PI / 180);
  });

  accel.addEventListener('reading', () => {
    // Update box position based on updated velocities considering orientation
    px += vx;
    py += vy;

    // Keep the box within the bounds of the window
    px = Math.max(0, Math.min(window.innerWidth - 50, px));
    py = Math.max(0, Math.min(window.innerHeight - 50, py));

    // Update the position of the box
    document.getElementById('box').style.transform = `translate(${px - window.innerWidth / 2}px, ${py - window.innerHeight / 2}px)`;
  });

  accel.start();
  orientation.start();
} else {
  console.log('LinearAccelerationSensor or AbsoluteOrientationSensor not supported');
}
