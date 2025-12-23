document.addEventListener("DOMContentLoaded", function () {
	const addButton = document.getElementById("add-item");
	const container = document.getElementById("items-container");

	if (!addButton || !container) return;

	addButton.addEventListener("click", function () {
		const row = document.createElement("div");
		row.className = "item-row";

		row.innerHTML = `
			<select name="Items">
				<option value="">Select Item</option>
				<option value="fishcake_small">Fishcake – Small</option>
				<option value="fishcake_medium">Fishcake – Medium</option>
				<option value="fishcake_large">Fishcake – Large</option>
			</select>

			<input
				type="number"
				name="Quantites"
				min="1"
				value="1"
				placeholder="Qty"
			/>

			<button type="button" class="button small remove-item">
				Remove
			</button>
		`;

		container.appendChild(row);
	});

	document.addEventListener("click", function (e) {
		if (e.target.classList.contains("remove-item")) {
			e.target.closest(".item-row").remove();
		}
	});
});
