
# yarn build 一键发布

> 再次build的时，只需用`yarn init -y` 创建`package.json`

- 在`package.json`中加一段脚本

```JavaScript
"scripts": {
"build":"rm -rf dist && parcel build src/index.html --no-minify --public-url ./"
},
```

再次 `yarn build`
