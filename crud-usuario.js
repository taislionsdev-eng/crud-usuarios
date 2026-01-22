const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});



function perguntar(texto, callback) {
    rl.question(texto, (resposta) => {
        callback(resposta);
    });
 }

 let usuarios = [];
let proximoID = 1;

function acharIndicePorId(id) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id === id) {
            return i;
        }
        return -1;
    }

}

function mostrarMenu() {
    console.log("/n=================");
    console.log("      CRUD USUÁRIOS");
    console.log("===================");
    console.log("1) Cadrastrar usuário");
    console.log("2) Listar usuário");
    console.log("3) Visualizar usuário (por ID)");
    console.log("4) Editar usuário");
    console.log("5) Deletar usuário");
    console.log("0) Sair");
    console.log("==================");
}

function menu(){
    mostrarMenu();

    perguntar("Escolha uma opção: ", (opcao) => {
        opcao = opcao.trim();

        switch (opcao) {
            case "1": return cadrastrarUsuario();
            case "2": return listarUsuario();
            case "3": return vizualizarUsuario();
            case "4": return editarUsuario();
            case "5": return deletarUsuario();
            case "0": 
            console.log("Saindo...");
            rl.close();
            return;
            default:
                console.log("Opção inválida!");
                return menu();
        }
    })
}

function cadrastrarUsuario() {
    console.log("Cadrastrar Usuário");
    perguntar('Nome: ',(nome) => {
        perguntar('Idade: ', (idadeStr) => { 
            perguntar('CPF: ',(cpf) => {
                    nome = nome.trim();
                    cpf = cpf.trim().toUpperCase();
                    const idade = Number(idadeStr);
                    if (!nome || !cpf || Number.isNaN(idade)) {
                      console("dados errados, vacilao");
                      return menu()
                    }

                    for(let i = 0; i < usuarios.length; i++){
                        if (usuarios[i].cpf === cpf){
                            console.log("CPF ja existe, vacilao");
                            return menu();
                        }
                    }
                 const usuario ={
                    id: proximoID,
                    nome: nome,
                    cpf: cpf,
                    idade: idade,

                 };
        usuarios.push(usuario);

        proximoID++;
        console.log("Usuário cadastrado com sucesso")
        menu();
                });
            });
        });
    }

    function listarUsuario() {
        console.log("Listar usuário");
    if (usuarios.length === 0){
        console.log("Nenhum carro cadastrado");
        return  menu();
    }
    
    for (let i = 0; i < usuarios.length; i++) {
        const u = usuarios [i];
        console.log(
            "Id:", u.id,
            "Nome:", u.nome,
            "Idade:", u.idade,
            "CPF:", u.cpf
    );
    }
    
    menu();
    }

    function vizualizarUsuario() {
        console.log("Vizualizar Usuarios")
        perguntar("Digite o ID: ", (idStr) => {
            const id = Number(idStr);
            if (Number.isNaN(id)) {
                console.log("Erro: ID invalido")
                return menu();
            }
    
            const posicao = acharIndicePorId(id);
    
            if (posicao === -1) {
                console.log("Usuario não encontrado");
                return menu();
            }
            const usuario = usuarios[posicao];
    
            
                console.log(
                    'ID: ', usuario.id,
                    '| Nome: ', usuario.nome,
                    '| Senha: ', usuario.senha,
                    '| Idade: ', usuario.idade,
                )
            
    
            menu();
    
        });
    }

    function editarUsuario() {
        perguntar("Digitar o ID:",(idStr) => {
            const id = Number (idStr);
    
            if(Number.isNaN(id)) {
                console.log("Você não sabe o que é número, seu otario");
                return menu();
            }
    
            const posicao = acharIndicePorId(id)
    
            if(posicao === -1) {
                console.log("Usuário não encontrado, vacilão");
                return menu();
            }
    
            console.log("deixe vazio para manter o padrao");
    
            const usuario = usuarios[posicao];
    
    
            perguntar(`Novo Nome: (${usuario.nome})`, (novoNome) => {
                perguntar(`Nova Idade:  (${usuario.idade})`, (novaIdadeStr) => {
                    perguntar(`Novo CPF:  (${usuario.cpf})`, (novoCpf) => {
                if (novoNome) {
                    usuario.nome = novoNome;
    
                }
                novoNome = novoNome.trim();

                if (novoCpf) {
                    for (let i = 0; i < usuarios.length; i++) {
                        if (usuarios[i].cpf === cpf) {
                            return menu();
                        }
                    }
                    usuario.cpf = novoCpf;
                }
                if (novaIdadeStr) {
                    const novaIdade = Number(novaIdadeStr);
    
                    if (Number.isNaN(novaIdade)) {
                        console.log("ERRO: Idade Invalido");
                        return menu();
                    }
                    usuario.idade = novaIdade;
                }
    
                console.log("Usuário editado com sucesso");
    
                menu();
    
                        });
                    });
                });
            });
        }

        function deletarUsuario() {
            perguntar("Digitar o ID:",(idStr) => {
                const id = Number (idStr);
        
                if(Number.isNaN(id)) {
                    console.log("Você não sabe o que é número, seu otario");
                    return menu();
                }
        
                const posicao = acharIndicePorId(id)
        
                if(posicao === -1) {
                    console.log("Usuário não encontrado, vacilão");
                    return menu();
                }
        
                usuarios.splice(posicao, 1);
                console.log("Usuário deletado com secusso");
                menu();
            })
            menu();
        }
    

    menu();