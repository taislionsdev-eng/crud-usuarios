const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

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
            case "3": return visualizarUsuario();
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