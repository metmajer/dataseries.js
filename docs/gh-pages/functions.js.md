

# dataseries.js functions module

The `ds.functions` module is a collection of functions *y = f(x)*, which map an input value `x` to an output value *y*.

## <a name="cos" href="#">cos</a>(x, [a=1], [f=1], [φ=0], [b=0])

Computes the output of the cosine function *f(x, a, f, φ, b) = a · cos(2 · π · f · x + φ) + b* for a particular `x`.

### Examples:

```javascript
ds.functions.cos(0);
// f(x) = cos(0)

ds.functions.cos(0.25);
// f(x) = cos(π/2)

ds.functions.cos(0.5, { a: 10, f: 2, φ: Math.PI / 2, b: 1 });
// f(x) = 10·cos(2.5·π) + 1
```

### Params:

* **Number** *x* The input value.

* **Number** *[a=1]* The amplitude.

* **Number** *[f=1]* The frequency (in Hz) (>= 0).

* **Number** *[φ=0]* The phase shift.

* **Number** *[b=0]* 

### Returns:

* **Number** Returns the output value.

### Throws:

* **Error** Throws if `x` is not a number.

* **Error** Throws if `a` is not a number.

* **Error** Throws if `f` is not a number >= 0.

* **Error** Throws if `φ` is not a number.

* **Error** Throws if `b` is not a number.

## <a name="cubic" href="#">cubic</a>(x, [a=1], [b=0], [c=0], [d=0])

Computes the output of the cubic function *f(x) = a · x<sup>3</sup> + b · x<sup>2</sup> + c · x + d* for a particular `x`.

### Examples:

```javascript
ds.functions.cubic(2);
// f(x) = x³ for x = 2 => 8

ds.functions.cubic(2, { a: 4, b: 3, c: 2, d: 1 });
// f(x) = 4·x³ + 3·x² + 2·x + 1 for x = 2 => 49
```

### Params:

* **Number** *x* The input value.

* **Number** *[a=1]* 

* **Number** *[b=0]* 

* **Number** *[c=0]* 

* **Number** *[d=0]* 

### Returns:

* **Number** Returns the output value.

### Throws:

* **Error** Throws if `x` is not a number.

## <a name="exp" href="#">exp</a>(x, [a=Math.E], [b=1], [c=1], [d=0])

Computes the output of the exponential function *f(x, a, b, c, d) = c · a<sup>b · x</sup> + d* for a particular `x`.

### Examples:

```javascript
ds.functions.exp(2);
// f(x) = e²

ds.functions.exp(2, { a: Math.E, b: 2, c: 10 });
// f(x) = 10·e⁴

ds.functions.exp(2, { a: 2, b: 3, c: 10, d: 4 });
// f(x) = 10·2⁶ + 4
```

### Params:

* **Number** *x* The input value.

* **Number** *[a=Math.E]* The base.

* **Number** *[b=1]* 

* **Number** *[c=1]* 

* **Number** *[d=0]* 

### Returns:

* **Number** Returns the output value.

### Throws:

* **Error** Throws if `x` is not a number.

* **Error** Throws if `a` is not a number.

* **Error** Throws if `b` is not a number.

* **Error** Throws if `c` is not a number.

* **Error** Throws if `d` is not a number.

## <a name="identity" href="#">identity</a>(x)

Computes the output of the identity function *f(x) = x* for a particular `x`.

### Params:

* **\*** *x* The input value.

### Returns:

* **\*** Returns the output value.

## <a name="linear" href="#">linear</a>(x, [a=1], [b=0])

Computes the output of the linear function *f(x) = a · x + b* for a particular `x`.

### Examples:

```javascript
ds.functions.linear(2);
// f(x) = x for x = 2 => 2

ds.functions.linear(2, { a: 2, b: 1 });
// f(x) = 2·x + 1 for x = 2 => 5
```

### Params:

* **Number** *x* The input value.

* **Number** *[a=1]* 

* **Number** *[b=0]* 

### Returns:

* **Number** Returns the output value.

### Throws:

* **Error** Throws if `x` is not a number.

## <a name="log" href="#">log</a>(x, [a=Math.E], [b=1], [c=0])

Computes the output of the logarithmic function *f(x, a, b, c) = b · log<sub>a</sub>(x) + c* for a particular `x`.

### Examples:

```javascript
ds.functions.log(2);
// f(x) = logₑ(2)

ds.functions.log(4, { a: 2 });
// f(x) = log₂(4)

ds.functions.log(4, { a: 2, b: 10, c: 8 });
// f(x) = 10·log₂(4) + 8
```

### Params:

* **Number** *x* The input value.

* **Number** *[a=Math.E]* The base (>= 0).

* **Number** *[b=1]* 

* **Number** *[c=0]* 

### Returns:

* **Number** Returns the output value.

### Throws:

* **Error** Throws if `x` is not a number.

* **Error** Throws if `a` is not a number >= 0.

* **Error** Throws if `b` is not a number.

* **Error** Throws if `c` is not a number.

## <a name="polynomial" href="#">polynomial</a>(x, [a=[]])

Computes the output of the polynomial function *f(x) = a[n] · x<sup>n</sup> + a[n-1] · x<sup>n-1</sup> + ... + a[1] · x + a[0]* with coefficients *a[n]* for a particular `x`.

### Examples:

```javascript
ds.functions.polynomial(2, { a: [1, 2] });
// f(x) = 2·x + 1 for x = 2 => 5

ds.functions.polynomial(2, { a: [1, 2, 3] });
// f(x) = 3·x² + 2·x + 1 for x = 2 => 17

ds.functions.polynomial(2, { a: [1, 2, 3, 4] });
// f(x) = 4·x³ + 3·x² + 2·x + 1 for x = 2 => 49
```

### Params:

* **Number** *x* The input value.

* **Array<Number>** *[a=[]]* The coefficients of the polynomial function. An array of length *n* will produce a polynomial of degree *n-1*, an empty array will result in an output value of 0.

### Returns:

* **Number** Returns the output value.

### Throws:

* **Error** Throws if `x` is not a number.

* **Error** Throws if `a` is not a (possibly empty) array of numbers.

## <a name="sin" href="#">sin</a>(x, [a=1], [f=1], [φ=0], [b=0])

Computes the output of the sine function *f(x, a, f, φ, b) = a · sin(2 · π · f · x + φ) + b* for a particular `x`.

### Examples:

```javascript
ds.functions.sin(0);
// f(x) = sin(0)

ds.functions.sin(0.25);
// f(x) = sin(π/2)

ds.functions.sin(0.5, { a: 10, f: 2, φ: Math.PI / 2, b: 1 });
// f(x) = 10·sin(2.5·π) + 1
```

### Params:

* **Number** *x* The input value.

* **Number** *[a=1]* The amplitude.

* **Number** *[f=1]* The frequency (in Hz) (>= 0).

* **Number** *[φ=0]* The phase shift.

* **Number** *[b=0]* 

### Returns:

* **Number** Returns the output value.

### Throws:

* **Error** Throws if `x` is not a number.

* **Error** Throws if `a` is not a number.

* **Error** Throws if `f` is not a number >= 0.

* **Error** Throws if `φ` is not a number.

* **Error** Throws if `b` is not a number.

## <a name="square" href="#">square</a>(x, [a=1], [b=0], [c=0])

Computes the output of the square function *f(x) = a · x<sup>2</sup> + b · x + c* for a particular `x`.

### Examples:

```javascript
ds.functions.square(2);
// f(x) = x² for x = 2 => 4

ds.functions.square(2, { a: 3, b: 2, c: 1 });
// f(x) = 3·x² + 2·x + 1 for x = 2 => 17
```

### Params:

* **Number** *x* The input value.

* **Number** *[a=1]* 

* **Number** *[b=0]* 

* **Number** *[c=0]* 

### Returns:

* **Number** Returns the output value.

### Throws:

* **Error** Throws if `x` is not a number.
