import core from '@actions/core'
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

    const prefix = resolve(core.getInput('LOCAL_PATH'))
    let tasks = glob.sync(`${prefix}/**/*.*`).map(v => v.substr(prefix.length))
    for (let task of tasks) {
        const remoteName = core.getInput('REMOTE_PREFIX') + task
        await store.put(remoteName, resolve(prefix, task))
        console.log(task)
    }
    console.log('done')
})()