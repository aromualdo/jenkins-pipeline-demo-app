export const StatusCodes = {
	ok: 200,
	created: 201,
	noContent: 204,
	badRequest: 400,
	unauthorized: 401,
	notFound: 404,
	conflict: 409,
	isServerError(errorCode) {
		return errorCode && errorCode >= 500;
	}
};

export const Platforms = {
	twitter: 'twitter',
	facebook: 'facebook',
	instagram: 'instagram',

	getDisplayName(platform) {
		switch (platform) {
			case this.twitter:
				return 'Twitter';
			case this.facebook:
				return 'Facebook';
			case this.instagram:
				return 'Instagram';
			default:
				return platform;
		}
	},

	getCharacterLimit(platform) {
		switch (platform) {
			case this.twitter:
				return 140;
			case this.facebook:
				return 63206;
			case this.instagram:
				return 2200;
			default:
				return 140;
		}
	}
};

export const ContentTypes = {
	a: 'A_CONTENT',
	b: 'B_CONTENT',
	c: 'C_CONTENT',

	getDisplayName(contentType) {
		switch(contentType) {
			case this.a:
				return '"A" content';
			case this.b:
				return '"B" content';
			case this.c:
				return '"C" content';
			default:
				return contentType;
		}
	}
};

export const SubTypes = {
	standard: 'STANDARD',
	businessOperations: 'BUSINESS_OPERATIONS',
	event: 'EVENT',
	discountsCoupons: 'DISCOUNTS_COUPONS',

	getDisplayName(subType) {
		switch(subType) {
			case this.standard:
				return 'Standard';
			case this.businessOperations:
				return 'Business Operations';
			case this.event:
				return 'Event';
			case this.discountsCoupons:
				return 'Discounts / Coupons';
			default:
				return subType;
		}
	}
};

export const timeStringFormat = 'YYYY-MM-DD hh:mm:ss a';
