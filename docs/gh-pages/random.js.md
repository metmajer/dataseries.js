

# dataseries.js random module

The `ds.random` module is a collection of random number generators.

## <a name="wiki-rand" href="#">rand</a>([lower=0], [upper=1])

Generates a random number in the range [lower, upper).

### Params:

* **Number** *[lower=0]* The lower limit of the random number.

* **Number** *[upper=1]* The upper limit of the random number (will not be included in the result).

### Returns:

* **Number** Returns the generated float random number.

### Throws:

* **Error** Throws if `lower` is not a number.

* **Error** Throws if `upper` is not a number.

* **Error** Throws if `lower` is >= `upper`.
