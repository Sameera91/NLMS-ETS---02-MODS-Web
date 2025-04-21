import { Mod } from '../types';

// Mock data - in a real app, these would be API calls
const mods: Mod[] = [
  {
    id: '1',
    title: 'Scania R1000 V8 Mega Mod',
    description: 'This mod features the ultimate Scania R1000 with custom engine sounds, detailed interiors, and dozens of customization options.',
    thumbnail: 'https://images.pexels.com/photos/2449454/pexels-photo-2449454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'NL Modder',
    createdAt: '2023-05-15T10:30:00Z',
    updatedAt: '2023-09-20T14:45:00Z',
    downloadCount: 2547,
    rating: 4.8,
    categories: ['trucks', 'scania', 'premium'],
    isFeatured: true
  },
  {
    id: '2',
    title: 'Sri Lankan Highway Map Extension',
    description: 'Experience the beautifully crafted Sri Lankan highways with this map extension. Features accurate road signs, landmarks, and scenery.',
    thumbnail: 'https://images.pexels.com/photos/2553363/pexels-photo-2553363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'MapMaster',
    createdAt: '2023-07-22T08:15:00Z',
    updatedAt: '2023-09-15T11:30:00Z',
    downloadCount: 1876,
    rating: 4.6,
    categories: ['maps', 'srilanka', 'highway'],
    isFeatured: true
  },
  {
    id: '3',
    title: 'SL Container Trailer Pack',
    description: 'A collection of Sri Lankan styled container trailers with various company liveries and customization options.',
    thumbnail: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'TrailerPro',
    createdAt: '2023-06-10T15:45:00Z',
    updatedAt: '2023-08-28T09:20:00Z',
    downloadCount: 1254,
    rating: 4.4,
    categories: ['trailers', 'containers', 'custom'],
    isFeatured: true
  },
  {
    id: '4',
    title: 'Sri Lankan Traffic Pack',
    description: 'Realistic traffic mod featuring Sri Lankan vehicles including tuk-tuks, buses and local cars to enhance your driving experience.',
    thumbnail: 'https://images.pexels.com/photos/4024732/pexels-photo-4024732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'SL Modder',
    createdAt: '2023-04-05T11:10:00Z',
    updatedAt: '2023-08-15T16:25:00Z',
    downloadCount: 985,
    rating: 4.2,
    categories: ['traffic', 'vehicles', 'srilanka'],
    isFeatured: false
  },
  {
    id: '5',
    title: 'Colombo Port Logistics Job Pack',
    description: 'New job contracts for hauling cargo from Colombo Port to various destinations across Sri Lanka with special rewards.',
    thumbnail: 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'NL Modder',
    createdAt: '2023-08-18T13:30:00Z',
    updatedAt: '2023-09-05T10:15:00Z',
    downloadCount: 742,
    rating: 4.3,
    categories: ['jobs', 'economy', 'port'],
    isFeatured: false
  },
  {
    id: '6',
    title: 'Sri Lankan Sound Enhancement Pack',
    description: 'Immersive sound mod featuring authentic Sri Lankan horns, traffic sounds, and environmental audio.',
    thumbnail: 'https://images.pexels.com/photos/4507967/pexels-photo-4507967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'AudioMaster',
    createdAt: '2023-05-28T09:20:00Z',
    updatedAt: '2023-07-30T14:40:00Z',
    downloadCount: 562,
    rating: 4.1,
    categories: ['sounds', 'immersion', 'audio'],
    isFeatured: false
  }
];

export const getFeaturedMods = async (): Promise<Mod[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mods.filter(mod => mod.isFeatured));
    }, 800);
  });
};

export const getPopularMods = async (): Promise<Mod[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mods].sort((a, b) => b.downloadCount - a.downloadCount).slice(0, 4));
    }, 800);
  });
};

export const getAllMods = async (filters?: {
  category?: string;
  search?: string;
  sort?: 'newest' | 'popular' | 'rating';
}): Promise<Mod[]> => {
  // In a real app, this would be an API call with proper filtering
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredMods = [...mods];
      
      if (filters?.category) {
        filteredMods = filteredMods.filter(mod => 
          mod.categories.includes(filters.category as string)
        );
      }
      
      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredMods = filteredMods.filter(mod => 
          mod.title.toLowerCase().includes(searchTerm) || 
          mod.description.toLowerCase().includes(searchTerm)
        );
      }
      
      if (filters?.sort) {
        switch (filters.sort) {
          case 'newest':
            filteredMods.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
          case 'popular':
            filteredMods.sort((a, b) => b.downloadCount - a.downloadCount);
            break;
          case 'rating':
            filteredMods.sort((a, b) => b.rating - a.rating);
            break;
        }
      }
      
      resolve(filteredMods);
    }, 800);
  });
};

export const getModById = async (id: string): Promise<Mod | null> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const mod = mods.find(mod => mod.id === id) || null;
      resolve(mod);
    }, 500);
  });
};