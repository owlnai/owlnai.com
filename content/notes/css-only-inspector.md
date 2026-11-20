---
kind: code
caption: Show any element's classes on hover, with CSS alone.
url: /blog/experimenting-with-a-css-pure-inspect-element
---

```css
*[class]:hover::after {
  content: "Classes: " attr(class);
  position: absolute;
  white-space: pre;
}
```
