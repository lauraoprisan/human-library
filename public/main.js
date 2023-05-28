const addStory = document.querySelector("#add-story")
const submitError = document.querySelector(".error-message")
const imgError = document.querySelector(".img-error-text")


if (window.location.pathname.includes('profile') && addStory || window.location.pathname.includes('editStory') || submitError || imgError ){
    // let automaticContinent;
    // let chosenCountry 

    //select the country
    window.addEventListener("DOMContentLoaded", () => {
        const selectCountry = document.querySelector("#country");
        const countryValue = document.querySelector("#countryChoice").value;
     
        // let automaticContinent;
      
        fetch("https://restcountries.com/v3.1/all")
          .then(res => res.json())
          .then(data => {
            let output = `<option value="">No selection</option>`;
            const sortedData = data.sort((a, b) => (a.name.common > b.name.common ? 1 : -1));
            sortedData.forEach(country => {
              if (countryValue && countryValue == country.name.common) {
                // Select the option that has the countryValue and add a selected attribute
                output += `<option class="possible-country" value="${country.name.common}" selected>${country.name.common}</option>`;
                // continentValue =  country.continents[0]
                selectContinent = country.continents[0]
                console.log("selected continent: " +selectContinent)
                // Store the continent of the country somewhere
                // automaticContinent = country.continents[0];
      
                // let autCont = () => fetch('/story/createStory', {
                //   method: 'POST',
                //   headers: {
                //     'Content-Type': 'application/json'
                //   },
                //   body: JSON.stringify({
                //     'continentFromJs': automaticContinent
                //   })
                // })
                //   .then(response => response.json())
                //   .then(data => {
                //     console.log(data);
                //   })
                //   .catch(error => {
                //     console.error('Error:', error);
                //   });

                //   autCont()
              } else {
                output += `<option class="possible-country" value="${country.name.common}">${country.name.common}</option>`;
              }
            });
      
            // Update the select element with the generated options
            selectCountry.innerHTML = output;
          })
          .catch(err => {
            console.log(err);
          });
      });
  
    //select the continent

    // const chosenCountryValue = document.querySelector("#countryChoice").value;
    // const selectContinent =document.querySelector("#continent")
    // const continentValue = document.querySelector("#continentChoice").value
    // let output = `<option value="">No selection</option>`

    // chosenCountryValue.addEventListener('onchange', ()=>{
    //     continentValue = chosenCountryValue
    // })


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

            // let automaticContinent;
            // data.forEach(country => {
            //     if(country.name.common == chosenCountry){
            //         automaticContinent = country.continents[0]
            //     }
            // })
            

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

// Delete story popup

const showDeleteStoryPopup = document.querySelector(".show-delete-story-popup ")
const closeDeleteStoryPopup = document.querySelectorAll(".delete-story-popup-button")
const deleteStoryPopup = document.querySelector("#delete-story-popup")

if(showDeleteStoryPopup){
    showDeleteStoryPopup.addEventListener("click", ()=>{
        deleteStoryPopup.classList.toggle("active")
    })
}

if(closeDeleteStoryPopup){
    closeDeleteStoryPopup.forEach(btn => btn.addEventListener("click", ()=>{
        deleteStoryPopup.classList.toggle("active")
    }))
    
}

// Delete comment popup

const showDeleteCommentPopup = document.querySelectorAll(".show-delete-comment-popup");
const closeDeleteCommentPopup = document.querySelectorAll(".delete-comment-popup-button");

if (showDeleteCommentPopup) {
  showDeleteCommentPopup.forEach(el => {
    el.addEventListener("click", () => {
      let deleteCommentPopup = el.closest(".comment-options").nextElementSibling;
      console.log(deleteCommentPopup)
      deleteCommentPopup.classList.toggle("active");
    });
  });
}

if (closeDeleteCommentPopup) {
  closeDeleteCommentPopup.forEach((btn) => {
    btn.addEventListener("click", () => {
      let deleteCommentPopup = btn.closest(".delete-comment-popup");
      deleteCommentPopup.classList.toggle("active");
    });
  });
}


// const test = document.querySelector(".test")

// test.addEventListener("click", sendData)

// async function sendData(){
//     fetch('/story/createStory', {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//         'testData': "teeeeest"
//         })
//     })
//         .then(response => response.json())
//         .then(data => {
//         console.log(data);
//         })
//         .catch(error => {
//         console.error('Error:', error);
//         });
// }

const viewedStoryTrigger = document.querySelectorAll(".viewed")
Array.from(viewedStoryTrigger).forEach((el)=>{
    el.addEventListener('click', viewedStory)
})

// async function viewedStory(){
//     const id = viewedStoryTrigger.dataset.id
//     console.log("from viewed js")
//     try{
//         const response = await fetch('story/viewedStory', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'idFromJs': id
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

// Make the PUT request to mark the post as viewed
// function viewedStory(){
//     const id = viewedStoryTrigger.dataset.id
//     fetch(`story/viewedStory`, {
//         method: 'PUT',
//         body: JSON.stringify({
//                             'idFromJs': id
//                         })
        
//       })
//         .then(response => response.json())
//         .then(data => {
//           // Handle the response data, e.g., display a success message
//           console.log('Post marked as viewed:', data);
//         })
//         .catch(error => {
//           console.error('Error:', error);
//         });
// }

//  show/hide comments options


const showCommentOptions = document.querySelectorAll(".show-comment-options");

if (showCommentOptions) {
  showCommentOptions.forEach((showOption) => {
    showOption.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent the click event from bubbling up

      // Close comment-options in other li elements
      const allCommentOptions = document.querySelectorAll('.comment-options');
      allCommentOptions.forEach((option) => {
        if (option !== showOption.nextElementSibling) {
          option.classList.add('hidden');
        }
      });

      // Toggle comment-options in the clicked li element
      const parentComment = showOption.closest('.single-comment');
      const commentOptions = parentComment.querySelector('.comment-options');
      commentOptions.classList.toggle('hidden');
    });
  });

  document.addEventListener('click', (event) => {
      const commentOptions = document.querySelectorAll('.comment-options');
      commentOptions.forEach(el => el.classList.add("hidden"))
  });
}


//is this better/different?
// const showCommentOptions = document.querySelectorAll(".show-comment-options");

// if (showCommentOptions) {
//   showCommentOptions.forEach((showOption) => {
//     showOption.addEventListener('click', (event) => {
//       event.stopPropagation(); // Prevent the click event from bubbling up
//       const parentComment = showOption.closest('.single-comment');
//       const commentOptions = parentComment.querySelector('.comment-options');
//       commentOptions.classList.toggle('hidden');
//     });
//   });

//   document.addEventListener('click', (event) => {
//     showCommentOptions.forEach((showOption) => {
//       const parentComment = showOption.closest('.single-comment');
//       const commentOptions = parentComment.querySelector('.comment-options');
//       if (!commentOptions.contains(event.target) && !showOption.contains(event.target)) {
//         commentOptions.classList.add('hidden');
//       }
//     });
//   });
// }


