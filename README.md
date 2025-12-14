# Ikariam Abyssal Ambush Stats

This is a browser extension that collects statistics on the Abyssal Ambush event held in Ikarim.

## Development instructions

1. Install deps: `yarn`
2. Run `yarn dev`
3. Go to [chrome://extensions/](chrome://extensions/)
4. Turn on developer mode
5. Load `apps/extension/dist` folder as unpacked extension

The project uses crxjs, which provides HMR support, allowing changes to be updated automatically as they are developed in real time. So, going forward, you will only need steps 1 and 2.

## "Normal" installation

For now, the extension will not be published in the store or even on GitHub Releases. GitHub Actions automatically build the package and create an artifact that can be downloaded from the workflow's data.

1. Go to [Build and upload release.zip](https://github.com/Aikain/ikariam-abyssal-ambush-stats/actions/workflows/build.yaml) -workflow
2. Open the last successful run
3. Download the extension from the artifact section
4. Unzip extension.zip
5. Go to [chrome://extensions/](chrome://extensions/)
6. Turn on developer mode
7. Load the extracted `extension` folder as unpacked extension
