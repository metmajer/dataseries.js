

# dataseries.js predicates module

The `ds.predicates` module is a collection of functions which indicate whether a particular predicate (property) holds true for a particular object.

## <a name="wiki-isArrayOf" href="#">isArrayOf</a>(object, predicate, [length=true])

Checks if `object` is an array and `predicate` holds true for all its elements.

### Examples:

```javascript
ds.predicates.isArrayOf([0, 1, 2], ds.predicates.isNumber);
// => true

ds.predicates.isArrayOf([0, 1, 2], ds.predicates.isNegativeNumber);
// => false

ds.predicates.isArrayOf([], ds.predicates.isNumber);
// => false

ds.predicates.isArrayOf([], ds.predicates.isNumber, false);
// => true

ds.predicates.isArrayOf([0, 1, 2], ds.predicates.isPositiveNumber, 3);
// => true

ds.predicates.isArrayOf([0, 1, 2], ds.predicates.isPositiveNumber, 4);
// => false
```

### Params:

* **\*** *object* The object to check.

* **Function:Boolean** *predicate* A predicate which is evaluated for each array element.

* **Boolean|Number** *[length=true]* Either a boolean indicating whether the array must be non-empty (`true`), may be empty (`false`), or a number indicating the number of elements the array must have.

### Returns:

* **Boolean** Returns `true` if `object` is an array and `predicate` holds true for all its elements, and the `length` condition holds true, otherwise returns `false`.

### Throws:

* **Error** Throws if `predicate` is not a function.

## <a name="isDate" href="#">isDate</a>(object)

Checks if `object` is a date.

### Params:

* **\*** *object* The object to check.

### Returns:

* **Boolean** Returns `true` if `object` is a date, otherwise returns `false`.

## <a name="isFunction" href="#">isFunction</a>(object, [length=true])

Checks if `object` is a function.

### Params:

* **\*** *object* The object to check.

* **Boolean|Number** *[length=true]* Either a boolean indicating whether the function must expect arguments (`true`), may expect no arguments (`false`), or a number indicating the number of arguments the function must expect.

### Returns:

* **Boolean** Returns `true` if `object` is a function and the `length` condition holds true, otherwise returns `false`.

## <a name="isInteger" href="#">isInteger</a>(object)

Checks if `object` is an integer number.

### Params:

* **\*** *object* The object to check.

### Returns:

* **Boolean** Returns `true` if `object` is an integer number, else returns `false`.

## <a name="isNegativeInteger" href="#">isNegativeInteger</a>(object)

Checks if `object` is a negative integer number.

### Params:

* **\*** *object* The object to check.

### Returns:

* **Boolean** Returns `true` if `object` is an integer number < 0, else returns `false`.

## <a name="isNegativeNumber" href="#">isNegativeNumber</a>(object)

Checks if `object` is a negative number.

### Params:

* **\*** *object* The object to check.

### Returns:

* **Boolean** Returns `true` if `object` is a number < 0, otherwise returns `false`.

## <a name="isNumber" href="#">isNumber</a>(object)

Checks if `object` is a number.

### Params:

* **\*** *object* The object to check.

### Returns:

* **Boolean** Returns `true` if `object` is a number, otherwise returns `false`.

## <a name="isPositiveInteger" href="#">isPositiveInteger</a>(object, [withZero=true])

Checks if `object` is a positive integer number.

### Params:

* **\*** *object* The object to check.

* **Boolean** *[withZero=true]* Indicates if zero is a valid positive number or not.

### Returns:

* **Boolean** Returns `true` if `object` is an integer number >= 0 or > 0, depending on `withZero`, otherwise returns `false`.

### Throws:

* **Error** Throws if `withZero` is provided and is not a boolean.

## <a name="isPositiveNumber" href="#">isPositiveNumber</a>(object, [withZero=true])

Checks if `object` is a positive number.

### Params:

* **\*** *object* The object to check.

* **Boolean** *[withZero=true]* Indicates if zero is a valid positive number or not.

### Returns:

* **Boolean** Returns `true` if `object` is a number >= 0 or > 0, depending on `withZero`, otherwise returns `false`.

### Throws:

* **Error** Throws if `withZero` is provided and is not a boolean.
