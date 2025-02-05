import React, { useState } from "react";

const conversions = {
  "kg-lb": (value) => value * 2.20462,
  "lb-kg": (value) => value / 2.20462,
  "km-mi": (value) => value * 0.621371,
  "mi-km": (value) => value / 0.621371,
  "c-f": (value) => (value * 9/5) + 32,
  "f-c": (value) => (value - 32) * 5/9,
};

const convert = (from, to, values) => {
  const key = `${from}-${to}`;
  return Array.isArray(values) ? values.map(conversions[key]) : conversions[key](values);
};

const Converter = ({ title, fromUnit, toUnit }) => {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState(null);

  const handleConvert = () => {
    const values = input.includes(",") ? input.split(",").map(Number) : Number(input);
    setOutput(convert(fromUnit, toUnit, values));
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 border rounded w-full"
        placeholder={`Enter ${fromUnit} value(s)`}
      />
      <button onClick={handleConvert} className="mt-2 p-2 bg-blue-500 text-white rounded w-full">
        Convert
      </button>
      {output !== null && <p className="mt-2">Result: {Array.isArray(output) ? output.join(", ") : output} {toUnit}</p>}
    </div>
  );
};

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <nav className="mb-4 flex justify-around bg-gray-200 p-2 rounded">
        <button className="p-2">Weight</button>
        <button className="p-2">Distance</button>
        <button className="p-2">Temperature</button>
      </nav>
      <div className="grid gap-4">
        <Converter title="Weight Converter" fromUnit="kg" toUnit="lb" />
        <Converter title="Distance Converter" fromUnit="km" toUnit="mi" />
        <Converter title="Temperature Converter" fromUnit="c" toUnit="f" />
      </div>
    </div>
  );
}