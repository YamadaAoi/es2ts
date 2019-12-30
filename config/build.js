const fse = require("fs-extra");
const fs = require("fs");
const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

function copyPublicFolder() {
  try {
    fse.copySync(resolveApp("public"), resolveApp("dist"), {
      dereference: true,
    });
  } catch (error) {
    if (error && error.message) {
      console.log(error.message);
    }
    process.exit(1);
  }
}

copyPublicFolder();
