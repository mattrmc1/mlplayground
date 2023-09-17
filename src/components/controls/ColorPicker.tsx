import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { useNetwork } from "../../context/NetworkCtx";
import { convertHexToRGB } from "../../util";

export type ColorPickerProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  value: string;
};
export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  const { network } = useNetwork();
  const [color, setColor] = useState<"white" | "black">("white");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rgb = convertHexToRGB(e.target.value);

    if (!rgb) return;

    const results = network.run(rgb);
    const textColor = results.isLight < results.isDark ? "white" : "black";

    setColor(textColor);
    onChange?.(e);
  };

  return (
    <>
      <input type="color" value={value} onChange={handleChange} />
      <div
        style={{
          fontSize: 48,
          padding: 100,
          color: color,
          background: value,
        }}
      >
        Lorem ipsum
      </div>
    </>
  );
}
