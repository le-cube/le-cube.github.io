/**
 * Galleria Classic Theme 2012-08-08
 * http://galleria.io
 *
 * Licensed under the MIT license
 * https://raw.github.com/aino/galleria/master/LICENSE
 *
 */

(function($) {

/*global window, jQuery, Galleria */

Galleria.addTheme({
    name: 'classic',
    author: 'Galleria',
    css: 'galleria.classic.css',
    defaults: {
        transition: 'slide',
        thumbCrop:  'height',

        // set this to false if you want to show the caption all the time:
        _toggleInfo: true,
        _showFullscreen: true,
        _locale: {show_thumbnails: "Show thumbnails",hide_thumbnails: "Hide thumbnails",play: "Play slideshow",
            pause: "Pause slideshow",enter_fullscreen: "Enter fullscreen",exit_fullscreen: "Exit fullscreen",
            popout_image: "Popout image",showing_image: "Showing image %s of %s"}
    },
    init: function(options) {

        Galleria.requires(1.4, 'This version of Classic theme requires Galleria 1.4 or later');

        // add some elements
        this.addElement('info-link','info-close', "bar", "fullscreen");
        this.append({
            container: ["bar"],
            bar: ["fullscreen", "info"]
        });
        this.prependChild("info", "counter");

        // cache some stuff
        var info = this.$('info-link,info-close,info-text'),
            B = this.$("fullscreen"),
            s = this.$("bar"),
            h = this,
            r = !1,
            D = options._locale,
            touch = Galleria.TOUCH;

        // show loader & counter with opacity
        this.$('loader,counter').show().css('opacity', 0.4);

        // some stuff for non-touch browsers
        if (! touch ) {
            this.addIdleState( this.get('image-nav-left'), { left:-50 });
            this.addIdleState( this.get('image-nav-right'), { right:-50 });
            this.addIdleState( this.get('counter'), { opacity:0 });
        }

        // toggle info
        if ( options._toggleInfo === true ) {
            info.bind( 'click:fast', function() {
                info.toggle();
            });
        } else {
            info.show();
            this.$('info-link, info-close').hide();
        }

        // bind some stuff
        this.bind('thumbnail', function(e) {

            if (! touch ) {
                // fade thumbnails
                $(e.thumbTarget).css('opacity', 0.6).parent().hover(function() {
                    $(this).not('.active').children().stop().fadeTo(100, 1);
                }, function() {
                    $(this).not('.active').children().stop().fadeTo(400, 0.6);
                });

                if ( e.index === this.getIndex() ) {
                    $(e.thumbTarget).css('opacity',1);
                }
            } else {
                $(e.thumbTarget).css('opacity', this.getIndex() ? 1 : 0.6).bind('click:fast', function() {
                    $(this).css( 'opacity', 1 ).parent().siblings().children().css('opacity', 0.6);
                });
            }
        });
        this.bind("fullscreen_enter", function() {
            r = !0;
            h.setOptions("transition", !1);
            B.addClass("open");
            s.css("bottom", 0);
            this.defineTooltip("fullscreen", D.exit_fullscreen);
            Galleria.TOUCH || this.addIdleState(s, {bottom: -31})
        });
        this.bind("fullscreen_exit", function() {
            r = !1;
            Galleria.utils.clearTimer("bar");
            h.setOptions("transition", options.transition);
            B.removeClass("open");
            s.css("bottom", 0);
            this.defineTooltip("fullscreen", D.enter_fullscreen);
            Galleria.TOUCH ||
            this.removeIdleState(s, {bottom: -31})
        });
        var activate = function(e) {
            $(e.thumbTarget).css('opacity',1).parent().siblings().children().css('opacity', 0.6);
        };

        this.bind('loadstart', function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, 0.4);
            }
            window.setTimeout(function() {
                activate(e);
            }, touch ? 300 : 0);
            this.$('info').toggle( this.hasInfo() );
        });

        this.bind('loadfinish', function(e) {
            this.$('loader').fadeOut(200);
        });

        B.on("click:fast", function() {
            r ? h.exitFullscreen() : h.enterFullscreen()
        });
    }
});

}(jQuery));
