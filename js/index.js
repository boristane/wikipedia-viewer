$("document").ready(function(){

    UI = {
        searchBar: $("#search"),
        searchBtn: $("#search-submit"),
        searchArea: $(".main"),
        resultsContainer: $(".results-container"),
        form: $("form"),
        resultsVisible: false
    }

    initialisePage();

    function showSearchBar(){
        UI.searchBar.animate({width: "100%"}, 200);
        UI.searchBar.css("border-bottom","1px solid grey");
        UI.searchBar.focus(); 
    }

    function hideSearchBar(){
        UI.searchBar.animate({width: "0%"}, 200);
        UI.searchBar.css("border-bottom","none");
        UI.searchBtn.focus();
        UI.resultsVisible = false;
    }

    UI.searchBtn.click(function(e){
        e.preventDefault();
        if(UI.searchBar.val() === ""){
            if(UI.searchBar.width() === 0){
                showSearchBar();    
            }
        }else{
            showResults(UI.searchBar.val());
        }
    });

    UI.form.submit(function(e){
        e.preventDefault();
        if(UI.searchBar.val() === ""){
            if(UI.searchBar.width() === 0){
                showSearchBar();    
            }
        }else{
            showResults(UI.searchBar.val());
        }
    });

    UI.searchBar.blur(function(e){
        e.preventDefault();
        if(UI.searchBar.val() === ""){
            hideSearchBar();
            clearResults();
            UI.searchArea.animate({marginTop: "15%"}, 600);
        }
    });


    function initialisePage(){
        for(var i = 0; i < 10; i++){
            var linkContainer = document.createElement("a");
            var divElt = document.createElement("div");
            var titleElt = document.createElement("h2");
            var linkElt = document.createElement("a");
            var snippetElt = document.createElement("p");
            linkContainer.classList.add("link-container");
            divElt.classList.add("result-box");
            linkElt.classList.add("title");
            snippetElt.classList.add("description");
            titleElt.classList.add("foo");
            titleElt.appendChild(linkElt);
            divElt.appendChild(titleElt);
            divElt.appendChild(snippetElt);
            linkContainer.appendChild(divElt);
            UI.resultsContainer.append(linkContainer);
        }

        UI.resultBoxes = $(".result-box");
        UI.titles = $(".title");
        UI.descriptions = $(".description");
        UI.linkContainers = $(".link-container");

        if($(document).width() < 600) {
            UI.searchBar.attr("placeholder", "Yes ?");
        }
    }

    function addResult(obj, pos){
        UI.titles[pos].textContent = obj.title;
        UI.titles[pos].setAttribute("href", "https://en.wikipedia.org/?curid=" + obj.pageid);
        UI.titles[pos].setAttribute("target", "_blank");
        UI.linkContainers[pos].setAttribute("href", "https://en.wikipedia.org/?curid=" + obj.pageid);
        UI.linkContainers[pos].setAttribute("target", "_blank");

        
        UI.descriptions[pos].innerHTML = processSnippet(obj.snippet); 
        
        setTimeout(function(){
            $(UI.resultBoxes[pos]).fadeIn(400);
        }, 300*pos);


        function processSnippet(snippet){
            var description = obj.snippet.split(".");
            if(description.length > 1) description.pop();
            else return description[0] + "...";

            return description.reduce(function(acc, elt){
                return acc+elt;
            }) + ".";
        }
    }

    function clearResults(){
        UI.resultBoxes.each(function(index, elt){
            $(elt).fadeOut(400);
        });
    }

    function showResults(word){
        clearResults();
        if(!UI.resultsVisible){
            UI.searchArea.animate({marginTop: "0"}, 1000);
        }
        setTimeout(function(){
            wikiSearch(word, function(results){
                var pos = 0;
                results.forEach(function(elt){
                    addResult(elt,pos);
                    pos++;
                });
            });
            UI.resultsVisible = true;
        }, 400);
    }

    

});

function wikiSearch(word, callback){
    var wikiAPI = "https://en.wikipedia.org/w/api.php?";
    var callURL = wikiAPI + "action=query&format=json&list=search&utf8=1&srsearch=" + encodeURIComponent(word) + "&srlimit=10&origin=*";
    $.getJSON(callURL, function(data){
        callback(data.query.search);
    }); 
}


