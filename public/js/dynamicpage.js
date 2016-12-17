$(function() {

    var newHash      = "",
    $mainContent = $(".utama");

    
    
    $("body").delegate("a.link", "click", function() {
        _link = $(this).attr("href");
        history.pushState(null, null, _link);
        loadContent(_link);

        return false;
    });

    function loadContent(href){
        console.log(href);
        $mainContent
        .find("#isi")
        .fadeOut(200, function() {
            $mainContent.hide().load(href + "", function() {
                $mainContent.fadeIn(200, function() {
                 
                });
                        // $("#main-menu li").removeClass("active");
                        // $("#main-menu li a[href=\""+href+"\"]").closest('li').addClass("active");

                    });
        });
    }
    
    $(window).bind('popstate', function(){
       _link = location.pathname.replace(/[\\\/]/, ''); 
       console.log('asdasd'+_link);

       loadContent("/"+_link);
   });



    
});