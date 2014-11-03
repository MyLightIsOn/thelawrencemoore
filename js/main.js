$(function(){
    var wrapper = $('#wrapper');
    var screen = $('body, html');

    //Loads templates for homepage
    $(wrapper).append(JST.about);
    $(wrapper).append(JST.code);
    $(wrapper).append(JST.design);
    $(wrapper).append(JST.contact);

    //Content Pages
    $(wrapper).append(JST.aboutPage);
    $(wrapper).append(JST.codePage);
    $(wrapper).append(JST.designPage);
    $(wrapper).append(JST.contactPage);

    //Stores the content pages in a variable
    var contentPages = $('.content-page');

    //Homepage tile hover effects
    $('.home-tile').hover(function(){
        var color = {};

        if($(this).hasClass('about')){
            color = '#db7f24'
        }

        if($(this).hasClass('code')){
            color = '#1a7287'
        }

        if($(this).hasClass('design')){
            color = '#1ba33f'
        }

        if($(this).hasClass('contact')){
            color = '#db3a24'
        }

        var iconContainer = $(this).find('.icon-container');
        var tileTitle = $(this).find('.tile-title');
        var thisIconOff = $(this).find('.icon');
        var thisIconOn = $(this).find('.icon-on');

        $(iconContainer).stop().animate({
            backgroundColor: color
        });
        $(tileTitle).stop().animate({
            color: color
        });
        $(thisIconOff).stop().animate({
            top: -92
        });
        $(thisIconOn).stop().animate({
            top: -92
        });

    }, function(){
        var iconContainer = $(this).find('.icon-container');
        var tileTitle = $(this).find('.tile-title');
        var thisIconOff = $(this).find('.icon');
        var thisIconOn = $(this).find('.icon-on');

        $(iconContainer).stop().animate({
            backgroundColor: '#ffffff'
        });
        $(tileTitle).stop().animate({
            color: '#dbdbdb'
        });
        $(thisIconOff).stop().animate({
            top: 0
        });
        $(thisIconOn).stop().animate({
            top: 0
        });
    });

    //Expands the homepage tile when clicked after grabbing the screen dimensions
    $('.home-tile').on('click',function(){
        var screenWidth = screen.width();
        var tileExpand = $(this).children('.tile-expand');
        var i = 0;

        //Displays close button
        $('.close-page').css({
            right: 30
        });
        $('.close-page').animate({
            opacity: 1
        });

        tileExpand.addClass('expanded');

        $(tileExpand).css({
            zIndex: 100
        });

        $(tileExpand).animate({
            width: 200 + '%',
            height: 200 + '%'
        }, function(){
            var selectedDivClass = $(tileExpand).parent().attr('class');
            var selectedClassIsolate = selectedDivClass.split(' ')[1];

            //Checks the names of the content pages and compares them to the section that was click. Triggers animation after finding match
            for(i; i < contentPages.length; ++i){
                if(($(contentPages[i]).attr('id').split('-')[0]) == selectedClassIsolate){

                    var activePage = contentPages[i];
                    var pageContent = $(activePage).find('.page-content');
                    var headerText =  $(activePage).find('.page-header h1');
                    var headerBottom = $(activePage).find('.page-header h5');
                    var bottom = $(headerBottom).position().top+$(headerBottom).outerHeight(true);

                    //Adds active page class to the selected page
                    $(activePage).addClass('active-page');

                    //Makes the active page have a higher z-index
                    $(activePage).css({
                        zIndex: 150
                    });

                    //After teh z-index goes up, the page fades in
                    $(activePage).animate({
                        opacity: 1
                    }, 300);

                    //Allows the active page scroll
                    $(activePage).css({
                        overflow: 'visible'
                    });

                    //Creates the scroll effect for the inner pages and fades it in
                    $(window).one('scroll', function(){

                        if(screenWidth >= 1282){
                            $(activePage).find('.page-wrapper').animate({
                                opacity: 1,
                                top: 0
                            });

                            //Places the page text below the header quote author
                            $(pageContent).css({
                                top: bottom + 130
                            });

                            //Page text moves up and fades in
                            $(pageContent).animate({
                                opacity: 1,
                                top: bottom + 160
                            });
                        }
                        //Header text gets a higher z-index so it stays above the gradient
                        $(headerText).css({
                            zIndex: 100
                        });
                        $(headerBottom).css({
                            zIndex: 100
                        });
                    });

                    if(screenWidth < 1282){
                        $(activePage).find('.page-wrapper').css({
                            opacity: 1,
                            top: 0
                        });

                        //Places the page text below the header quote author
                        $(pageContent).css({
                            top: bottom + 130
                        });

                        //Page text moves up and fades in
                        $(pageContent).css({
                            opacity: 1,
                            top: bottom + 30,
                            paddingTop: 30
                        });

                        //Header text gets a higher z-index so it stays above the gradient
                        $(headerText).css({
                            zIndex: 100
                        });
                        $(headerBottom).css({
                            zIndex: 100
                        });

                        //Hides my name
                        $('.myName').css({
                            display: "none"
                        });
                        $('.myJob').css({
                            display: "none"
                        })
                    }
                }
            }
        });
    });


    //Close Home Page tiles
    $('.close-page').on('click', function(){
        var expandedTile = $("#wrapper").find('.expanded');
        var activeContentPage = $("#wrapper").find('.active-page');
        var pageWrapper = $(activeContentPage).find('.page-wrapper');
        var headerText =  $(activeContentPage).find('.page-header h1');
        var headerBottom = $(activeContentPage).find('.page-header h5');

        //Hides close button


        $('.close-page').animate({
            opacity: 0
        }, function(){
            $('.close-page').css({
                right: -1000
            });
        });

        //Returns the scroll position back to the top of the page then calls returnState()
        $(screen).animate(
            { scrollTop: 0 }, 'fast', returnState()
        );

        function returnState(){

            //Active pages faces out then gets it z-index returned to it's original state
            $(activeContentPage).animate({
                opacity: 0
            }, function(){
                $(this).css({
                    zIndex: -100
                });

                //the expanded tile shrinks back to its original size and it's z-index is reset
                $(expandedTile).animate({
                    width: 100 + '%',
                    height: 100 + '%'
                }, function(){
                    $(expandedTile).css({
                        zIndex: 0
                    });
                });

                //The active pages scroll functionality is removed
                $(activeContentPage).css({
                    overflow: 'hidden'
                });

                //Inner page fades back out
                $(pageWrapper).css({
                    opacity: 0
                });

                //Header text z-index reset
                $(headerText, headerBottom).css({
                    zIndex: 0
                });

                //Class names removed from active and expanded elements
                $(activeContentPage).removeClass('active-page');
                $(expandedTile).removeClass('expanded');
            });
        }

    });

    //Process slideshows
    $(".version").text($.swipeshow.version);
    $(".slideshow").swipeshow({
        mouse: true,
        autostart: false
    });

    $('.process-view.view').on('click', function(){
        var slideShow = $(this).closest('.example').find('.slideshow');

        if($(this).hasClass('closeSlideShow')){
            $(slideShow).animate({
                height: 0
            });
            $(this).css({
                backgroundColor: ''
            });
            $(this).text('View Process').removeClass('closeSlideShow');
        } else {
            $(this).text('Close Slideshow').addClass('closeSlideShow');
            $(this).css({
                backgroundColor: '#db3a24'
            });
            $(slideShow).animate({
                height: 539
            });
        }
    });

    $('.process-content').click(function(){
        if($(this).hasClass('toggledOff')){
            $(this).css({
                opacity: 0.9
            });
            $(this).removeClass('toggledOff');
            $('.toggleInstruction').css({
                color: '#fff'
            })
        } else {
            $(this).css({
                opacity: 0
            });
            $(this).addClass('toggledOff');
            $('.toggleInstruction').css({
                color: '#000'
            })
        }
    });
});

