# pull-to-load-more
A simple JavaScript plugin to load more data as you pull up the page.

## Installation

In a browser:

```html
<script src="PullToLoadMore.js"></script>
```

Using npm:

```bash
npm install pull-to-load-more -S
```

## Usage

Add a HTML tag below the list that you want to pull to load more. If you want the pull-up load data to take effect, make sure your list height is higher than the browser window height.

```html
<!-- Make sure your list is high enough -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
  <li>Item 4</li>
  <li>Item 5</li>
  <li>Item 6</li>
  <li>Item 7</li>
  <li>Item 8</li>
  <li>Item 9</li>
  <li>Item 10</li>
</ul>
<!-- Add a tag below the list -->
<div id="loadMore">Pull to load more</div>
```

Create an instance of `PullToLoadMore`. Specify configuration options for it.

```javascript
// create an instance
new PullToLoadMore({
  loadMore: document.querySelector('#loadMore'),
  onLoadMore: function () {
    // load more data
  }
});
```

## License

MIT

