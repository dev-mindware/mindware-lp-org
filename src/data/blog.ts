export interface Author {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  createdAt: string;
  readingTime: string;
  featured?: boolean;
  author: Author;
  category: Category;
}

const mockAuthors: Author[] = [
  {
    id: "mindware",
    name: "Equipa Mindware",
    avatarUrl: "/logo.png",
  },
  {
    id: "gti",
    name: "GTI Labs",
    avatarUrl: "/images/testimonials/avatar-1.jpg",
  },
];

export const mockCategories: Category[] = [
  {
    id: "ai",
    name: "Inteligência Artificial",
    slug: "inteligencia-artificial",
  },
  { id: "frontend", name: "Front-end", slug: "front-end" },
  { id: "backend", name: "Back-end", slug: "back-end" },
  { id: "soft-skills", name: "Soft Skills", slug: "soft-skills" },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    title:
      "Visão computacional com Python: do reconhecimento de imagens à prática",
    slug: "visao-computacional-com-python",
    excerpt:
      "Descubra como criar sistemas de reconhecimento e processamento de imagens usando as melhores práticas da atualidade num guia prático.",
    content: `<h2>O que é Visão Computacional?</h2><p>A Visão Computacional é um campo fascinante da IA...</p>`,
    coverImage:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1470&auto=format&fit=crop",
    createdAt: "2024-03-01T10:00:00Z",
    readingTime: "5 min de leitura",
    featured: true,
    author: mockAuthors[0],
    category: mockCategories[0],
  },
  {
    id: "2",
    title: "Além do Copilot: o que são Workflows Agênticos na prática",
    slug: "alem-do-copilot-workflows-agenticos",
    excerpt:
      "A evolução da automação com IA. Entenda como múltiplos agentes cooperam para resolver problemas de software complexos.",
    content:
      "<h2>A era dos Agentes</h2><p>A inteligência artificial evoluiu de simples chatbots para agentes autônomos...</p>",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop",
    createdAt: "2024-03-02T14:30:00Z",
    readingTime: "8 min de leitura",
    featured: true,
    author: mockAuthors[0],
    category: mockCategories[0],
  },
  {
    id: "3",
    title: "Como a IA está mudando o jeito de aprender programação do zero",
    slug: "como-ia-muda-aprendizado-programacao",
    excerpt:
      "Estudar com IA funciona mesmo? Veja as metodologias mais eficientes para aprender a codar com a ajuda do ChatGPT e Claude.",
    content:
      "<h2>O fim do stack overflow?</h2><p>Não, mas sim o início de uma nova era de tutoriais individualizados...</p>",
    coverImage:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1565&auto=format&fit=crop",
    createdAt: "2024-03-03T09:15:00Z",
    readingTime: "4 min de leitura",
    featured: true,
    author: mockAuthors[0],
    category: mockCategories[0],
  },
  {
    id: "4",
    title: "Seu primeiro projeto com Angular: Guia essencial",
    slug: "seu-primeiro-projeto-com-angular",
    excerpt:
      "Guia rápido com os comandos essenciais para iniciar a sua carreira no framework TypeScript da Google.",
    content: `<h2>Preparando o ambiente</h2><p>Começar com Angular CLI é um ótimo caminho...</p>`,
    coverImage:
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1506&auto=format&fit=crop",
    createdAt: "2024-02-28T11:00:00Z",
    readingTime: "6 min de leitura",
    featured: false,
    author: mockAuthors[1],
    category: mockCategories[1],
  },
  {
    id: "5",
    title: "JavaScript: desvende objetos de uma vez por todas!",
    slug: "javascript-desvende-objetos",
    excerpt:
      "Tudo o que precisa de saber para dominar objetos em JS, métodos imutáveis e manipulação de estado.",
    content: "<h2>Objetos no Core</h2><p>É impossível fugir deles em JS...</p>",
    coverImage:
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1470&auto=format&fit=crop",
    createdAt: "2024-02-25T16:20:00Z",
    readingTime: "10 min de leitura",
    featured: false,
    author: mockAuthors[0],
    category: mockCategories[1],
  },
  {
    id: "6",
    title: "Além do código, por que deveria investir em Soft Skills?",
    slug: "porque-investir-soft-skills",
    excerpt:
      "A comunicação e a empatia são as verdadeiras linguagens universais do desenvolvimento em equipe.",
    content:
      "<h2>Trabalho em equipe</h2><p>Soft skills ditam a dinâmica real de um time tech...</p>",
    coverImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop",
    createdAt: "2024-02-15T09:00:00Z",
    readingTime: "3 min de leitura",
    featured: false,
    author: mockAuthors[0],
    category: mockCategories[3],
  },
];

// Funções Helpers (Serviços Mockados)
export async function getPosts(): Promise<Post[]> {
  // Simulando DB delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockPosts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((post) => post.featured).slice(0, 3);
}

export async function getPostsByCategory(
  categorySlug: string,
): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((post) => post.category.slug === categorySlug);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}
