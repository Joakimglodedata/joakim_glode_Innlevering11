const sel = (selector) => document.querySelector(selector);
const con = (selector) => console.log(selector);



const loadingGif = sel("#loadingGif")
const loadB = sel("#loadB")
const loadDisplay = sel("#loadDisplay")
const colour = sel("#colour")

loadingGif.style.display = "none"
loadDisplay.style.display = "none"

loadB.addEventListener("click", function() {  // Brukte orgiginalt new Promise((resolve) => men ser at fetch fungerer som ein promise av seg selv 
    const fetchData = fetch("https://emojihub.yurace.pro/api/all/group/animal-marine") //"https://randomfox.ca/floof/"
    console.log(fetchData)
    loadingGif.style.display = "block"
 
    fetchData.finally(() => {loadingGif.style.display = "none", con("finally works")  })
    fetchData.then((response) => response.json())
    .then((data) => {console.log(data) 
        loadDisplay.src = `${data.image}`
    })
    .then(loadDisplay.style.display = "block")
    })

colour.addEventListener("click", randomColour)

function randomColour() {
    document.documentElement.style.setProperty('--prim-clr', `hsl(${Math.random() * 360}, 62%, 45%)`);
    document.documentElement.style.setProperty('--sec-clr', `hsl(${Math.random() * 360}, 67%, 41%)`);
    document.documentElement.style.setProperty('--back-clr', `hsl(${Math.random() * 360}, 29%, 9%)`);
}
randomColour()
    

