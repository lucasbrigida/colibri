##Purpose

Perform the parsing of html pages from other domains. (CORS)

##Code

```javascript
var colibri = new COLIBRI();
colibri.open({
  id: 'page',
  url:'http://www.weather.com'
}, function (page) {
  console.log(page);
})
.show();
```

Made with ♥ and very 90s style by Lucas Pereira Brigida.