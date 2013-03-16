

# dataseries.js transforms module

The `ds.transforms` module is a collection of functions for transforming a pair of values `x` and `y` into an arbitrary data structure.

## <a name="pair" href="#">pair</a>(x, y)

Transforms a pair of values `x` and `y` into an array `[x, y]`.

### Examples:

```javascript
ds.transforms.pair(1, 0);
// => [0, 1]

ds.generators.f(ds.functions.identity)
  .inputs(ds.range(2))
  .transform(ds.transforms.pair)
  .values();
// => [[0, 0], [1, 1], [2, 2]]
```

### Params:

* **\*** *x* 

* **\*** *y* 

### Returns:

* **Array** Returns the transformed values.

## <a name="point" href="#">point</a>(x, y)

Transforms a pair of values `x` and `y` into an object `{x: x, y: y}`.

### Examples:

```javascript
ds.transforms.point(1, 0);
// => {x: 0, y: 1}

ds.generators.f(ds.functions.identity)
  .inputs(ds.range(2))
  .transform(ds.transforms.point)
  .values();
// => [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}]
```

### Params:

* **\*** *x* 

* **\*** *y* 

### Returns:

* **Object** Returns the transformed values.
