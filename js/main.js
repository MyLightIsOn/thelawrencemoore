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
    $(wrapper).append(JST.designPage);
    $(wrapper).append(JST.codePage);
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
                    console.log(contentPages[i])
                    $(activePage).addClass('active-page');
                    $(activePage).css({
                        zIndex: 150
                    });
                    $(activePage).animate({
                        opacity: 1
                    }, 'fast');
                }
            }
        });
    });

    $('.close-page').on('click', function(){
        var expandedTile = $("#wrapper").find('.expanded');
        var activeContentPage = $("#wrapper").find('.active-page');

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

            $(activeContentPage).removeClass('active-page');
            $(expandedTile).removeClass('expanded');
        });
    })
});

