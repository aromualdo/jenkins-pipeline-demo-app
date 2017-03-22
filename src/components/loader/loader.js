/*global React */

import styles from './loader.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default React.createClass({
	render() {
		return (
			<span className={cx('loader-icon')}/>
		);
	}
});
