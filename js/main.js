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

    //Expands the homepage tile when clicked after grabbing the screen dimensions
    $('.home-tile').on('click',function(){
        var tileExpand = $(this).children('.tile-expand');
        var i = 0;

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

                    $(activePage).addClass('active-page');
                    $(activePage).css({
                        zIndex: 150
                    });
                    $(activePage).animate({
                        opacity: 1
                    }, 300);
                    $(activePage).css({
                        overflow: 'visible'
                    });


                    $(window).one('scroll', function(){
                        $(activePage).find('.page-wrapper').animate({
                            opacity: 1,
                            top: 0
                        });

                        $(pageContent).css({
                            top: bottom + 130
                        });
                        $(pageContent).animate({
                            opacity: 1,
                            top: bottom + 60
                        });

                        $(headerText).css({
                            zIndex: 100
                        });
                        $(headerBottom).css({
                            zIndex: 100
                        });
                    })
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

        $(screen).animate(
            { scrollTop: 0 }, 'fast', returnState()
        );

        function returnState(){
            $(activeContentPage).animate({
                opacity: 0
            }, function(){
                $(this).css({
                    zIndex: -100
                });

                $(expandedTile).animate({
                    width: 100 + '%',
                    height: 100 + '%'
                }, function(){
                    $(expandedTile).css({
                        zIndex: 0
                    });
                });

                $(activeContentPage).css({
                    overflow: 'hidden'
                });

                $(pageWrapper).css({
                    opacity: 0
                });

                $(headerText, headerBottom).css({
                    zIndex: 0
                });
                $(activeContentPage).removeClass('active-page');
                $(expandedTile).removeClass('expanded');
            });
        }

    })
});

