const randomColor: () => [number, number, number] = () => {
  return [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
  ];
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

export { randomColor, average };
