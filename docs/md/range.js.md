

# dataseries.js range module

## <a name="range" href="#">range</a>([start=0], end, [step=1])

Creates a numeric range of floats ranging from 'start' to 'end' with values equidistantly spaced by 'step'.
Note that, depending on the choice of 'step', the 'end' value is only included in the result if
`Math.abs(end - start)` is integer divisible by `step`.

### Examples:

ds.range(2);
// => [0, 1, 2]

ds.range(0, 2);
// => [0, 1, 2]

```javascript
ds.range(0, 2, 1);
// => [0, 1, 2]

ds.range(0.5, 2.8, 0.5);
// => [0.5, 1, 1.5, 2, 2.5]

ds.range(0, -2, 1);
// => [0, -1, -2]

ds.range(-0.5, -2.8, 0.5);
// => [-0.5, -1, -1.5, -2, -2.5]
```

### Params:

* **Number** *[start=0]* The start value of the range.

* **Number** *end* The end value of the range (not necessarily included).

* **Number** *[step=1]* The step size of the range (> 0).

### Returns:

* **Array<Number>** Returns the created range.

### Throws:

* **Error** Throws if `start`, `end` or `step` is not a number.

* **Error** Throws if `step` is <= 0.
