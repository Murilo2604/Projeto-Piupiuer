$(function(){  //INICIALIZANDO AS FUNCOES
  contarCaracteres();
  publicarPiu();
  colorirLetras();
  atualizarFeed();
  gradienteContador();
});

//FUNCAO QUE IRA ATUALIZAR O FEED CONFORME AS POSTAGENS JA ARMAZENADAS NO SERVIDOR
function atualizarFeed() {
  $.get("http://www.json-generator.com/api/json/get/ceycmRLqWa?indent=2", function(data){
    for (var i = 0; i < data.length; i++) {   //FUNCAO FEITA PARA VARRER TODO O VETOR DE OBJETOS RECEBIDO DO SERVIDOR
      var nome = data[i].nome;
      var username = data[i].username;
      var mensagem = data[i].mensagem;
      var imagem = data[i].imagem;

      var conteiner = $("<div>").addClass("conteiner").addClass("post");
      var superior_post = $("<div>").addClass("superior-post");
      var box_perfil = $("<div>").addClass("box-perfil");
      if (imagem != "") {  //VERIFICANDO SE FOI OU NAO PASSADA UMA IMAGEM PELO SERVIDOR
        var imagem_perfil = $("<img>").addClass("fotoPerfil").attr("src", imagem).attr("alt", "Foto de Perfil");
        //SE FOI PASSADA, USA-LA COMO IMAGEM DE PERFIL DO PIU
      } else {
        var imagem_perfil = $("<img>").addClass("fotoPerfil").attr("src", "img/perfil.jpeg").attr("alt", "Foto de Perfil");
        //SE NAO, USAR UMA IMAGEM PADRAO
      }
      var box_nome_username = $("<div>").addClass("nome-username");
      var nome_perfil = $("<h2>").text(nome);
      var username_perfil = $("<h2>").text(username);
      var box_botoes = $("<div>").addClass("box-botoes");
      var botao_remover = $("<a>").addClass("botaoRemover").text("Remover");
      var botao_destacar = $("<a>").addClass("botaoDestacar").text("Destacar");
      var texto_post = $("<p>").addClass("texto-post").text(mensagem);

      $("#cabecalho-feed").after(conteiner).fadeIn(2000);

      conteiner.append(superior_post);
      conteiner.append(texto_post);
      superior_post.append(box_perfil);
      superior_post.append(box_botoes);      //FAZENDO OS APENDICES NECESSARIOS
      box_perfil.append(imagem_perfil);
      box_perfil.append(box_nome_username);
      box_botoes.append(botao_remover);
      box_botoes.append(botao_destacar);
      box_nome_username.append(nome_perfil);
      box_nome_username.append(username_perfil);

      removerPiu(botao_remover);
      destacarPiu(botao_destacar);
    }
  });
}

//FUNCAO QUE ALTERA O CONTADOR CONFORME O USUARIO DIGITA
function contarCaracteres() {
  $("#campo-mensagem").on("input", function() {
    var campo = $("#campo-mensagem").val();
    var qtd_caracteres = campo.length;
    $("#contador-piupiu").text(qtd_caracteres);
  });
}

//FUNCAO QUE INSERE O NOVO PIU CRIADO AO FEED
function publicarPiu() {
  $(".botaoPublicar").click(function() {
    var qtd_caracteres = $("#campo-mensagem").val().length;
    // VERIFICANDO QUANTAS PALAVRAS FORAM DIGITADAS
    if(qtd_caracteres > 150 || qtd_caracteres == 0) {  //VERIFICANDO SE O VALOR DO NOVO PIU E VALIDO
      $("#erro").fadeIn(700, function(){
        window.setTimeout(function(){
            $('#erro').fadeOut(700);     //SE NAO E VALIDO, MOSTRA O ERRO
        }, 2000);
      });
    } else {
      var textopost = $("#campo-mensagem").val();

      var conteiner = $("<div>").addClass("conteiner").addClass("post").addClass("fade");
      var superior_post = $("<div>").addClass("superior-post");
      var box_perfil = $("<div>").addClass("box-perfil");
      var imagem_perfil = $("<img>").addClass("fotoPerfil").attr("src", "img/perfil.jpeg").attr("alt", "Foto de Perfil");
      var box_nome_username = $("<div>").addClass("nome-username");      //SE SIM, CRIA-SE OS DEVIDOS ELEMENTOS EXISTENTES NA ESTRUTURA DE UM POST
      var nome_perfil = $("<h2>").text("Nome de Perfil");
      var username = $("<h2>").text("@username");
      var box_botoes = $("<div>").addClass("box-botoes");
      var botao_remover = $("<a>").addClass("botaoRemover").text("Remover");
      var botao_destacar = $("<a>").addClass("botaoDestacar").text("Destacar");
      var texto_post = $("<p>").addClass("texto-post").text(textopost);

      $("#cabecalho-feed").after(conteiner);

      conteiner.append(superior_post);
      conteiner.append(texto_post);
      superior_post.append(box_perfil);
      superior_post.append(box_botoes);      //FAZENDO OS APENDICES NECESSARIOS
      box_perfil.append(imagem_perfil);
      box_perfil.append(box_nome_username);
      box_botoes.append(botao_remover);
      box_botoes.append(botao_destacar);
      box_nome_username.append(nome_perfil);
      box_nome_username.append(username);

      $(".fade").fadeIn(300, function() {     //ANIMACAO DE FADE-IN
        $(".fade").removeClass("fade");
        $(".post").css("display", "flex");
      });

      removerPiu(botao_remover);
      destacarPiu(botao_destacar);
    }
  });
}

//FUNCAO QUE COLORE A FONTE CONFORME O NUMERO DE CARACTERES DIGITADOS
function colorirLetras() {
  $("#campo-mensagem").on("input", function(){
    var qtd_caracteres = $("#campo-mensagem").val().length;
    if(qtd_caracteres > 150) {  //VERIFICA SE A QUANTIDADE DE CARACTERES E MAIOR QUE 150
      $("#campo-mensagem").css("color", "#8f399a");
      $("#contador").css("color", "#8f399a");    //SE SIM, A COR DAS LETRAS SE TORNARA ROXO, INCICANDO QUE A MENSAGEM EXCEDEU 150 CARACTERES
    } else {
      $("#campo-mensagem").css("color", "black");   //SE NAO, NAO HAVERA NENHUMA INDICACAO DE COR NAS LETRAS, CONTINUANDO PRETO
      $("#contador").css("color", "black");
    }
  });
}

//FUNCAO QUE ATUALIZARA A OPACIDADE DA BORDA DO CONTADOR PROPORCIONALMENTE A QUANTIDADE DE CARACTERES
function gradienteContador() {
  $("#campo-mensagem").on("input", function(){
    var qtd_caracteres = $("#campo-mensagem").val().length;
    var gradiente = qtd_caracteres/150;
    $("#contador").css("border-color", "rgba(143, 57, 154," + gradiente + ")");
  });
}

function removerPiu(botao_remover) {
  botao_remover.click(function() {
    $(this).parent().parent().parent().fadeOut(function() {
      $(this).remove();
    })
  })
}

function destacarPiu(botao_destacar) {
  botao_destacar.click(function() {
    $(this).parent().parent().parent().fadeOut(function() {
      var e = $(this);
      $("#cabecalho-feed").after(e);
      $("html, body").animate({scrollTop:0}, 80);
      e.fadeIn(function() {
        $(this).css("display", "flex");
      });
    });
  });
}
