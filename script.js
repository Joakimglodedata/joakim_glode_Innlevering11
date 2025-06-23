const sel = (selector) => document.querySelector(selector);
const con = (selector) => console.log(selector);

// diverse elementer fra HTML dokumentet som blir brukt i JS
const loadingGif = sel("#loadingGif")
const loadB = sel("#loadB")
const colour = sel("#colour")
const container = sel("#container")

loadingGif.style.display = "none"

loadB.addEventListener("click", function() {  // Brukte orgiginalt new Promise((resolve) => men ser at fetch fungerer som ein promise av seg selv 
    // Henter info fra ein API som har kategorisert emoji's, skaper ein liste av alle kategoriene og velger tilfeldig ut ein av dem som vi fetcher
    // Eit stort problem er at kategoriene er meget forskjellige i størrelse, man kan få under 10 element eller over 100 som nær fryser siden på denne dataen, kunne sette ein limit på kor mange element som blir generert men det får våge seg
    const suffix = ["body", "cat-face", "clothing", "creature-face", "emotion", "face-negative", "face-neutral", "face-positive", "face-positive", "face-role", "face-sick", "family", "monkey-face", "person", "person-activity", "person-gesture", "person-role", "skin-tone", "travel-and-places", "activities", "objects", "symbols", "flags", "animal-amphibian", "animal-bird", "animal-bug", "animal-mammal", "animal-marine", "animal-reptile", "plant-flower", "plant-other"]
    const randomSuffix = suffix[Math.floor(Math.random() * (suffix.length))]
    console.log(randomSuffix)
    const fetchData = fetch("https://emojihub.yurace.pro/api/all/group/" + randomSuffix)
    console.log(fetchData)
    loadingGif.style.display = "block" // Bringer fram eit vente ikon 
 
    fetchData.finally(() => {loadingGif.style.display = "none", con("finally works")}) // Kjører når eg har fått data fra .fetch skjuler vente ikonet
    fetchData.then((response) => response.json()) // Kjører når .fetch har fått eit resultat, kan sette det opp til å ha fleire resultat ut kor lang tid fetch tar etc men eg har bare satsa på at det alltid skal fungere
    .then((data) => {console.log(data) // Bruker dataen eg fekk fra andre nettsiden og lager tekst elementer for kvar index i array'en dei gjir
        data.forEach(element => { const item = document.createElement("p");
        item.innerHTML = element.htmlCode
        item.style.position = "fixed"
        item.style.filter = "hue-rotate(" + Math.floor(Math.random() * 360) + "deg)";
        item.style.fontSize = "150px"
        item.style.opacity = "0%"
        container.appendChild(item) // bruker appendchild for å få p-elementet inn i dokumentet, strengt tatt er det ingen nødvendighet i å ha verken container eller å bruke appendchild metoden siden den relasjonen til container gjør ikkje noe meiningsfult for p-elemntet som blir lagd
        item.animate( // legger til animasjon
            [
                {bottom: "-20%", left: (Math.random() * 10) + 40 + "%", opacity: "100%"},
                {bottom: "80%", opacity: "0%", rotate: "1260deg", left: (Math.random() * 150) + "%"}
            ],
            {
              duration: 1000,
              iterations: 1,
            },
          );
        setTimeout(() => { // Funksjon for å slette elementene som blir skapt etter dei har ekistert for 1 sekund
              item.remove();
          }, 1000);

        });
    })
    })

colour.addEventListener("click", randomColour) // Knapp for om man hater dei nåværende fargene

function randomColour() { // Funksjonen som setter fargene til å være tilfeldig, bevarer saturation og light verdiene så siden ikkje blir for kratig regnbue spy
    document.documentElement.style.setProperty('--prim-clr', `hsl(${Math.random() * 360}, 62%, 45%)`);
    document.documentElement.style.setProperty('--sec-clr', `hsl(${Math.random() * 360}, 67%, 35%)`);
    document.documentElement.style.setProperty('--back-clr', `hsl(${Math.random() * 360}, 29%, 9%)`);
}

randomColour()
setInterval(randomColour, 10000)
