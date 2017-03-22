/* global React */

import { SubTypes } from '../../constants';
import styles from './contentTagging.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default React.createClass({
	propTypes: {
		subType: React.PropTypes.string,
		setSubType: React.PropTypes.func.isRequired
	},

	selectSubType(e) {
		this.props.setSubType(e.target.value);
	},

	render() {
		const { subType: selectedSubType } = this.props;

		const subTypeOptions = [
			SubTypes.standard,
			SubTypes.businessOperations,
			SubTypes.event,
			SubTypes.discountsCoupons
		].map(subType => (
			<label className={cx('subtype-option')} key={subType}>
				<input
					type="radio"
					name="subtype"
					value={subType}
					onChange={this.selectSubType}
					checked={subType === selectedSubType}
					className={cx('subtype-option-input')}/>
				{ SubTypes.getDisplayName(subType) }
			</label>
		));

		return (
			<div className={cx('section')}>
				<div className={cx('section-header')}>Sub Type:</div>
				{subTypeOptions}
			</div>
		);
	}
});
