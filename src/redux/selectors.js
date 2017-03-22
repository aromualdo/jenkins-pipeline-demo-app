import { convertTimestampToUTC } from '../components/publishDateAndTime/dateTimeUtils';
import { Platforms, ContentTypes } from '../constants';

export function getSelectedPlatforms(state) {
	return Object.keys(state.platforms).filter(platform => state.platforms[platform].selected);
}

export function getAllPlatformsCaption(state) {
	const { captions } = state;
	const selectedPlatforms = getSelectedPlatforms(state);
	const firstPlatformWithCaption = selectedPlatforms.find(platform => captions[platform]);
	return captions[firstPlatformWithCaption] || '';
}

export function createPostApiObject(state) {
	return {
		locationId: state.location.id,
		enabledPlatforms: getSelectedPlatforms(state).map(platform => platform.toUpperCase()),
		captions: {
			[Platforms.twitter]: state.captions[Platforms.twitter],
			[Platforms.facebook]: state.captions[Platforms.facebook],
			[Platforms.instagram]: state.captions[Platforms.instagram]
		},
		publishTime: convertTimestampToUTC(state.publishTimestamp),
		tags: {
			contentType: state.contentTagging.contentType,
			contentSubType: state.contentTagging.subType,
			expirationDate: convertTimestampToUTC(state.contentTagging.expirationDate)
		},
		compositionId: state.compositionId,
		//todo: change the interface of the component to take in mediaId and supply it here
		mediaId: '11111111-1111-1111-1111-111111111111'
	};
}

export function isValidPost(post) {
	// !! is to coerce this to a boolean
	return !!(
		post.enabledPlatforms.length
		&& post.enabledPlatforms.every(platform => post.captions[platform.toLowerCase()])
		&& post.tags.contentType
		&& (post.tags.contentType !== ContentTypes.a || post.tags.contentSubType)
		&& post.enabledPlatforms.every(platform => post.captions[platform.toLowerCase()].length <= Platforms.getCharacterLimit(platform.toLowerCase()))
	);
}
