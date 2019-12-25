import React from "react";
import "../styles/display.less";

interface DisplayProps {
  resp: string;
}

export default function Display(props: DisplayProps) {
  const formatJson = () => {
    let json: string = "";
    if (props.resp) {
      try {
        json = JSON.stringify(JSON.parse(props.resp), null, 2);
      } catch (error) {
        console.log(error);
      }
    }
    return json;
  };
  return (
    <div className="display">
      <pre className="displayBody">{formatJson()}</pre>
    </div>
  );
}
