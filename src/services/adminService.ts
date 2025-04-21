// Mock admin service - in a real app, these would be API calls

export const getTotalDownloads = async (): Promise<number> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(7966);
    }, 800);
  });
};

export const getTotalUsers = async (): Promise<number> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(245);
    }, 800);
  });
};

export const getTotalMods = async (): Promise<number> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(28);
    }, 800);
  });
};

export const getUsers = async (): Promise<any[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', username: 'nlms', email: 'admin@nolimitmods.lk', role: 'admin', createdAt: '2023-01-15' },
        { id: '2', username: 'user1', email: 'user1@example.com', role: 'user', createdAt: '2023-03-22' },
        { id: '3', username: 'modder_sl', email: 'modder@example.com', role: 'user', createdAt: '2023-04-10' },
        { id: '4', username: 'truck_fan', email: 'truck_fan@example.com', role: 'user', createdAt: '2023-05-05' },
        { id: '5', username: 'driver123', email: 'driver@example.com', role: 'user', createdAt: '2023-06-18' },
      ]);
    }, 800);
  });
};