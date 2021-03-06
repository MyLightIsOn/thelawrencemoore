

$(function(){
    var wrapper = $('#wrapper'),
        screen = $('body, html');

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

        var iconContainer = $(this).find('.icon-container'),
            tileTitle = $(this).find('.tile-title'),
            tileBackground = $(this).find('.tile-background'),
            thisIconOff = $(this).find('.icon'),
            thisIconOn = $(this).find('.icon-on');

        $(iconContainer).stop().animate({
            backgroundColor: color
        });

        if(screen.width() >= 1282){
            $(tileBackground).stop().animate({
                width: 11 + "%"
            });
        } else {
            $(tileBackground).stop().animate({
                width: 13 + "%"
            });
        }

        $(tileTitle).stop().animate({
            opacity: 1
        });
        $(thisIconOff).stop().animate({
            top: -92
        });
        $(thisIconOn).stop().animate({
            top: -92
        });

    }, function(){
        var iconContainer = $(this).find('.icon-container'),
            tileTitle = $(this).find('.tile-title'),
            tileBackground = $(this).find('.tile-background'),
            thisIconOff = $(this).find('.icon'),
            thisIconOn = $(this).find('.icon-on');

        $(iconContainer).stop().animate({
            backgroundColor: '#ffffff'
        });
        $(tileBackground).stop().animate({
            width: 0
        });
        $(tileTitle).stop().animate({
            opacity: 0.2
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

                    var activePage = contentPages[i],
                        pageContent = $(activePage).find('.page-content'),
                        pageWrapper = $(activePage).find('.page-content').parent(),
                        pageHeader = $(activePage).find('.page-header'),
                        headerText =  $(activePage).find('.page-header h1'),
                        headerBottom = $(activePage).find('.page-header h5');

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


                    //Desktop Check
                    if(screenWidth >= 1282){
                        console.log('desktop');
                        $(activePage).find('.page-wrapper').animate({
                            opacity: 1
                        });

                        //Places the page text below the header quote author
                        $(pageWrapper).css({
                            top:  pageHeader.height() - (pageHeader.height()/2)
                        });

                        //Page text moves up and fades in
                        $(pageContent).animate({
                            opacity: 1
                        });

                        //Header text gets a higher z-index so it stays above the gradient
                        $(headerText).css({
                            zIndex: 100
                        });
                        $(headerBottom).css({
                            zIndex: 100
                        });
                    }

                    //Tablet Check
                    if(screenWidth < 1282 && screenWidth > 512){
                        console.log('tablet');
                        $(activePage).find('.page-wrapper').css({
                            opacity: 1,
                            top: 0
                        });

                        //Places the page text below the header quote author

                        //Page text moves up and fades in
                        $(pageContent).css({
                            opacity: 1,
                            top: 130,
                            paddingTop: 0
                        });

                        $(pageWrapper).css({
                            top: pageHeader.height() - 68
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

                    //Mobile Check
                    if(screenWidth <= 512){
                        console.log('mobile');
                        $(activePage).find('.page-wrapper').css({
                            opacity: 1,
                            top: 0
                        });

                        //Places the page text below the header quote author
                        //Page text moves up and fades in
                        $(pageContent).css({
                            opacity: 1,
                            top: 160,
                            paddingTop: 0
                        });

                        $(pageWrapper).css({
                            top: pageHeader.height() - 68
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


    //Opens slideshows
    $('.process-view.view').on('click', function(){
        var slideShow = $(this).closest('.example').find('.slideshow');
        var buttonPosition = $(this).offset();
        var buttonTop = this.offsetTop;

        //Gets button position
        $(slideShow).offset(buttonPosition);

        //Sets the initial width and height to create enlarging effect.
        $(slideShow).css({
            width: 20,
            height: 20
        });

        //Removes scrolling
        $(screen).css({
            overflowY: 'hidden'
        });

        //Enlarges slideshow
        $(slideShow).animate({
            opacity: 1,
            height: 100 + '%',
            width: 100 + "%",
            zIndex: 9999,
            top: 0,
            left: 0
        });

        // Hides footer
        $('footer').animate({
            opacity: 0
        }, function(){
            $(this).css({
                display: "none"
            })
        });

        //Closes Slideshow
        $('.close-slideshow').on('click', function(){

            //Shrinks and hides slideshow
            $(slideShow).animate({
                left: buttonPosition.left,
                top: buttonTop + 20,
                width: 20,
                height: 20,
                opacity: 0
            });

            //Adds scrolling back
            $(screen).css({
                overflowY: 'auto'
            });

            // Returns footer
            $('footer').css({
                display: 'block'
            });

            $('footer').animate({
                opacity: 1
            })
        })
    });
});

