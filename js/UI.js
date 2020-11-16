function UI(options) {
	let callbacks = options.callbacks;
	const showGraphInputBtn = document.querySelector(".show-graph-input-btn");
	const graphInput = document.querySelector(".graph-input");
	//let graphColors = ['red', 'blue', 'green', 'magenta', 'purple', 'brown'];
	const graphFunctionInput = document.querySelector(".graph-input__function");
	const graphLineWidthInput = document.querySelector(
		".graph-input__line-width"
	);
	const graphColorInput = document.querySelector(".graph-input__color");
	const graphAddBtn = document.querySelector(".graph-input__add-graph-btn");

	showGraphInputBtn.addEventListener("click", function () {
		graphInput.classList.toggle("graph-input--hidden");
	});
	graphAddBtn.addEventListener("click", parseGraphData);

	function parseGraphData() {
		try {
			let graphData = {
				lineWidth: parseFloat(graphLineWidthInput.value),
				color: graphColorInput.value,
			};
			graphData.function = function (x) {
				return eval(graphFunctionInput.value);
			};
			callbacks.addGraph(graphData);
		} catch (e) {
			console.log(e, "Can't parse function");
		}
		graphInput.classList.add("graph-input--hidden");
	}
}
