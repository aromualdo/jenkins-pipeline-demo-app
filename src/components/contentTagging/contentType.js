/* global React */

import Dropdown from '../dropdown/dropdown';
import { ContentTypes } from '../../constants';
import styles from './contentTagging.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default React.createClass({
	propTypes: {
		contentType: React.PropTypes.string,
		setContentType: React.PropTypes.func.isRequired
	},

	selectContentType(contentType) {
		this.props.setContentType(contentType);
	},

	render() {
		const { contentType } = this.props;

		const contentTypeOptions = [
			ContentTypes.a,
			ContentTypes.b,
			ContentTypes.c
		].map(contentType => ({
			value: contentType,
			name: ContentTypes.getDisplayName(contentType)
		}));

		const options = [
			{ value: '', name: 'Please select...', disabled: true },
			...contentTypeOptions
		];

		return (
			<div className={cx('section')}>
				<div className={cx('section-header')}>Which type of content is this?</div>
				<Dropdown
					value={contentType || ''}
					options={options}
					onChange={this.selectContentType}
					className={cx('content-select')}
				/>
			</div>
		);
	}
});
