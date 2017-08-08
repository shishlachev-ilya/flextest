var gulp 		 = require('gulp'),
	sass 		 = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'), 
    uglify       = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'), 
    rename       = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'); 

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('app/css'))	
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('scripts', function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js', 
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' 
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify()) 
        .pipe(gulp.dest('app/js')); 
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/libs.css')
        .pipe(cssnano()) 
        .pipe(rename({suffix: '.min'})) 
        .pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload); 
    // Наблюдение за другими типами файлов
});
