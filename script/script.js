
document.getElementById("searchSubmit").addEventListener("click", function(event){
    event.preventDefault();
    const value = document.getElementById("searchInput").value;
    if (value === "")
      return;
    const url= "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=" + value;
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tasty.p.rapidapi.com",
            "x-rapidapi-key": "45d4a74d13mshb70795bd3ccfae2p183516jsn3d09eed6db83"
        }
    })
    .then(function(response) {
        return response.json();
      }).then(function(json) {
        
        let recipeNum = 1;
        let entered = false;
        for(let j=0; j < json.results.length; j++){
            if(recipeNum == 12){ break;}
            if(json.results[j].hasOwnProperty('is_shoppable')){
                if(json.results[j].is_shoppable){
                    entered = true;
                    let currentrecipe = "recipe" + recipeNum;
    
                    let content = "<h4>"+ json.results[j].name + "</h4>";
                    content+= "<p>" + json.results[j].yields + "<p>";
                    let id = json.results[j].id;

       
                    content += "<button data-modal-target=\"#modal\" id=\""+currentrecipe + "-button\" class=\"btn btn-primary\" value=\"" +id +  "\">Get<i class=\"fa fa-angle-right\"></i></button>";
                    let recipeThumbnail = "<img src=\"" + json.results[j].thumbnail_url + "\" class=\"img-fluid\" alt=\"\" >";

                    if(content == null){document.getElementById(currentrecipe + "-content").innerHTML = "sorry, no results";
                return;}
                    document.getElementById(currentrecipe + "-content").innerHTML = content;
                    document.getElementById(currentrecipe + "-image").innerHTML = recipeThumbnail;
                    
                    document.getElementById("carouselInner").style.display = 'block';
                    recipeNum++;
                }       
            }  
        }
        if(!entered){
            let errormessage = "<h4>Sorry, Try a different keyword.</h4>";
            document.getElementById("error-message").innerHTML = errormessage;
        }
        for(let i = recipeNum; i < 10; i++){
            let currentRecipe = "recipe" + i;
            document.getElementById(currentRecipe).style.display = 'none';
        }

        document.getElementById("recipe1-button").addEventListener("click", function(event){
            event.preventDefault();
            const id = document.getElementById("recipe1-button").value;
            getList(id);
        });

        document.getElementById("recipe2-button").addEventListener("click", function(event){
            event.preventDefault();
            const id = document.getElementById("recipe2-button").value;
            getList(id);
        });
        document.getElementById("recipe3-button").addEventListener("click", function(event){
            event.preventDefault();
            const id = document.getElementById("recipe3-button").value;
            getList(id);
        });
        document.getElementById("recipe4-button").addEventListener("click", function(event){
            event.preventDefault();
            const id = document.getElementById("recipe4-button").value;
            getList(id);
        });
        document.getElementById("recipe5-button").addEventListener("click", function(event){
            event.preventDefault();
            const id = document.getElementById("recipe5-button").value;
            getList(id);
        });
        document.getElementById("recipe6-button").addEventListener("click", function(event){
            event.preventDefault();
            const id = document.getElementById("recipe6-button").value;
            getList(id);
        });
        document.getElementById("recipe7-button").addEventListener("click", function(event){
            event.preventDefault();
            const id = document.getElementById("recipe7-button").value;
            getList(id);
        });
        document.getElementById("recipe8-button").addEventListener("click", function(event){
            event.preventDefault();
            const id = document.getElementById("recipe8-button").value;
            getList(id);
        });
        document.getElementById("recipe9-button").addEventListener("click", function(event){
            event.preventDefault();
            const id = document.getElementById("recipe9-button").value;
            getList(id);
        });
      });
})



function getList(id){
    
    fetch("https://tasty.p.rapidapi.com/recipes/detail?id=" + id, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tasty.p.rapidapi.com",
		"x-rapidapi-key": "45d4a74d13mshb70795bd3ccfae2p183516jsn3d09eed6db83"
	}
})
.then(function(response) {
    return response.json();
  }).then(function(json) {
    let ingredients = "";
    let header = "<a href=\"#\">print</a> <a href=\"#\">share</a><a href=\"#\">copy</a>";
    let title = "<h1>" +json.name + "<h1>";
    if(json.sections.length == 1){
        for(let j = 0; j < json.sections[0].components.length; j++){
            ingredients += "<p>" + json.sections[0].components[j].raw_text + "<p>";
        }
    }
    else{
        for(let i = 0; i < json.sections.length; i++){
            ingredients += "<h2>" +json.sections[i].name + "<h2>";
            for(let j = 0; j < json.sections[i].components.length; j++){
                ingredients += "<p>" + json.sections[i].components[j].raw_text + "<p>";
            }
        }
    }
    
    document.getElementById("list-header").innerHTML = header;
    document.getElementById("list-title").innerHTML = title;
    document.getElementById("recipe-list").innerHTML = ingredients;

    

  });
    
    
}


const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overylay = document.getElementById('overlay');

openModalButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

closeModalButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        const modal = button.closest('.mod')
        closeModal(modal)
    })
})

function openModal(modal){
    if(modal == null) return
    modal.classList.add('active')
    overylay.classList.add('active')
}
function closeModal(modal){
    if(modal == null) return
    modal.classList.remove('active')
    overylay.classList.remove('active')
}