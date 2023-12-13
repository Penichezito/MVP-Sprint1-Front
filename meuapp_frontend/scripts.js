/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/jogos';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.jogos.forEach(item => insertList(item.jogo, item.genero, item.plataforma, item.ano))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */

  getList()

  /*
    --------------------------------------------------------------------------------------
    Função para colocar um item na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postItem = async (inputGame, inputGender, inputPlatform, inputYearLaunch) => {
    const formData = new FormData();
    formData.append('jogo', inputGame);
    formData.append('genero', inputGender);
    formData.append('plataforma', inputPlatform);
    formData.append('ano', inputYearLaunch);
  
    let url = 'http://127.0.0.1:5000/jogos';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para criar um botão close para cada item da lista
    --------------------------------------------------------------------------------------
  */
  const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para remover um item da lista de acordo com o click no botão close
    --------------------------------------------------------------------------------------
  */
  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
          div.remove()
          deleteItem(nomeItem)
          alert("Item Removido!")
        }
      }
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para deletar um item da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
  */
  const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para adicionar um novo jogo com nome, genero, plataforma e ano 
    --------------------------------------------------------------------------------------
  */
  const newItem = () => {
    let inputGame = document.getElementById("newGame").value;
    let inputGender = document.getElementById("newGender").value;
    let inputPlatform = document.getElementById("newPlataform").value;
    let inputYearLaunch = document.getElementById("newYearLaunch").value;
    
    if (inputGame === '') {
      alert("Escreva o nome de um jogo!");
    } else if (isNaN(inputYearLaunch)) {
      alert("Ano precisa ser um número!");
    } else {
      insertList(inputGame, inputGender, inputPlatform, inputYearLaunch)
      postItem(inputGame, inputGender, inputPlatform, inputYearLaunch)
      alert("Item adicionado!")
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para inserir items na lista apresentada
    --------------------------------------------------------------------------------------
  */
  const insertList = (nome, genero, plataforma, ano) => {
    var item = [nome, genero, plataforma, ano]
    var table = document.getElementById('myTable');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))

    document.getElementById("newGame").value = "";
    document.getElementById("newGender").value = "";
    document.getElementById("newPlatform").value = "";
    document.getElementById("newYearLaunch").value = "";
  
    removeElement()
  }
