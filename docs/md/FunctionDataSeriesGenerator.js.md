

# dataseries.js FunctionDataSeriesGenerator module

The `FunctionDataSeriesGenerator` initializes data series from the outputs of a function *y = f(x)*.<br>
See the [`ds.generators.f`](ds.generators.html#f) generator factory function for preferred construction.

The generator provides a convenient builder syntax which greatly facilitates the filtering, transforming
and otherwise processing of data via the generator's `filter`, `transform` and `call` methods. After the
generator was configured, the resulting data series is computed by invoking the `values` method, which
results in the execution of the following processing stages:

1. Computation: *y = f(x)*
2. Filtering
3. Transformation
4. (Otherwise) Processing

The callbacks provided to filter`, `transform` and `call` are executed under the following `this` context:
- `generator`
- `inputs`
- `outputs`
- `timeRange` (or undefined if no time range configuration was provided)

See the [`filter`](#filter), [`transform`](#transform) and [`call`](#call) methods for precise definitions
of the respective contexts.

## <a name="call" href="#">call</a>(callback)

Adds a callback for otherwise processing of the resulting data series to the end of the processing chain.
Multiple callbacks can be added by invoking `call` multiple times. Callbacks are executed in the given order.

### callback:

The callback is a function *f(outputs)* with the parameters (excess arguments to `call` are relayed to the callback):
- `outputs` the current set of outputs

The computation context of a callback is defined as:
- `generator`
- `inputs`
- `outputs`
- `timeRange` (or undefined if no time range configuration was provided)

### Examples:

```javascript
ds.generators.f(ds.functions.identity)
  .inputs(ds.range(2))
  .values();
// => [0, 1, 2]

ds.generators.f(ds.functions.identity)
  .inputs(ds.range(2))
  .call(ds.normalize, 0, 1)
  .values();
// => [0, 0.5, 1]

ds.generators.f(ds.functions.identity)
  .inputs(ds.range(2))
  .transform(ds.transforms.point)
  .call(ds.normalize, 0, 1, 'y')
  .values();
// => [{x: 0, y: 0},
//     {x: 1, y: 0.5},
//     {x: 2, y: 1}]
```

### Params:

* **Function** *callback* A callback.

### Returns:

* **FunctionDataSeriesGenerator** Returns a reference to the generator.

### Throws:

* **Error** Throws if `callback` is not a function.

## <a name="filter" href="#">filter</a>([callback])

Sets or unsets a filter to be executed after computation.
The method sets a filter if `callback` is a function or unsets a previously set filter if `callback` is set to `undefined`.

### callback:

The callback determines if a computed output value shall be included in the resulting set of outputs of the filter
by returning either a truthy or a falsy value. If a value was rejected, both the input value and the output value
are evicted from the computation context and will thus not be available in subsequent processing stages.

The callback is a function *f(y, x, i)* with the parameters:
- `x` the input value
- `y` the output value (as computed by the generator)
- `i` the index of the input value `x` within the set of inputs

The computation context of a filter is defined as:
- `generator`
- `inputs`
- `outputs` the readily computed outputs (`this.outputs[j] = undefined` for *j > i*)
- `timeRange` (or undefined if no time range configuration was provided)

See the [`ds.predicates`](ds.predicates.html) module for a list of provided predicates to facilitate filtering.

### Examples:

```javascript
var g = ds.generators.f(ds.functions.identity).inputs(-2, 2);

g.values();
// => [-2, -1, 0, 1, 2]

g.filter(ds.predicates.isPositiveNumber).values();
// => [0, 1, 2]
```

### Params:

* **Function|undefined** *[callback]* A filter callback.

### Returns:

* **FunctionDataSeriesGenerator** Returns a reference to the generator.

### Throws:

* **Error** Throws if `callback` is neither a function nor `undefined`.

## <a name="inputs" href="#">inputs</a>(values)

Gets or sets the set of input values.
The method returns any previously set inputs if `values` is omitted.
The method sets the inputs if `values` is provided.

### Params:

* **Array** *values* The set of inputs.

### Returns:

* **Array|FunctionDataSeriesGenerator** Returns any previously set inputs or `[]` if `values` is omitted, otherwise returns a reference to the generator.

### Throws:

* **Error** Throws if `values` is provided and is not an array.

## <a name="time" href="#">time</a>(start, [precision=ds.time.DAY])

Sets or unsets a time range configuration to be applied during transformation.
The particular points in time of the time range will be made available via the `x` parameter of the generator's `transform` callback (if provided).
The method sets the time range configuration if `start` and `precision` are provided or unsets a previously set configuration if either argument is set to `undefined`.

### Examples:

```javascript
var g = ds.generators.f(ds.functions.identity).inputs(ds.range(2));

g.values();
// => [0, 1, 2]

g.time(new Date(2013, 0, 1), ds.time.DAY)
 .transform(ds.transforms.point)
 .values();
// => [{x: new Date(2013, 0, 1), y: 0},
//     {x: new Date(2013, 0, 2), y: 1},
//     {x: new Date(2013, 0, 3), y: 2}]

g.time(new Date(2013, 0, 1), ds.time.MONTH)
 .transform(ds.transforms.point)
 .values();
// => [{x: new Date(2013, 0, 1), y: 0},
//     {x: new Date(2013, 1, 1), y: 1},
//     {x: new Date(2013, 2, 1), y: 2}]

g.time(new Date(2013, 0, 1), ds.time.YEAR)
 .transform(ds.transforms.point)
 .values();
// => [{x: new Date(2013, 0, 1), y: 0},
//     {x: new Date(2014, 0, 1), y: 1},
//     {x: new Date(2015, 0, 1), y: 2}]
```

### Params:

* **Date|undefined** *start* A start date.

* **Function(Date):Number|Number|undefined** *[precision=ds.time.DAY]* The precision of the time range (in milliseconds): either a function returning an appropriate precision or a number (> 0).

### Returns:

* **FunctionDataSeriesGenerator** Returns a reference to the generator.

### Throws:

* **Error** Throws if `start` is provided and is not a date.

* **Error** Throws if `start` is provided and `precision` is not function or is not a number > 0.

## <a name="transform" href="#">transform</a>([callback])

Sets or unsets a transformation to be executed after filtering.
The method sets a transformation if `callback` is a function or unsets a previously set transformation if `callback` is set to `undefined`.

### callback:

The callback determines the effective data structure for the given arguments.

The callback is a function *f(x, y, i)* with the parameters:
- `x` the input value
- `y` the output value (as computed and filtered by the generator)
- `i` the index of the input value `x` within the set of inputs

The computation context of a transform is defined as:
- `generator`
- `inputs`
- `outputs`
- `timeRange` (or undefined if no time range configuration was provided)

See the [`ds.transforms`](ds.transforms.html) module for a list of provided transforms.

### Examples:

```javascript
var g = ds.generators.f(ds.functions.identity).inputs(ds.range(2));

g.values();
// => [0, 1, 2]

g.transform(ds.transforms.pair).values();
// => [[0, 0],
//     [1, 1],
//     [2, 2]]

g.transform(ds.transforms.point).values();
// => [{x: 0, y: 0},
//     {x: 1, y: 1},
//     {x: 2, y: 2}]

g.inputs(ds.range(-2, 2)).transform(function(y, x, i) {
    return y >= 0 ? y : null;
}).values();
// => [null, null, 0, 1, 2]
```

### Params:

* **Function|undefined** *[callback]* A transformation callback.

### Returns:

* **FunctionDataSeriesGenerator** Returns a reference to the generator.

### Throws:

* **Error** Throws if `callback` is provided and is neither a function nor `undefined`.

## <a name="values" href="#">values</a>()

Computes, filters, transforms and otherwise processes a data series from a set of input values.

### Returns:

* **Array** Returns the resulting data series.
