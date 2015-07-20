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

var config = {
    nameProject : "example"
};

gulp.task('clean', function () {
    return gulp.src('build', {read: false}).pipe(clean());
});

gulp.task('move', ['clean'], function () {
    gulp.src(['*', '*/**', '!page.properties', '!index.html', '!gulpfile.js', '!package.json', '!node_modules', '!node_modules/**']).pipe(gulp.dest('build/src/resources'));
    return gulp.src(['page.properties','index.html']).pipe(gulp.dest('build/src'));
});

gulp.task('zip', function () {
    return gulp.src('build/src/**/*').pipe(zip(config.nameProject+"_"+getStrDate()+".zip")).pipe(gulp.dest('build/target'));
});
