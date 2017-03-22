/* global describe, it */

import expect from 'expect';
import * as actionTypes from './actionTypes';
import moment from 'moment';
import defaultConfig from '../defaultConfig';
import {
	initialState,
	config,
	user,
	mediaUrl,
	platforms,
	compositionId,
	contentTagging,
	captions,
	publishTimestamp,
	api,
	location
} from './reducers';
import { Platforms, ContentTypes, SubTypes } from '../constants';

describe('Reducers', () => {
	describe('config', () => {
		it('should initialize to the default values in `config`', () => {
			expect(config(undefined, {})).toEqual(defaultConfig);
		});

		it('only overrides specified values when `SET_CONFIG` action fires', () => {
			const state = {
				environment: 'test',
				stubApi: false
			};

			const action = {
				type: actionTypes.SET_CONFIG,
				config: { stubApi: true }
			};

			const expected = {
				environment: 'test',
				stubApi: true
			};

			expect(config(state, action)).toEqual(expected);
		});
	});

	describe('user', () => {
		it('should initialize to default value', () => {
			expect(user(undefined, {})).toEqual({
				charonToken: null,
				userId: null
			});
		});

		it('should update `charonToken` when `SET_CHARON_TOKEN` action is fired', () => {
			const charonToken = 'token';
			const userId = '1';

			const action = {
				type: actionTypes.SET_CHARON_TOKEN,
				token: charonToken,
				user: userId
			};

			expect(user(undefined, action)).toEqual({
				charonToken,
				userId
			});
		});
	});

	describe('mediaUrl', () => {
		it('should set mediaUrl to null when RESET_POST_SELECTIONS is fired', () => {
			const state = { mediaUrl: 'coolpicUrl.com' };
			const actual = mediaUrl(state, { type: actionTypes.RESET_POST_SELECTIONS });
			expect(actual).toBe(initialState.mediaUrl);
		});
	});

	describe('captions', () => {
		it('should set the caption for the specific platform when SET_CAPTION is fired', () => {
			const caption = 'This is the caption for twitter';
			const action = {
				type: actionTypes.SET_CAPTION,
				caption,
				platform: Platforms.twitter
			};

			const state = {
				allPlatforms: true,
				[Platforms.twitter]: 'twitter',
				[Platforms.facebook]: 'facebook',
				[Platforms.instagram]: 'instagram'
			};

			const expectedCaptions = {
				allPlatforms: true,
				[Platforms.twitter]: caption,
				[Platforms.facebook]: 'facebook',
				[Platforms.instagram]: 'instagram'
			};

			expect(captions(state, action)).toEqual(expectedCaptions);
		});

		it('should clear out the caption if a platform is deselected when SET_PLATFORM_SELECTED is fired', () => {
			const action = {
				type: actionTypes.SET_PLATFORM_SELECTED,
				platformKey: Platforms.twitter,
				selected: false
			};

			const state = {
				[Platforms.twitter]: 'twitter',
				[Platforms.facebook]: 'facebook',
				[Platforms.instagram]: 'instagram'
			};

			const expectedCaptions = {
				[Platforms.twitter]: null,
				[Platforms.facebook]: 'facebook',
				[Platforms.instagram]: 'instagram'
			};

			expect(captions(state, action)).toEqual(expectedCaptions);
		});

		it('should set all captions to the provided caption when SET_ALL_PLATFORMS_CAPTION is fired', () => {
			const caption = 'This is the caption for all platforms';
			const action = {
				type: actionTypes.SET_ALL_PLATFORMS_CAPTION,
				caption
			};

			const expectedCaptions = {
				allPlatforms: true,
				[Platforms.twitter]: caption,
				[Platforms.facebook]: caption,
				[Platforms.instagram]: caption
			};

			expect(captions(undefined, action)).toEqual(expectedCaptions);
		});

		it('should reset all captions to null and allPlatforms flag to true when RESET_POST_SELECTIONS is fired', () => {
			const state = {
				allPlatforms: true,
				twitter: 'Great tweet',
				facebook: 'Great face',
				instagram: 'Great gram'
			};
			const actual = captions(state, { type: actionTypes.RESET_POST_SELECTIONS });
			Object.keys(actual).forEach(key => { expect(actual[key]).toBe(initialState.captions[key]); });
		});
	});

	describe('platforms', () => {
		it('should initialize to select all 3 platforms', () => {
			expect(platforms(undefined, {})[Platforms.facebook].selected).toBe(true);
			expect(platforms(undefined, {})[Platforms.instagram].selected).toBe(true);
			expect(platforms(undefined, {})[Platforms.twitter].selected).toBe(true);
		});

		it('should update the appropriate platform when SET_PLATFORM_SELECTED is fired', () => {
			const state = {
				facebook: {
					selected: false,
					remainingQuota: null
				},
				twitter: {
					selected: false,
					remainingQuota: null
				}
			};

			const action = {
				type: actionTypes.SET_PLATFORM_SELECTED,
				platformKey: 'twitter',
				selected: true
			};

			const result = platforms(state, action);

			expect(result.facebook.selected).toBe(false);
			expect(result.twitter.selected).toBe(true);
		});

		it('should reset all platforms to initial state if RESET_POST_SELECTIONS is fired', () => {
			const state = {
				facebook: { selected: false },
				twitter: { selected: false },
				instagram: { selected: false }
			};

			const actual = platforms(state, { type: actionTypes.RESET_POST_SELECTIONS });
			Object.keys(actual).forEach(platform => { expect(actual[platform].selected).toBe(initialState.platforms[platform].selected); });
		});
	});

	describe('mediaUrl', () => {
		it('should initialize to falsey value', () => {
			expect(mediaUrl(undefined, {})).toNotExist();
		});

		it('should return the url associated with a SET_MEDIA_URL action', () => {
			const url = 'http://test.com';
			const action = { type: actionTypes.SET_MEDIA_URL, url };
			expect(mediaUrl(undefined, action)).toEqual(url);
		});

		it('should accept and handle an undefined value with SET_MEDIA_URL action', () => {
			const action = { type: actionTypes.SET_MEDIA_URL, url: undefined };
			expect(mediaUrl('old-media', action)).toBe(null);
		});
	});

	describe('compositionId', () => {
		it('should initialize to falsey value', () => {
			expect(compositionId(undefined, {})).toNotExist();
		});

		it('should return the id associated with a SET_COMPOSITION_ID action', () => {
			const id = '1234-567-890';
			const action = { type: actionTypes.SET_COMPOSITION_ID, id };
			expect(compositionId(undefined, action)).toEqual(id);
		});

		it('should accept and handle an undefined value with SET_COMPOSITION_ID action', () => {
			const action = { type: actionTypes.SET_COMPOSITION_ID, url: undefined };
			expect(compositionId('old-composition-id', action)).toBe(null);
		});
	});

	describe('contentTagging', () => {
		it('should initialize contentType to empty value', () => {
			expect(contentTagging(undefined, {}).contentType).toNotExist();
		});

		it('should initialize subType to empty value', () => {
			expect(contentTagging(undefined, {}).subType).toNotExist();
		});

		it('should update contentType when SET_CONTENT_TYPE is fired', () => {
			const state = {
				contentType: 'currentContentType'
			};

			const contentType = 'newContentType';

			const action = {
				type: actionTypes.SET_CONTENT_TYPE,
				contentType
			};

			expect(contentTagging(state, action).contentType).toBe(contentType);
		});

		it('should clear subType when SET_CONTENT_TYPE is fired and contentType is not A content', () => {
			const state = {
				contentType: ContentTypes.a,
				subType: SubTypes.businessOperations
			};

			const contentType = ContentTypes.b;

			const action = {
				type: actionTypes.SET_CONTENT_TYPE,
				contentType
			};

			expect(contentTagging(state, action).subType).toNotExist();
		});

		it('should update subType when SET_SUB_TYPE action is fired', () => {
			const state = {
				subType: 'currentContentType'
			};

			const subType = 'newSubType';

			const action = {
				type: actionTypes.SET_SUB_TYPE,
				subType
			};

			expect(contentTagging(state, action).subType).toBe(subType);
		});

		it('should update expirationDate when SET_EXPIRATION_DATE is fired', () => {
			const date = '2011-02-03';
			const dateUTC = moment.utc(date).format();
			const action = { type: actionTypes.SET_EXPIRATION_DATE, date };
			expect(contentTagging(initialState.contentTagging, action).expirationDate).toBe(dateUTC);
		});

		it('should reset all tagging settings to default when RESET_POST_SELECTIONS is fired', () => {
			const state = {
				contentType: 'a',
				expirationDate: 'tomorrow',
				subType: 'coolContent'
			};
			const actual = contentTagging(state, { type: actionTypes.RESET_POST_SELECTIONS });
			Object.keys(actual).forEach(key => { expect(actual[key]).toBe(initialState.contentTagging[key]); });
		});
	});

	describe('publishTimestamp', () => {
		it('should initialize to a valid timestamp', () => {
			expect(moment(publishTimestamp(undefined, {})).isValid()).toBe(true);
		});

		it('should return the id associated with a SET_PUBLISH_TIMESTAMP action', () => {
			const timestamp = '1970-01-01T00:00:00Z';
			const action = { type: actionTypes.SET_PUBLISH_TIMESTAMP, timestamp };
			expect(publishTimestamp(undefined, action)).toEqual(timestamp);
		});
	});

	describe('api', () => {
		it('should initialize to not waitingForResponse and no error', () => {
			expect(api(undefined, {})).toEqual({
				waitingForResponse: false,
				error: null
			});
		});

		it('should clear out error and set waitingForResponse to true when START_SUBMIT_NEW_POST is fired', () => {
			const state = {
				waitingForResponse: false,
				error: 'some sort of error'
			};
			const action = { type: actionTypes.START_SUBMIT_NEW_POST };
			expect(api(state, action)).toEqual({
				waitingForResponse: true,
				error: null
			});
		});

		it('should set waitingForResponse to false when SUCCESS_SUBMIT_NEW_POST is fired', () => {
			const state = {
				waitingForResponse: true,
				error: null
			};
			const action = { type: actionTypes.SUCCESS_SUBMIT_NEW_POST };
			expect(api(state, action)).toEqual({
				waitingForResponse: false,
				error: null
			});
		});

		it('should set waitingForResponse to false and set error when ERROR_SUBMIT_NEW_POST is fired', () => {
			const error = 'This is some sort of error...';
			const state = {
				waitingForResponse: true,
				error: null
			};
			const action = { type: actionTypes.ERROR_SUBMIT_NEW_POST, error };
			expect(api(state, action)).toEqual({
				waitingForResponse: false,
				error
			});
		});
	});

	describe('location', () => {
		it('should initialize to an object, regardless of its contents', () => {
			expect(typeof location(undefined, {}) === 'object').toBe(true);
		});

		it('should update the locationId when SET_LOCATION_ID is fired', () => {
			const id = '3233';
			const action = { type: actionTypes.SET_LOCATION_ID, id };
			expect(location(undefined, action).id).toBe(id);
		});
	});
});
