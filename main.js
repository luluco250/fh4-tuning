(() => {
"use strict";

const params = {
	/** @type {MySlider} */
	front: document.getElementById("slider-front"),
	/** @type {MySlider} */
	stiffnessBias: document.getElementById("slider-stiffness-bias"),
	/** @type {MySlider} */
	antirollBars: document.getElementById("slider-antiroll-bars"),
	/** @type {MySlider} */
	antirollBarsRear: document.getElementById("slider-antiroll-bars-rear"),
	/** @type {MySlider} */
	springStiffness: document.getElementById("slider-spring-stiffness"),
	/** @type {MySlider} */
	springStiffnessRear: document.getElementById("slider-spring-stiffness-rear"),
	/** @type {MySlider} */
	reboundStiffness: document.getElementById("slider-rebound-stiffness"),
	/** @type {MySlider} */
	reboundStiffnessRear: document.getElementById("slider-rebound-stiffness-rear"),
	/** @type {MySlider} */
	bumpStiffness: document.getElementById("slider-bump-stiffness"),
	/** @type {MySlider} */
	bumpStiffnessRear: document.getElementById("slider-bump-stiffness-rear")
}; 

function main() {
	params.front.addEventListener("input", updateValues);
	params.stiffnessBias.addEventListener("input", updateValues);

	updateValues();
}

function updateValues() {
	params.bumpStiffness.min = params.reboundStiffness.min;
	params.bumpStiffness.max = params.reboundStiffness.max;
	params.bumpStiffnessRear.min = params.reboundStiffnessRear.min;
	params.bumpStiffnessRear.max = params.reboundStiffnessRear.max;

	const front = params.front.value;
	const rear = 1 - front;
	const bias = params.stiffnessBias.value;

	const apply = (param, weight, bias = 0) =>
		param.value = calculate(bias, param.min, param.max, weight);
	
	apply(params.antirollBars, front);
	apply(params.antirollBarsRear, rear);

	apply(params.springStiffness, front, bias);
	apply(params.springStiffnessRear, rear, bias);

	apply(params.reboundStiffness, front);
	apply(params.reboundStiffnessRear, rear);

	params.bumpStiffness.value = params.reboundStiffness.value * 0.6;
	params.bumpStiffnessRear.value = params.reboundStiffnessRear.value * 0.6;
}

/**
 * Calculate the optimal value for the given parameter.
 * @param {Number} bias The stiffness bias.
 * @param {Number} min Minimum value.
 * @param {Number} max Maximum value.
 * @param {Number} weight Car weight distribution.
 * @returns {Number} The resulting value.
 */
function calculate(bias, min, max, weight) {
	let value = lerp(min, max, weight);

	if (bias > 0)
		value = lerp(value, max, bias);
	else if (bias < 0)
		value = lerp(value, min, -bias);
	
	return value;
}

/**
 * Linear interpolation between two values.
 * @param {Number} a First value.
 * @param {Number} b Second value;
 * @param {Number} t Interpolation factor.
 * @returns {Number} The result.
 */
function lerp(a, b, t) {
	return a + t * (b - a);
}

main();
})()