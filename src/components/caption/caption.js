/* global React */

import Group from '../group/group';
import { Platforms } from '../../constants';
import PlatformCaption from './platformCaption';
import { getSelectedPlatforms, getAllPlatformsCaption } from '../../redux/selectors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCaption, setAllPlatformsCaption, setAllPlatformsChecked } from '../../redux/actions';
import styles from './caption.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export const Caption = React.createClass({
	propTypes: {
		captions: React.PropTypes.shape({
			allPlatforms: React.PropTypes.bool,
			twitter: React.PropTypes.string,
			facebook: React.PropTypes.string,
			instagram: React.PropTypes.string
		}).isRequired,
		setCaption: React.PropTypes.func.isRequired,
		selectedPlatforms: React.PropTypes.array.isRequired,
		allPlatformsCaption: React.PropTypes.string.isRequired,
		setAllPlatformsCaption: React.PropTypes.func.isRequired,
		setAllPlatformsChecked: React.PropTypes.func.isRequired
	},

	handleCheckbox(checked) {
		const { allPlatformsCaption, setAllPlatformsCaption, setAllPlatformsChecked } = this.props;
		setAllPlatformsChecked(checked);
		if(checked) {
			setAllPlatformsCaption(allPlatformsCaption);
		}
	},

	displayCaptions() {
		const { selectedPlatforms, captions, setCaption } = this.props;

		const platformCaptions = selectedPlatforms.map(platform =>
			<PlatformCaption
				maxChar={Platforms.getCharacterLimit(platform)}
				key={platform}
				caption={captions[platform]}
				platform={platform}
				handleChange={setCaption.bind(null, platform)}/>
		);

		return <div>{platformCaptions}</div>;
	},

	render() {
		const { allPlatformsCaption, setAllPlatformsCaption, captions: { allPlatforms } } = this.props;
		const allPlatformTextArea = (
			<div className={cx('multi-platform-caption')}>
				<PlatformCaption
					maxChar={Platforms.getCharacterLimit(Platforms.twitter)}
					caption={allPlatformsCaption}
					handleChange={setAllPlatformsCaption}
				/>
			</div>
		);

		return (
			<Group title="Caption">
				<label className={cx('checkbox')}>
					<input type="checkbox" checked={allPlatforms} onChange={e => this.handleCheckbox(e.target.checked)}/>
					Use same caption for all platforms
				</label>
				{ allPlatforms ? allPlatformTextArea : this.displayCaptions() }
			</Group>
		);
	}
});

export default connect(
	(state) => ({
		captions: state.captions,
		selectedPlatforms: getSelectedPlatforms(state),
		allPlatformsCaption: getAllPlatformsCaption(state)
	}),
	(dispatch) => bindActionCreators({ setCaption, setAllPlatformsCaption, setAllPlatformsChecked }, dispatch)
)(Caption);
