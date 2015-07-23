/* jshint node:true */

'use strict';

var gulp = require('gulp');
var bower = require('gulp-bower');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var launch = require('gulp-open');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var clean = require('gulp-clean');
var zip = require('gulp-zip');


var config = {
    nameProject : "example"
};

var paths = {
    sources : [
        'js/*'
    ],
    folderDeploy : "C:/DATAS/APP/BonitaBPMSubscription-7.0.0/workspace/tomcat/bonita/client/tenants/1/work/pages/custompage_"+config.nameProject+"/"
};

var opt = {
    port: 3000,
    livereload: 31357
};

function pad2(number) {
    try {
        return (number < 10 ? '0' : '') + number;
    } catch (er) {
        console.error("pad2 : " + er.message);
        return null;
    }
}

function getStrDate() {
    try {
        var currentTime = new Date();
        var hours = pad2(currentTime.getHours());
        var minutes = pad2(currentTime.getMinutes());
        var annee = currentTime.getFullYear();
        var mois = pad2(currentTime.getMonth()+1);
        var jour = pad2(currentTime.getDate());
        var secondes = pad2(currentTime.getSeconds());
        var strDateTime = annee + "" + mois + "" + jour + "" + hours + "" + minutes + "" + secondes;
        return strDateTime;
    } catch (er) {
        console.error("getStrDate : " + er.message);
        return null;
    }
}

gulp.task('clean-build', function () {
    return gulp.src('build/*', {read: false}).pipe(clean());
});

gulp.task('build-src', ['clean-build'], function () {
    gulp.src(['*', '*/**', '!page.properties', '!index.html', '!gulpfile.js', '!package.json', '!node_modules', '!node_modules/**']).pipe(gulp.dest('build/src/resources'));
    return gulp.src(['page.properties','index.html']).pipe(gulp.dest('build/src'));
});

gulp.task('clean-deploy', function () {
    return gulp.src(paths.folderDeploy+"*", {read: false}).pipe(clean({force: true}));
});

gulp.task('deploy', ['clean-deploy'], function () {
    return gulp.src('build/src/**/*').pipe(gulp.dest(paths.folderDeploy));
});

gulp.task('zip', function () {
    //${path.bonita_home}client\tenants\1\conf\console-config.properties
    return gulp.src('build/src/**/*').pipe(zip(config.nameProject+"_"+getStrDate()+".zip")).pipe(gulp.dest('build/target'));
});

/**
 * bower task
 * Fetch bower dependencies
 */
gulp.task('bower', function() {
    bower();
});

/**
 * Watch task
 * Launch a server with livereload
 */
gulp.task('watch', function() {
    gulp
        .watch(paths.sources)
        .on('change', function() {
            gulp.src('').pipe(connect.reload());
        })
    ;
});

/**
 * Server task
 */
gulp.task('server', function() {
    return connect.server({
        port: opt.port,
        livereload: true
    });
});

/**
 * Open task
 * Launch default browser on local server url
 */
gulp.task('open', function() {
    return gulp.src('index.html')
        .pipe(launch('', {
            url: 'http://localhost:'+opt.port+'/index.html'
        }));
});

gulp.task('run-dev', ['bower', 'watch', 'server', 'open']);
