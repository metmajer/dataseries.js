

# dataseries.js normalize module

## <a name="wiki-normalize" href="#">normalize</a>(values, [lower=0], [upper=1], [propertyName])

Normalizes a data series to fit the range [`lower`, `upper`].
The minimum value of the series is mapped to `lower` and the maximum value is mapped to `upper`, the values between limits are scaled linearly.

### Examples:

```javascript
ds.normalize(ds.range(0, 5));
// => [0, 0.2, 0.4, 0.6, 0.8, 1]

ds.normalize(ds.range(2, 7));
// => [0, 0.2, 0.4, 0.6, 0.8, 1]

ds.normalize(ds.range(-2, 3));
// => [0, 0.2, 0.4, 0.6, 0.8, 1]

ds.normalize([{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}], 0, 1, 'y');
// => [{x: 0, y: 0},
//     {x: 1, y: 0.5},
//     {x: 2, y: 1}]
```

### Params:

* **Array** *values* The data series to normalize.

* **Number** *[lower=0]* The lower limit of the resulting data series.

* **Number** *[upper=1]* The upper limit of the resulting data series.

* **Function()** *[propertyName]* A name of the property subject to normalization within an element in `values`.

### Returns:

* **Array** Returns the normalized data series.

### Throws:

* **Error** Throws if `values` is not an array.

* **Error** Throws if `lower` or `upper` is not a number, or if `lower` >= `upper`.

* **Error** Throws if `propertyName` is provided and is not a string, or if `propertyName` does not exist.

* **Error** Throws if normalization is attempted on non-numeric data.
