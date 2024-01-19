module.exports = {
  packagerConfig: {
    asar: true,
    icon: "./images/icon",
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: "./images/icon.png",
        },
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};
