/* global React */

import Button from '../button/button';
import { submitNewPost, resetPostSelections } from '../../redux/actions';
import { createPostApiObject, isValidPost } from '../../redux/selectors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './bottomBar.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export const BottomBarComponent = React.createClass({
	propTypes: {
		resetPostSelections: React.PropTypes.func.isRequired,
		submitNewPost: React.PropTypes.func.isRequired,
		waitingForResponse: React.PropTypes.bool.isRequired,
		isValidPost: React.PropTypes.bool.isRequired
	},

	getInitialState() {
		return {};
	},

	cancel() {
		this.props.resetPostSelections();
	},

	render() {
		return (
			<div className={cx('bottom-bar')}>
				<div className={cx('left')}>
					<div onClick={this.cancel} className={cx('text-action')}>Cancel</div>
				</div>
				<div className={cx('right')}>
					<Button
						label="Submit"
						onClick={this.props.submitNewPost}
						isLoading={this.props.waitingForResponse}
						disabled={!this.props.isValidPost}
					/>
				</div>
			</div>
		);
	}
});


export default connect(
	(state) => ({
		isValidPost: isValidPost(createPostApiObject(state)),
		waitingForResponse: state.api.waitingForResponse,
		apiError: state.api.error
	}),
	(dispatch) => bindActionCreators({ submitNewPost, resetPostSelections }, dispatch)
)(BottomBarComponent);

