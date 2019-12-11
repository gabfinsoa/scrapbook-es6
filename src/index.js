//importar lib axios (Permite realizar requisicoes para fora do projeto atraves de request)
const axios = require('axios');


class App {
    constructor(){
        this.buttonCreate = document.getElementById("btn_create");
        this.title = document.getElementById("input_title");
        this.content = document.getElementById("input_content");
        //Trazer os recados ao iniciar a aplicacao
        this.getScraps(this); //O THIS passa a aplicação correta
        this.registerEvents();
    }

    registerEvents() {
        this.buttonCreate.onclick = (event) => this.createCard(event);
    }


    // LINK HEROKU
    // https://api-scrapbook-js-es6.herokuapp.com/

    // LINK POSTMAN
    // http://localhost:3333/cards/


    // postScraps(titulo,conteudo){
    //     axios.post('http://localhost:3333/cards/', {
    //         title: titulo,
    //         content: conteudo
            
    //       })
    //       .then(function (response) {
    //         console.log(response.data);
            
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });

    // }

    // Funcao p/ pegar os RECADOS/CARDS (GET). APP é o nome criado p/ o THIS do construtor
    getScraps(app){
        //Pegar a constante e fazer as chamadas do POSTMAN (API Node)
        axios.get('https://api-scrapbook-js-es6.herokuapp.com/cards')
        .then(function(response){
            // console.log(app);

            //Passando o DATA p/ a funcao recoveryScraps
            app.recoveryScraps(response.data);

            // this.recoveryScraps(response.data);
            // console.log(response.data) //Retorna soh o DATA do objeto
            // console.log(response); //Rerorna todo o objeto
        })
        .catch(function(error){
            console.log(error);
        })
        .finally(function(){

        });
    }

    //quando executar o THEN do getScraps, vai passar o DATA pro recoveryScraps
    recoveryScraps(data){
        // //Retorna o array de objetos (cards)
        // console.log(data);
        //Percorre o array de objetos (cards)
        for(item of data){ //dentro de ITEM há as propriedades ID, TITLE e CONTENT
            
            //Reaproveitar as funcoes que possuem as mesmas propriedades de ITEM
            const retornaHtml = this.cardLayout(item.id, item.title, item.content)

            // //Testando se o html esta sendo retornado
            // console.log(retornaHtml);

            //Inserir o HTML no front
            this.insertHtml(retornaHtml);

            //Inserir tambem o evendo do botao de DELETAR do card
            document.querySelectorAll('.delete-card').forEach(item => {
                item.onclick = event => this.deleteCard(event);
            });
        }
    }

    createCard(event) {
        event.preventDefault();

        if(this.title.value && this.content.value) {
            this.sendToServer(this);
        } else {
            alert("Preencha os campos!");
        }
    }
    
    sendToServer(app) {
        
        axios.post(`https://api-scrapbook-js-es6.herokuapp.com/cards`, {
            title: this.title.value,
            content: this.content.value
        })
        .then(function (response) {
            //Recebe o ID, TITLE e CONTENT p/ utilizar no HTML
            const {id, title, content} = response.data;
            console.log(response.data);
            let html = app.cardLayout(id, title, content);

            app.insertHtml(html);

            app.clearForm();

            document.querySelectorAll('.delete-card').forEach(item => {
                item.onclick = event => app.deleteCard(event);
            });

        })
        .catch(function (error) {
            console.log(error);
            alert("Ops! Tente novamente mais tarde.");
        })
        .finally(function () {
        });
    }

    cardLayout(id, title, content) {
        const html = `
            <div class="col mt-5" scrap="${id}">
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

    deleteCard = (event) => {
        const id = event.path[3].getAttribute('scrap');
        
        axios.delete(`https://api-scrapbook-js-es6.herokuapp.com/cards/${id}`)
            .then(function (response) {
                event.path[3].remove();
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
    };

}

new App();