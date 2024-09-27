let input = document.getElementById("input");
input.value = "";

let inputClean = document.getElementById("inputClean");
inputClean.style.display = "none";
inputClean.addEventListener("click", () => {
	input.value = "";
	inputClean.style.display = "none";
});

let inputSearch = document.getElementById("inputSearch");
inputSearch.addEventListener("click", () => {
	search();
});

input.addEventListener("input", () => {
	if (input.value == "") {
		inputClean.style.display = "none";
	} else {
		inputClean.style.display = "";
	}
});

let gallery = document.getElementById("gallery");

const displayImages = (arr) => {
	gallery.innerHTML = "";
	console.log(arr);

	arr.forEach((el) => {
		let div = document.createElement("div");
		let img = document.createElement("img");
		div.classList.add("img");
		div.appendChild(img);
		gallery.appendChild(div);
		img.src = el.urls.small;
	});
};

//displayImages(testData);
search();

document.addEventListener("keyup", (e) => {
	switch (e.code) {
		case "Enter":
		case "NumpadEnter":
			search();
			break;
	}
});

function search() {
	const searchStr = input.value;
	console.log("searchStr", searchStr);

	let url = "";

	if (searchStr) {
		url = `https://api.unsplash.com/search/photos?page=1&client_id=YP76idt522VTfIxGKgXe8rx7kCkvp1GHI-t7KWHi2q4&query=${searchStr}`;
	} else {
		url = `https://api.unsplash.com/photos?page=1&client_id=YP76idt522VTfIxGKgXe8rx7kCkvp1GHI-t7KWHi2q4`;
	}
	fetch(url)
		.then((response) => {
			response.json().then((json) => {
				if (Array.isArray(json)) {
					displayImages(json);
				} else if (json.results) {
					displayImages(json.results);
				} else {
					alert("Ошибка сервера");
				}
			});
		})
		.catch((err) => {
			console.log(err);
		});
	//displayImages(testData);
}
