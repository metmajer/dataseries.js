

# dataseries.js range module

## <a name="wiki-range" href="#">range</a>([start=0], end, [step=1])

Initializes a data series with values from the interval [`start`, `end`] with values equidistantly spaced by `step`.
The resulting series will include the `end` value if `Math.abs(end - start)` is integer divisible by `step`.

### Examples:

```javascript
ds.range(0, 2, 1);
// => [0, 1, 2]

ds.range(0.5, 2.8, 0.5);
// => [0.5, 1, 1.5, 2, 2.5]

ds.range(0, -2, 1);
// => [0, -1, -2]

ds.range(-0.5, -2.8, 0.5);
// => [-0.5, -1, -1.5, -2, -2.5]

ds.range(0, 2);
// => [0, 1, 2]

ds.range(2);
// => [0, 1, 2]
```

### Params:

* **Number** *[start=0]* The start value of the interval.

* **Number** *end* The end value of the interval.

* **Number** *[step=1]* The step size of the interval (>= 0).

### Returns:

* **Array<Number>** Returns the initialized (numeric) data series.

### Throws:

* **Error** Throws if `start`, `end` or `step` is not a number.

* **Error** Throws if `step` is <= 0.
