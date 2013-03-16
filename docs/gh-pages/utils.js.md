

# dataseries.js utils module

The `ds.utils` module is a collection of algorithms that don't fit anywhere else.

## <a name="hash" href="#">hash</a>(string)

Computes a hash from a string.

The method implements the Fowler–Noll–Vo or FNV hash algorithm, designed primarily for hash table and checksum use
(non-cryptographic). See [Wikipedia, Fowler–Noll–Vo hash function](http://en.wikipedia.org/wiki/Fowler-Noll-Vo_hash_function)
for an explanation of this algorithm and [Which hashing algorithm is best for uniqueness and speed?](http://programmers.stackexchange.com/questions/49550/which-hashing-algorithm-is-best-for-uniqueness-and-speed)
for a comprehensive comparison of various hash algorithms.

### Params:

* **String** *string* The string to be hashed.

### Returns:

* **String** Returns the hash as a base36 encoded number.

## <a name="hashObject" href="#">hashObject</a>(object)

Computes a hash from the enumerable properties of an object.

The method uses the Fowler–Noll–Vo hash algorithm provided by [`ds.utils.hash`](ds.utils#wiki-hash).

### Examples:

```javascript
ds.utils.hashObject({x: 1, y: 2});
// => "3hr02ufj2cg"

ds.utils.hashObject({x: 2, y: 1});
// => "-4jxzz8puql0"
```

### Params:

* **Object** *object* The object to be hashed.

### Returns:

* **String** Returns the hash as a base36 encoded number.
