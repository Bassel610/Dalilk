function read(key, seed) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore corrupt JSON
  }
  try {
    localStorage.setItem(key, JSON.stringify(seed));
  } catch {
    // storage may be unavailable (private mode)
  }
  return seed;
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function createCollectionStore(key, seed, idField = 'id') {
  return {
    list: () => read(key, seed),
    get: (id) => read(key, seed).find((x) => x[idField] === id) || null,
    add: (item) => {
      const items = read(key, seed);
      const next = [...items, item];
      write(key, next);
      return item;
    },
    update: (id, patch) => {
      const items = read(key, seed);
      const next = items.map((x) =>
        x[idField] === id ? { ...x, ...patch } : x,
      );
      write(key, next);
      return next.find((x) => x[idField] === id) || null;
    },
    remove: (id) => {
      const items = read(key, seed);
      write(key, items.filter((x) => x[idField] !== id));
    },
    reset: () => write(key, seed),
  };
}

export function createDocStore(key, seed) {
  return {
    get: () => read(key, seed),
    set: (value) => {
      const next = { ...read(key, seed), ...value };
      write(key, next);
      return next;
    },
    reset: () => write(key, seed),
  };
}

export function genId(prefix = 'local') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
