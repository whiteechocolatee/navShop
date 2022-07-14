import { useMemo, useState } from "react";

export const useSortItems = (items = []) => {
  const [desc, setDesc] = useState(false);

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];

    sortableItems.sort((a, b) => {
      if (+a.price < +b.price) return desc ? 1 : -1;
      if (+a.price > +b.price) return desc ? -1 : 1;

      return 0;
    });

    return sortableItems;
  }, [desc, items]);

  return {
    desc,
    setDesc,
    sortedItems,
  };
};
