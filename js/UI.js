function UI(options) {
	let callbacks = options.callbacks;
	const showGraphInputBtn = document.querySelector('.show-graph-input-btn');
	const graphInput = document.querySelector('.graph-input');
	const graphFunctionInput = document.querySelector('#graph-input__function');
	const graphLineWidthInput = document.querySelector('#graph-input__line-width');
	const graphColorInput = document.querySelector('#graph-input__color');
	const graphAddBtn = document.querySelector('.graph-input__add-graph-btn');

	const graphsContainer = document.querySelector('.graphs-container');

	this.getAB = function () {
		const a = document.querySelector('#a').value - 0;
		const b = document.querySelector('#b').value - 0;
		return { a, b };
	};

	graphFunctionInput.addEventListener('keyup', () => {
		drawCurrentFunction();
	});
	graphLineWidthInput.addEventListener('keyup', () => {
		drawCurrentFunction();
	});
	graphColorInput.addEventListener('input', () => {
		drawCurrentFunction();
	});
	showGraphInputBtn.addEventListener('click', function () {
		graphInput.classList.toggle('graph-input--hidden');
	});
	graphAddBtn.addEventListener('click', addFunction);

	let functionIndex = 0;

	function drawCurrentFunction() {
		let graphData = parseGraphData();
		drawFunction(graphData);
	}

	function drawFunction(graphData) {
		if (graphData) callbacks.setFunction(graphData, functionIndex);
	}

	function addFunction() {
		let graphData = parseGraphData();
		drawFunction(graphData);
		drawGraphBlock(graphData);
		functionIndex++;

		graphInput.classList.remove('graph-input--hidden');
	}

	function drawGraphBlock(graphData) {
		const graphBlock = document.createElement('div');
		graphBlock.classList.add('graph');

		const blockInner = `
			<div class="graph__row">
				<label class="graph__label graph__row-item">Function ${functionIndex + 1}:</label>
				<div class="graph__function graph__row-item">${graphFunctionInput.value}</div>
			</div>
			<div class="graph__row">
				<label class="graph__label graph__row-item" for="derivative${functionIndex}">Derivative:</label>
				<input class="graph__derivative graph__row-item" id="integral${functionIndex}" type="checkbox"></input>
			</div>
			<div class="graph__row">
				<label class="graph__label graph__row-item" for="integral${functionIndex}">Integral:</label>
				<input class="graph__integral graph__row-item" id="integral${functionIndex}" type="checkbox"></input>
			</div>
			<div class="graph__row">
				<button class="graph__remove-btn btn-base">Remove function</div>
			</div>
		`;
		graphBlock.innerHTML = blockInner;

		const derivative = graphBlock.querySelector('.graph__derivative');
		const integral = graphBlock.querySelector('.graph__integral');
		const removeBtn = graphBlock.querySelector('.graph__remove-btn');

		derivative.setAttribute('id', `derivative${functionIndex}`);
		derivative.dataset.functionIndex = functionIndex;
		derivative.addEventListener('change', function () {
			callbacks.setDerivative(this.checked, derivative.dataset.functionIndex);
		});

		integral.setAttribute('id', `integral${functionIndex}`);
		integral.dataset.functionIndex = functionIndex;
		integral.addEventListener('change', function () {
			callbacks.setIntegral(this.checked, integral.dataset.functionIndex);
		});

		removeBtn.addEventListener('click', () => {
			callbacks.removeFunction(graphData);
			graphBlock.remove();
		});

		graphsContainer.append(graphBlock);
	}

	function parseGraphData() {
		try {
			let graphData = {
				lineWidth: parseFloat(graphLineWidthInput.value),
				color: graphColorInput.value,
			};
			eval(`graphData.f = function(x) { return ${graphFunctionInput.value} }`);
			return graphData;
		} catch (e) {
			//console.log(e, "Can't parse function");
		}
	}
}
