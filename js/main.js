var workslidercontent;

//optional variables
var posX;
var center;
var moveTo;





$(document).ready(function(){


    $('.v_nav').load('v_nav.html');
    $('.v_slider').load('v_slider.html', function(){ loadedWorks(); });

    $('.v_nav_in').load('../v_nav_in.html');
    $('.v_slider_in').load('../v_slider_in.html', function(){ loadedWorks(); });


    $('.leftWork .unslider-arrow').hide();
    $('.leftWork').hover(function(){
        $('.leftWork .unslider-arrow').show();
    }, function(){
         $('.leftWork .unslider-arrow').hide();
    });




    $('nav ul li.active').siblings('li').hover(function(){
        $(this).addClass('activeblock');
    }, function() {
        $(this).removeClass('activeblock');
    });

    $('h1 a').hover(function(){
        $(this).addClass('activeblock');
    }, function() {
        $(this).removeClass('activeblock');
    });


    $('.question').miniTip();




    $('nav.adminmenu ul li a').click(function(e){
	    e.preventDefault();
	    $(this).addClass('active').parent().siblings().children('a').removeClass('active');
	    var open = $(this).attr('href');
	    $(open).show().siblings('.deployable').hide();
	    $(window).scrollTop(0);
    });



    /* UNSLIDER */
    if($('.gallery').length>0){
	    var unslider = $('.gallery').unslider({fluid:true, delay:false});
	    var dataunslider = unslider.data('unslider');
	   /* dataunslider.next();*/
        dataunslider.stop();

	    $('.unslider-arrow').click(function(e) {
	    	e.preventDefault();
	        var fn = this.className.split(' ')[1];
	        //  Either do unslider.data('unslider').next() or .prev() depending on the className
	        unslider.data('unslider')[fn]();
	    });

	    // GALLERY
	 	    $('.gallery ul li a .fancybox').fancybox();



    }

    //VIdeoOpen
    $('.videoFbox').fancybox({
	    afterLoad:function(){
		    $('video,audio').mediaelementplayer({
			    defaultVideoWidth: 480,
				// if the <video height> is not specified, this is the default
			    defaultVideoHeight: 270,
			    // if set, overrides <video width>
			    videoWidth: -1,
			    // if set, overrides <video height>
			    videoHeight: -1
		    });
	    }
    });




	//INNERNAVIGATION - .PRoJECTMENU

	$('#gallery').slideDown().siblings('div').slideUp();
	$('.projectMenu a.deployableBtn').click(function(e){
		e.preventDefault();
		var deploy = $(this).attr('href');
		$(deploy).slideDown().siblings('div').slideUp();
		dataunslider.next();
	});


    /* .TWRITER */
    var twriter= '.twriter';
    if($(twriter).length){
        $(twriter).each(function(index){
            var texto = $(this).text();
            var div = $(this);
            div.text('');
            var tiempo = Math.round((Math.random()*1500)+500);
            jQuery({count:0}).animate({count:texto.length}, {
                duration:tiempo,
                step: function(){
                    div.text(texto.substring(0, Math.round(this.count)));
                }
            });
        });
    }






}); /* end ready() */





function worksParser(xml){
  $('.workslider_in').html(xml);
  loadedWorks();
}


function twriterON(){
  /* .TWRITER */
    var twriter= '.twriter';
    if($(twriter).length){
        $(twriter).each(function(index){
            var texto = $(this).text();
            var div = $(this);
            div.text('');
            var tiempo = Math.round((Math.random()*1500)+500);
            jQuery({count:0}).animate({count:texto.length}, {
                duration:tiempo,
                step: function(){
                    div.text(texto.substring(0, Math.round(this.count)));
                }
            });
        });
    }
}

function loadedWorks(){
//hover workslider
    $('.workslider').hover(function(){
    }, function(){
      $(this).children('.workslider_in').animate({marginLeft:0}, 'fast');
    });


    //count number of proyects (per group)
    var groups = $('.workslider .workslider_in .group').length;
    $('.workslider .workslider_in').css({'width':111*groups});
    //HOVER MOVE (up/down)
    //hover on firstchild A
    $('.workslider .workslider_in .group a:first-child').hover(function(){
        $(this).children('.img').css({'bottom':'auto'}).stop().animate({top:35}, 'fast');
        $(this).next('a').children('.img').css({'bottom':'auto'}).stop().animate({top:35}, 'fast');
    }, function(){
        $(this).children('.img').css({'bottom':'auto'}).stop().animate({top:0}, 'fast');
        $(this).next('a').children('.img').css({'bottom':'auto'}).stop().animate({top:0}, 'fast');
    });
    //hover on secondchild A
    $('.workslider .workslider_in .group a:first-child+a').hover(function(){
        $(this).children('.img').css({'top':'auto'}).stop().animate({bottom:35}, 'fast');
        $(this).prev('a').children('.img').css({'top':'auto'}).stop().animate({bottom:35}, 'fast');
    }, function(){
        $(this).children('.img').css({'top':'auto'}).stop().animate({bottom:0}, 'fast');
        $(this).prev('a').children('.img').css({'top':'auto'}).stop().animate({bottom:0}, 'fast');
    });

    workmove();
}

/*
$(function()
{
	$('.scroll-pane').jScrollPane(
		{
			showArrows: true,
			arrowScrollOnHover: true
		}
	);
});
*/

function workmove(){
  $('.workslider').on('mousemove',function(e){
    posX = e.pageX - $(this).offset().left;
    center = posX - $(this).width()/2;
    if(center<0){
  	  moveTo = 0;
    } else if(center>$(this).width()/4){
  	  moveTo = $(this).width()/4;
    } else {
  	  moveTo = center;
    }
  	$(this).children('.workslider_in').css({marginLeft:-moveTo});
  });
}
