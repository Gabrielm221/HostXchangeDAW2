                                    # Projeto  - HostXChange

### Integrantes: Ranieri Massini, Gabriel Marçal Pereira Leal, Jose Marcolino.

### Disciplina: DAW 2

### Professor: Lídia Bononi

## Instaladores

<a href="https://nodejs.org/en/download/prebuilt-installer">NodeJs</a>
<br><br>
Angular: npm install -g @angular/cli@18.2.0


## Para rodar

- Na raiz principal rodar `npm i --force`.

#### Banco MySQL:

- Ajustar o arquivo `.env` com as configurações do seu banco (o arquivo `envconfig` tem o exemplo).
- Rodar `npx prisma migrate dev`.

#### Backend: 

- Entrar na pasta server e rodar `node index.js`.

#### Frontend: 

- Na pasta principal rodar `ng s` ou `ng server`.

#### Requisitos :

Apresentação Geral da Solução
A solução proposta é uma plataforma que conecta viajantes com anfitriões ao redor do Brasil, proporcionando experiências de intercâmbio cultural e oportunidades de trabalho. O objetivo é permitir que os usuários não só vivenciem novas culturas, mas também possam trabalhar enquanto exploram diferentes destinos. A plataforma oferece a oportunidade de trabalhar no local escolhido, o que possibilita uma experiência mais imersiva e enriquecedora, tanto para os viajantes quanto para os anfitriões.

Organização do Jira da Documentação
A documentação do desenvolvimento está organizada no Jira e segue as seguintes etapas de fluxo de trabalho:

Criação de Tarefas: As tarefas no Jira são criadas de acordo com as funcionalidades a serem implementadas, como "Desenvolvimento de Tela X" ou "Implementação de Validação Y".
Histórias de Usuário: Cada tarefa de desenvolvimento é associada a uma história de usuário para garantir a entrega de valor ao cliente.
Sprints e Planejamento: As tarefas são alocadas em sprints para garantir uma entrega incremental e consistente da solução.
Organização do Padrão de Desenvolvimento (Coding Standards)
Os coding standards (padrões de codificação) são focados em garantir a padronização e a organização do código-fonte. Eles abordam aspectos como:

Convenções de Nomes: As variáveis, funções e classes devem ter nomes claros e descritivos. Por exemplo, calculateTotalPrice para funções que calculam o preço total.
Estrutura de Pastas: O código é organizado de forma hierárquica e clara, com pastas para models, controllers, views, routes, etc.
Estilo de Formatação: Utilizamos uma indentação de 2 espaços e colocamos sempre as chaves {} em uma linha separada para melhorar a legibilidade.
Boas Práticas: Evitamos duplicação de código (segui-se o princípio DRY - Don't Repeat Yourself), mantemos o código modularizado e escrevemos testes automatizados.
Documentação: Todos os módulos e funções devem ser bem documentados, explicando o que fazem, como funcionam e quais parâmetros esperam.
Modelo de Dados
O modelo de dados utilizado para a aplicação foi projetado para garantir uma estrutura eficiente e de fácil manutenção. A seguir, temos uma representação das principais entidades do sistema:

Usuário:

id: Identificador único do usuário.
nome: Nome completo do usuário.
email: Endereço de e-mail do usuário.
senha: Senha criptografada para autenticação.
tipo: Tipo de usuário (Viajante ou Host).
trabalhoDisponivel: Trabalho disponível para quem deseja trabalhar durante o intercâmbio.
Host:

id: Identificador único do anfitrião.
nomePropriedade: Nome da propriedade oferecida.
endereco: Endereço da propriedade.
telefone: Número de telefone para contato.
trabalhoOferecido: Descrição do trabalho que o anfitrião oferece.
latitude/longitude: Localização da propriedade.
Design System
O Design System do projeto segue diretrizes visuais e comportamentais que garantem consistência e facilidade de uso nas interfaces. Alguns dos principais pontos do Design System incluem:

Paleta de Cores: Utilizamos uma paleta de cores que inclui:

Cor primária: #FF5733
Cor secundária: #3333FF
Cores de fundo: #F1F1F1 para o fundo claro, #212121 para o fundo escuro.
Tipografia: A tipografia do projeto é composta pelas fontes:

Fonte Primária: Roboto, sans-serif
Fonte Secundária: Arial, sans-serif
Padrões de Interação: Definimos padrões claros para botões, ícones e interações com o usuário, garantindo que todas as interfaces sejam intuitivas e consistentes.

Swagger da API Funcional
A API do projeto segue os métodos HTTP corretamente e está documentada no Swagger para facilitar a integração e o entendimento. Algumas das principais rotas incluem:

POST /login: Método utilizado para login de usuários.
GET /trabalhos: Recupera todos os trabalhos disponíveis para intercâmbio.
POST /trabalhos: Cria um novo trabalho oferecido por um anfitrião.
Cada endpoint está documentado no Swagger, com exemplos de payloads e respostas, e está configurado para usar os métodos HTTP corretamente.

Apresentação Funcional da Aplicação
A aplicação foi projetada para garantir uma interação fluída e eficiente com o usuário. Durante o processo de teste, serão verificadas as funcionalidades principais da aplicação, como:

Inserção de Dados: A funcionalidade de inserção de dados será testada, verificando se os dados são corretamente validados antes de serem armazenados no sistema.
Validações de Entrada: A aplicação realiza validações de campos obrigatórios, formato de e-mail, e valores numéricos, e apresenta mensagens de erro apropriadas quando os dados estão incorretos.
Mensagens de Erro: As mensagens de erro são apresentadas de forma clara e amigável, para garantir que o usuário entenda o que está errado e como corrigir.
Conclusão
A solução foi desenvolvida com o objetivo de facilitar o intercâmbio cultural e de trabalho, proporcionando aos usuários uma experiência mais imersiva e significativa. O projeto segue as melhores práticas de desenvolvimento para garantir a qualidade, manutenibilidade e escalabilidade do código. Todos os aspectos importantes, desde o padrão de desenvolvimento até o design da API e a experiência do usuário, foram cuidadosamente planejados e implementados.