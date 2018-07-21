![LOGO](./README/hsk.png)
 
- [Introduction](#introduction)
- [Features](#features)
  - [HTML](#html)
  - [CSS](#css)
  - [JS](#js)
  - [Images](#images)
- [Install && usage](#install--usage)

# Introduction
- HTML Starter Kit for static website develop. 😇
- Includes `bootstrap` 4 grid system. 😎
- Contains only what really needs to reach the 90% >= on [pagespeed](https://developers.google.com/speed/pagespeed/insights/)

# Features
## HTML
- ✅ Minify HTML
- ✅ Remove unnecessary comments
- ✅ Inject assets
## CSS
- ✅ Remove unnecessary css classes/ids.
- ✅ Minify & concat
- 🔜 Uglify classes/ids
- 🔜 Use SASS,SCSS
- 🔜 Async with loading page.
## JS
- ✅ Minify & uglify & concat & ES6
- Async
## Images
- ✅ Minify images

> __Note:__ Currently `pagespeed` will warn you to try to minify the image despite of gulp do it.

# Install && usage
Just clone the repository 😅
```
git clone https://github.com/valicsek/html-starter-kit
```
After that start to dev
```
npm start dev
```

If you finished just type the following command:
```
npm start build
```

> Note: When you running dev, basically the build happens after every modification