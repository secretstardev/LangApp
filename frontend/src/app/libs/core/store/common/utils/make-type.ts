const MAKE_TYPE_KEYS: Record<string, boolean> = {};

export const makeTypeGuard = (storeKey: string, name: string) => {
  const actionName = `[${storeKey}] ${name}`;

  if (MAKE_TYPE_KEYS[actionName]) {
    throw new Error(`Duplicated action name: ${actionName}`);
  } else {
    MAKE_TYPE_KEYS[actionName] = true;
  }

  return actionName;
};

export const getTypeGuard = (storeKey: string, name: string) => {
  const actionName = `[${storeKey}] ${name}`;

  if (!MAKE_TYPE_KEYS[actionName]) {
    throw new Error(`Action name: ${actionName} not reserved`);
  }

  return actionName;
};
