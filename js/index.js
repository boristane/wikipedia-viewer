$("document").ready(function(){

    UI = {
        searchBar: $("#search"),
        searchBtn: $("#search-submit"),
        allResults: $(".all-results"),
        barToggled: true,
    }

    function showSearchBar(){
        UI.searchBar.animate({width: "100%"}, 200);
        UI.searchBar.css("border-bottom","1px solid grey");
        UI.searchBar.focus(); 
    }

    function hideSearchBar(){
        UI.searchBar.animate({width: "0%"}, 200);
        UI.searchBar.css("border-bottom","none");
        UI.searchBtn.focus();
    }

    UI.searchBtn.click(function(e){
        e.preventDefault();

        if(UI.searchBar.val() === ""){
            UI.barToggled = !UI.barToggled;
            if(UI.barToggled === false){
                showSearchBar();    
            }
        }else{
            UI.allResults.fadeIn();

        }
    });

    UI.searchBar.blur(function(e){
        e.preventDefault()
        if(UI.searchBar.val() === ""){
            hideSearchBar();
            UI.allResults.fadeOut();
        }

    });


});
