# es2ts

一款简单的 chrome extension,用于将 Elasticsearch 数据类型转换为 typescript 接口，方便开发

使用 Elasticsearch 的\_mapping 功能获取索引内所有字段信息，递归生成对应的 interface

类型转换规则如下，不常用的类型、未覆盖到的类型转换为 any

```js
  // 文本类型
  text: "string",
  // 关键字类型
  keyword: "string",
  // 数字类型
  byte: "number",
  short: "number",
  integer: "number",
  long: "number",
  float: "number",
  double: "number",
  half_float: "number",
  scaled_float: "number",
  // 日期类型
  date: "string",
  // 布尔类型
  boolean: "boolean",
  // 二进制型,Base64编码字符串的二进制值
  binary: "string",
  // 范围类型
  integer_range: "any",
  long_range: "any",
  float_range: "any",
  double_range: "any",
  date_range: "any",
  ip_range: "any",
  // 地理点类型
  geo_point: "any",
  geo_shape: "any",
  // IP类型
  ip: "any",
  // 计数数据类型
  token_count: "any"
```
