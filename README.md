# post-scheduler-ui

This is the UI for the post scheduler component.

```js
<Scheduler
	charonToken="asdf"			//required
	config={{
		environment: 'test'
	}}
	onAuthError={this.handleAuthError}
/>
```

## Setup Locally
For initial setup, the repository needs to be forked and cloned, and dependencies need to be installed using npm
and bower (package managers). To do so, visit the github repository page and fork the repo. Once forked, run the
following commands:

```bash
git clone git@github.com:YOUR_USER_NAME/post-scheduler-ui.git
cd post-scheduler-ui
npm install
```

## Development
We use npm as our task manager and webpack for our bundling and dev testing.  To run the app in development, use
the following command:

```bash
npm start
```

The application will be accessible at http://localhost:3000/, but if you're interested in having your updates
hotloaded, head to http://localhost:3000/webpack-dev-server/bundle.

## Deployment

There are two different ways of building the application.

### Standalone JS module

This build process bundles all of your javascript and css files in the `src` directory into a single JS component:

```bash
npm run build:component
```

This command will generate a `dist` directory with your component's JS file.

### Single page web application for testing

For deployment as a single page web app, we bundle our application into four distinct parts:

* `app.[hash].js` - The application JavaScript we write
* `vendor.[hash].js` - The external JavaScript libraries we depend on
* `styles.[hash].css` - The css file for our application
* `index.html` - The basic HTML we need to house our JavaScript app

To generate a `www` folder ready for deployment, run:

```bash
npm run build:site
```

This will generate the above files, plus source map files for the JavaScript and CSS files.  The build uses the `site` directory as an entry point for bundling your component into a single page app for testing and deployment.

### Build everything

Sometimes, you just want it all.  To build both the module and single page application:

```bash
npm run build
```
