# Song viewer

This is a React Native app to showcase some react native components and how to use them. It is a simple app that you can use to load a song and play it. It is not a music player, it is just a song viewer and analyzer. After you load a song, you can see the pitch (frequencies) of the song.

## API dependencies

This app uses an API created using [fastify](https://github.com/fastify) to get the song data. You can find the API [here](https://github.com/lasmil/song-viewer-service)

- you might need to ask for permission to view the repo

## Dev

In order to get this running you'll need to install the dependencies:

```bash
npm install
```

Then you can run the app:

```bash
npm start
```

To run the app on an Android or iOS device, you'll need to have an Android emulator running or a device connected via USB. You can run the following command to run the app on the connected device:

```bash
npm run android
```
and for iOS:

```bash
npm run ios
```


This will start up the Metro bundler, and the iOS & Android emulators, and enable hot-reload in the apps for you to dev against.

### Testing

This project uses [React Native Testing Library](https://github.com/callstack/react-native-testing-library) to test the components. You can find the tests in the `src/__tests__` folder. To run the tests, you can run:

```bash
npm test
```

We also use [detox](https://wix.github.io/Detox/) to run e2e tests. You can find the tests in the `e2e` folder. To run the tests, you can run:

For Android:

```bash
npm run e2e:android
```

For iOS:

```bash
npm run e2e:ios
```
Follow the guide in the detox docs to setup the environment for the tests.

Once you have the environment setup, you will need to generate an `app bundle` (for android) and an `app file` for iOS. You can do this by running:

For Android:
```bash
npm run build_android_bundle_debug
```
For iOS:

```bash
npm run build_ios_app_debug
```

<b>Note</b> for iOS: currently the .app file is generated in your home directory. Copy the path to it and update the `.detoxrc.js` file. Search for '<path to generated .app file>' and replace it with the path to the generated .app file.

## Designs and other resources

Designs are available in Figma [here](https://www.figma.com/file/cES8U6tug2xYFymuISaPBT/Untitled?node-id=0%3A1).
You might need to create an account to access them or ask for access.

## Future work

- Investigate how to use [react-native-audio-video-tools](https://github.com/PatrissolJuns/react-native-audio-video-tools) - this can come in handy to cut the song and send it to the API (instead of sending the whole song)
- Use detox tests in the build process - this will help us to make sure the app is working as expected; we should also find a way to use detox without having the user to select an mp3 file (maybe we can use a mock file)
- Add more tests

## Contributing

If you want to contribute to this project feel free to open a PR. If you want to discuss something, open an issue.

## License

This project is licensed under the terms of the [MIT license](https://mit-license.org/).
