dataseries.js <sup>v0.1.2</sup>
=============

**A JavaScript data series modeling library.**

The aim of dataseries.js is to provide a lightweight and intuitive
interface for modeling data series.

## Applications

- Generating test vectors for automated *software tests*
- Generating data series for *data visualization prototyping*
- Assessing the robustness and *edge-case behavior* of data visualizations

## Features

- Data *generation* by sophisticated generators
- Data *filtering* by applying *predicate functions*
- Data *transforms* to produce custom data structures
- and much more

## Usage

#### Generate data series from ranges

```javascript
ds.range(2);
// => [0, 1, 2]

ds.range(-2, 2);
// => [-2, -1, 0, 1, 2]

ds.range(0, 2, 0.5);
// => [0, 0.5, 1, 1.5, 2]
```

#### Generate data series from functions *y = f(x)*

```javascript
ds.generators.f(ds.functions.linear, { a: 2, b: 1 })
  .inputs(ds.range(2))
  .values();
// f(x) = 2·x + 1 for x in [0, 1, 2] => [1, 3, 5]

ds.generators.f(ds.functions.exp, { a: 2 })
  .inputs(ds.range(2))
  .values();
// f(x) = 2ˣ for x in [0, 1, 2] => [1, 2, 4]
```

#### Filter data series using predicate functions

```javascript
ds.generators.f(ds.functions.identity)
  .inputs(ds.range(-2, 2))
  .filter(ds.predicates.isPositiveNumber)
  .values();
// => [0, 1, 2]
```

#### Transform data series using transform functions

```javascript
ds.generators.f(ds.functions.identity)
  .inputs(ds.range(-2, 2))
  .transform(function(y, x, i) {
      return y >= 0 ? y : null;
  })
  .values();
// => [null, null, 0, 1, 2]

ds.generators.f(ds.functions.identity)
  .inputs(ds.range(2))
  .transform(ds.transforms.point)
  .values();
// => [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}]
```

#### Configure a time dimension on a data series generator

```javascript
ds.generators.f(ds.functions.identity)
  .inputs(ds.range(2))
  .time(new Date(Date.UTC(2013, 0, 1)), ds.time.DAY)
  .transform(ds.transforms.point)
  .values();
// => [{x: new Date(Date.UTC(2013, 0, 1)), y: 0},
//     {x: new Date(Date.UTC(2013, 0, 2)), y: 1},
//     {x: new Date(Date.UTC(2013, 0, 3)), y: 2}]
```

## Downloads

Latest [production](https://github.com/metmajer/dataseries.js/dataseries.min.js) and [development](https://github.com/metmajer/dataseries.js/dataseries.js) releases available.

## Documentation

For more information [go see the wiki](https://github.com/metmajer/dataseries.js/wiki).

## License

MIT License. Copyright 2013 Martin Walter, http://github.com/metmajer.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
