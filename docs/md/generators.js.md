

# dataseries.js generators module

The `ds.generators` module is a collection of data series generator factories.

## <a name="f" href="#">f</a>(algorithm)

Creates a new `FunctionDataSeriesGenerator`, which initializes data series from
the outputs of `algorithm`, a function *y = f(x)*. Any excess arguments provided
after `algorithm` will be applied to each invocation of the algorithm on an input
value.

See the [`ds.functions`](ds.functions.html) module for a list of provided functions
and [Wikipedia, List of mathematical functions](http://en.wikipedia.org/wiki/List_of_mathematical_functions)
for a comprehensive list of mathematical functions.

### Examples:

```javascript
var algorithm = function(x, a, b) { return a * x + b; };
ds.generators.f(algorithm, 2, 1); // a = 2, b = 1
```

### Params:

* **Function(\*):\*** *algorithm* A function *y = f(x)*, which maps an input value `x` to an output value *y*. The algorithm may expect additional arguments after `x`.

### Returns:

* **[FunctionDataSeriesGenerator](FunctionDataSeriesGenerator.html)** Returns a new generator instance.

### Throws:

* **Error** Throws if `algorithm` is not a function.
