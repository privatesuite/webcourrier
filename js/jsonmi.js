class JSONMI {

	constructor (apiRoot) {

		this.apiRoot = apiRoot;

		this.meCache = new Map();

	}

	async authenticate (username, password) {

		const result = await (await fetch(`${this.apiRoot}/auth?username=${username}&password=${encodeURIComponent(password)}`)).json();

		if (result.error) return false;
		else return result;

	}

	async inbox (token) {

		const result = (await (await fetch(`${this.apiRoot}/inbox`, {

			headers: {

				authorization: `Bearer ${token}`

			}

		})).json()).sort((b, a) => new Date(a.metadata.date) - new Date(b.metadata.date));
		
		return result;

	}

	async email (token, id) {

		const result = await (await fetch(`${this.apiRoot}/email?id=${id}`, {

			headers: {

				authorization: `Bearer ${token}`

			}

		})).json();
		
		return result;

	}

	async me (token) {

		if (this.meCache.has(token)) return this.meCache.get(token);

		const result = await (await fetch(`${this.apiRoot}/about_me`, {

			headers: {

				authorization: `Bearer ${token}`

			}

		})).json();

		this.meCache.set(token, result);
		
		return result;

	}

	async users (token) {

		const result = await (await fetch(`${this.apiRoot}/users`, {

			headers: {

				authorization: `Bearer ${token}`

			}

		})).json();
		
		return result.sort((a, b) => (a.username < b.username) * -2 + 1);

	}

	async updateUser (token, username, changes) {

		const result = await (await fetch(`${this.apiRoot}/update_user`, {

			method: "POST",

			headers: {

				"Content-Type": "application/json",
				authorization: `Bearer ${token}`

			},

			body: JSON.stringify({

				username,
				changes

			})

		})).json();
		
		return result;

	}

	async deleteUser (token, username) {

		const result = await (await fetch(`${this.apiRoot}/update_user`, {

			method: "POST",

			headers: {

				"Content-Type": "application/json",
				authorization: `Bearer ${token}`

			},

			body: JSON.stringify({

				username,
				delete: true,
				changes: {}

			})

		})).json();
		
		return result;

	}

}
