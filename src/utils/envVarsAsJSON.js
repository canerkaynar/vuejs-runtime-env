const envVarsAsJSON = () => {
  const config = {};
  const PREFIX = "VUE_APP_";

  Object.entries(process.env).forEach(([name, value]) => {
    if (name.startsWith(PREFIX)) {
      config[name] = value;
      // config[name.slice(PREFIX.length)] = value;
    }
  });

  console.log("config: ", config);
  return config;
};

module.exports = envVarsAsJSON;
