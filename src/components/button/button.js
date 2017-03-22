/* global React */

import Loader from '../loader/loader';
import styles from './button.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const IdentityButton = React.createClass({
	propTypes: {
		label: React.PropTypes.string.isRequired,
		onClick: React.PropTypes.func,
		isLoading: React.PropTypes.bool,
		disabled: React.PropTypes.bool
	},

	render() {
		const { label, onClick, isLoading, disabled } = this.props;

		const content = <div className={cx({ 'content--loading': isLoading })}>{label}</div>;
		const loader = isLoading && <Loader />;

		const classNames = cx('identity-button', {
			'identity-button--disabled': disabled
		});

		return (
			<button disabled={disabled || isLoading} className={classNames} onClick={onClick}>
				{content}
				{loader}
			</button>
		);
	}
});

export default IdentityButton;
