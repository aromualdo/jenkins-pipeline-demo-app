/* global React */

import PostVisual from './postVisual/postVisual';
import Caption from './caption/caption';
import PlatformSelection from './platformSelection/platformSelection';
import PublishDateAndTime from './publishDateAndTime/publishDateAndTime';
import ContentTagging from './contentTagging/contentTagging';
import BottomBar from './bottomBar/bottomBar';
import Error from './error/error';
import styles from './scheduler.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Scheduler = React.createClass({

	propTypes: {
		mediaUrl: React.PropTypes.string,
		error: React.PropTypes.any,
		actions: React.PropTypes.shape({
			resetPostSelections: React.PropTypes.func.isRequired
		})
	},

	componentWillMount() {
		this.originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
	},

	componentWillUnmount() {
		document.body.style.overflow = this.originalOverflow;
	},

	render() {
		const { mediaUrl, error } = this.props;

		const errorComponent = error && (
			<Error message="Something went wrong and we couldn't save your changes at this time"/>
		);

		return (
			<div className={cx('modal')}>
				<div className={cx('modal-header')}>
					<div className={cx('h1')}>Publishing details</div>
				</div>
				{errorComponent}
				<div className={cx('flex')}>
					<div className={cx('flex-half')}>
						<PlatformSelection/>
						<Caption/>
						<PublishDateAndTime/>
						<ContentTagging/>
					</div>
					<div className={cx('flex-half')}>
						<PostVisual mediaUrl={mediaUrl} handleRecraft={()=>{ alert('aw yis'); }}/>
					</div>
				</div>
				<BottomBar/>
			</div>
		);
	}
});

export default Scheduler;
