import { readFileSync } from 'fs';
import { join } from 'path';

import { badging2Json } from './index';

describe('badging2Json', () => {
  it('should be a function', () => {
    expect(badging2Json).toEqual(expect.any(Function));
  });

  describe('parse', () => {
    const debugDump: string = readFileSync(
      join(__dirname, '..', 'test', 'dump-badging-debug.txt')
    ).toString();

    const releaseDump: string = readFileSync(
      join(__dirname, '..', 'test', 'dump-badging-release.txt')
    ).toString();

    it('should parse debug dump', () => {
      const json = JSON.parse(badging2Json(debugDump));

      expect(json).toBeTruthy();
      expect(json.sdkVersion).toBe('21');
      expect(json.targetSdkVersion).toBe('28');
      expect(json.package.name).toBe('com.foo.bar');
      expect(json.package).toEqual({
        name: 'com.foo.bar',
        versionCode: '203',
        versionName: '0.2.3',
        platformBuildVersionName: '0.2.3',
        platformBuildVersionCode: '',
        compileSdkVersion: '28',
        compileSdkVersionCodename: '9'
      });

      expect(json['application-debuggable']).toBeNull();

      expect(json.densities).toEqual([
        '120',
        '160',
        '240',
        '320',
        '480',
        '640',
        '65535'
      ]);

      expect(json['uses-permission']).toEqual([
        { name: 'android.permission.INTERNET' },
        { name: 'android.permission.USE_FINGERPRINT' },
        { name: 'android.permission.READ_EXTERNAL_STORAGE' }
      ]);
    });
    it('should parse release dump', () => {
      const json = JSON.parse(badging2Json(releaseDump));

      expect(json).toBeTruthy();
      expect(json.sdkVersion).toBe('21');
      expect(json.targetSdkVersion).toBe('28');
      expect(json.package.name).toBe('com.foo.bar');
      expect(json.package).toEqual({
        name: 'com.foo.bar',
        versionCode: '203',
        versionName: '0.2.3',
        platformBuildVersionName: '0.2.3',
        platformBuildVersionCode: '',
        compileSdkVersion: '28',
        compileSdkVersionCodename: '9'
      });

      expect(json['application-debuggable']).toBeUndefined();

      expect(json.densities).toEqual([
        '120',
        '160',
        '240',
        '320',
        '480',
        '640',
        '65535'
      ]);

      expect(json['uses-permission']).toEqual([
        { name: 'android.permission.INTERNET' },
        { name: 'android.permission.USE_FINGERPRINT' },
        { name: 'android.permission.READ_EXTERNAL_STORAGE' }
      ]);
    });
  });
});
