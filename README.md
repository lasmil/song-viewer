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

## Designs and other resources

Designs are available in Figma [here](https://www.figma.com/file/cES8U6tug2xYFymuISaPBT/Untitled?node-id=0%3A1).
You might need to create an account to access them or ask for access.

## Contributing

If you want to contribute to this project feel free to open a PR. If you want to discuss something, open an issue.

## License

This project is licensed under the terms of the [MIT license](https://mit-license.org/).
