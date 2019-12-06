//importar lib axios
const axios = require('axios');

class App {
    constructor(){
        this.buttonCreate = document.getElementById("btn_create");
        this.title = document.getElementById("input_title");
        this.content = document.getElementById("input_content");
        this.getScraps(this);
        this.registerEvents();
    }

    registerEvents() {
        this.buttonCreate.onclick = (event) => this.createCard(event);
    }

    //pegar os cards (GET)
    getScraps(app){
        //fazer as chamadas do POSTMAN
        axios.get('http://localhost:3333/cards')
        .then(function(response){
            // console.log(app);
            app.recoveryScraps(response.data);
            // this.recoveryScraps(response.data);
            // console.log(response.data)
            // console.log(response);
        })
        .catch(function(error){
            console.log(error);
        })
        .finally(function(){

        });
    }

    //quando executar o THEN do getScraps, vai passar a DATA pro recoveryScraps
    recoveryScraps(data){
        console.log(data);
        for(item of data){

        }
    }

    createCard(event) {
        event.preventDefault();

        if(this.title.value && this.content.value) {
            const html = this.cardLayout(this.title.value, this.content.value);

            this.insertHtml(html);

            this.clearForm();

            document.querySelectorAll('.delete-card').forEach(item => {
                item.onclick = event => this.deleteCard(event);
            });

        } else {
            alert("Preencha os campos!");
        }
    }

    cardLayout(title, content) {
        const html = `
            <div class="col mt-5">
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${content}</p>
                    <button type="button" class="btn btn-danger delete-card">Excluir</button>
                    </div>
                </div>
            </div>
        `;

        return html;
    }

    insertHtml(html) {
        document.getElementById("row_cards").innerHTML += html;
    }

    clearForm() {
        this.title.value = "";
        this.content.value = "";
    }

    deleteCard = (event) => event.path[3].remove();

}

new App();