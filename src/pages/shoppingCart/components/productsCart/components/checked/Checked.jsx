import { Checkbox } from "@mantine/core";
import { useState } from "react";
// import classes from './Checked.module.css'

export default function Checked() {
  const [checked, setChecked] = useState(true);

  return (
    <Checkbox
      color="rgba(0, 0, 0, 1)"
      styles={{ input: { cursor: "pointer" } }}
      size="xs"
      checked={checked}
      onChange={(event) => {
        setChecked(event.currentTarget.checked);
      }}
      onClick={() => {
        console.log("error");
      }}
    />
  );
}
