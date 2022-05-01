import {build} from 'esbuild'

build({
    bundle: true,
    target: 'node16',
    entryPoints: ['./src/index.ts'],
    outfile: './dist.js',
    platform: 'node'
})