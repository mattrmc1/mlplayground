import { FormControl, Input, InputLabel } from "@mui/material";
import { useState } from "react";

export default function ConfigControls() {
  const [test, setTest] = useState("");
  return (
    <>
      <label htmlFor="test">Label</label>
      <input
        id="test"
        type="number"
        value={test}
        onChange={(e) => setTest(e.target.value)}
      />
    </>
  );
}
