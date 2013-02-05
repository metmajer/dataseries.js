

# dataseries.js time module

The `ds.time` module is a collection of objects related to time.

## <a name="DAY" href="#">DAY</a>

The number of milliseconds in a day.

## <a name="HOUR" href="#">HOUR</a>

The number of milliseconds in an hour.

## <a name="MINUTE" href="#">MINUTE</a>

The number of milliseconds in a minute.

## <a name="MONTH" href="#">MONTH</a>(date)

The number of milliseconds in the whole month of a particular date.

### Params:

* **Date** *date* The date.

### Returns:

* **Number** Returns the number of milliseconds in the whole month in `date`.

### Throws:

* **Error** Throws if `date` is not a date.

## <a name="SECOND" href="#">SECOND</a>

The number of milliseconds in a second.

## <a name="WEEK" href="#">WEEK</a>

The number of milliseconds in a week.

## <a name="YEAR" href="#">YEAR</a>(date)

The number of milliseconds in the year of a particular date.

### Params:

* **Date** *date* The date.

### Returns:

* **Number** Returns the number of milliseconds in the whole year in `date`.

### Throws:

* **Error** Throws if `date` is not a date.

## <a name="range" href="#">range</a>(start, end, [step=ds.time.DAY])

Initializes a time range from the interval [`start`, `end`] with values equidistantly spaced by `step`.
The resulting time range will include the `end` value if `Math.abs(end - start)` is integer divisible by `step`.

### Examples:

```javascript
ds.time.range(new Date(Date.UTC(2013, 0, 1)), new Date(Date.UTC(2013, 0, 3)));
// => [new Date(Date.UTC(2013, 0, 1)),
//     new Date(Date.UTC(2013, 0, 2)),
//     new Date(Date.UTC(2013, 0, 3))]

ds.time.range(new Date(Date.UTC(2013, 0, 1)), new Date(Date.UTC(2013, 2, 1)), ds.date.MONTH);
// => [new Date(Date.UTC(2013, 0, 1)),
//     new Date(Date.UTC(2013, 1, 1)),
//     new Date(Date.UTC(2013, 2, 1))]

ds.time.range(new Date(Date.UTC(2013, 0, 1)), new Date(Date.UTC(2015, 0, 1)), ds.date.YEAR);
// => [new Date(Date.UTC(2013, 0, 1)),
//     new Date(Date.UTC(2014, 0, 1)),
//     new Date(Date.UTC(2015, 0, 1))]
```

### Params:

* **Date** *start* The start value of the interval.

* **Date** *end* The end value of the interval.

* **Function(Date):Number|Number** *[step=ds.time.DAY]* The step size of the interval (in milliseconds): either a function returning an appropriate step size or a number (> 0).

### Returns:

* **Array<Date>** Returns the initialized time range.

### Throws:

* **Error** Throws if `start` or `end` is not a date.

* **Error** Throws if `start` >= `end`.

* **Error** Throws if `step` is not a function or is not a number > 0.
