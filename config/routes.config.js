const ROUTES = {
  HOME: {
    path: '/',
    name: 'Home',
    slug: '/',
    order: 0,
    protectedRoute: false,
    meta: {
      title: 'GAME NAME',
      description: '',
      keywords: ''
    }
  },
  ABOUT: {
    path: '/about',
    name: 'About',
    slug: 'about',
    order: 100,
    protectedRoute: false,
    meta: {
      title: '',
      description: '',
      keywords: ''
    }
  },
  NEWS: {
    path: '/news',
    name: 'News',
    slug: 'news',
    order: 200,
    protectedRoute: false,
    meta: {
      title: '',
      description: '',
      keywords: ''
    }
  },
  STORE: {
    path: '/store',
    name: 'Store',
    slug: 'store',
    order: 300,
    protectedRoute: false,
    meta: {
      title: '',
      description: '',
      keywords: ''
    }
  },
  ACCOUNT: {
    path: '/account',
    name: 'Account',
    slug: 'account',
    order: 400,
    protectedRoute: true,
    meta: {
      title: '',
      description: '',
      keywords: ''
    }
  },
  COLLECTION: {
    path: '/collection',
    name: 'Your Cards',
    slug: 'collection',
    order: 450,
    protectedRoute: true,
    meta: {
      title: 'Your cards collection',
      description: 'Your collection of cards.',
      keywords: ''
    }
  },
  DECKS: {
    path: '/decks',
    name: 'Your Decks',
    slug: 'decks',
    order: 450,
    protectedRoute: true,
    meta: {
      title: 'Create new deck',
      description: 'Create a new deck of from your card collection.',
      keywords: ''
    },
    children: {
      NEW: {
        path: '/new',
        name: 'New Deck',
        slug: 'new',
        order: 100
      }
    }
  },
  PLAY: {
    path: '/play',
    name: 'Play',
    slug: 'play',
    order: 500,
    protectedRoute: true,
    meta: {
      title: '',
      description: '',
      keywords: ''
    }
  }
};

export default ROUTES;
