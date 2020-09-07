$( document ).ready(function() {
	$( function() {
        
        window.onscroll = function() {myFunction()};

        var home = document.getElementById("home");
        var portfolio = document.getElementById("portfolio");
        var about = document.getElementById("about");
        var contact = document.getElementById("contact");
        var resume = document.getElementById("resume");

        var homeSticky = home.offsetTop;
        var portfolioSticky = portfolio.offsetTop;
        var aboutSticky = about.offsetTop;
        var contactSticky = contact.offsetTop;
        var resumeSticky = resume.offsetTop;

        function myFunction() {
            if (window.pageYOffset < aboutSticky) {
                $(".navlist").removeClass("selected");
                $(".navlist:eq(0)").addClass("selected");
            } else if(window.pageYOffset > homeSticky && window.pageYOffset < portfolioSticky){
                $(".navlist").removeClass("selected");
                $(".navlist:eq(1)").addClass("selected");
            } else if(window.pageYOffset > aboutSticky && window.pageYOffset < resumeSticky) {
                $(".navlist").removeClass("selected");
                $(".navlist:eq(2)").addClass("selected");
            } else if(window.pageYOffset > portfolioSticky && window.pageYOffset < contactSticky) {
                $(".navlist").removeClass("selected");
                $(".navlist:eq(3)").addClass("selected");
            } else if(window.pageYOffset >= contactSticky) {
                $(".navlist").removeClass("selected");
                $(".navlist:eq(4)").addClass("selected");
            }
        }

    });
});


