import { Project, PersonalInfo } from '@/types/project';
import { initialProjects, initialPersonalInfo } from '@/data/initialProjects';

const DB_NAME = 'FirzaPortfolioDB';
const DB_VERSION = 1;
const STORE_PROJECTS = 'projects';
const STORE_INFO = 'personal_info';

// LocalStorage Keys for instant sync fallback
const LOCAL_PROJECTS_KEY = 'firza_portfolio_projects_v2';
const LOCAL_INFO_KEY = 'firza_portfolio_info_v2';

/**
 * Open IndexedDB database connection
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_PROJECTS)) {
        db.createObjectStore(STORE_PROJECTS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_INFO)) {
        db.createObjectStore(STORE_INFO, { keyPath: 'id' });
      }
    };
  });
}

export const PortfolioDB = {
  /**
   * Load all projects from IndexedDB with LocalStorage fallback
   */
  async getProjects(): Promise<Project[]> {
    try {
      const db = await openDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_PROJECTS, 'readonly');
        const store = tx.objectStore(STORE_PROJECTS);
        const req = store.getAll();

        req.onsuccess = () => {
          if (req.result && req.result.length > 0) {
            resolve(req.result as Project[]);
          } else {
            // Fallback to LocalStorage or initial data
            const localData = localStorage.getItem(LOCAL_PROJECTS_KEY);
            const data = localData ? JSON.parse(localData) : initialProjects;
            PortfolioDB.saveAllProjects(data);
            resolve(data);
          }
        };

        req.onerror = () => {
          const localData = localStorage.getItem(LOCAL_PROJECTS_KEY);
          resolve(localData ? JSON.parse(localData) : initialProjects);
        };
      });
    } catch {
      const localData = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_PROJECTS_KEY) : null;
      return localData ? JSON.parse(localData) : initialProjects;
    }
  },

  /**
   * Save all projects into IndexedDB and LocalStorage
   */
  async saveAllProjects(projects: Project[]): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(projects));
    }
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_PROJECTS, 'readwrite');
      const store = tx.objectStore(STORE_PROJECTS);
      store.clear();
      projects.forEach((proj) => store.put(proj));
    } catch (e) {
      console.warn('IndexedDB save failed, saved to LocalStorage fallback:', e);
    }
  },

  /**
   * Add a single project
   */
  async addProject(project: Project): Promise<void> {
    const current = await PortfolioDB.getProjects();
    const updated = [project, ...current];
    await PortfolioDB.saveAllProjects(updated);
  },

  /**
   * Update a project by ID
   */
  async updateProject(id: string, updatedFields: Partial<Project>): Promise<void> {
    const current = await PortfolioDB.getProjects();
    const updated = current.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    await PortfolioDB.saveAllProjects(updated);
  },

  /**
   * Delete a project by ID
   */
  async deleteProject(id: string): Promise<void> {
    const current = await PortfolioDB.getProjects();
    const updated = current.filter((p) => p.id !== id);
    await PortfolioDB.saveAllProjects(updated);
  },

  /**
   * Load personal info
   */
  async getPersonalInfo(): Promise<PersonalInfo> {
    try {
      const db = await openDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_INFO, 'readonly');
        const store = tx.objectStore(STORE_INFO);
        const req = store.get('main_info');

        req.onsuccess = () => {
          if (req.result && req.result.data) {
            resolve(req.result.data as PersonalInfo);
          } else {
            const localData = localStorage.getItem(LOCAL_INFO_KEY);
            const data = localData ? JSON.parse(localData) : initialPersonalInfo;
            PortfolioDB.savePersonalInfo(data);
            resolve(data);
          }
        };

        req.onerror = () => {
          const localData = localStorage.getItem(LOCAL_INFO_KEY);
          resolve(localData ? JSON.parse(localData) : initialPersonalInfo);
        };
      });
    } catch {
      const localData = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_INFO_KEY) : null;
      return localData ? JSON.parse(localData) : initialPersonalInfo;
    }
  },

  /**
   * Save personal info
   */
  async savePersonalInfo(info: PersonalInfo): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_INFO_KEY, JSON.stringify(info));
    }
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_INFO, 'readwrite');
      const store = tx.objectStore(STORE_INFO);
      store.put({ id: 'main_info', data: info });
    } catch (e) {
      console.warn('IndexedDB info save failed, saved to LocalStorage fallback:', e);
    }
  },
};
