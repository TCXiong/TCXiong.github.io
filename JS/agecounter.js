let ageEl = document.getElementById("age");

setInterval(() => {
	let time = dayjs().diff(dayjs("2001-03-08", "MM-DD-YYYY"), 'year', true);
	ageEl.innerText = time.toString().substring(0, 12);
}, 50);