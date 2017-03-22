/* global React */

import Group from '../group/group';
import PlatformOption from './platformOption';
import { Platforms } from '../../constants';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setPlatformSelected } from '../../redux/actions';

export const PlatformSelectionComponent = React.createClass({
	propTypes: {
		platforms: React.PropTypes.objectOf(React.PropTypes.shape({
			selected: React.PropTypes.bool.isRequired,
			remainingQuota: React.PropTypes.number
		})).isRequired,
		setPlatformSelected: React.PropTypes.func.isRequired
	},

	render() {
		const { platforms, setPlatformSelected } = this.props;

		const platformOptions = [
			Platforms.twitter,
			Platforms.facebook,
			Platforms.instagram
		].map(platformKey => {
			const platform = platforms[platformKey];
			return platform && (
				<PlatformOption
					key={platformKey}
					platform={platformKey}
					remainingQuota={platform.remainingQuota}
					selected={platform.selected}
					handlePlatformSelection={setPlatformSelected}
				/>
			);
		});

		return (
			<Group title="Platform">
				{platformOptions}
			</Group>
		);
	}
});

export default connect(
	(state) => ({
		platforms: state.platforms
	}),
	(dispatch) => bindActionCreators({ setPlatformSelected }, dispatch)
)(PlatformSelectionComponent);
