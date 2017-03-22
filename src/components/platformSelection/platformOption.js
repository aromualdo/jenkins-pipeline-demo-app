/* global React */

import { Platforms } from '../../constants';
import styles from './platformOption.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default React.createClass({
	propTypes: {
		platform: React.PropTypes.string.isRequired,
		remainingQuota: React.PropTypes.number,
		selected: React.PropTypes.bool.isRequired,
		handlePlatformSelection: React.PropTypes.func.isRequired
	},

	render() {
		const { platform, remainingQuota, selected, handlePlatformSelection } = this.props;

		const quotaElement = Number.isInteger(remainingQuota) && (
			<span className={cx('quota')}> ({remainingQuota} posts remaining)</span>
		);

		return (
			<label className={cx('platform-option')}>
				<input type="checkbox" checked={selected} onChange={e => handlePlatformSelection(platform, e.target.checked)}/>
				<span className={cx('text--subheader')}> {Platforms.getDisplayName(platform)}</span>
				{quotaElement}
			</label>
		);
	}
});
