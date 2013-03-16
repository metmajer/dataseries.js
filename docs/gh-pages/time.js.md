

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

Creates a range of date objects beginning at 'start' and spaced by 'step'.
If 'end' is a date, it will mark the end of the range. Note that, depending on the choice of `step`,
the 'end' value is only included in the reuslt if `Math.abs(end - start)` is integer divisible by `step`,
assuming that `step` is a constant. If 'end' is an integer number > 0, it determines the length of the result.

### Examples:

```javascript
ds.time.range(new Date(2013, 0, 1), new Date(2013, 0, 3));
// => [new Date(2013, 0, 1),
//     new Date(2013, 0, 2),
//     new Date(2013, 0, 3)]

ds.time.range(new Date(2013, 0, 1), new Date(2013, 2, 1), ds.time.MONTH);
// => [new Date(2013, 0, 1),
//     new Date(2013, 1, 1),
//     new Date(2013, 2, 1)]

ds.time.range(new Date(2013, 0, 1), new Date(2015, 0, 1), ds.time.YEAR);
// => [new Date(2013, 0, 1),
//     new Date(2014, 0, 1),
//     new Date(2015, 0, 1)]
```

### Params:

* **Date** *start* The start date of the range.

* **Date|Number** *end* The end date of the range or an integer (> 0) determing the length of the resulting range.

* **Function(Date):Number|Number** *[step=ds.time.DAY]* The step size of the range (in milliseconds): either a function returning an appropriate step size or a number (> 0).

### Returns:

* **Array<Date>** Returns the created range.

### Throws:

* **Error** Throws if `start` is not a date.

* **Error** Throws if `end` is a date and `start` >= `end`.

* **Error** Throws if `end` is not a date or is not an integer > 0.

* **Error** Throws if `step` is not a function or is not a number > 0.
