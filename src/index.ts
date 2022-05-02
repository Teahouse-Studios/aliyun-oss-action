import * as core from '@actions/core';
import glob from 'glob'
import OSS from 'ali-oss'
import { resolve } from 'path'

(async () => {
    const store = new OSS({
        accessKeyId: core.getInput('KEY_ID'),
        accessKeySecret: core.getInput('KEY_SECRET'),
        bucket: core.getInput('BUCKET'),
        endpoint: 'oss-accelerate.aliyuncs.com'
    })
    const prefix = resolve(process.env.GITHUB_WORKSPACE, core.getInput('LOCAL_PATH'))
    console.log('prefix', prefix)
    let tasks = glob.sync(`${prefix}/**/*.*`).map(v => v.substr(prefix.length))
    for (let task of tasks) {
        const remoteName = (core.getInput('REMOTE_PREFIX') || "") + task
        const localPath = resolve(prefix, '.' + task)
        console.log(remoteName, task, localPath)
        await store.put(remoteName, localPath)
    }
    console.log('done')
})()