/* global describe, it */

import expect from 'expect';
import { createPostApiObject, isValidPost } from './selectors';
import { Platforms, ContentTypes, SubTypes } from '../constants';

describe('Selectors', () => {
	describe('createPostApiObject', () => {
		const completeState = {
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
				contentType: ContentTypes.a,
				subType: SubTypes.businessOperations,
				expirationDate: '1970-01-01T00:00:00-06:00'
			},
			mediaUrl: '11111111-1111-1111-1111-111111111111',
			compositionId: '00000000-0000-0000-0000-000000000000',
			publishTimestamp: '1970-01-01T00:00:00-06:00',
			captions: {
				[Platforms.twitter]: null,
				[Platforms.facebook]: null,
				[Platforms.instagram]: null
			},
			location: {
				id: 3233
			}
		};

		it('should convert attributes of captions object to lowercase', () => {
			const post = createPostApiObject(completeState);
			Object.keys(post.captions).forEach(key => {
				expect(key).toEqual(key.toLowerCase());
			});
		});

		it('should convert publishTime to UTC', () => {
			const post = createPostApiObject(completeState);
			expect(post.publishTime).toBe('1970-01-01T06:00:00Z');
		});

		it('should convert expirationDate to UTC', () => {
			const post = createPostApiObject(completeState);
			expect(post.tags.expirationDate).toBe('1970-01-01T06:00:00Z');
		});
	});

	describe('isValidPost', () => {
		const validPost = {
			enabledPlatforms: [ 'TWITTER', 'FACEBOOK', 'INSTAGRAM' ],
			captions: {
				twitter: 'twitter',
				facebook: 'facebook',
				instagram: 'instagram'
			},
			publishTime: '1970-01-01T00:00:00Z',
			tags: {
				contentType: 'A_CONTENT',
				contentSubType: 'STANDARD',
				expirationDate: '1970-01-01T00:00:00Z'
			},
			compositionId: '00000000-0000-0000-0000-000000000000',
			mediaId: '11111111-1111-1111-1111-111111111111'
		};

		function testCharacterLimit(platform) {
			it(`should return false if caption for ${platform} is over max character limit`, () => {
				const maxChar = Platforms.getCharacterLimit(Platforms[platform]);
				const caption = Array(maxChar + 5).join('a');

				const invalidPost = Object.assign({}, validPost, { captions: { [platform]: caption }  });
				expect(isValidPost(invalidPost)).toBe(false);
			});
		}

		it('should return true on a valid post', () => {
			expect(isValidPost(validPost)).toBe(true);
		});

		it('should return false if no platforms are enabled', () => {
			const invalidPost = Object.assign({}, validPost, { enabledPlatforms: [] });
			expect(isValidPost(invalidPost)).toBe(false);
		});

		it('should return false if any enabled platform is missing a caption', () => {
			const invalidPost = Object.assign({}, validPost, {
				captions: {
					twitter: 'twitter',
					facebook: 'facebook',
					instagram: ''
				}
			});
			expect(isValidPost(invalidPost)).toBe(false);
		});

		it('should return false if no contentType is selected', () => {
			const invalidPost = Object.assign({}, validPost, {
				tags: {
					contentType: null
				}
			});
			expect(isValidPost(invalidPost)).toBe(false);
		});

		it('should return false if contentType is A_CONTENT but subType is not set', () => {
			const invalidPost = Object.assign({}, validPost, {
				tags: {
					contentType: ContentTypes.a,
					contentSubType: null
				}
			});
			expect(isValidPost(invalidPost)).toBe(false);
		});

		testCharacterLimit(Platforms.twitter);
		testCharacterLimit(Platforms.facebook);
		testCharacterLimit(Platforms.instagram);
	});
});
