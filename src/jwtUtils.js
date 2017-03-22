export function getUser(charonToken) {
	const charonPayload = parseJWTPayload(charonToken);
	return charonPayload && charonPayload.userId;
}

function parseJWTPayload(jwt) {
	if(jwt) {
		const parts = jwt.split('.');
		if(parts.length === 3) {
			return JSON.parse(atob(parts[1]));
		} else {
			console.error('User JWT is malformed, expecting three parts but found ' + parts.length); // eslint-disable-line no-console
		}
	}

	return null;
}
