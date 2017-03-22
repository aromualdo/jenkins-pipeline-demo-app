/* global React */

import { Provider } from 'react-redux';
import store from './redux/store';
import { setConfig, setCharonToken, setMediaUrl, setLocationId, setCompositionId } from './redux/actions';
import SchedulerContainer from './components/schedulerContainer';
import { init as initApi } from './api';
import { init as initEventHandlers } from './componentEventHandlers';

const SchedulerComponent = React.createClass({
	propTypes: {
		config: React.PropTypes.shape({
			environment: (props, propName, componentName) => {
				const propValue = props[propName];
				if(propValue && !/test|prod/.test(propValue)) {
					return new Error(
						'Invalid prop `' + propName +
						'` supplied to `' + componentName +
						'`.  Should be either `test` or `prod`'
					);
				}
			},
			useStubs: React.PropTypes.bool
		}),
		charonToken: React.PropTypes.string.isRequired,
		onAuthError: React.PropTypes.func,
		analyticsProps: React.PropTypes.object,
		locationId: React.PropTypes.string.isRequired,
		mediaUrl: React.PropTypes.string,
		compositionId: React.PropTypes.string
	},

	componentWillMount() {
		const { config, charonToken, locationId, mediaUrl, compositionId } = this.props;
		store.dispatch(setConfig(config));
		this.setCharonToken(charonToken);
		initApi();
		initEventHandlers(this.props);

		store.dispatch(setLocationId(locationId));
		store.dispatch(setMediaUrl(mediaUrl));
		store.dispatch(setCompositionId(compositionId));
	},

	componentWillReceiveProps(nextProps) {
		const {
			charonToken: oldToken,
			mediaUrl: oldMediaUrl
		} = this.props;

		const {
			charonToken: newToken,
			mediaUrl: newMediaUrl
		} = nextProps;

		if(oldToken !== newToken) {
			this.setCharonToken(newToken);
		}

		if(oldMediaUrl !== newMediaUrl) {
			store.dispatch(setMediaUrl(newMediaUrl));
		}
	},

	setCharonToken(token) {
		store.dispatch(setCharonToken(token));
	},

	render() {
		return (
			<Provider store={store}>
				<SchedulerContainer />
			</Provider>
		);
	}
});

export default SchedulerComponent;
