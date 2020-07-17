# TD Carousel
## Installation
### Include CSS
First, include CSS file into your HTML head:
```
<link href="./reset.css" content="text/css" rel="stylesheet">
```
tdcarousel.css file is required and should be included before any *.js files.
### Include JS
Include tdcarousel.js into the footer.
```
<script src="./tdcarousel/tdcarousel.js">
```
### Set HTML
You don't need any special markup.All you need is to wrap your divs (tdcarousel works with any type element a/img/span..) inside the container element <div class="td-carousel-wrap">. Class "td-carousel-wrap" is mandatory to apply proper styles that come from tdcarousel.css file.
```
<!-- Set up your HTML -->
<div id="test" class="td-carousel-wrap">
    <div class="td-carousel">
        <div>Your Content</div>
        <div>Your Content</div>
        <div>Your Content</div>
        <div>Your Content</div>
        <div>Your Content</div>
        <div>Your Content</div>
        <div>Your Content</div>
    </div>
</div>
```
### The use of the plugin
```
let test = TDC('#test');
```
