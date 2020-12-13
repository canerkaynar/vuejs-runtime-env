import { isJSONString } from "./isJSONString";

export const getRuntimeConfig = () => {
  let runtimeConfigStr = document.getElementById("js-runtime-config").innerHTML;
  let isParsable = isJSONString(runtimeConfigStr);

  return isParsable ? JSON.parse(runtimeConfigStr) : null;
};

// module.exports = getRuntimeConfig;
