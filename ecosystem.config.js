module.exports = {
    apps: [
      {
        name: "giam-sat-88",
        script: "./index.js",       // file entry point
        instances: 1,               // số instance (0 = cluster mode theo CPU)
        autorestart: true,
        watch: false,               // true nếu muốn auto reload khi dev
        max_memory_restart: "200M", // restart nếu vượt quá 200MB RAM
        env: {
          NODE_ENV: "development",
          PORT: 3110,
        },
      },
    ],
  };