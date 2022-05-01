import {build} from 'esbuild'

build({
    bundle: true,
    target: 'node16',
    entryPoints: ['./src/index.ts'],
    outfile: './index.js',
    minify: true,
    platform: 'node'
})