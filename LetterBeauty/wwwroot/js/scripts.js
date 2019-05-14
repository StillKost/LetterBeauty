$(document).ready(function (argument) {

    var container = $('#letter');
    var XYc;

    //console.log(body);
    //LETTER CONTETENT ALL...
    var _letterHTML = $('#letter').text().split('\n').join('').trim().replace(/\s+/g,' ');
    //LETTER CSS TEXT
    var _cssText = $('#letter').css('cssText');
    var _letterAll = '<div style="width:550px;'+ _cssText +'">'+ _letterHTML +'</div>';

    $('#letter').dblclick(function (event) {

        var body = $('#letter-body').text().split('\n').join('').trim();
        body = body.replace(/\s+/g, ' ');
        var title = $('#letter-title').text().split('\n').join('').trim();
        title = title.replace(/\s+/g, ' ');
        event.preventDefault();
        $('#nav_').hide();
        $('#overlay_').fadeIn(400,
            function () {
                $('#modal_form')
                    .css('display', 'block')
                    .animate({ opacity: 1, top: '50%' }, 200);
            });
        $('#edit-title').val(title);
        $('#edit-body').val(body);



    });
    // Зaкрытие мoдaльнoгo oкнa
    $('#modal_close, #overlay_').click(function () {

        $('#modal_form')
            .animate({ opacity: 0, top: '45%' }, 200,
                function () { // пoсле aнимaции
                    $(this).css('display', 'none');
                    $('#overlay_').fadeOut(400);
                }
            );
        $('#nav_').show();
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
        $(".side-nav .collapse").on("hide.bs.collapse", function () {
            $(this).prev().find(".fa").eq(1).removeClass("fa-angle-right").addClass("fa-angle-down");
        });
        $('.side-nav .collapse').on("show.bs.collapse", function () {
            $(this).prev().find(".fa").eq(1).removeClass("fa-angle-down").addClass("fa-angle-right");
        });
    });

    $('a[data-toggle="collapse"]').click(function () {
        $(this).closest('li').find('ul').toggle();
    });


    function ChangeBorderStyle(option) {
        // option = changed <li>, color = li#id, selection by class 
        var style = $(option).attr('id');
        $(container).css('border-style', style);
    }


    function ChangeTextAlign(option) {
        var type = $(option).attr('id');
        $(container).css('text-align', type);
    }


    function ChangeFontSize(option, checker) {
        var size = $(option).val();
        $(container).css('font-size', size + "px");
        $(checker).html(size + ' px');
    }

    function ChangeFont(option) {
        var name = $(option).val();
        $(container).css('font-family', name);
    }

    //БЕРЕМ ВЫДЕЛЕННЫЙ ТЕКСТ
    function getSelected() {
        var t = '';
        if (window.getSelection) {
            t = window.getSelection();
        } else if (document.getSelection) {
            t = document.getSelection();
        } else if (document.selection) {
            t = document.selection.createRange().text;
        }
        return t;
    }

    $(window).mousemove(function (e) {
        //e = e || window.event
        var html = document.documentElement
        var body = document.body

        e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
        e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
        XYc = e.pageX + "," + e.pageY;
        return XYc;
    });




    //setInterval(function () {
    //    console.log(XYc);
    //}, 2000);

    function RandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////CONSTRUCTOR EVENTS///////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////

    $('#randomDesign').click(function () {
        //цвет текста
        var rgbFonf = 'rgb(' + RandomInt(0, 255) + ',' + RandomInt(0, 255) + ',' + RandomInt(0, 255) + ')';
        $(container).css('color', rgbFonf);
        //цвет фона
        var rgbBg = 'rgb(' + RandomInt(0, 255) + ',' + RandomInt(0, 255) + ',' + RandomInt(0, 255) + ')';
        $(container).css('background-color', rgbBg);
        //размер шрифта
        $(container).css('font-size', RandomInt(10, 22));
        //выравнивание
        var alignTypes = [];
        var alignOptions = $('.align-type');
        for (var i = 0; i < alignOptions.length; i++) {
            alignTypes[i] = $(alignOptions[i]).attr('id');
        }
        var randomAlignType = alignTypes[RandomInt(0, alignTypes.length)];
        $(container).css('text-align', randomAlignType);
        //шрифт
        //var fonts = [];
        //var fontOptions = $('#font').find('option');
        //for (var i = 0; i < fontOptions.length; i++) {
        //    fonts[i] = $(fontOptions[i]).text();
        //}
        //var randomFont = fonts[RandomInt(0, fonts.length)];
        //$(container).css('font-family', randomFont);
        //есть ли границы
        var bools = [true, false];
        var randomBrdr = bools[RandomInt(0, bools.length)];
        //если есть
        if (randomBrdr) {
            //тип границ
            var borderTypes = [];
            var borderOptions = $('.border-type');
            for (var i = 0; i < borderOptions.length; i++) {
                borderTypes[i] = $(borderOptions[i]).attr('id');
            }
            var randomBorderType = borderTypes[RandomInt(0, borderTypes.length)];
            $(container).css('border', randomBorderType);
            //размер границ
            $(container).css('border-width', RandomInt(1,70) + 'px');
            //загругленность
            $(container).css('border-radius', RandomInt(1, 120) + 'px');
            //цвет границ
            var rgbBrdr = 'rgb(' + RandomInt(0, 255) + ',' + RandomInt(0, 255) + ',' + RandomInt(0, 255) + ')';
            $(container).css('border-color', rgbBrdr);
        } else {
            //если нет
            $(container).css('border', 'none');
        }
        //отступы
        $(container).css('padding-top', RandomInt(0, 200) + 'px');
        $(container).css('padding-bottom', RandomInt(0, 200) + 'px');
        $(container).css('padding-left', RandomInt(0, 200) + 'px');
        $(container).css('padding-right', RandomInt(0, 200) + 'px');
    });

    $('.bg-color-switcher').change(function () {
        var red = $('#bg-red').val();
        var green = $('#bg-green').val();
        var blue = $('#bg-blue').val();

        var rgb = 'rgb(' + red + ',' + green + ',' + blue + ')';
        $(container).css('background-color', rgb);
    });

    $('.fn-color-switcher').change(function () {
        var red = $('#fn-red').val();
        var green = $('#fn-green').val();
        var blue = $('#fn-blue').val();

        var rgb = 'rgb(' + red + ',' + green + ',' + blue + ')';
        $(container).css('color', rgb);
    });

    $('#bg-reset').click(function () {
        $(container).css('background-color', 'white');
    });

    $('#fn-reset').click(function () {
        $(container).css('color', 'black');
    });

    $('li.font-color').click(function () {
        ChangeFontColor(this);
    });

    $('.align-type').change(function () {
        ChangeTextAlign(this);
    });

    $('.border-type').change(function () {
        ChangeBorderStyle(this);
    });


    $('#font').change(function () {
        ChangeFont(this);
    });

    $('#font-size').change(function () {
        ChangeFontSize(this, $('#size-value'));
    });

    $('.bor-color-switcher').change(function () {
        var red = $('#bor-red').val();
        var green = $('#bor-green').val();
        var blue = $('#bor-blue').val();

        var rgb = 'rgb(' + red + ',' + green + ',' + blue + ')';
        $(container).css('border-color', rgb);
    });

    $('#bor-reset').click(function () {
        $(container).css('border', 'none');
    });

    $('#pad-top').change(function () {
        var num = $(this).val();
        $(container).css('padding-top', num + 'px');
        $('#pad-top-val').html(num + ' px');
    });

    $('#pad-bottom').change(function () {
        var num = $(this).val();
        $(container).css('padding-bottom', num + 'px');
        $('#pad-bottom-val').html(num + ' px');
    });

    $('#pad-left').change(function () {
        var num = $(this).val();
        $(container).css('padding-left', num + 'px');
        $('#pad-left-val').html(num + ' px');
    });

    $('#pad-right').change(function () {
        var num = $(this).val();
        $(container).css('padding-right', num + 'px');
        $('#pad-right-val').html(num + ' px');
    });

    $('#bor-rad').change(function () {
        var num = $(this).val();
        $(container).css('border-radius', num + 'px');
        $('#bor-rad-val').html(num + ' px');
    });

    $('#bor-size').change(function () {
        var num = $(this).val();
        $(container).css('border-width', num + 'px');
        $('#bor-size-val').html(num + ' px');
    });

    $('#set-bg-image').click(function () {
        var link = $('#bg-image-link').val().trim();
        var value = "url(" + link + ")";
        $(container).css('background-image', value);
    });



    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////LETTER BOBY TEXT////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////

    $('#text-ready').click(function () {
        var newTitle = $('#edit-title').val().trim();
        var newBody = $('#edit-body').val().trim();

        $('#letter-title').html(newTitle);
        $('#letter-body').html(newBody);


        $('#modal_form')
            .animate({ opacity: 0, top: '45%' }, 200,
                function () { // пoсле aнимaции
                    $(this).css('display', 'none');
                    $('#overlay_').fadeOut(400);
                }
            );
        $('#nav_').show();
    });

    $('#edit-body').select(function (e) {
        //var coordinates = XYc.split(',');
        //$('#selected-editor').css('top', coordinates[1] + 'px');
        //$('#selected-editor').css('left', coordinates[0] + 'px');
        //$('#selected-editor').show();
        var sel = getSelected();
        $('#to-edit').html(sel.toString());
    });

    $('#selected-editor-close').click(function () {
        $('#selected-editor').hide();
    });

    $('#bold').click(function () {
        var text = $('#to-edit').text();
        edited = '<b>' + text + '</b>';
        $('#to-edit').text(edited);
    });



////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////SEND LETTER///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

    //Get sourse code

    function GetSourseCode() {
        var letterHTML = $('#letter').html().split('\n').join('').trim().replace(/\s+/g, ' ');
        var cssText = $('#letter').css('cssText');
        var letterAll = '<div style="width:550px;' + cssText + '">' + letterHTML + '</div>';
        return letterAll;
    }

    //var code;
    $('#to-send').click(function () {
        var code = GetSourseCode();
    });

    $('#refresh-souse').click(function () {
        var code = GetSourseCode();
        $('#sourse').val(code);
    });

    $('#get-sourse').click(function () {
        var code = GetSourseCode();
        $('#sourse').val(code);
        $('#sourse').toggle();
    });

   
});