var btnConsultar = document.querySelector('#app form#formApp button');
var txtCep = document.querySelector('#app form#formApp input');
var container = document.querySelector('#app main');

btnConsultar.addEventListener('click', run)

function run(event){
    event.preventDefault();

    var cep = txtCep.value;
    cep = cep.replace(' ', '');
    cep = cep.replace('.', '');
    cep = cep.trim();  

    axios.get('https://viacep.com.br/ws/'+ cep +'/json/')
    .then(function(response){
        if(response.data.erro){
            throw new Error('Cep invalido!')
        }

       container.innerHTML ='';
                
       createLine(response.data.localidade + '/'+response.data.uf);
       createLine('DDD: '+response.data.ddd);
       createLine('Rua: '+response.data.logradouro);
       createLine('Bairro: '+ response.data.bairro);

    })
    .catch(function(error){
        container.innerHTML ='';
        createLine('Algo de errado com esse Cep!');
    })
}

function createLine (text){
        var tg = document.createElement('p');
            var text = document.createTextNode(text);

            tg.appendChild(text);
            container.appendChild(tg);
}