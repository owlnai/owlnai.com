---
title: Experimenting with a CSS pure inspect element
description: Building a very simple element inspector with nothing but the CSS attr() and counter() functions.
date: '2021-10-24'
canonical: https://dev.to/owlnai/experimenting-with-a-css-pure-inspect-element-39jg
---

CSS, a language that defines style and design, has many interesting functions. Some of them are the `attr()` and `counter()` functions. Today we'll use them to create very simple element inspector with pure CSS.

Note that while JS would be the sane solution here, we're experimenting with CSS and HTML.

## What are these functions?

Both return values when used with the `content` property. attr returns the value of a given HTML attribute while counter can be used to count a number of elements (e.g you want to prepend a number before every h2).

You can read more about them at MDN.

## The Idea

If attr() returns an attribute, we can use it to get the class and id from the element, which is one of the main usecases of Inspect Element.

As for counter(), we'll use it to show the number of the list item in an unordered list.

## Writing the HTML

A simple HTML snippet that works to demo our idea:

```html
<div class="css-pure-inspect">
  <div class="hello" id="devto">
    This is a test
  </div>
  <ul>
    <li>Test</li>
    <li>Foo</li>
    <li>Bar</li>
  </ul>
</div>
```

Note that I wrapped it in a div to avoid clashing with other elements and create a visual hell.

## The CSS

First thing we are going to do is styling the box that will show on hover. For this demo, I used this styling

```css
.css-pure-inspect *:hover::after {
  padding: 6px;
  position: absolute;
  font-family: sans-serif;
  font-size: 13px;
  background: #fff;
  border: 1px solid #ccc;
  white-space: pre;
}
```

- For a real project, `*` is generally discouraged for performance reasons.
- `white-space: pre;` is a trick to be used with the `\a` character escape to create line breaks in CSS content.
- `absolute` is mandatory to prevent the box to mess with the flow of the document. Depending on the site you might need a z-index.

Now that we styled the box, we're going to show the actual content - CSS classes and IDs, but data attributes or even alt texts could work if you added them.

```css
.css-pure-inspect *[class]:hover::after {
  content: "Classes: " attr(class);
}
.css-pure-inspect *[id]:hover::after {
  content: "ID: " attr(id);
}
.css-pure-inspect *[class][id]:hover::after {
  content: "Classes: " attr(class) "\a ID: "attr(id);
}
.css-pure-inspect *[class][id]:hover::after {
  content: "Classes: " attr(class) "\a ID: "attr(id);
}
```

- Yes, you can concatenate plaintext and attributes in `content`.
- `\a` is the line break trick explained above.
- Some elements have a class, others just have a div. The attributes in the selector were added to check it. And thanks to CSS order and specifity rules, we override the previous style.

And that's it for most elements. But we haven't used the counter() function. Remember the HTML ul list we created earlier?

```css
.css-pure-inspect ul {
  counter-reset: list-inspect;
}

.css-pure-inspect li {
  counter-increment: list-inspect;
}

.css-pure-inspect li:hover::after {
  content: "List item #"counter(list-inspect);
}
```

- The counter resets at every ul
- It increments every li and we show it in the hover box

## Demo result

[See the result on JSFiddle](https://jsfiddle.net/owlnai/q61ebdL4/1/).

---

This could be more robust. Maybe you could manually add every tag and their attributes defined in the W3C spec, but you'd probably lose your sanity. Thanks for reading!
