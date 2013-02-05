

# dataseries.js FunctionDataSeriesGenerator module

The `FunctionDataSeriesGenerator` initializes data series from the outputs
of a function *y = f(x)*.<br>
See the [`ds.generators.f`](ds.generators.html#f) generator factory function
for preferred construction.

## <a name="filter" href="#">filter</a>([callback])

Gets, sets or unsets a filter.
The method returns a previously set filter if `callback` is omitted.
The method sets a filter if `callback` is provided and a function, or unsets a previously set filter if `callback` is set to `undefined`.

### callback:

The callback determines whether an output value, as computed by the generator, shall be included in the resulting
set of output values or not by either returning a truthy or a falsy value, respectively. If the value is rejected,
both the input value and the rejected output value will be evicted from the computation context, see below,
and will thus not be available in subsequent stages.

The callback is a function *f(y, x, i)* with the parameters:
- the input value `x`
- the output value `y` as computed by the generator
- the index `i` of the input value `x` within the set of `inputs`

The computation context, i.e., `this`, of a filter includes:
- a `generator`
- the `inputs`
- the readily-computed `outputs` (`this.outputs[j] = undefined` for *j > i*)
- an optional `timeRange` (or undefined)

See the [`ds.predicates`](ds.predicates.html) module for a list of provided predicates that facilitate filtering.

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

* **Function|FunctionDataSeriesGenerator|undefined** Returns a previously set filter or `undefined` if `callback` is omitted, otherwise returns a reference to the generator.

### Throws:

* **Error** Throws if `callback` is provided and is neither a function nor `undefined`.

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

Gets or sets a time range configuration.
The time range's points in time are made available via the `x` parameter of the generator's `transform` method.
The method returns a previously set time range configuration if no arguments are provided.
The method sets the time range configuration if `start` and `precision` are provided.

### Examples:

```javascript
var g = ds.generators.f(ds.functions.identity).inputs(ds.range(2));

g.values();
// => [0, 1, 2]

g.time(new Date(Date.UTC(2013, 0, 1)), ds.time.DAY)
 .transform(ds.transforms.point).values();
// => [{x: new Date(Date.UTC(2013, 0, 1)), y: 0},
//     {x: new Date(Date.UTC(2013, 0, 2)), y: 1},
//     {x: new Date(Date.UTC(2013, 0, 3)), y: 2}]

g.time(new Date(Date.UTC(2013, 0, 1)), ds.time.MONTH)
 .transform(ds.transforms.point).values();
// => [{x: new Date(Date.UTC(2013, 0, 1)), y: 0},
//     {x: new Date(Date.UTC(2013, 1, 1)), y: 1},
//     {x: new Date(Date.UTC(2013, 2, 1)), y: 2}]

g.time(new Date(Date.UTC(2013, 0, 1)), ds.time.YEAR)
 .transform(ds.transforms.point).values();
// => [{x: new Date(Date.UTC(2013, 0, 1)), y: 0},
//     {x: new Date(Date.UTC(2014, 0, 1)), y: 1},
//     {x: new Date(Date.UTC(2015, 0, 1)), y: 2}]
```

### Params:

* **Date** *start* A start date.

* **Function(Date):Number|Number** *[precision=ds.time.DAY]* The precision of the time range (in milliseconds): either a function returning an appropriate precision or a number (> 0).

### Returns:

* **Array|FunctionDataSeriesGenerator** Returns a previously set time range configuration or `undefined` if no arguments are provided, otherwise returns a reference to the generator.

### Throws:

* **Error** Throws if `start` is provided and is not a date.

* **Error** Throws if `start` is provided and `precision` is not function or is not a number > 0.

## <a name="transform" href="#">transform</a>([callback])

Gets, sets or unsets a transform.
The method returns a previously set transform if `callback` is omitted.
The method sets a transform if `callback` is provided and a function, or unsets a previously set transform if `callback` is set to `undefined`.

### callback:

The callback determines the effective data structure for the given arguments.

The callback is a function *f(x, y, i)* with the parameters:
- the input value `x`
- the output value `y` as computed and filtered by the generator
- the index `i` of the input value `x` within the set of `inputs`

The computation context, i.e., `this`, of a transform includes:
- a `generator`
- the filtered `inputs`
- the filtered `outputs`
- an optional `timeRange` (or undefined)

See the [`ds.transforms`](ds.transforms.html) module for a list of provided transforms.

### Examples:

```javascript
var g = ds.generators.f(ds.functions.identity).inputs(ds.range(2));

g.values();
// => [0, 1, 2]

g.transform(function(y, x, i) {
    return y >= 0 ? y : null;
}).values();
// => [null, null, 0, 1, 2]

g.transform(ds.transforms.pair).values();
// => [[0, 0],
//     [1, 1],
//     [2, 2]]

g.transform(ds.transforms.point).values();
// => [{x: 0, y: 0},
//     {x: 1, y: 1},
//     {x: 2, y: 2}]
```

### Params:

* **Function|undefined** *[callback]* A filter callback.

### Returns:

* **Function|FunctionDataSeriesGenerator|undefined** Returns a previously set filter or `undefined` if `callback` is omitted, otherwise returns a reference to the generator.

### Throws:

* **Error** Throws if `callback` is provided and is neither a function nor `undefined`.

## <a name="values" href="#">values</a>()

Computes the output values which correspond to the set of generator `inputs`.

### Returns:

* **Array** Returns the generated data series.
