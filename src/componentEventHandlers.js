export let onAuthError = () => {};

export function init(props={}) {
	if(props.onAuthError) {
		onAuthError = props.onAuthError;
	}
}
