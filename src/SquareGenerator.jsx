import React, { useState } from "react";

function generateSquare(width, height, numColors) {
  // generate colors array
  let colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(Math.floor(Math.random() * 16777215).toString(16));
  }

  // generate square array
  const square = [];
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      let colorIndex = Math.floor(Math.random() * numColors);
      row.push({ color: colors[colorIndex], checked: false });
    }
    square.push(row);
  }

  return square;
}

function findLargestArea(square) {
  let maxArea = 0;
  let maxColor = "";
  for (let i = 0; i < square.length; i++) {
    for (let j = 0; j < square[i].length; j++) {
      if (!square[i][j].checked) {
        let count = getAreaCount(square, i, j, square[i][j].color);
        if (count > maxArea) {
          maxArea = count;
          maxColor = square[i][j].color;
        }
      }
    }
  }
  return { area: maxArea, color: maxColor };
}

function getAreaCount(square, i, j, color) {
  if (
    i < 0 ||
    i >= square.length ||
    j < 0 ||
    j >= square[i].length ||
    square[i][j].color !== color ||
    square[i][j].checked
  ) {
    return 0;
  }

  square[i][j].checked = true;
  return (
    1 +
    getAreaCount(square, i + 1, j, color) +
    getAreaCount(square, i - 1, j, color) +
    getAreaCount(square, i, j + 1, color) +
    getAreaCount(square, i, j - 1, color)
  );
}

function SquareGenerator() {
  const [data, setData] = useState({
    width: 0,
    height: 0,
    numColors: 0,
  });

  const { width, height, numColors } = data;

  const [square, setSquare] = useState(
    generateSquare(width, height, numColors)
  );

  const [largestArea, setLargestArea] = useState({ area: 0, color: "" });

  const handleChange = (value, key) => {
    setData((p) => {
      return { ...p, [key]: value };
    });
  };

  const handleClick = () => {
    const data = generateSquare(width, height, numColors);
    setSquare(data);
    setLargestArea(findLargestArea(data));
  };

  return (
    <div>
      <div className="container">
        <input
          placeholder="Width"
          onChange={(e) => handleChange(e.target.value, "width")}
        />
        <input
          placeholder="Height"
          onChange={(e) => handleChange(e.target.value, "height")}
        />
        <input
          placeholder="Number of colors"
          onChange={(e) => handleChange(e.target.value, "numColors")}
        />
      </div>
      <button onClick={handleClick}>Generate Square</button>
      <p>
        Largest Area: {largestArea.area} cells of color {largestArea.color}
      </p>
      <table
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <tbody>
          {square.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    backgroundColor: `#${cell.color}`,
                  }}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SquareGenerator;
