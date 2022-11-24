import { device, element, by } from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: { notifications: 'YES', mediaLibrary: 'YES', photos: 'YES' },
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have a header with the app name', async () => {
    await expect(element(by.text('Song viewer'))).toBeVisible();
  });

  it('should show the settings icon which can also be tapped', async () => {
    await element(by.id('header-settings-button')).tap();
    await expect(element(by.text('Settings'))).toBeVisible();
    await element(by.id('header-settings-button')).tap();
    await expect(element(by.text('Song viewer'))).toBeVisible();
  });

  it('should show the Choose File button which when tapped opens the file picker and selects the first available mp3 file', async () => {
    await element(by.id('choose-file-button')).tap();
    await expect(element(by.id('audio-player'))).toBeVisible();
    await expect(element(by.id('frequency-chart'))).toBeVisible();
  });
});
