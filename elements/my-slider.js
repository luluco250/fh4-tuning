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

		range.addEventListener("input", e => {
			e.preventDefault();
			this.value = e.target.value;
			this._onInput();
		});

		min.addEventListener("input", e => {
			e.preventDefault();
			this.min = e.target.value;
			this._onInput();
		});

		value.addEventListener("input", e => {
			e.preventDefault();
			this.value = e.target.value;
			this._onInput();
		});

		max.addEventListener("input", e => {
			e.preventDefault();
			this.max = e.target.value;
			this._onInput();
		});

		this.labelDiv = label;
		this.rangeInput = range;
		this.minInput = min;
		this.valueInput = value;
		this.maxInput = max;

		this._applyAttributes();
	}

	_onInput() {
		this.dispatchEvent(new InputEvent("input", {
			view: window,
			bubbles: true,
			cancelable: true
		}));
	}

	_applyAttributes() {
		this.labelDiv.innerText = this.label;
		
		this.minInput.value = this.min;
		this.maxInput.value = this.max;

		this.rangeInput.min = this.valueInput.min = this.min;
		this.rangeInput.max = this.valueInput.max = this.max;
		this.rangeInput.value = this.valueInput.value = this.value;

		this.rangeInput.step =
			this.minInput.step =
				this.valueInput.step =
					this.maxInput.step = this.step;

		const fixedRange = this.readOnly || this.fixedRange;
		this.minInput.readOnly = this.maxInput.readOnly = fixedRange;
		this.minInput.type = this.maxInput.type =
			fixedRange ? "text" : "number";

		const fixedValue = this.readOnly || this.fixedValue;
		this.rangeInput.readOnly = this.valueInput.readOnly = fixedValue;
		this.valueInput.type = fixedValue ? "text" : "number";
	}

	get _defaultValue() {
		return (this.max < this.min)
			? this.min
			: this.min + (this.max - this.min) * 0.5;
	}

	get label() {
		return this.getAttribute("label") || "";
	}
	set label(text) {
		this.setAttribute("label", text);
		this._applyAttributes();
	}

	get min() {
		const value = parseFloat(this.getAttribute("min") || "");
		return isNaN(value) ? 0 : value;
	}
	set min(value) {
		this.setAttribute("min", value);
		this._applyAttributes();
	}

	get max() {
		const value = parseFloat(this.getAttribute("max") || "");
		return isNaN(value) ? 1 : value;
	}
	set max(value) {
		this.setAttribute("max", value);
		this._applyAttributes();
	}

	get step() {
		const value = parseFloat(this.getAttribute("step") || "");
		return isNaN(value) ? 0.01 : value;
	}
	set step(value) {
		this.setAttribute("step", value);
		this._applyAttributes();
	}

	get value() {
		const value = parseFloat(this.getAttribute("value") || "");
		return isNaN(value) ? this._defaultValue : value;
	}
	set value(value) {
		this.setAttribute("value", value);
		this._applyAttributes();
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
		this._applyAttributes();
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
		this._applyAttributes();
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
		this._applyAttributes();
	}
}

(() => {

"use strict";

customElements.define("my-slider",  MySlider);

})();