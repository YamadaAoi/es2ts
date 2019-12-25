import React from "react";
import { esDataType } from "../utils/esDataType";
import "../styles/interface.less";

interface DisplayProps {
  resp: string;
  index: string;
}

export default function Interfacer(props: DisplayProps) {
  const formatJson = () => {
    let { resp, index } = props;
    let json: string = "";
    if (resp) {
      try {
        let data: any = JSON.parse(resp);
        let interfacer: any = {};
        if (data[index] && data[index].mappings) {
          interfacer = generateInterface({
            ...data[index].mappings
          });
        }
        json = JSON.stringify(interfacer, null, 2);
        json = json.replace(/"(\w+)"/g, "$1").replace(/,/g, ";");
      } catch (error) {
        console.log(error);
      }
    }
    return json;
  };
  const generateInterface = (mappings: any) => {
    let data: any = {};
    for (let key of Object.keys(mappings)) {
      let properties: any = mappings[key].properties;
      if (properties) {
        data = handleProperties(properties);
      }
    }
    return data;
  };
  const handleProperties = (properties: any) => {
    let data: any = {};
    if (properties) {
      for (let val of Object.keys(properties)) {
        if (properties[val].type) {
          data[val] = esDataType[properties[val].type] || "any";
        } else if (properties[val].properties) {
          data[val] = handleProperties(properties[val].properties);
        } else {
          data[val] = "any";
        }
      }
    }
    return data;
  };

  return (
    <div className="interface">
      <pre className="interfaceBody">{formatJson()}</pre>
    </div>
  );
}
