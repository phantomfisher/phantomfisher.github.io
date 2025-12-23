document.addEventListener("DOMContentLoaded", function () {
	const addButton = document.getElementById("add-item");
	const container = document.getElementById("items-container");

	if (!addButton || !container) return;

	addButton.addEventListener("click", function () {
		const row = document.createElement("div");
		row.className = "item-row";

		row.innerHTML = `
			<select name="Items" required>
				<option value="">Select Item</option>

				<!-- Stickers -->
				<option value="Red Velvet Worm" class="sticker">Red Velvet Worm</option>
				<option value="Blue Dobson Fly" class="sticker">Blue Dobson Fly</option>
				<option value="Purple Sheep Ked" class="sticker">Purple Sheep Ked</option>
				<option value="Ironworm" class="sticker">Ironworm</option>
				<option value="Takopi" class="sticker">Takopi</option>
				<option value="Keroro" class="sticker">Keroro</option>
				<option value="Fisherman's Money Spread" class="sticker">Fisherman's Money Spread</option>
				<option value="Wasted Fisherman" class="sticker">Wasted Fisherman</option>
				<option value="Reacting Fisherman" class="sticker">Reacting Fisherman</option>
				<option value="Pointing Fisherman" class="sticker">Pointing Fisherman</option>
				<option value="Yian Kut-ku" class="sticker">Yian Kut-ku</option>
				<option value="Khezu" class="sticker">Khezu</option>
				<option value="Basilisk" class="sticker">Basilisk</option>
				<option value="Mimic" class="sticker">Mimic</option>
				<option value="Paras" class="sticker">Paras</option>
				<option value="Crustle" class="sticker">Crustle</option>

				<!-- Resin -->
				<option value="Red Velvet Worm" class="resin">Red Velvet Worm</option>
				<option value="Blue Velvet Worm" class="resin">Blue Velvet Worm</option>
				<option value="Purple Velvet Worm" class="resin">Purple Velvet Worm</option>
				<option value="Red Dobson Fly" class="resin">Red Dobson Fly</option>
				<option value="Blue Dobson Fly" class="resin">Blue Dobson Fly</option>
				<option value="Purple Dobson Fly" class="resin">Purple Dobson Fly</option>
				<option value="Red Sheep Ked" class="resin">Red Sheep Ked</option>
				<option value="Blue Sheep Ked" class="resin">Blue Sheep Ked</option>
				<option value="Purple Sheep Ked" class="resin">Purple Sheep Ked</option>

				<!-- Postcards -->
				<option value="The Cunning Linguist" class="postcard">The Cunning Linguist</option>
				<option value="Robot Sketch" class="postcard">Robot Sketch</option>
				<option value="WEIRD HORSE" class="postcard">WEIRD HORSE</option>
				<option value="What I saw In That Room" class="postcard">What I saw In That Room</option>
				<option value="Ebolable" class="postcard">Ebolable</option>
				<option value="JUST CUT THE CORD" class="postcard">JUST CUT THE CORD</option>
				<option value="Love Love Miku!" class="postcard">Love Love Miku!</option>

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
