document.querySelectorAll('.clickableImage').forEach(img => {
	img.addEventListener('click', function () {
		const targetImage = document.getElementById(this.dataset.target);
		const newSrc = this.dataset.image;
		const newName = this.dataset.name;

		if (targetImage && newSrc) {
			targetImage.src = newSrc;
		}

		if (newName) {
			const nameEl = document.getElementById('productName');
			if (nameEl) {
				nameEl.textContent = newName;
			}
		}
	});
});
