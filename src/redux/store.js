import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { config, user, platforms, contentTagging, mediaUrl, compositionId, publishTimestamp, captions, api, location } from './reducers';

const newStore = () => {
	return createStore(
		combineReducers({
			config,
			user,
			platforms,
			contentTagging,
			mediaUrl,
			publishTimestamp,
			captions,
			api,
			compositionId,
			location
		}),
		compose(
			window.devToolsExtension ? window.devToolsExtension() : f => f
		),
		applyMiddleware(thunk, createLogger())
	);
};

export default newStore();
