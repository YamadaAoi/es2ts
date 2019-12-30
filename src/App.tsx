import React, { useState } from "react";
import Query from "./components/Query";
import Display from "./components/DisPlay";
import Interfacer from "./components/Interfacer";
import { DisplayData } from "./api/es2tsApi";

import "./styles/app.less";

export default function App() {
  const [resp, setResp] = useState<any>({});
  const [indexName, setIndexName] = useState<string>("");

  const setParams = (params: DisplayData) => {
    setIndexName(params.indexName);
    setResp(params.data);
  };

  return (
    <div className="app">
      <div className="reqModel">
        <Query setParams={setParams} />
        <div className="respDisPlay">
          <Display resp={JSON.stringify(resp)} />
        </div>
      </div>
      <div className="interfaceModel">
        <Interfacer resp={JSON.stringify(resp)} index={indexName} />
      </div>
    </div>
  );
}
