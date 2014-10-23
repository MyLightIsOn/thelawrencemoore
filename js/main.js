$(function(){
    var wrapper = $('#wrapper');
    var screen = $('body, html');

    $(wrapper).append(JST.about);
    $(wrapper).append(JST.code);
    $(wrapper).append(JST.design);
    $(wrapper).append(JST.contact);

    $('.home-tile').click(function(){
        var tileExpand = $(this).children('.tile-expand');
        var screenHeight = $(screen).height();
        var screenWidth = $(screen).width();

        $(tileExpand).css({
            zIndex: 100
        });

        $(tileExpand).animate({
            width: screenWidth,
            height: screenHeight
        })
    });
});

