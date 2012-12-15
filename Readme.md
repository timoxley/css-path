# css-path

  Get absolute path to a DOM element as a CSS selector.

## Example

```html
<div class="page">
  <h3 id="header">Header Level 3</h3>
  <ul class="list">
     <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
     <li>Aliquam tincidunt mauris eu risus.</li>
  </ul>
</div>
```
CSS path of first `li`:
```html
body > div.page:nth-child(1) > ul.list:nth-child(2) > li:nth-child(1)
```

## Licence

  MIT
