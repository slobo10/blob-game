const randomColor: () => [number, number, number] = () => {
  return [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
  ];
};

const RGBtoString: (color: [number, number, number]) => string = (color) => {
  let i: number;
  let output: string = "#";
  for (i = 0; i < 3; i++) {
    let colorCharacterNumber: number = Math.floor(color[i] / 16);

    switch (colorCharacterNumber) {
      case 10: {
        output += "a";
        break;
      }
      case 11: {
        output += "b";
        break;
      }
      case 12: {
        output += "c";
        break;
      }
      case 13: {
        output += "d";
        break;
      }
      case 14: {
        output += "e";
        break;
      }
      case 15: {
        output += "f";
        break;
      }
      default: {
        output += colorCharacterNumber.toString();
      }
    }

    colorCharacterNumber = color[i] - colorCharacterNumber * 16;

    switch (colorCharacterNumber) {
      case 10: {
        output += "a";
        break;
      }
      case 11: {
        output += "b";
        break;
      }
      case 12: {
        output += "c";
        break;
      }
      case 13: {
        output += "d";
        break;
      }
      case 14: {
        output += "e";
        break;
      }
      case 15: {
        output += "f";
        break;
      }
      default: {
        output += colorCharacterNumber.toString();
      }
    }
  }
  return output;
};

const average: (
  a: number,
  b: number,
  strengthA?: number,
  strengthB?: number
) => number = (a, b, strengthA, strengthB) => {
  if (typeof strengthA === "undefined" && typeof strengthB === "undefined") {
    return (a + b) / 2;
  } else if (typeof strengthA === "number" && typeof strengthB === "number") {
    return (a * strengthA + b * strengthB) / (strengthA + strengthB);
  }
};

export { randomColor, RGBtoString, average };
