// src/services/localStores.services.ts
export interface LocalStoreItem {
  id: string;
  [key: string]: any;
}
export const localStoreService = {
  getAll<T extends LocalStoreItem>(key: string): T[] {
    try {
      const data = localStorage.getItem(key);
      if (!data) return [];
      return JSON.parse(data) as T[];
    } catch {
      return [];
    }
  },

  getById<T extends LocalStoreItem>(key: string, id: string): T | undefined {
    const list = localStoreService.getAll<T>(key);
    return list.find(item => item.id === id);
  },

  add<T extends LocalStoreItem>(key: string, item: T): boolean {
    const list = localStoreService.getAll<T>(key);
    const exists = list.some(existingItem => existingItem.id === item.id);
    if (exists) return false; // 🔒 Đã tồn tại => không thêm nữa
    list.push(item);
    localStorage.setItem(key, JSON.stringify(list));
    return true;
  },

  remove<T extends LocalStoreItem>(key: string, id: string): void {
    const list = localStoreService.getAll<T>(key);
    const newList = list.filter(item => item.id !== id);
    localStorage.setItem(key, JSON.stringify(newList));
  },

  update<T extends LocalStoreItem>(key: string, item: T): void {
    const list = localStoreService.getAll<T>(key);
    const idx = list.findIndex(i => i.id === item.id);
    if (idx !== -1) {
      list[idx] = item;
      localStorage.setItem(key, JSON.stringify(list));
    }
  },

  clear(key: string): void {
    localStorage.removeItem(key);
  }
};
