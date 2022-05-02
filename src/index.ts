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
    let remotePrefix = core.getInput('REMOTE_PREFIX') || ""
    if (remotePrefix.endsWith("/")) {
        // 下面 task 前缀有/了
        remotePrefix = remotePrefix.slice(0, remotePrefix.length - 1)
    }
    const prefix = resolve(process.env.GITHUB_WORKSPACE, core.getInput('LOCAL_PATH'))
    console.log('prefix', prefix)
    let tasks = glob.sync(`${prefix}/**/*.*`).map(v => v.substr(prefix.length))
    for (let task of tasks) {
        const remoteName = remotePrefix + task
        const localPath = resolve(prefix, '.' + task)
        console.log(remoteName, task, localPath)
        await store.put(remoteName, localPath)
    }
    console.log('done')
})()