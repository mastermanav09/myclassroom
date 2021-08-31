import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import Switch from "@material-ui/core/Switch";

const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[500],
    "&$checked": {
      color: purple[500],
    },
    "&$checked + $track": {
      backgroundColor: "#6a6a6a",
    },
  },
  checked: {},
  track: {},
})(Switch);

const ToggleSwitch = (props) => {
  const [toggleSwitch, setToggleSwitch] = useState(true);
  const handleChange = (event) => {
    setToggleSwitch((prev) => !prev);
    props.toggleSwitchValueHandler(toggleSwitch);
  };

  return (
    <div>
      {
        <PurpleSwitch
          required
          value={toggleSwitch}
          onChange={handleChange}
          name="checkedA"
        />
      }
    </div>
  );
};

export default ToggleSwitch;
