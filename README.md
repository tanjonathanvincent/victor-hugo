# Victor Hugo

## A Hugo boilerplate for creating truly epic websites

This is a boilerplate for using [Hugo](https://gohugo.io/) as a static site generator and [Webpack](https://webpack.js.org/) as your asset pipeline.

Victor Hugo setup to use [PostCSS](http://postcss.org/) and [Babel](https://babeljs.io/) for CSS and JavaScript compiling/transpiling.

This project is released under the [MIT license](LICENSE). Please make sure you understand its implications and guarantees.

## Usage

### :exclamation: Prerequisites

You need to have the latest/LTS [node](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm) versions installed in order to use Victor Hugo.

Next step, clone this repository and run:

```bash
npm install
```

This will take some time and will install all packages necessary to run Victor Hugo and its tasks.

### :construction_worker: Development

While developing your website, use:

```bash
npm start
```

or for developing your website with `hugo server --buildDrafts --buildFuture`, use:

```bash
npm run preview
```

Then visit http://localhost:3000/ _- or a new browser windows popped-up already -_ to preview your new website. Webpack Dev Server will automatically reload the CSS or refresh the whole page, when stylesheets or content changes.

### :package: Static build

To build a static version of the website inside the `/dist` folder, run:

```bash
npm run build
```

To get a preview of posts or articles not yet published, run:

```bash
npm run build:preview
```

See [package.json](package.json#L8) for all tasks.

## Structure

```
|--site                // Everything in here will be built with hugo
|  |--content          // Pages and collections - ask if you need extra pages
|  |--data             // YAML data files with any data for use in examples
|  |--layouts          // This is where all templates go
|  |  |--partials      // This is where includes live
|  |  |--index.html    // The index page
|  |--static           // Files in here ends up in the public folder
|--src                 // Files that will pass through the asset pipeline
|  |--css              // Webpack will bundle imported css separately
|  |--index.js         // index.js is the webpack entry for your css & js assets
```

## Basic Concepts

You can read more about Hugo's template language in their documentation here:

https://gohugo.io/templates/overview/

The most useful page there is the one about the available functions:

https://gohugo.io/templates/functions/

For assets that are completely static and don't need to go through the asset pipeline,
use the `site/static` folder. Images, font-files, etc, all go there.

Files in the static folder end up in the web root. So a file called `site/static/favicon.ico`
will end up being available as `/favicon.ico` and so on...

The `src/index.js` file is the entrypoint for webpack and will be built to `/dist/main.js`

You can use **ES6** and use both relative imports or import libraries from npm.

Any CSS file imported into the `index.js` will be run through Webpack, compiled with [PostCSS Next](http://cssnext.io/), and
minified to `/dist/[name].[hash:5].css`. Import statements will be resolved as part of the build.

## Environment variables

To separate the development and production _- aka build -_ stages, all gulp tasks run with a node environment variable named either `development` or `production`.

You can access the environment variable inside the theme files with `getenv "NODE_ENV"`. See the following example for a conditional statement:

    {{ if eq (getenv "NODE_ENV") "development" }}You're in development!{{ end }}

All tasks starting with _build_ set the environment variable to `production` - the other will set it to `development`.

## Deploying to Netlify

- Push your clone to your own GitHub repository.
- [Create a new site on Netlify](https://app.netlify.com/start) and link the repository.

Now Netlify will build and deploy your site whenever you push to git.

You can also click this button:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify/victor-hugo)

## Enjoy!! 😸

### Notes

This project has not been updated by the Netlify team for a long time. I really thought they were going to update when
Webpack v5 was released. If you are going to clone `master` and run `npm outdated` or `yarn outdated`, you will encounter
a lot of dependencies in red. The project has Yarn and NPM locks out of the box which is a big no-no. A project can
either have NPM or Yarn locks but not both. This branch uses Yarn v2 with Plug n Play loose mode enabled but I've included
NPM and Yarn v2 in their respective branches.

Dependencies are updated to their latest versions and since this is Webpack v5, I've removed plugins or loaders that
Webpack can do out of the box. `uglifyjs-webpack-plugin` is an example. Experimental assets handling is enabled in lieu
of `file-loader`, `url-loader`, and `copy-webpack-plugin` but you can disable the it and bring back the 2 loaders.

### Dependencies updated

- `@babel/core` (7.12.3 -> 7.12.9)
- `@babel/preset-env` (7.12.1 -> 7.12.7)
- `assets-webpack-plugin` (3.9.7 -> 6.0.4)
- `babel-loader` (8.1.0 -> 8.2.2)
- `cross-env` (5.2.0 -> 7.0.2)
- `css-loader` (3.5.3 -> 5.0.1)
- `eslint` (6.7.2 -> 7.14.0)
- `exports-loader` (0.7.0 -> 1.1.1)
- `hugo-bin` (0.63.0 -> 0.67.0)
- `imports-loader` (0.8.0 -> 1.2.0)
- `mini-css-extract-plugin` (0.12.0 ->1.3.1)
- `node-sass` (4.13.1 -> 5.0.0)
- `postcss-import` (12.0.1 -> 13.0.0)
- `postcss-loader` (3.0.0 -> 4.1.0)
- `rimraf` (3.0.0 -> 3.0.2)
- `sass-loader` (8.0.0 -> 10.1.0)
- `style-loader` (1.3.0 -> 2.0.0)
- `webpack` (4.41.5 -> 5.9.0)
- `webpack-cli` (3.3.12 -> 4.2.0)
- `webpack-merge` (4.1.4 -> 5.4.0)
- `whatwg-fetch` (3.0.0 -> 3.5.0)

### Dependencies Removed

- `@babel/register` (Webpack v5 only supports CommonJS for their config files)
- `babel-loader` (Deprecated. Replaced with `@babel/eslint-parser`)
- `copy-webpack-plugin` (Experimental asset handling is enabled)
- `fancy-log` (Residual dependency from Gulp)
- `file-loader` (Experiemental asset handling is enabled)
- `npm-run-all` (Replaced with `concurrently`. May not be as robust but Yarn v2 hates glob patterns)
- `optimized-css-assets-webpack-plugin` (Replaced with `cssnano`. Configured in PostCSS)
- `plugin-error` (Residual dependency from Gulp)
- `uglifyjs-webpack-plugin` (Webpack uses the terser plugin to minify js files)
- `url-loader` (Experimental asset handling is enabled)
- `natives` (Deprecated)

### Dependencies Added

- `@babel/eslint-plugin` (To supplement the Babel parser)
- `eslint-config-google` (Uses shared configuration from Google)
- `eslint-config-prettier` (Eslint displays errors from Prettier)
- `eslint-plugin-json-format` (Formats your JSON files correctly)
- `eslint-plugin-prettier` (So that Eslint and Prettier can work together)
- `postcss` (To aid `postcss-loader`)
- `prettier` (Styles your code)
