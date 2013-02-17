

# dataseries.js initialize module

## <a name="wiki-initialize" href="#">initialize</a>(value, [length=1])

Initializes a data series from a particular `value`.
Each element in the resulting series will be a clone of `value`.
If `value` is a function it will be evaluated for each element.

### Examples:

```javascript
ds.initialize(0, 3);
// => [0, 0, 0]

ds.initialize("a", 3);
// => ["a", "a", "a"]

ds.initialize([1, 2, 3], 3);
// => [[1, 2, 3], [1, 2, 3], [1, 2, 3]]
```

### Params:

* **\*** *value* The initialization value.

* **Number** *[length=1]* The length of the resulting series (defaults to 1).

### Returns:

* **Array** Returns the initialized data series.

### Throws:

* **Error** Throws if `length` is defined and is not an integer > 0.
