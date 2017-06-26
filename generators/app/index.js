'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var memFs = require('mem-fs');
var editor = require('mem-fs-editor');

var store = memFs.create();
var fs = editor.create(store);

module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'appName',
      message : 'What is your app\'s name ?',
      default : this.appname // Default to current folder name
    }, {
      type    : 'input',
      name    : 'packageName',
      message : 'Provide your package name ?'
    },{
      type    : 'input',
      name    : 'dbType',
      message : 'Provide your db type ?'
    }]).then((answers) => {
      this.log('app name', answers.appName);
      this.log('package name', answers.packageName);
      this.log('db type', answers.dbType);

      this.props = answers;
      this.props.packageFolder = answers.packageName.replace(/\./g, '/');

      this.log('props app name', this.props.appName);
      this.log('props package name', this.props.packageName);
      this.log('props db type', this.props.dbType);
    });
  }

  writing () {
      this.log('writing app name', this.props.appName);
      this.log('writing package name', this.props.packageName);
      this.log('writing db type', this.props.dbType);
      this.log('writing package Folder', this.props.packageFolder);

      this.fs.copyTpl(this.templatePath('yoconfig.json'), this.destinationPath('.yo-rc.json'), 
                       this.props);

      this.composeWith('jhipster');
   }

  /* runJhipster () {
       this.composeWith('jhipster');
   }*/
};