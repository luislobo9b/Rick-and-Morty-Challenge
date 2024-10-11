[ACESSE O SITE](https://luislobo-rick-and-morty-challenge.netlify.app/)

# RickAndMortyChallenge

![](https://raw.githubusercontent.com/luislobo9b/Rick-and-Morty-Challenge/main/printscreen.jpg)

## REQUISITOS OBRIGATÓRIOS CUMPRIDOS (TODOS)
* Disponibilizar em repositório público;
* Uso da API REST;
* Seguir protótipo do Figma;
* Angular 13+ (utilizei o Angular 15);
* Buscar o personagem pelo nome;
* Exibir informações sobre o personagem (galeria);
* Mensagem de nenhum personagem encontrado (ou favoritado);
* Registro de favoritos utilizando a lib **Ngxs**;
* Contador no header atualizado dinamicamente;
* Visualizar a lista de personagens favoritados;
* Função adicionar e remover personagens da lita de favoritos;
* Paginação (escolhi o infinite scroll);

## DIFERENCIAIS ADICIONADOS
* Favicon personalizado;
* Autocompletar com sistema de relevância e utilizando API GraphQL;
* Mensagem de loading (colocando internet lenta é possível vê-lo no infinite scroll também);
* Utilizado as fontes via Google Fonts;
* Layout responsivo;
* Utilizado a lib Ngxs e o plugin @ngxs/storage-plugin para persistência no localStorage;
* Fazer o deploy da aplicação;
* Filtro de exclusividade de nomes (impede de aparecer 4x o mesmo personagem em situações diferentes, mas é opcional);

## OBSERVAÇÕES
* Não incluí o campo de pesquisa na seção de favoritos, pois os personagens estão sendo gerenciados no estado da aplicação em vez de serem acessados por meio de uma API. Em um projeto real, eu implementaria uma requisição para armazenar a lista de IDs dos personagens e a recuperaria pela API, conforme faço na página inicial. Optei por não incluir essa funcionalidade no estado atual, pois não se trata de um cenário real, e acredito que a adição desse código poderia tornar o "poluído";
* Não incluí a funcionalidade de paginação com infinite scroll, uma vez que todos os personagens já estão disponíveis no estado da aplicação. Portanto, optei por exibi-los de uma só vez na tela. Em um projeto real, eu utilizaria a mesma lógica da página inicial, onde a API forneceria o sistema de paginação (nextPage);

---

# RickAndMortyChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
