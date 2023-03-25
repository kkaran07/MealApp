let input = document.querySelector('.meal-input');
let mealList = document.querySelector('#list');
let errorText = document.querySelector('#error-text');
let submit = document.querySelector('.search');
let random = document.querySelector('.random');
let favList = document.querySelector('.fav-list');
let greet = document.querySelector('#greet');


submit.addEventListener('click' , function(){
    if(input.value.length === 0){
        errorText.innerHTML = 'Input can not be Empty !!!';
        mealList.innerHTML='';
        greet.innerHTML='';
        return;
    }
   getMealList();

});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = input.value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        // console.log(data.meals);
        if(data.meals){
            data.meals.forEach(meal => {  //this idMeal,strMealThumb is taken from json response from mealDB

                html += `                                                            
                
                    <div class = "meal-item" data-id = "${meal.idMeal}">                          
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">

                            <h3>${meal.strMeal}</h3> 
                            <button class="add" onclick="addList(${meal.idMeal})">
                            ADD To Favourite
                            </button>
                            <p id="inst">${meal.strInstructions}</p>
                        </div>
                        
                    </div>
                
                `;
            });
            greeting();
            errorText.innerHTML = '';
            mealList.classList.remove('notFound');
        } else{
            errorText.innerHTML = '';
            html = "!!! Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}





function greeting(){
    greet.innerHTML = '<---  Made by @Karan Kumar With Coding Ninjas  --->';
    return;
}





// random search food item
random.addEventListener('click' , function(e){

    e.preventDefault();
    mealList.innerHTML = '';
    input.value ='';
    errorText.innerHTML = '';
    for(let i =0 ; i<20 ;i++ ){
        
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(data => {
			let html = '';
            // console.log(data.meals);
            if(data.meals){
            data.meals.forEach(meal => { 
                    html +=  `  <div class = "meal-item" data-id = "${meal.idMeal}">                          
                                    <div class = "meal-img">
                                        <img src = "${meal.strMealThumb}" alt = "food">
                                    </div>
                                    <div class = "meal-name" id="back">
                                        <h3>${meal.strMeal}</h3>
                                        <button class="add" onclick="addList(${meal.idMeal})">
                                        ADD To Favourite Meals
                                        </button>
                                        <p id="inst">${meal.strInstructions}</p>
                                    </div>
                               </div>
                    `;           

                    });

            }

            greeting();
            mealList.innerHTML += html;
		});
    }
    
});




// now favourite list button starts here

function addList(meal){

    // console.log(meal);

    // here this meal is the id of the meal

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        let html = ''; 
        data.meals.forEach(meal => {
                html +=  ` <li class="list-item" id="${meal.idMeal}">
                            <div class = "meal-item" data-id = "${meal.idMeal}">                          
                                <div class = "meal-img">
                                    <img src = "${meal.strMealThumb}" alt = "food">
                                </div>
                                <div class = "meal-name" id="back">
                                    <h3>${meal.strMeal}</h3>
                                    <button class="delete" onclick="deleteList(${meal.idMeal})">
                                    Delete 
                                    </button>
                                    <p id="inst">${meal.strInstructions}</p>
                                </div>
                            </div>
                            </li>
                `;     
                favList.innerHTML +=  html ;     
        });
    });

}



//Delete from favourite meals
function deleteList(meal){                                             //here 'meal' is just a meal id passed by addlist function to here
    let delList = document.getElementById(`${meal}`);
    // console.log(delList);
    favList.removeChild(delList);
}



