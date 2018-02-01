// @flow

import React from 'react';

import Item from '../item/Item';

import type { List_list } from './__generated__/List_list.graphql';

type Props = {
  list: List_list,
  updateItem: (id: string, name: string) => void,
  removeItem: (id: string) => void,
};

class ListItems extends React.Component<Props> {
  render(): ?React$Element<any> {
    const { list, updateItem, removeItem } = this.props;
    if (!list.items) return <div className="list__message">No items available</div>;
    return (
      <ul className="list__items">{
        list.items.map((item) =>
          <li className="list__item" key={ item.id }>
            <Item
              item={ item }
              updateItem={ updateItem }
              removeItem={ removeItem } />
          </li>
        )
      }</ul>
    );
  }
}

export default ListItems;
