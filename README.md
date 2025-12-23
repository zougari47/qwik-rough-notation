# Rough Notation Qwik (Wrapper)

![npm](https://img.shields.io/npm/v/qwik-rough-notation?style=for-the-badge)

This is a Qwik wrapper for [RoughNotation](https://roughnotation.com/), a small JavaScript library to create and animate annotations on a web page.

- Heavily inspired by [react-rough-notation](https://github.com/linkstrifer/react-rough-notation)
- [Visit website to see it in action](https://roughnotation.com/)
- [Library docs](https://github.com/pshihn/rough-notation)

![Rough Notation logo](https://roughnotation.com/images/social.png)

## Table of contents

<!-- TOC -->

- [Rough Notation Qwik (Wrapper)](#rough-notation-qwik-wrapper)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [RoughNotation Component](#roughnotation-component)
    - [Usage](#usage)
    - [Props](#props)
    - [Type values](#type-values)
    - [Updating Styles](#updating-styles)
  - [RoughNotationGroup Component](#roughnotationgroup-component)
    - [Usage](#usage)
    - [Props](#props)
    - [Custom order](#custom-order)

<!-- /TOC -->

## Installation

You can add rough-notation to your project via npm.

```bash
# npm
npm install qwik-rough-notation

# yarn
yarn add qwik-rough-notation

# pnpm
pnpm add qwik-rough-notation
```

Then just import the components you need.

```ts
import { RoughNotation, RoughNotationGroup } from 'qwik-rough-notation';
```

## RoughNotation Component

This is the main component, by default it rendersas a `<span>`, but you can change the tag name by anything you want using the `customElement` prop.

### Usage (RoughNotation)

_Note: The `show` prop controls whether the annotation is visible. If you don't want it to show immediately, you can control it with a state._

```tsx
<RoughNotation type="underline" show={true}>
  Hello RoughNotation
</RoughNotation>
```

### Props (RoughNotation)

Any unlisted prop will be passed to the component so you can use any qwik prop to handle interactions or styling.

| name                | type                                                             | default              | description                                                                                                                                                                                                                                                                                  |
| ------------------- | ---------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| animate             | `boolean`                                                        | `true`               | Turn on/off animation when annotating                                                                                                                                                                                                                                                        |
| animationDelay      | `number`                                                         | `0`                  | Delay in animation in milliseconds                                                                                                                                                                                                                                                           |
| animationDuration   | `number`                                                         | `800`                | Duration of the animation in milliseconds                                                                                                                                                                                                                                                    |
| brackets            | `enum` or [`enum`] from `left`, `right`, `top`, `bottom`         | `right`              | Value could be a string or an array of strings, each string being one of these values: `left`, `right`, `top`, `bottom`. When drawing a bracket, this configures which side(s) of the element to bracket.                                                                                    |
| color               | `string`                                                         |                      | String value representing the color of the annotation sketch                                                                                                                                                                                                                                 |
| customElement       | `string`                                                         | `span`               | Element wrapper tagName                                                                                                                                                                                                                                                                      |
| getAnnotationObject | `function`                                                       | `(annotation) => {}` | Callback function called after annotation init, it will receive the javascript [annotation object](https://github.com/pshihn/rough-notation#annotation-object) as a param                                                                                                                    |
| iterations          | `number`                                                         | `2`                  | By default annotations are drawn in two iterations, e.g. when underlining, drawing from left to right and then back from right to left. Setting this property can let you configure the number of iterations.                                                                                |
| multiline           | `boolean`                                                        | `false`              | This property only applies to inline text. To annotate multiline text (each line separately), set this property to true.                                                                                                                                                                     |
| order               | `number`, `string`                                               |                      | Annotation order to animate if is inside an Annotation Group                                                                                                                                                                                                                                 |
| padding             | `number`, `[top, right, bottom, left]`, `[vertical, horizontal]` | `5`                  | Padding in pixels between the element and roughly where the annotation is drawn. If you wish to specify different `top`, `left`, `right`, `bottom` paddings, you can set the value to an array akin to CSS style padding `[top, right, bottom, left]` or just `[top & bottom, left & right]` |
| show                | `boolean`                                                        | `false`              | Show/hide the annotation                                                                                                                                                                                                                                                                     |
| strokeWidth         | `number`                                                         | `1`                  | Width of the annotation strokes                                                                                                                                                                                                                                                              |
| type                | `enum` from (Type values)[#type-values]                          | `underline`          | It sets the annotation style                                                                                                                                                                                                                                                                 |

### Type values

| value          | description                                             |
| -------------- | ------------------------------------------------------- |
| underline      | Create a sketchy underline below an element             |
| box            | This style draws a box around the element               |
| circle         | Draw a circle around the element                        |
| highlight      | Creates a highlight effect as if maked by a highlighter |
| strike-through | Draws a horizontal line over the element                |
| crossed-off    | Crosses out the element with two diagonal lines         |

### Updating Styles

Some props can be changed after the initialization without re-rendering the annotation. i.e: if you like to change the color, just change the `color` prop, here is the complete list:

| Prop              |
| ----------------- |
| animate           |
| animationDuration |
| color             |
| padding           |
| strokeWidth       |

_Note: the type of the annotation cannot be changed. Create a new annotation for that._

## RoughNotationGroup Component

This is a wrapper for multiple annotations, it will trigger the `show()` method on every child annotation after the prev annotation animation is complete. **It does not render any HTML element.**

### Usage (RoughNotationGroup)

```jsx
<RoughNotationGroup show={true}>
  <RoughNotation type="underline">Hello,</RoughNotation>
  <RoughNotation type="underline">This is</RoughNotation>
  <RoughNotation type="underline">a Test</RoughNotation>
</RoughNotationGroup>
```

### Props (RoughNotationGroup)

| name | type    | default | description                |
| ---- | ------- | ------- | -------------------------- |
| show | boolean |         | show/hides the annotations |

### Custom order

If you need to trigger annotations in a specific order, use the `order` prop in each `RoughNotation` component.

i.e: Reverse order

```jsx
<RoughNotationGroup show={true}>
  <RoughNotation type="underline" order="3">
    Hello,
  </RoughNotation>
  <RoughNotation type="underline" order="2">
    This is
  </RoughNotation>
  <RoughNotation type="underline" order="1">
    a Test
  </RoughNotation>
</RoughNotationGroup>
```

_Note: It will annotate first the components with the `order` prop, and then the ones without it._
