

# dataseries.js normalize module

## <a name="normalize" href="#">normalize</a>(values, [lower=0], [upper=1], [accessor])

Creates a normalized copy of a data series in the range [`lower`, `upper`], where the minimum value
of the data series in `values` is mapped to `lower` and the maximum value in `values` is mapped to
`upper`. Between `lower` and `upper` the values are scaled linearly.

### Examples:

```javascript
ds.normalize(ds.range(0, 5));
// => [0, 0.2, 0.4, 0.6, 0.8, 1]

ds.normalize(ds.range(2, 7));
// => [0, 0.2, 0.4, 0.6, 0.8, 1]

ds.normalize(ds.range(-2, 3));
// => [0, 0.2, 0.4, 0.6, 0.8, 1]

var g = ds.generators.f(ds.functions.identity)
    .inputs(ds.range(0, 5))
    .transform(ds.transforms.point);
ds.normalize(g.values(), 0, 1, function(d) { return d.y; });
// => [0, 0.2, 0.4, 0.6, 0.8, 1]
```

### Params:

* **Array** *values* The data series to normalize.

* **Number** *[lower=0]* The lower limit of the resulting data series.

* **Number** *[upper=1]* The upper limit of the resulting data series.

* **Function()** *[accessor]* A function which gives access to the value subject to normalization within an element in `values`.

### Returns:

* **Array** Returns a normalized copy of the data series in `values`.

### Throws:

* **Error** Throws if `values` is not an array.

* **Error** Throws if `accessor` is provided and is not a function.
