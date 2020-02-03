// Select stuff
const selectFirst = document.querySelector("#select-first");
const selectSecond = document.querySelector("#select-second");
const inputFirst = document.querySelector("#input-first");
const inputSecond = document.querySelector("#input-second");
const swap = document.querySelector("button");
const rate = document.querySelector("#rate");

// Event listeners
swap.addEventListener("click", swapper);
inputFirst.addEventListener("onkeydown", calculateRate);
inputSecond.addEventListener("onkeyup", calculateRate);
selectFirst.addEventListener("change", calculateRate);
selectSecond.addEventListener("change", calculateRate);

// Functions
window.onload = function getCurrencies() {
	fetch("https://api.exchangerate-api.com/v4/latest/EUR")
		.then(res => res.json())
		.then(data => {
			let output = "";
			let output2 = "";
			Object.keys(data.rates).forEach(key => {
				output += `<option value="${key}">${key}</option>`;
				output2 += `<option value="${key}">${key}</option>`;
				if (key == "USD") {
					output2 += "<option value='USD' selected>USD</option>";
				}
			});
			selectFirst.innerHTML = output;
			selectSecond.innerHTML = output2;
			calculateRate();
		});
};

function calculateRate() {
	fetch(`https://api.exchangerate-api.com/v4/latest/${selectFirst.value}`)
		.then(res => res.json())
		.then(data => {
			rate.textContent = `1 ${selectFirst.value} = ${
				data.rates[selectSecond.value]
			} ${selectSecond.value}`;
			inputSecond.value = (
				inputFirst.value * data.rates[selectSecond.value]
			).toFixed(2);
		});
}

function swapper() {
	[selectFirst.value, selectSecond.value] = [
		selectSecond.value,
		selectFirst.value
	];

	calculateRate();
}
