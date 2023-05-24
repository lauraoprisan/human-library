const addStory = document.querySelector("#add-story")
const submitError = document.querySelector(".error-message")
const imgError = document.querySelector(".img-error-text")
if (window.location.pathname.includes('profile') && addStory || window.location.pathname.includes('editStory') || submitError || imgError ){
    //select the country
    window.addEventListener("DOMContentLoaded", ()=>{
        const selectCountry =document.querySelector("#country")
        const countryValue = document.querySelector("#countryChoice").value

        fetch("https://restcountries.com/v3.1/all").then(res => {
            return res.json();
        }).then(data =>{
            let output =   `<option value="">No selection</option>`
            const sorteData = data.sort((a,b)=>a.name.common >b.name.common ? 1 : -1)
            sorteData.forEach((country) => {
          
                    if(countryValue && countryValue == country.name.common){
                        //select the option that has the countryValue and add a selected attribute
                        output += `<option class="possible-country" value="${country.name.common}" selected>${country.name.common}</option>`
                    }else{
                        output += `<option class="possible-country" value="${country.name.common}">${country.name.common}</option>`
                    }
                
                //after i select a country/continent I have to get the option chosen and set the option's value to that
                //if option was clicked, set the option's value to that
                
                selectCountry.innerHTML = output
            })
           
        }).catch(err =>{
            console.log(err)
        })
    }),

  
    //select the continent
    window.addEventListener("DOMContentLoaded", ()=>{
        const selectContinent =document.querySelector("#continent")
        const continentValue = document.querySelector("#continentChoice").value

        fetch("https://restcountries.com/v3.1/all").then(res => {
            return res.json();
        }).then(data =>{
            
            let output = `<option value="">No selection</option>`
            let continentsArr = data.map(obj => obj.continents).flat();
            const uniqueContinents = [...new Set(continentsArr)]
            const sortedContinents = uniqueContinents.sort((a,b)=>a >b ? 1 : -1)

            sortedContinents.forEach(continent => {
                if(continentValue == continent){
                    //select the option that has the countryValue and add a selected attribute
                    output += `<option value="${continent}" selected>${continent}</option>`
                }else{
                    output += `<option value="${continent}">${continent}</option>`
                }
                selectContinent.innerHTML = output
            })
        
        }).catch(err =>{
            console.log(err)
        })
    })
}

// const chosenCountry = querySelectorAll(".possible-country")
// chosenCountry.addEventListener("click", setValue)

const filterCountry = document.querySelector("#filter-country")
const filterContinent = document.querySelector("#filter-continent")
const countryOptions = document.querySelector("#countries-options")
const continentOptions = document.querySelector("#continents-options")

if(filterCountry){
    filterCountry.addEventListener("click", showCountries)
    function showCountries(){
        filterCountry.classList.add("chosen-btn")
        filterContinent.classList.remove("chosen-btn")
        countryOptions.classList.remove("hidden")
        continentOptions.classList.add("hidden")
    }
}

if(filterContinent){
    filterContinent.addEventListener("click", showContinents)
    function showContinents(){
        filterCountry.classList.remove("chosen-btn")
        filterContinent.classList.add("chosen-btn")
        countryOptions.classList.add("hidden")
        continentOptions.classList.remove("hidden")
    }
}


//update image
const updateImgBtn = document.querySelector("#update-image-btn")
const editImageForm = document.querySelector("#edit-image-form")

if(updateImgBtn){
    updateImgBtn.addEventListener("click", showEditImage)
    function showEditImage(){
        editImageForm.classList.remove("hidden")
        console.log("hei")
    }
}



//responsive textarea field

function auto_grow(element) {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight)+"px";
 
}

  // Trigger auto_grow function after the page loads
//   window.addEventListener('load', function() {
//     const textarea = document.querySelector('.edit-textarea');
//     auto_grow(textarea)
//   });


// Mobile filter-sort buttons (show filter/sort section)
const showFilter = document.querySelector("#show-filter")
const showSort = document.querySelector("#show-sort")
const filterSection = document.querySelector("#filter-section")
const sortSection = document.querySelector("#sort-section")
const removeButton = document.querySelector(".remove-options-button")

const hideFilterSort = document.querySelectorAll(".hide-filter-sort")

if(showFilter){
    showFilter.addEventListener("click", ()=>{
        filterSection.classList.add("show")
        removeButton.classList.add("show")
        sortSection.classList.remove("show")
    })
}

if(showSort){
    showSort.addEventListener("click", ()=>{
        filterSection.classList.remove("show")
        removeButton.classList.add("show")
        sortSection.classList.add("show")
    })
}


hideFilterSort.forEach(item => item.addEventListener("click", ()=>{
    filterSection.classList.remove("show")
    removeButton.classList.remove("show")
    sortSection.classList.remove("show")
}))

// JavaScript to handle mobile menu functionality

const hamburgerMenu = document.querySelector(".hamburger-menu")
const mobileMenu = document.querySelector(".mobile-menu")

if(hamburgerMenu){
    hamburgerMenu.addEventListener("click", ()=>{
        hamburgerMenu.classList.toggle("active")
        mobileMenu.classList.toggle("active")
    })
    
}

// Delete popup

const showDeletePopup = document.querySelector(".show-delete-popup ")
const closeDeletePopup = document.querySelectorAll(".delete-popup-button")
const deletePopup = document.querySelector("#delete-popup")

showDeletePopup.addEventListener("click", ()=>{
    deletePopup.classList.toggle("active")
})

closeDeletePopup.forEach(btn => btn.addEventListener("click", ()=>{
    deletePopup.classList.toggle("active")
}))

