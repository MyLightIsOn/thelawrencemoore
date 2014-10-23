$(function(){
    var wrapper = $('#wrapper');
    var screen = $('body, html');
    var i = 0;

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

    console.log(contentPages);

    //Expands the homepage tile when clicked after grabbing the screen dimensions
    $('.home-tile').click(function(){
        var tileExpand = $(this).children('.tile-expand');

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
});

