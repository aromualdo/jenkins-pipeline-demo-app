/*
	TODO: Update the config keys for their respective environments below
*/
export default function getSplitApiKeyByEnvironment(environment)
{
	if (environment === 'test') {
		return 'CONFIG_KEY_HERE';
	}
	else {
		return 'CONFIG_KEY_HERE';
	}
}
