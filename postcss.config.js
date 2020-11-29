const cssnano = require("cssnano");

const prod = process.env.NODE_ENV == "production";

module.exports = {
  plugins: [
    "postcss-import",
    "postcss-preset-env",
    "autoprefixer",
    prod
      ? cssnano({
          preset: "default",
        })
      : false,
  ],
};
