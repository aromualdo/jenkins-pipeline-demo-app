/* global React */
import styles from './group.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Group = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
		children: React.PropTypes.any
	},

	render() {
		const { title, children } = this.props;

		return (
			<div className={cx('group')}>
				<div className={cx('header')}>{title}</div>
				{children}
			</div>
		);
	}
});

export default Group;
