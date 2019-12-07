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

    // deleteScrap(){
    //     axios.delete('http://localhost:3333/cards/', {
    //         params: { id: 1 } })
    //         .then(response => {
    //             console.log(response);
    //         });
    // }

    postScraps(titulo,conteudo){
        axios.post('http://localhost:3333/cards/', {
            title: titulo,
            content: conteudo
            // title: 'Fred',
            // content: 'Flintstone'
            // topic: 'topic',
            // logs: fakeData
          })
          .then(function (response) {
            console.log(response.data);
            
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    // Funcao p/ pegar os RECADOS/CARDS (GET). APP é o nome criado p/ o THIS do construtor
    getScraps(app){
        //Pegar a constante e fazer as chamadas do POSTMAN (API Node)
        axios.get('http://localhost:3333/cards')
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
        for(item of data){ //dentro de ITEM ha as propriedades ID, TITLE e CONTENT
            
            //Reaproveitar as funcoes que possuem as mesmas propriedades de ITEM
            const retornaHtml = this.cardLayout(item.title, item.content)

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
            const html = this.cardLayout(this.title.value, this.content.value);

            this.postScraps(this.title.value, this.content.value);
            this.insertHtml(html);

            this.clearForm();

            document.querySelectorAll('.delete-card').forEach(item => {
                item.onclick = event => this.deleteCard(event);
            });

        } else {
            alert("Preencha os campos!");
        }
    }
    // createCard(event) {
    //     event.preventDefault();

    //     if(this.title.value && this.content.value) {
    //         const html = this.cardLayout(this.title.value, this.content.value);

    //         this.insertHtml(html);

    //         this.clearForm();

    //         document.querySelectorAll('.delete-card').forEach(item => {
    //             item.onclick = event => this.deleteCard(event);
    //         });

    //     } else {
    //         alert("Preencha os campos!");
    //     }
    // }

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