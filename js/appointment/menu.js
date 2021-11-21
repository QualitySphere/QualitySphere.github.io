/*Menu Dropdown Onhover Js*/
jQuery(document).ready(function() {

        /* ---------------------------------------------- /*
         * Initialization General Scripts for all pages
         /* ---------------------------------------------- */

        var navbar      = jQuery('.navbar-default'),
            navHeight   = navbar.height(),
           // worksgrid   = jQuery('#works-grid'),
            width       = Math.max(jQuery(window).width(), window.innerWidth),
            mobileTest  = false;

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mobileTest = true;
        }

        hoverDropdown(width, mobileTest);

        jQuery(window).resize(function() {
            var width = Math.max(jQuery(window).width(), window.innerWidth);
            hoverDropdown(width, mobileTest);
        });


        /* ---------------------------------------------- /*
         * Navbar hover dropdown on desctop
         /* ---------------------------------------------- */

        function hoverDropdown(width, mobileTest) {
            if ((width > 1100) && (mobileTest !== true)) {
                jQuery('.dropdown-menu').removeAttr("style");
                var delay = 0;
                var setTimeoutConst;
                jQuery('.navbar-default .navbar-nav > li.dropdown, .navbar-default li.dropdown > .dropdown-menu li.dropdown-submenu').hover(function() {
                        var jQuerythis = jQuery(this);
                        setTimeoutConst = setTimeout(function() {
                            jQuerythis.addClass('open');
                            jQuerythis.find('.dropdown-toggle').addClass('disabled');
                        }, delay);
                    },
                    function() {
                        clearTimeout(setTimeoutConst);
                        jQuery(this).removeClass('open');
                        jQuery(this).find('.dropdown-toggle').removeClass('disabled');
                    });
            } else {
                jQuery('.navbar-default .navbar-nav > li.dropdown, .navbar-default li.dropdown > .dropdown-menu li.dropdown-submenu').unbind('mouseenter mouseleave');
                jQuery('.navbar-default [data-toggle=dropdown]').not('.binded').addClass('binded').on('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    jQuery(this).parent().siblings().removeClass('open');
                    jQuery(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
                    jQuery(this).parent().toggleClass();
                });
            }
        }
       
       jQuery('li.dropdown').find('a').each(function (){
          var link = jQuery(this).attr('href');
              if (link==='' || link==="#") {
                jQuery(this).on('click', function(){
                if( jQuery(window).width() < 1100) {
                    jQuery('li.dropdown,li.dropdown-submenu').removeClass('open');
                    jQuery(this).next().slideToggle();
                }
                return false;
                }); 
              }
    });
        
        jQuery('li.dropdown').find('.caret').each(function(){
            jQuery(this).on('click', function(){
                if( jQuery(window).width() <= 1100) {
                  jQuery('li.dropdown,li.dropdown-submenu').removeClass('open');
                  jQuery(this).parent().next().slideToggle();
                }
             return false;
            });
        });
});
	   

	
	  