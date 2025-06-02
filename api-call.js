async function getPredictedLabel(landmarks) {
  let processed_t = landmarks;
  if (
    Array.isArray(landmarks) &&
    landmarks.length === 21 &&
    typeof landmarks[0] === "object" &&
    "x" in landmarks[0] &&
    "y" in landmarks[0] &&
    "z" in landmarks[0]
  ) {
    processed_t = landmarks.flatMap(lm => [lm.x, lm.y, lm.z]);
  }

  // Ensure processed_t is a flat array of 63 numbers
  if (!Array.isArray(processed_t) || processed_t.length !== 63) {
    console.error("Invalid landmarks array. Expected 63 numbers.", processed_t);
    return null;
  }

  try {
    console.log("Sending landmarks:", processed_t);

    const response = await fetch("http://34.229.203.244:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ landmarks: processed_t }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error:", response.status, errorText);
      return null;
    }

    const result = await response.json();

    if (result && result.action) {
      const actionToLabel = {
        move_up: "up",
        move_down: "down",
        move_left: "left",
        move_right: "right",
        pause: null
      };
      return actionToLabel[result.action];
    }
    return null;
  } catch (error) {
    console.error("Error predicting gesture:", error);
    return null;
  }
}