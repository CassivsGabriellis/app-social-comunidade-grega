import { User, Post, Notification } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Maria Silva',
    email: 'maria@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    bio: 'Apaixonada pela cultura grega e suas tradições',
    followers: 245,
    following: 123,
  },
  {
    id: 'user-2',
    name: 'João Oliveira',
    email: 'joao@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    bio: 'Estudante de História Grega e Filosofia',
    followers: 178,
    following: 211,
  },
  {
    id: 'user-3',
    name: 'Sofia Costa',
    email: 'sofia@example.com',
    avatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    bio: 'Chef especializada em culinária mediterrânea',
    followers: 327,
    following: 142,
  },
  {
    id: 'user-4',
    name: 'Lucas Santos',
    email: 'lucas@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    bio: 'Viajante e fotógrafo amador. Grécia é meu lugar favorito!',
    followers: 189,
    following: 156,
  },
];

export const mockPosts: Post[] = [
  {
    id: 'post-1',
    userId: 'user-1',
    userName: 'Maria Silva',
    userAvatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    content:
      'Acabo de voltar de uma viagem incrível para Santorini! As vistas são de tirar o fôlego. Quem mais já teve a oportunidade de visitar este paraíso grego?',
    imageUrl:
      'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    likes: 42,
    comments: [
      {
        id: 'comment-1',
        userId: 'user-2',
        userName: 'João Oliveira',
        userAvatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        content:
          'Que maravilha! Estive lá no ano passado e foi uma experiência incrível!',
        createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
      },
      {
        id: 'comment-2',
        userId: 'user-3',
        userName: 'Sofia Costa',
        userAvatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
        content: 'As fotos estão lindas! Qual foi seu restaurante favorito?',
        createdAt: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
      },
    ],
  },
  {
    id: 'post-2',
    userId: 'user-2',
    userName: 'João Oliveira',
    userAvatar:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    content:
      'Hoje estou estudando sobre a filosofia de Sócrates e sua influência no pensamento ocidental. Alguém mais se interessa por filosofia grega?',
    imageUrl: null,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    likes: 28,
    comments: [],
  },
  {
    id: 'post-3',
    userId: 'user-3',
    userName: 'Sofia Costa',
    userAvatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    content:
      'Acabei de preparar uma autêntica moussaka grega para o jantar! A combinação de berinjela, carne moída e molho bechamel é simplesmente divina. Quem gostaria da receita?',
    imageUrl:
      'https://images.pexels.com/photos/6419736/pexels-photo-6419736.jpeg',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    likes: 56,
    comments: [
      {
        id: 'comment-3',
        userId: 'user-1',
        userName: 'Maria Silva',
        userAvatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        content: 'Tem uma aparência incrível! Eu adoraria a receita!',
        createdAt: new Date(Date.now() - 169200000).toISOString(), // 1 day and 23 hours ago
      },
    ],
  },
  {
    id: 'post-4',
    userId: 'user-4',
    userName: 'Lucas Santos',
    userAvatar:
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    content:
      'Algumas fotos que tirei durante minha viagem para Atenas. O Parthenon é ainda mais impressionante pessoalmente!',
    imageUrl:
      'https://images.pexels.com/photos/164336/pexels-photo-164336.jpeg',
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    likes: 37,
    comments: [],
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'like',
    userId: 'user-2',
    userName: 'João Oliveira',
    userAvatar:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    message: 'curtiu sua publicação',
    postId: 'post-1',
    createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    read: false,
  },
  {
    id: 'notif-2',
    type: 'comment',
    userId: 'user-3',
    userName: 'Sofia Costa',
    userAvatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    message: 'comentou em sua publicação',
    postId: 'post-1',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    read: true,
  },
  {
    id: 'notif-3',
    type: 'follow',
    userId: 'user-4',
    userName: 'Lucas Santos',
    userAvatar:
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    message: 'começou a seguir você',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    read: false,
  },
];
