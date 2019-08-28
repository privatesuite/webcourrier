class JSONMI {

	constructor (apiRoot) {

		this.apiRoot = apiRoot;

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

}
