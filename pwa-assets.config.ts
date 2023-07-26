import {
    defineConfig,
    AssetType,
    ResolvedAssetSize,
    Preset
} from '@vite-pwa/assets-generator/config'

export const preset: Preset = {
    assetName: (type: AssetType, size: ResolvedAssetSize) => {
        switch (type) {
            case 'transparent':
                return `${size.width}x${size.height}.png`
            case 'maskable':
                return `maskable-${size.width}x${size.height}.png`
            case 'apple':
                return `apple-${size.width}x${size.height}.png`
        }
    },
    png: {
        compressionLevel: 9,
        quality: 90,
    },
    transparent: {
        sizes: [64, 192, 512],
        favicons: [
            [64, 'favicon.ico']
        ]
    },
    maskable: {
        sizes: [512],
    },
    apple: {
        sizes: [180]
    }
}

export default defineConfig({
    preset,
    images: ['public/favicon.svg'],
})