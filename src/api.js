import request from 'superagent';
import { StatusCodes } from './constants';
import { setCharonToken } from './redux/actions';
import store from './redux/store';
import * as stubs from './stubs';
import superagentMock from 'superagent-mock';
import { onAuthError } from './componentEventHandlers';

//todo - add response timeouts

function getBaseUrl() {
	const { environment } = store.getState().config;

	switch (environment) {
		case 'prod':
			return 'https://post-scheduler-api.mainstreethub.com';
		case 'test':
		default:
			return 'https://post-scheduler-api-test.mainstreethub.com';
	}
}

export function init() {
	const { stubApi } = store.getState().config;
	if(stubApi) {
		superagentMock(request, [
			{
				pattern: `${getBaseUrl()}/v1/submissions`,
				fixtures: () => {
					return stubs.apiResponse;
				},
				post: (match, data) => ({
					header: {},
					status: 201,
					body: data
				})
			}
		]);
	}
}

function updateAccessToken(response) {
	const accessToken = response.header['msh-access-token'];
	if(accessToken) {
		store.dispatch(setCharonToken(accessToken));
	}
}

function coerceErrorResponse(response) {
	return {
		message: response.body && response.body.message,
		status: response.status
	};
}

function handleResponse(error, response, resolve, reject) {
	if(!response) {
		reject(error);
	} else {
		let { status } = response;

		if (status === StatusCodes.unauthorized) {
			reject(coerceErrorResponse(response));
			onAuthError();
		} else {
			updateAccessToken(response);
			if (status === StatusCodes.noContent || status === StatusCodes.created) {
				resolve(null);
			} else if(status === StatusCodes.ok) {
				resolve(response.body);
			} else {
				reject(coerceErrorResponse(response));
			}
		}
	}
}

// eslint-disable-next-line no-unused-vars
function get(endpoint) {
	return new Promise(function (resolve, reject) {
		request
			.get(endpoint)
			.set('Authorization', 'Bearer ' + store.getState().user.charonToken)
			.end((error, response) => {
				handleResponse(error, response, resolve, reject);
			});
	});
}

function postJson(endpoint, data) {
	return new Promise((resolve, reject) => {
		request
			.post(endpoint)
			.set('Authorization', 'Bearer ' + store.getState().user.charonToken)
			.set('Content-Type', 'application/json')
			.send(JSON.stringify(data))
			.end((error, response) => {
				handleResponse(error, response, resolve, reject);
			});
	});
}

export function submitNewPost(post) {
	return postJson(`${getBaseUrl()}/v1/submissions`, post);
}
