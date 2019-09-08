let mi;
let token;

const cache = {};
const alreadyRun = [];

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
		
		if (script.innerHTML.trim() && (script.getAttribute("data-once") ? alreadyRun.indexOf(script.getAttribute("data-once")) === -1 : true)) {
			
			if (script.getAttribute("data-once")) {
				
				alreadyRun.push(script.getAttribute("data-once"));
				console.log(`Running "${script.getAttribute("data-once")}" for the first time...`);

			}

			eval(script.innerHTML);

		}

	}

}

if (localStorage.getItem("token")) token = localStorage.getItem("token");
if (localStorage.getItem("server")) mi = new JSONMI(localStorage.getItem("server"));

document.body.onload = "";
(async () => {

	if (!token) load("login.ejs");
	else try {await load("inbox.ejs");} catch {load("login.ejs");}

})();
