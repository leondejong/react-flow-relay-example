// @flow

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

import ItemSave from './ItemSave';
import ItemRemove from './ItemRemove';

import type { Item_item } from './__generated__/Item_item.graphql';

type Props = {
  item: Item_item,
  updateItem: (id: string, name: string) => void,
  removeItem: (id: string) => void,
};

class Item extends React.Component<Props> {
  render(): ?React$Element<any> {
    const { item, updateItem, removeItem } = this.props;
    return (
      <div className="item">
        <ItemSave
          item={ item }
          updateItem={ updateItem } />
        <ItemRemove
          item={ item }
          removeItem={ removeItem } />
      </div>
    );
  }
}

export default createFragmentContainer(
  Item,
  {
    item: graphql`
      fragment Item_item on Item {
        id,
        listId,
        name,
        checked,
      }
    `,
  },
);
