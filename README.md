# WishLink

WishLink é uma aplicação web moderna para criar e gerenciar listas de desejos. Permite que os usuários criem listas personalizadas, compartilhem com amigos e familiares, e evitem presentes duplicados ou indesejados.

## 🚀 Funcionalidades

- ✨ Criação de listas de desejos personalizadas
- 🔄 Visualização em grid ou lista
- 🔗 Compartilhamento fácil de listas
- 🎯 Adição de produtos com preços e links
- 🌐 Suporte a múltiplos idiomas (Português, Inglês e Espanhol)
- 📱 Design responsivo para todos os dispositivos
- 🔍 Busca e filtros de produtos
- 🎨 Interface moderna e intuitiva

## 🛠️ Tecnologias

- [Next.js 14](https://nextjs.org/) - Framework React com renderização híbrida
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Prisma](https://www.prisma.io/) - ORM para banco de dados
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional
- [NextAuth.js](https://next-auth.js.org/) - Autenticação
- [i18next](https://www.i18next.com/) - Internacionalização

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- PostgreSQL
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/fdopertussatti/wish-link.git
cd wish-link
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```
Edite o arquivo `.env.local` com suas configurações.

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:3001`

## 🌐 Deploy

O projeto está configurado para deploy na Vercel. Para fazer o deploy:

1. Crie uma conta na [Vercel](https://vercel.com)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente
4. Deploy automático será feito a cada push na branch main

## 🌍 Idiomas Suportados

O WishLink suporta os seguintes idiomas:

- 🇧🇷 Português (Brasil) - Idioma padrão
- 🇺🇸 Inglês (Estados Unidos)
- 🇪🇸 Espanhol

A detecção automática de idioma está habilitada, mas os usuários podem alternar manualmente entre os idiomas disponíveis através do seletor de idioma na interface.

## 📝 Estrutura do Projeto

```
src/
├── app/                 # Páginas e rotas da aplicação
├── components/          # Componentes React reutilizáveis
├── lib/                 # Utilitários e configurações
├── prisma/             # Schema e migrações do banco de dados
├── public/             # Arquivos estáticos
└── styles/             # Estilos globais
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Fernando Pertussatti** - *Desenvolvimento inicial* - [fdopertussatti](https://github.com/fdopertussatti)

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Vercel](https://vercel.com) 