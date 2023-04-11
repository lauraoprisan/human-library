const addStory = document.querySelector("#add-story")
if (window.location.pathname.includes('profile') && addStory || window.location.pathname.includes('editStory') ){
    //select the country
    window.addEventListener("DOMContentLoaded", ()=>{
        const selectCountry =document.querySelector("#country")
    
        fetch("https://restcountries.com/v3.1/all").then(res => {
            return res.json();
        }).then(data =>{
            let output =   `<option value="">No selection</option>`
            const sorteData = data.sort((a,b)=>a.name.common >b.name.common ? 1 : -1)
            sorteData.forEach((country) => {
                output += `<option value="${country.name.common}">${country.name.common}</option>`
                selectCountry.innerHTML = output
            })
        }).catch(err =>{
            console.log(err)
        })
    }),

    //select the continent
    window.addEventListener("DOMContentLoaded", ()=>{
        const selectContinent =document.querySelector("#continent")

        fetch("https://restcountries.com/v3.1/all").then(res => {
            return res.json();
        }).then(data =>{
            
            let output = `<option value="">No selection</option>`
            let continentsArr = data.map(obj => obj.continents).flat();
            const uniqueContinents = [...new Set(continentsArr)]
            const sortedContinents = uniqueContinents.sort((a,b)=>a >b ? 1 : -1)

            sortedContinents.forEach(continent => {
                output += `<option value="${continent}" >${continent}</option>`
                selectContinent.innerHTML = output
            })
        
        }).catch(err =>{
            console.log(err)
        })
    })
}


