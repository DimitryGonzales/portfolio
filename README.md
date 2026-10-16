# Portfólio Pessoal

[![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1.1-6DB33F?style=flat-square&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-27-007396?style=flat-square&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Render](https://img.shields.io/badge/Deploy-Render-46E3B7?style=flat-square&logo=render&logoColor=white)](https://render.com/)

Site de portfólio pessoal desenvolvido com Spring Boot e Thymeleaf. Ele apresenta informações profissionais, projetos recentes obtidos dinamicamente pela API do GitHub, histórico de experiências, um currículo visualizável em PDF e um formulário de contato integrado com envio de e-mail.

🔗 **[Acessar a aplicação em produção](https://dimitrygonzales.onrender.com/)**

---

## 📸 Demonstração

![Demonstração do Portfolio](https://github.com/user-attachments/assets/117d2a3c-c1b0-431b-9b12-38ec02b4443a)

---

## ✨ Funcionalidades

- **Interface Responsiva:** Navegação fluida em página única.
- **Integração com GitHub:** Listagem de repositórios recentes dinâmicos com nome, imagem, descrição, linguagem principal, licença e tempo desde a última atualização.
- **Temas:** Alternância de tema no lado do cliente com modos Automático, Claro e Escuro.
- **Internacionalização (i18n):** Suporte no lado do cliente para inglês (padrão) e português, com detecção automática do navegador.
- **Visualizador de PDF:** Currículo embutido diretamente na página.
- **Contato Direto:** Formulário com validação de campos, limite de tamanho e envio de mensagens via SMTP.
- **Performance:** Cache de dados da API do GitHub utilizando Caffeine.
- **Infraestrutura:** Configuração pronta para conteinerização e deploy com Docker.

## 🛠️ Tecnologias

### Backend
- **Java 27**
- **Spring Boot 4.1.1** (Web MVC, Mail, Validation, Cache)
- **Thymeleaf**
- **Caffeine** (Cache)
- **JUnit 5 & Maven**

### Front-end
- **HTML5, CSS3 & JavaScript**
- **Font Awesome**

### Infraestrutura
- **Docker**
- **Render**
- **API do GitHub**
- **SMTP do Gmail**

## 🧩 Seções da Aplicação

- **Hero:** Nome, avatar, descrição curta, link para o GitHub e botão de acesso ao currículo.
- **Info:** Informações profissionais e histórico pessoal.
- **Projetos:** Consumo da API do GitHub para renderizar repositórios recentes via Thymeleaf (exibe dados vitais como linguagem, licença e última atualização).
- **Experiências:** Trilha de evolução acadêmica e profissional.
- **Fale Comigo:** Formulário de contato funcional validado no backend e enviado via SMTP.

## 🌍 Internacionalização (i18n)

A interface suporta nativamente inglês e português. O idioma padrão (inglês) está inserido diretamente no HTML. As traduções em português são carregadas via JSON:

```text
src/main/resources/static/i18n/pt.json
```

O mapeamento no HTML é feito através do atributo `data-i18n`:

```html
<p data-i18n="hero-description">
    Software engineering student
</p>
```
*A preferência do usuário é salva no `localStorage` para manter a consistência entre visitas.*

## ⚙️ Configuração Local

Para rodar o projeto localmente, crie um arquivo `.env` na raiz do projeto contendo as credenciais de e-mail:

```dotenv
MAIL_USERNAME=seu-email@gmail.com
MAIL_PASSWORD=sua-senha-de-app-do-gmail
```

> ⚠️ **Aviso:** O valor de `MAIL_PASSWORD` deve ser uma [Senha de App do Gmail](https://support.google.com/accounts/answer/185833).

### Variáveis de Ambiente

| Variável | Descrição |
|---|---|
| `MAIL_USERNAME` | Conta de e-mail usada para autenticação no SMTP |
| `MAIL_PASSWORD` | Senha de aplicativo da conta de e-mail |
| `PORT` | Porta HTTP (fornecida automaticamente em ambientes como Render) |

## 🚀 Executando o Projeto

### Requisitos
- Java 27
- Maven 3.9+
- Docker (Opcional)

### Via Maven

1. Clone o repositório:
```bash
git clone https://github.com/DimitryGonzales/portfolio.git && cd portfolio
```

2. Certifique-se de que o `.env` está configurado corretamente.

3. Instale e inicie a aplicação:
```bash
mvn clean install && mvn spring-boot:run
```

4. Acesse em seu navegador: `http://localhost:8080`

### Via Docker

1. Construa a imagem:
```bash
docker build -t portfolio .
```

2. Execute o contêiner passando as variáveis:
```bash
docker run --rm -p 8080:8080 \
  -e MAIL_USERNAME=seu-email@gmail.com \
  -e MAIL_PASSWORD=sua-senha-de-app-do-gmail \
  portfolio
```

## 🧪 Testes

Para rodar a suíte de testes unitários:
```bash
mvn test
```

Para compilar a aplicação e rodar os testes juntos:
```bash
mvn clean package
```

## 📁 Estrutura do Projeto

```text
portfolio/
├── src/main/java/com/example/portfolio/
│   ├── controller/      # Controllers de navegação e contato
│   ├── service/         # Lógica de integração (GitHub e SMTP)
│   ├── model/           # Modelos de dados dos repositórios
│   └── PortfolioApplication.java
├── src/main/resources/
│   ├── static/          # Assets (CSS, JS, i18n JSONs, PDFs)
│   └── templates/       # Views do Thymeleaf (index.html)
├── src/test/            # Suíte de testes (JUnit)
├── Dockerfile           # Configuração de conteinerização
└── pom.xml              # Dependências do Maven
```

## ☁️ Implantação (Deploy)

Preparado para deploy nativo na **Render** utilizando Docker. O ambiente da Render irá construir a imagem e expor a aplicação pela porta definida pela plataforma:

```properties
server.port=${PORT:8080}
```
Lembre-se de configurar `MAIL_USERNAME` e `MAIL_PASSWORD` diretamente no painel de *Environment Variables* da plataforma de hospedagem.

## 🔒 Segurança

- Tokens e senhas devem residir estritamente em variáveis de ambiente.
- Utilize senhas específicas de aplicativo (App Passwords) ao invés da sua senha root de e-mail.
- O cache (Caffeine) evita requisições excessivas que poderiam esgotar a cota da API do GitHub.
