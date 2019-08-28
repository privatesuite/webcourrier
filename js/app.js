let mi;
let token;

const cache = {};

async function render (view, data = {}) {

	data = {

		...data,

		load,
		render,

		mi,
		token

	}

	const view_content = cache[view] || await (await fetch(`views/${view}`)).text();

	cache[view] = view_content;

	return ejs.render(view_content, data, {

		async: true

	});

}

async function load (view) {

	document.getElementsByClassName("app")[0].innerHTML = await render(view);

	for (const script of document.getElementsByTagName("script")) {
		
		if (script.innerHTML.trim()) eval(script.innerHTML);

	}

}

if (localStorage.getItem("token")) token = localStorage.getItem("token");
if (localStorage.getItem("server")) mi = new JSONMI(localStorage.getItem("server"));

document.body.onload = "";
load("login.ejs");
