/* global React, ReactDOM, $SIDEBAR */

import './globals';
import SchedulerComponent from '../src/schedulerComponent';

$SIDEBAR.init({
	container: '.sidebar',
	onAuthChange: function (user) {
		const target = document.getElementById('app');
		if(Object.keys(user).length && user.charonToken) {
			const analyticsProps = {
				sessionId: '12345',
				url: 'fake-identity.com',
				user: {
					id: '09876',
					name: 'Jon Doe',
					roles: [ 'Brand Planner' ]
				},
				location: {
					id: '78901',
					name: 'Jons Fake Pizza',
					identityUrl: 'fake-identity.com/identity/78901'
				}
			};

			ReactDOM.render(
				<SchedulerComponent
					charonToken={user.charonToken}
					config={{ environment: 'test', sendAnalytics: false }}
					analyticsProps={ analyticsProps }
					mediaUrl="https://placekitten.com/g/640/640"
					locationId="3233"
				/>,
				target
			);
		} else {
			ReactDOM.render(<div>Please log in</div>, target);
		}
	}
});
