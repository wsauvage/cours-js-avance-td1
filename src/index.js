import adresses from '../data/adresses.json' assert { type: 'json' };
import { slugify } from './modules/utils.mjs'
import * as BulmaModal from './modules/bulma-modals.mjs'


window.onload = () => {

    BulmaModal.initModals()

    let searchInput = document.querySelector('#searchInput');
    //let searchInput = document.getElementById('searchInput');
    let searchButton = document.querySelector('#searchButton');
    let output = document.querySelector('#output');

    // console.log(searchButton)
    // searchButton.addEventListener("click", function (event) {
    //     console.log(event.currentTarget)
    // });

    searchButton.addEventListener("click", event => {
        let query = searchInput.value
        let results = search(query)
        output.innerHTML = ''
        results.map(result => {
            appendResultElement(result, output)
        })
    });

};


const search = query => {

    let results = [];
    adresses.map(adresse => {

        if (slugify(adresse.label).includes(slugify(query))) {
            results.push(adresse)
        }
    })

    return results
}

// En créant les éléments un par un
const appendResultElement = (adresse, output) => {

    let column = document.createElement("div");
    column.classList.add("column");
    column.classList.add("is-4-on-widescreen");
    let card = document.createElement("div");
    card.classList.add("card");
    let cardHeader = document.createElement("header");
    cardHeader.classList.add("card-header");
    let cardTitle = document.createElement("p");
    cardTitle.classList.add("card-header-title");
    cardTitle.innerHTML = adresse.label
    let cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
    let content = document.createElement("div");
    content.classList.add("content");
    content.innerHTML = `
    <ul>
        <li>City : ${adresse.city}</li>
        <li>PostCode : ${adresse.postcode}</li>
        <li>Context : ${adresse.context}</li>
    </ul>
    `;

    let cardFooter = document.createElement("footer")
    cardFooter.classList.add("card-footer")
    let saveButton = document.createElement("a")
    saveButton.classList.add("card-footer-item")
    saveButton.innerHTML = "Save"

    cardHeader.appendChild(cardTitle)
    cardContent.appendChild(content)
    cardFooter.appendChild(saveButton)
    card.appendChild(cardHeader)
    card.appendChild(cardContent)
    card.appendChild(cardFooter)
    column.appendChild(card)
    output.appendChild(column)

    //EventLiteners
    saveButton.addEventListener("click", (event) => {
        const modalTarget = document.getElementById("modal-save-address");
        let modalTitle = modalTarget.querySelector(".modal-card-title")
        let modalContent = modalTarget.querySelector(".modal-card-body")
        modalTitle.innerHTML = adresse.label
        modalContent.innerHTML = content.innerHTML
        BulmaModal.openModal(modalTarget);
    });

}

// En utilisant les litéraux de gabarits (string interpolation)
const appendResultElement2 = (adresse, output) => {
    let column = document.createElement("div");
    column.innerHTML = `
    <div class="column is-4-on-widescreen">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">${adresse.label}</p>
            </header>
            <div class="card-content">
                <div class="content">
                    <ul>
                        <li>City : ${adresse.city}</li>
                        <li>PostCode : ${adresse.postcode}</li>
                        <li>Context : ${adresse.context}</li>
                    </ul>
                </div>
            </div>
            <footer class="card-footer">
                <a class="card-footer-item">Save</a>
            </footer>
        </div>
    </div>
    `;

    output.appendChild(column)
}



