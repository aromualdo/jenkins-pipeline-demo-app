const package = require('../package.json');
const aws = require('aws-sdk');
const tar = require('tar-fs');
const zlib = require('zlib');
const streamToPromise = require('stream-to-promise');

const s3 = new aws.S3({
	endpoint: 'https://s3-external-1.amazonaws.com/'
});

const project = package.name.replace('@mainstreethub/', '');
const version = package.version;
const artifactName = project + '-' + version;
const artifactFileName = artifactName + '.tar.gz';

const bucket = 'artifacts.mainstreethub.com';
const key = 'js/' + project + '/' + artifactFileName;

const log = (text) => {
	const now = new Date().toLocaleString();
	console.log(now, '-', text);
};

const logError = (text) => {
	log(text);
};

const logDone = () => {
	log('Done');
};

const verifyArtifactDoesNotExist = () => {
	log('Verifying artifact doesn\'t already exist...');

	return s3.listObjectsV2({
		Bucket: bucket,
		Prefix: key
	}).promise().then((data) => {
		if (data.KeyCount) {
			throw 'Artifact for version ' + version + ' already found.  Aborting upload';
		}
		logDone();
	});
};

const packageArtifact = () => {
	log('Archiving artifacts into ' + artifactFileName + '...');

	const map = header => Object.assign({}, header, { name: artifactName + '/' + header.name });

	return streamToPromise(
		tar.pack(path, { map })
			.pipe(zlib.createGzip())
	).then((stream) => {
		logDone();
		return stream;
	});
};

const uploadToS3 = (stream) => {
	log('Pushing ' + artifactFileName + ' to s3://artifacts.mainstreethub.com...');

	return s3.putObject({
		Bucket: bucket,
		Key: key,
		Body: stream
	}).promise().then(() => {
		logDone();
	});
};

const path = process.argv[2];
log('Preparing to upload version ' + version + ' of ' + project);
verifyArtifactDoesNotExist()
	.then(packageArtifact)
	.then(uploadToS3)
	.catch((error) => {
		logError(error);
	});
