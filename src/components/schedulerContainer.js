/* global React */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../redux/actions';
import Scheduler from './scheduler';

import styles from './scheduler.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const SchedulerContainer = React.createClass({
	render() {
		return (
			<div className={cx('modal-wrap')}>
				<Scheduler {...this.props}/>
			</div>
		);
	}
});

function mapStateToProps(state) {
	const {
		mediaUrl,
		api: { error }
	} = state;

	return { mediaUrl, error };
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulerContainer);
