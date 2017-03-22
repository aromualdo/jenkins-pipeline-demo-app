import * as actionTypes from './actionTypes';
import defaultConfig from '../defaultConfig';
import { Platforms, ContentTypes } from '../constants';
import { defaultPublishDateTime, convertTimestampToUTC } from '../components/publishDateAndTime/dateTimeUtils';

export const initialState = {
	config: defaultConfig,

	user: {
		charonToken: null,
		userId: null
	},

	platforms: {
		[Platforms.twitter]: {
			selected: true
		},
		[Platforms.facebook]: {
			selected: true
		},
		[Platforms.instagram]: {
			selected: true
		}
	},

	contentTagging: {
		contentType: null,
		subType: null,
		expirationDate: null
	},

	mediaUrl: null,

	compositionId: null,

	publishTime: defaultPublishDateTime(),

	captions: {
		allPlatforms: true,
		[Platforms.twitter]: null,
		[Platforms.facebook]: null,
		[Platforms.instagram]: null
	},

	api: {
		waitingForResponse: false,
		error: null
	},

	location: {
		id: null
	}
};

export function config(state=initialState.config, action) {
	switch(action.type) {
		case actionTypes.SET_CONFIG:
			return Object.assign({}, state, action.config);
		default:
			return state;
	}
}

export function user(state=initialState.user, action) {
	switch(action.type) {
		case actionTypes.SET_CHARON_TOKEN:
			return Object.assign({}, state, { charonToken: action.token, userId: action.user });
		default:
			return state;
	}
}

export function platforms(state=initialState.platforms, action) {
	switch(action.type) {
		case actionTypes.SET_PLATFORM_SELECTED:
			return Object.assign({}, state, {
				[action.platformKey]: platform(state[action.platformKey], action)
			});
		case actionTypes.RESET_POST_SELECTIONS:
			return initialState.platforms;
		default:
			return state;
	}
}

export function mediaUrl(state=initialState.mediaUrl, action) {
	switch(action.type) {
		case actionTypes.SET_MEDIA_URL:
			return action.url || null;
		case actionTypes.RESET_POST_SELECTIONS:
			return initialState.mediaUrl;
		default:
			return state;
	}
}

export function compositionId(state=initialState.compositionId, action) {
	switch(action.type) {
		case actionTypes.SET_COMPOSITION_ID:
			return action.id || null;
		default:
			return state;
	}
}

export function captions(state=initialState.captions, action) {
	switch(action.type) {
		case actionTypes.SET_ALL_PLATFORMS_CHECKED:
			return Object.assign({}, state, { allPlatforms: action.checked });
		case actionTypes.SET_CAPTION:
			return Object.assign({}, state, {
				[action.platform]: action.caption
			});
		case actionTypes.SET_PLATFORM_SELECTED:
			return !action.selected
				? Object.assign({}, state, { [action.platformKey]: null })
				: state;
		case actionTypes.SET_ALL_PLATFORMS_CAPTION:
			return Object.assign({}, state, {
				[Platforms.twitter]: action.caption,
				[Platforms.facebook]: action.caption,
				[Platforms.instagram]: action.caption
			});
		case actionTypes.RESET_POST_SELECTIONS:
			return initialState.captions;
		default:
			return state;
	}
}

function platform(state={}, action) {
	switch (action.type) {
		case actionTypes.SET_PLATFORM_SELECTED:
			return Object.assign({}, state, { selected: action.selected });
		default:
			return state;
	}
}

export function contentTagging(state=initialState.contentTagging, action) {
	switch(action.type) {
		case actionTypes.SET_CONTENT_TYPE:
			if(action.contentType !== ContentTypes.a) {
				return Object.assign({}, state, {
					contentType: action.contentType,
					expirationDate: null,
					subType: null
				});
			} else {
				return Object.assign({}, state, { contentType: action.contentType });
			}
		case actionTypes.SET_SUB_TYPE:
			return Object.assign({}, state, { subType: action.subType });
		case actionTypes.SET_EXPIRATION_DATE:
			return Object.assign({}, state, { expirationDate: action.date && convertTimestampToUTC(action.date) });
		case actionTypes.RESET_POST_SELECTIONS:
			return initialState.contentTagging;
		default:
			return state;
	}
}

export function publishTimestamp(state=initialState.publishTime, action) {
	switch (action.type) {
		case actionTypes.SET_PUBLISH_TIMESTAMP:
			return action.timestamp;
		case actionTypes.RESET_POST_SELECTIONS:
			return initialState.publishTime;
		default:
			return state;
	}
}

export function api(state=initialState.api, action) {
	switch(action.type) {
		case actionTypes.START_SUBMIT_NEW_POST:
			return Object.assign({}, state, {
				waitingForResponse: true,
				error: null
			});
		case actionTypes.SUCCESS_SUBMIT_NEW_POST:
			return Object.assign({}, state, { waitingForResponse: false });
		case actionTypes.ERROR_SUBMIT_NEW_POST:
			return Object.assign({}, state, {
				waitingForResponse: false,
				error: action.error
			});
		default:
			return state;
	}
}

export function location(state=initialState.location, action) {
	switch(action.type) {
		case actionTypes.SET_LOCATION_ID:
			return Object.assign({}, state, { id: action.id });
		default:
			return state;
	}
}
