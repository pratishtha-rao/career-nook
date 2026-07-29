const STORAGE_KEY = "career-nook-demo";

type DemoStore = {
  jobs: unknown[];
  tasks: unknown[];
  contacts: unknown[];
  materials: unknown[];
};

function loadStore(): DemoStore {
  if (typeof window === "undefined") {
    return {
      jobs: [],
      tasks: [],
      contacts: [],
      materials: [],
    };
  }

  const existing = localStorage.getItem(STORAGE_KEY);

  if (!existing) {
    return {
      jobs: [],
      tasks: [],
      contacts: [],
      materials: [],
    };
  }

  return JSON.parse(existing);
}

function saveStore(store: DemoStore) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(store)
  );
}

export function archiveDemoItem(
  type: keyof DemoStore,
  item: unknown
) {
  const store = loadStore();

  store[type].push(item);

  saveStore(store);
}

export function getArchivedDemoItems<T>(
  type: keyof DemoStore
): T[] {
  const store = loadStore();

  return store[type] as T[];
}
