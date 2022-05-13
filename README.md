# Cozy House shelter site

:man_technologist: [GitHub Pages](https://ithrforu.github.io/shelter/)

:cyclone: *Features*: Scss (7-1 pattern), JavaScript, Gulp, BEM.

## :hammer_and_wrench: Build installing
* Install [NodeJS](https://nodejs.org/en/) ***16.14.2 LTS** (or another new version)* . 
* Download build with [Git](https://git-scm.com/downloads): ```git clone https://github.com/ithrforu/shelter/```
* Install ```gulp``` globally: ```npm i --global gulp-cli```
* Move to project folder: ```cd ~/shelter```
* Download dependencies: ```npm i```
* For start print: ```gulp dev``` (developer mode).
* For build project print: ```gulp build``` (build mode).

If you do everything correct and start developer mode, you will have a browser with a local server open. The build mode involves project optimization: images compression, bulletproof fonts, minification of HTML, CSS and JS files for uploading to the server (current build version on [gh-pages](../../tree/gh-pages/) branch).

## :open_file_folder: Files stucture

```
shelter
├── src
│   ├── assets
│   │   ├── fonts
│   │   │   └── ...
│   │   ├── images
│   │   │   └── ...
│   │   ├── favicon.ico
│   │   └── pets.json
│   ├── js
│   │   ├── main.js
│   │   └── swiper-bundle.esm.browser.js
│   ├── scss
│   │   ├── abstracts
│   │   │   ├── _breakpoints.scss
│   │   │   ├── _mixins.scss
│   │   │   └── _variables.scss
│   │   ├── base
│   │   │   ├── _colors.scss
│   │   │   ├── _normalize.scss
│   │   │   ├── _page.scss
│   │   │   ├── _swiper-bundle.min.scss
│   │   │   └── _typography.scss
│   │   ├── components
│   │   │   └── _buttons.scss
│   │   ├── layout
│   │   │   ├── _footer.scss
│   │   │   ├── _header.scss
│   │   │   └── _section.scss
│   │   ├── pages
│   │   │   ├── _index.scss
│   │   │   └── _pets.scss
│   │   └── main.scss
│   ├── index.html
│   └── pets.html
├── .editorconfig
├── .gitignore
├── README.md
├── gulpfile.js
└── package.json
```
