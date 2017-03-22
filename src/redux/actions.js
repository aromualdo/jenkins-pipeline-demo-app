import * as actionTypes from './actionTypes';
import * as api from '../api';
import { createPostApiObject } from './selectors';
import store from './store';
import { getUser } from '../jwtUtils';

export function setConfig(config) {
	return { type: actionTypes.SET_CONFIG, config };
}

export function setCharonToken(token) {
	return { type: actionTypes.SET_CHARON_TOKEN, token, 'user': getUser(token) };
}

export function setPlatformSelected(platformKey, selected) {
	return { type: actionTypes.SET_PLATFORM_SELECTED, platformKey, selected };
}

export function setContentType(contentType) {
	return { type: actionTypes.SET_CONTENT_TYPE, contentType };
}

export function setSubType(subType) {
	return { type: actionTypes.SET_SUB_TYPE, subType };
}

export function setPublishTimestamp(timestamp) {
	return { type: actionTypes.SET_PUBLISH_TIMESTAMP, timestamp };
}

export function setExpirationDate(date) {
	return { type: actionTypes.SET_EXPIRATION_DATE, date };
}

export function setCaption(platform, caption) {
	return { type: actionTypes.SET_CAPTION, platform, caption };
}

export function setMediaUrl(url) {
	return { type: actionTypes.SET_MEDIA_URL, url };
}

export function setCompositionId(id) {
	return { type: actionTypes.SET_COMPOSITION_ID, id };
}

export function setAllPlatformsCaption(caption) {
	return { type: actionTypes.SET_ALL_PLATFORMS_CAPTION, caption };
}

export function setAllPlatformsChecked(checked) {
	return { type: actionTypes.SET_ALL_PLATFORMS_CHECKED, checked };
}

export function resetPostSelections() {
	return { type: actionTypes.RESET_POST_SELECTIONS };
}

function startSubmitNewPost() {
	return { type: actionTypes.START_SUBMIT_NEW_POST };
}

function successSubmitNewPost() {
	return { type: actionTypes.SUCCESS_SUBMIT_NEW_POST };
}

function errorSubmitNewPost(error) {
	return { type: actionTypes.ERROR_SUBMIT_NEW_POST, error };
}

export function submitNewPost() {
	return dispatch => {
		const post = createPostApiObject(store.getState());
		dispatch(startSubmitNewPost());
		return api.submitNewPost(post)
			.then(() => {
				dispatch(successSubmitNewPost());
			})
			.catch(error => {
				dispatch(errorSubmitNewPost(error));
			});
	};
}

export function setLocationId(id) {
	return { type: actionTypes.SET_LOCATION_ID, id };
}
