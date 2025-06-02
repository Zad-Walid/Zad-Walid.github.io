# ML Course Final Project - Gesture Control Game

This project implements a gesture-controlled game using machine learning for gesture recognition. Players can control the game using hand gestures captured through their webcam.

## 🚀 Quick Start

1. Install the Live Server extension in VS Code:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server"
   - Install the extension by Ritwick Dey

2. Launch the project:
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - The game should open in your default browser at `http://localhost:5500`

## 📁 Project Structure

- `index.html` - Main game interface
- `api-call.js` - ML model API integration
- `cam.js` - Webcam handling and gesture processing
- `keyboard.js` - Keyboard controls implementation
- `maze.js` - Maze game logic
- `mp.js` - Media processing utilities

## 🔧 Important Implementation Note

### API Integration

The `api-call.js` file now sends the hand landmarks as a flat array of 63 numbers to the backend API and receives a predicted gesture label. The backend expects the following JSON format:

```json
{
  "landmarks": [63 float values]
}
```

The function `getPredictedLabel` in `api-call.js`:
- Takes the processed landmarks as input (a flat array of 63 numbers)
- Calls your deployed ML model's API (`/predict`)
- Returns one of these labels: `"up"`, `"down"`, `"left"`, `"right"`, or `null` (for pause/no gesture)

### Gesture-to-Game Mapping

In `mp.js`, the predicted gesture is mapped to game movement by calling the `onMoveKey(axis)` function, where `axis` is determined by the gesture label:
- `"up"` → `[0, 1]`
- `"down"` → `[0, -1]`
- `"left"` → `[-1, 0]`
- `"right"` → `[1, 0]`
- `null` → no movement

This allows the game to be controlled seamlessly by either hand gestures or keyboard input.

## 🎮 Controls

The game can be controlled through:
- Hand gestures (via webcam)
- Keyboard arrows (as fallback)

## 🛠️ Troubleshooting

- Ensure your backend API is running and accessible at the configured URL.
- Make sure the landmarks array sent to the API is a flat array of 63 numbers.
- Check the browser console for errors if gestures do not control the game.