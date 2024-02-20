import React from "react";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className: string
}

const List = <T extends {}>({ items, renderItem, className }: ListProps<T>) => {
  return (
    <ul className={className}>
      {items.map((item, i) => (
        <li key={i}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

export default List;