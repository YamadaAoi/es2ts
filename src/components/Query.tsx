import React, { useState, useEffect } from "react";
import { Input, Select, Button, message } from "antd";
import * as es2tsApi from "../api/es2tsApi";
import "../styles/query.less";
const { Option } = Select;

interface QueryProps {
  setParams: (data: es2tsApi.DisplayData) => void;
}

export default function Query(props: QueryProps) {
  const [protocol, setProtocol] = useState<string>("http://");
  const [host, setHost] = useState<string>("");
  const [indexName, setIndexName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(true);
  const [url, setUrl] = useState<string>("");
  const [indexList, setIndexList] = useState<string[]>([]);

  useEffect(() => {
    if (protocol && host) {
      setDisable(true);
      es2tsApi
        .getAllIndex(`${protocol}${host}`)
        .then((res: any) => {
          if (res.data && res.data.indices) {
            message.info(
              `集群健康值为：${
                res.data.status === "green"
                  ? res.data.status
                  : `${res.data.status},剔除状态异常索引！`
              }`
            );
            resetIndexList(res.data.indices);
            setDisable(false);
          } else {
            message.error("获取所有索引失败！");
          }
        })
        .catch((err: any) => {
          console.log(err);
          message.error("获取所有索引失败！");
        });
    } else {
      setIndexName("");
      setUrl("");
      setIndexList([]);
    }
  }, [protocol, host]);

  const resetIndexList = (indices: any) => {
    let list: string[] = [];
    for (let key of Object.keys(indices)) {
      if (indices[key].status === "green") {
        list.push(key);
      }
    }
    setIndexList(list);
    if (list.length) {
      setIndexName(list[0]);
    }
  };

  const changeProtocol = (value: string) => {
    setProtocol(value);
  };
  const changeUrl = (e: any) => {
    setHost(e.target.value);
  };
  const changeIndexName = (value: string) => {
    setIndexName(value);
  };
  const handleClick = () => {
    if (!host) {
      message.warn("请输入es数据库地址（包括host&port）");
      return;
    }
    if (!indexName) {
      message.warn("请选择要查询的_index");
      return;
    }
    let tempUrl = `${protocol}${host}/${indexName}/_mapping`;
    let displaytData: es2tsApi.DisplayData = { indexName, data: {} };
    setUrl(tempUrl);
    setLoading(true);
    es2tsApi
      .getMapping(tempUrl)
      .then((resp: any) => {
        setLoading(false);
        // console.log(resp);
        if (resp && resp.data) {
          displaytData.data = resp.data;
          props.setParams(displaytData);
        } else {
          message.error("查询失败！");
          displaytData.data = resp;
          props.setParams(displaytData);
        }
      })
      .catch((err: any) => {
        setLoading(false);
        message.error("查询失败！");
        displaytData.data = err;
        props.setParams(displaytData);
        console.log(err);
      });
  };
  const selectBefore = (
    <Select value={protocol} style={{ width: 90 }} onChange={changeProtocol}>
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );
  return (
    <div className="query">
      <div className="host">
        <div style={{ marginBottom: 16 }}>
          <Input
            addonBefore={selectBefore}
            value={host}
            allowClear={true}
            placeholder="请输入地址"
            onChange={changeUrl}
          />
        </div>
      </div>
      <div className="indexInfo">
        <label>选择_index：&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <Select
          showSearch={true}
          className="indexInfoInput"
          placeholder="请选择_index"
          optionFilterProp="children"
          value={indexName}
          onChange={changeIndexName}
          filterOption={(input: string, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {indexList.map((val: string, index: number) => (
            <Option value={val} key={index}>
              {val}
            </Option>
          ))}
        </Select>
        <Button
          type="primary"
          disabled={disable}
          loading={loading}
          onClick={handleClick}
        >
          查询
        </Button>
      </div>
      <div className="url">{`${url ? `查询路径：${url}` : ""}`}</div>
    </div>
  );
}
