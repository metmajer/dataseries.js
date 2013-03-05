/**
 * # dataseries.js FunctionDataSeriesGenerator module
 *
 * The `FunctionDataSeriesGenerator` initializes data series from the outputs of a function *y = f(x)*.<br>
 * See the [`ds.generators.f`](ds.generators.html#f) generator factory function for preferred construction.
 *
 * The generator provides a convenient builder syntax which greatly facilitates the filtering, transforming
 * and otherwise processing of data via the generator's `filter`, `transform` and `call` methods. After the
 * generator was configured, the resulting data series is computed by invoking the `values` method, which
 * results in the execution of the following processing stages:
 *
 * 1. Computation: *y = f(x)*
 * 2. Filtering
 * 3. Transformation
 * 4. (Otherwise) Processing
 *
 * The callbacks provided to filter`, `transform` and `call` are executed under the following `this` context:
 * - `generator`
 * - `inputs`
 * - `outputs`
 * - `timeRange` (or undefined if no time range configuration was provided)
 *
 * See the [`filter`](#filter), [`transform`](#transform) and [`call`](#call) methods for precise definitions
 * of the respective contexts.
 */
define([
	"require",
	"underscore",
	"dataseries/predicates",
	"dataseries/time"
], function(require, _, predicates, time) {
"use strict";

var generator = function FunctionDataSeriesGenerator(algorithm, algorithmArgs) {
	var context;
	var inputs = new Array(0);
	var filter;
	var timeRange;
	var transform;
	var callbacks = new Array(0);

	var _createComputationContext = function() {
		var context = {
			generator: new FunctionDataSeriesGenerator(algorithm, algorithmArgs),
			inputs: _.clone(inputs, true),
			outputs: new Array(0)
		};

		if (timeRange && context.inputs.length > 0) {
			context.timeRange = context.inputs.length > 1 ? time.range(timeRange[0], new Date((context.inputs.length - 1) * timeRange[1] + timeRange[0].getTime()), timeRange[1]) : [timeRange[0]];
		}

		return context;
	};

	var _computeAndFilterOutputs = function(context) {
		var acceptedInputs = new Array(0);

		/*!
		 * Initially, 'context.inputs' contains all user-provided inputs.
		 * Initially, 'context.outputs' equals [].
		 */
		for (var i = 0; i < context.inputs.length; i++) {
			var input = context.inputs[i];

			/*!
			 * Compute an output value.
			 */
			algorithmArgs[0] = input;
			var output = algorithm.apply(undefined, algorithmArgs);

			/*!
			 * Filter the output value (if a filter callback is provided).
			 *
			 * While filtering, 'context.inputs' contains all user-provided inputs,
			 * and 'context.outputs' contains all readily computed outputs which
			 * passed filtering, i.e., those which were not rejected.
			 */
			if (filter && !filter.call(context, output, input, i)) continue;
			context.outputs.push(output);
			acceptedInputs.push(input);
		}

		/*!
		 * While filtering, 'context.inputs' and 'context.outputs' contains
		 * only those inputs and outputs, respectively, which passed filtering.
		 */
		context.inputs = acceptedInputs;
	};

	var _transformOutputs = function(context) {
		if (!transform) return;

		/*!
		 * Transform the output values.
		 *
		 * While transforming, 'context.inputs' and 'context.outputs' contains
		 * only those inputs and outputs, respectively, which passed filtering.
		 * After transforming, 'context.outputs' contains the transformed outputs.
		 */
		context.outputs = _.map(context.inputs, function(input, i) {
			input = context.timeRange ? context.timeRange[i] : input;
			return transform.call(context, context.outputs[i], input, i);
		});
	};

	var _applyCallbacks = function(context) {
		_.each(callbacks, function(callback) {
			callback.args[0] = context.outputs;
			context.outputs = callback.callback.apply(context, callback.args);
		});
	};

/**
 * Gets or sets the set of input values.
 * The method returns any previously set inputs if `values` is omitted.
 * The method sets the inputs if `values` is provided.
 * @param  {Array} values The set of inputs.
 * @return {Array|FunctionDataSeriesGenerator} Returns any previously set inputs or `[]` if `values` is omitted, otherwise returns a reference to the generator.
 * @throws {Error} Throws if `values` is provided and is not an array.
 */
	this.inputs = function(values) {
		if (arguments.length === 0) return _.clone(inputs, true);

		if (!_.isArray(values)) throw new Error("inputs(): values must be an array");
		inputs = _.clone(values, true);
		return this;
	};

/**
 * Gets, sets or unsets a filter to be executed after computation.
 * The method returns a previously set filter if `callback` is omitted.
 * The method sets a filter if `callback` is provided and a function, or unsets a previously set filter if `callback` is set to `undefined`.
 *
 * ### callback:
 *
 * The callback determines if a computed output value shall be included in the resulting set of outputs of the filter
 * by returning either a truthy or a falsy value. If a value was rejected, both the input value and the output value
 * are evicted from the computation context and will thus not be available in subsequent processing stages.
 *
 * The callback is a function *f(y, x, i)* with the parameters:
 * - `x` the input value
 * - `y` the output value (as computed by the generator)
 * - `i` the index of the input value `x` within the set of inputs
 *
 * The computation context of a filter is defined as:
 * - `generator`
 * - `inputs`
 * - `outputs` the readily computed outputs (`this.outputs[j] = undefined` for *j > i*)
 * - `timeRange` (or undefined if no time range configuration was provided)
 *
 * See the [`ds.predicates`](ds.predicates.html) module for a list of provided predicates to facilitate filtering.
 *
 * ### Examples:
 *
 * ```javascript
 * var g = ds.generators.f(ds.functions.identity).inputs(-2, 2);
 *
 * g.values();
 * // => [-2, -1, 0, 1, 2]
 *
 * g.filter(ds.predicates.isPositiveNumber).values();
 * // => [0, 1, 2]
 * ```
 *
 * @param  {Function|undefined} [callback] A filter callback.
 * @return {Function|FunctionDataSeriesGenerator|undefined} Returns a previously set filter or `undefined` if `callback` is omitted, otherwise returns a reference to the generator.
 * @throws {Error} Throws if `callback` is provided and is neither a function nor `undefined`.
 */
	this.filter = function(callback) {
		if (arguments.length === 0) return filter;
		if (!(_.isFunction(callback) || callback === undefined)) throw new Error("filter(): calllback must be a function or undefined");
		filter = callback;
		return this;
	};

/**
 * Gets or sets a time range configuration.
 * The time range's points in time are made available via the `x` parameter of the generator's `transform` method.
 * The method returns a previously set time range configuration if no arguments are provided.
 * The method sets the time range configuration if `start` and `precision` are provided.
 *
 * ### Examples:
 *
 * ```javascript
 * var g = ds.generators.f(ds.functions.identity).inputs(ds.range(2));
 *
 * g.values();
 * // => [0, 1, 2]
 *
 * g.time(new Date(Date.UTC(2013, 0, 1)), ds.time.DAY)
 *  .transform(ds.transforms.point)
 *  .values();
 * // => [{x: new Date(Date.UTC(2013, 0, 1)), y: 0},
 * //     {x: new Date(Date.UTC(2013, 0, 2)), y: 1},
 * //     {x: new Date(Date.UTC(2013, 0, 3)), y: 2}]
 *
 * g.time(new Date(Date.UTC(2013, 0, 1)), ds.time.MONTH)
 *  .transform(ds.transforms.point)
 *  .values();
 * // => [{x: new Date(Date.UTC(2013, 0, 1)), y: 0},
 * //     {x: new Date(Date.UTC(2013, 1, 1)), y: 1},
 * //     {x: new Date(Date.UTC(2013, 2, 1)), y: 2}]
 *
 * g.time(new Date(Date.UTC(2013, 0, 1)), ds.time.YEAR)
 *  .transform(ds.transforms.point)
 *  .values();
 * // => [{x: new Date(Date.UTC(2013, 0, 1)), y: 0},
 * //     {x: new Date(Date.UTC(2014, 0, 1)), y: 1},
 * //     {x: new Date(Date.UTC(2015, 0, 1)), y: 2}]
 * ```
 *
 * @param  {Date} start A start date.
 * @param  {Function(Date):Number|Number} [precision=ds.time.DAY] The precision of the time range (in milliseconds): either a function returning an appropriate precision or a number (> 0).
 * @return {Array|FunctionDataSeriesGenerator} Returns a previously set time range configuration or `undefined` if no arguments are provided, otherwise returns a reference to the generator.
 * @throws {Error} Throws if `start` is provided and is not a date.
 * @throws {Error} Throws if `start` is provided and `precision` is not function or is not a number > 0.
 */
	this.time = function(start, precision) {
		if (arguments.length === 0) return _.clone(timeRange);
		if (arguments.length < 2) precision = time.DAY;

		if (!_.isDate(start)) throw new Error("time(): start must be a date");
		if (!(_.isFunction(precision) || predicates.isPositiveNumber(precision, false))) throw new Error("time(): precision must be a function or a number > 0");
		timeRange = [new Date(start.getTime()), precision];
		return this;
	};

/**
 * Gets, sets or unsets a transform to be executed after filtering.
 * The method returns a previously set transform if `callback` is omitted.
 * The method sets a transform if `callback` is provided and a function, or unsets a previously set transform if `callback` is set to `undefined`.
 *
 * ### callback:
 *
 * The callback determines the effective data structure for the given arguments.
 *
 * The callback is a function *f(x, y, i)* with the parameters:
 * - `x` the input value
 * - `y` the output value (as computed and filtered by the generator)
 * - `i` the index of the input value `x` within the set of inputs
 *
 * The computation context of a transform is defined as:
 * - `generator`
 * - `inputs`
 * - `outputs`
 * - `timeRange` (or undefined if no time range configuration was provided)
 *
 * See the [`ds.transforms`](ds.transforms.html) module for a list of provided transforms.
 *
 * ### Examples:
 *
 * ```javascript
 * var g = ds.generators.f(ds.functions.identity).inputs(ds.range(2));
 *
 * g.values();
 * // => [0, 1, 2]
 *
 * g.transform(ds.transforms.pair).values();
 * // => [[0, 0],
 * //     [1, 1],
 * //     [2, 2]]
 *
 * g.transform(ds.transforms.point).values();
 * // => [{x: 0, y: 0},
 * //     {x: 1, y: 1},
 * //     {x: 2, y: 2}]
 *
 * g.inputs(ds.range(-2, 2)).transform(function(y, x, i) {
 *     return y >= 0 ? y : null;
 * }).values();
 * // => [null, null, 0, 1, 2]
 * ```
 *
 * @param  {Function|undefined} [callback] A filter callback.
 * @return {Function|FunctionDataSeriesGenerator|undefined} Returns a previously set filter or `undefined` if `callback` is omitted, otherwise returns a reference to the generator.
 * @throws {Error} Throws if `callback` is provided and is neither a function nor `undefined`.
 */
	this.transform = function(callback) {
		if (arguments.length === 0) return transform;
		if (!(_.isFunction(callback) || callback === undefined)) throw new Error("transform(): calllback must be a function or undefined");
		transform = callback;
		return this;
	};

/**
 * Adds a callback for otherwise processing of the resulting data series to the end of the processing chain.
 * Multiple callbacks can be added by invoking `call` multiple times. Callbacks are executed in the given order.
 *
 * ### callback:
 *
 * The callback is a function *f(outputs)* with the parameters (excess arguments to `call` are relayed to the callback):
 * - `outputs` the current set of outputs
 *
 * The computation context of a callback is defined as:
 * - `generator`
 * - `inputs`
 * - `outputs`
 * - `timeRange` (or undefined if no time range configuration was provided)
 *
 * ### Examples:
 *
 * ```javascript
 * ds.generators.f(ds.functions.identity)
 *   .inputs(ds.range(2))
 *   .values();
 * // => [0, 1, 2]
 *
 * ds.generators.f(ds.functions.identity)
 *   .inputs(ds.range(2))
 *   .call(ds.normalize, 0, 1)
 *   .values();
 * // => [0, 0.5, 1]
 *
 * ds.generators.f(ds.functions.identity)
 *   .inputs(ds.range(2))
 *   .transform(ds.transforms.point)
 *   .call(ds.normalize, 0, 1, 'y')
 *   .values();
 * // => [{x: 0, y: 0},
 * //     {x: 1, y: 0.5},
 * //     {x: 2, y: 1}]
 * ```
 *
 * @param  {Function} callback A callback.
 * @return {FunctionDataSeriesGenerator} Returns a reference to the generator.
 * @throws {Error} Throws if `callback` is not a function.
 */
	this.call = function(callback) {
		if (!_.isFunction(callback)) throw new Error("call(): callback must be a function");

		var args = Array.prototype.slice.call(arguments, 1);
		args.unshift(undefined);

		callbacks.push({ callback: callback, args: args });
		return this;
	};

/**
 * Computes, filters, transforms and otherwise processes a data series from a set of input values.
 * @return {Array} Returns the resulting data series.
 */
	this.values = function() {
		context = _createComputationContext.call(this);

		_computeAndFilterOutputs(context);
		_transformOutputs(context);
		_applyCallbacks(context);

		return context.outputs;
	};
};

return generator;

});
