class MySlider extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({mode: "open"});
		const container = document.createElement("span");
		container.className = "my-slider";

		const style = document.createElement("link");
		style.setAttribute("rel", "stylesheet");
		style.setAttribute("href", "elements/my-slider.css");

		const label = document.createElement("div");
		label.className = "my-slider-label";
		label.innerText = this.label;
		
		const range = document.createElement("input");
		range.className = "my-slider-range";
		range.type = "range";
		range.min = this.min;
		range.max = this.max;
		range.step = this.step;
		range.value = this.value;

		const min = document.createElement("input");
		min.className = "my-slider-min";
		min.type = "number";
		min.step = this.step;
		min.value = this.min;

		const value = document.createElement("input");
		value.className = "my-slider-value";
		value.type = "number";
		value.min = this.min;
		value.max = this.max;
		value.step = this.step;
		value.value = range.value;

		const max = document.createElement("input");
		max.className = "my-slider-max";
		max.type = "number";
		max.step = this.step;
		max.value = this.max;

		container.appendChild(label);
		container.appendChild(range);
		container.appendChild(min);
		container.appendChild(value);
		container.appendChild(max);

		shadow.appendChild(style);
		shadow.appendChild(container);

		const clamp = (x, min, max) => Math.max(min, Math.min(max, x));
		const validate = (target) => {
			const value = parseFloat(target.value);
			//const min = parseFloat(target.min);
			//const max = parseFloat(target.max);

			return (
				!(isNaN(value) || isNaN(min) || isNaN(max)) //&&
				//value >= min && value <= max
			);
		};

		const inputEvent = new InputEvent("input", {
			view: window,
			bubbles: true,
			cancelable: true
		});

		range.addEventListener("input", e => {
			if (range.readOnly) {
				e.preventDefault();
				range.value = this.value;
				return;
			}

			value.value = e.target.value;
			this.value = e.target.value;

			this.dispatchEvent(inputEvent);
		});

		min.addEventListener("input", e => {
			if (validate(e.target)) {
				e.preventDefault();
				min.value = this.min;
				return;
			}

			range.min = e.target.value;
			value.min = e.target.value;
			
			value.value = clamp(value.value, value.min, value.max);
		});

		value.addEventListener("input", e => {
			if (validate(e.target)) {
				e.preventDefault();
				value.value = this.value;
				return;
			}

			range.value = e.target.value;
			this.value = e.target.value;

			this.dispatchEvent(inputEvent);
		});

		max.addEventListener("input", e => {
			if (validate(e.target)) {
				e.preventDefault();
				max.value = this.max;
				return;
			}

			range.max = e.target.value;
			value.max = e.target.value;

			value.value = clamp(value.value, value.min, value.max);
		});

		this.labelDiv = label;
		this.rangeInput = range;
		this.minInput = min;
		this.valueInput = value;
		this.maxInput = max;

		this.value = range.value;
		this.readOnly = this.readOnly;
		this.fixedRange = this.fixedRange;
	}

	get label() {
		return this.getAttribute("label") || "";
	}
	set label(text) {
		this.setAttribute("label", text);

		this.labelDiv.innerText = text;
	}

	get min() {
		return parseFloat(this.getAttribute("min") || "");
	}
	set min(value) {
		this.setAttribute("min", value);

		this.minInput.value = value;
	}

	get max() {
		return parseFloat(this.getAttribute("max") || "");
	}
	set max(value) {
		this.setAttribute("max", value);

		this.maxInput.value = value;
	}

	get step() {
		return parseFloat(this.getAttribute("step") || "");
	}
	set step(value) {
		this.setAttribute("step", value);
		
		this.rangeInput.step = value;
		this.minInput.step = value;
		this.valueInput.step = value;
		this.maxInput.step = value;
	}

	get value() {
		return parseFloat(this.getAttribute("value") || "");
	}
	set value(value) {
		this.setAttribute("value", value);

		this.valueInput.value = value;
		this.rangeInput.value = value;
	}

	get fixedRange() {
		const attr = this.getAttribute("fixed-range");

		return (
			attr !== null &&
			attr === "" ||
			attr === "true" ||
			attr === "readonly"
		);
	}
	set fixedRange(isFixed) {
		this.setAttribute("fixed-range", isFixed);

		isFixed = isFixed || this.readOnly;

		this.minInput.readOnly = isFixed;
		this.minInput.type = isFixed ? "text" : "number";
		
		this.maxInput.readOnly = isFixed;
		this.maxInput.type = isFixed ? "text" : "number";
	}

	get fixedValue() {
		const attr = this.getAttribute("fixed-value");

		return (
			attr !== null &&
			attr === "" ||
			attr === "true" ||
			attr === "readonly"
		);
	}
	set fixedValue(isFixed) {
		this.setAttribute("fixed-value", isFixed);

		isFixed = isFixed || this.readOnly;

		this.rangeInput.readOnly = isFixed;
		
		this.valueInput.readOnly = isFixed;
		this.valueInput.type = isFixed ? "text" : "number";
	}

	get readOnly() {
		const attr = this.getAttribute("readonly");

		return (
			attr !== null &&
			attr === "" ||
			attr === "true" ||
			attr === "readonly"
		);
	}
	set readOnly(isReadOnly) {
		this.setAttribute("readonly", isReadOnly);

		this.fixedValue = this.fixedValue;
		this.fixedRange = this.fixedRange;
	}
}

(() => {

"use strict";

customElements.define("my-slider",  MySlider);

})();