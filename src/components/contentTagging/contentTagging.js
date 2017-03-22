/* global React */

import Group from '../group/group';
import ContentType from './contentType';
import ExpirationDate from './expirationDate';
import SubType from './subType';
import moment from 'moment';
import { ContentTypes } from '../../constants';
import { setContentType, setSubType, setExpirationDate } from '../../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export const ContentTaggingComponent = React.createClass({
	propTypes: {
		contentType: React.PropTypes.string,
		subType: React.PropTypes.string,
		expirationDate: React.PropTypes.instanceOf(moment),
		setExpirationDate: React.PropTypes.func.isRequired,
		setContentType: React.PropTypes.func.isRequired,
		setSubType: React.PropTypes.func.isRequired
	},

	render() {
		const { contentType, subType, setContentType, setSubType, expirationDate, setExpirationDate } = this.props;

		const expirationDateElement = contentType === ContentTypes.a && (
			<ExpirationDate expirationDate={expirationDate} setExpirationDate={setExpirationDate}/>
		);

		const subTypeElement = contentType === ContentTypes.a && (
			<SubType subType={subType} setSubType={setSubType}/>
		);

		return (
			<Group title="Content Tagging">
				<ContentType contentType={contentType} setContentType={setContentType}/>
				{expirationDateElement}
				{subTypeElement}
			</Group>
		);
	}
});

export default connect(
	(state) => {
		const { contentType, subType, expirationDate } = state.contentTagging;
		return { contentType, subType, expirationDate: expirationDate && moment.utc(expirationDate) };
	},
	(dispatch) => bindActionCreators({ setContentType, setSubType, setExpirationDate }, dispatch)
)(ContentTaggingComponent);
