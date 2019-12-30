module.exports = function(api) {
  api.cache(true);
  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["> 1%", "last 4 versions", "not ie <= 8"],
        },
      },
    ],
  ];
  return {
    presets,
    plugins: [
      [
        "import",
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: "css",
        },
      ],
    ],
  };
};
