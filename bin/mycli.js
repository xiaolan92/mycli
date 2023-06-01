#!/usr/bin/env node
'use strict';
const { program } = require('commander');
const chalk = require('chalk')
const inquirer = require('inquirer');
const download = require('download-git-repo');
const handlebars= require('handlebars');
const ora = require('ora');
const path= require('path');
const symbols = require('log-symbols');
const fs = require('fs');

const question = [
    {
        name:'conf',              /* key */
        type:'confirm',           /* 确认 */
        message:'是否创建新的项目？' /* 提示 */
    },{
        name:'name',
        message:'请输入项目名称？',
        when: res => Boolean(res.conf) ,/* 是否进行 */
        default:''
    },{
        name:'author',
        message:'请输入作者？',
        when: res => Boolean(res.conf)
    },
    {
        name: 'description',
        message: '请输入项目描述',
        when: res => Boolean(res.conf)
    },
]



// 创建项目
program.command('create').description("创建项目").action(function () {
    console.log(chalk.green('👽 👽 👽 '+'欢迎使用mycli,轻松构建react ts项目～🎉🎉🎉'));
    inquirer.prompt(question).then(answer=>{
        const spinner = ora('正在下载模板, 请稍后...').start();
        download('direct:https://github.com/xiaolan92/webpack-ts.git#master','test',{ clone: true},function (err){
            if(!err){
                const packagePath = path.join(__dirname, '../test/package.json');
                if (fs.existsSync(packagePath)) {
                    const content = fs.readFileSync(packagePath).toString();
                    const template = handlebars.compile(content);
                    const result = template(answer);
                    fs.writeFileSync(packagePath, result);

                }
                spinner.succeed();
                console.log(symbols.success, chalk.green('项目初始化完成'));
            }else{
                spinner.fail();
                console.log(symbols.error, chalk.red(err));
            }

        })
    })
})
// 运行项目
program.command('start').description("运行项目").action(function () {
    console.log("运行项目")
})
// 打包项目
program.command('build').description("打包项目").action(function () {
    console.log("打包项目")
})
program.parse(process.argv)

