// @flow

import React from 'react';
import { graphql, createRefetchContainer } from 'react-relay';

import ListItems from './ListItems';
import ItemSave from '../item/ItemSave';

import type { List_list } from './__generated__/List_list.graphql';

import './list.css';

type Props = {
  list: List_list,
  addItem: (name: string) => void,
  updateItem: (id: string, name: string) => void,
  removeItem: (id: string) => void,
};

class List extends React.Component<Props> {
  refetch: () => void;

  addItem: (name: string) => void;
  updateItem: (id: string, name: string) => void;
  removeItem: (id: string) => void;

  constructor(props: Props) {
    super(props);

    this.refetch = this.refetch.bind(this);

    this.addItem = this.addItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  refetch(): void {
    this.props.relay.refetch(
      { id: this.props.list.id }
    );
  }

  addItem(): void {
    this.props.addItem.apply(this, arguments);
    this.refetch();
  }

  updateItem(): void {
    this.props.updateItem.apply(this, arguments);
    this.refetch();
  }

  removeItem(): void {
    this.props.removeItem.apply(this, arguments);
    this.refetch();
  }

  render(): ?React$Element<any> {
    return (
      <section className="list">
        <ListItems
          list={ this.props.list }
          updateItem={ this.updateItem }
          removeItem={ this.removeItem } />
        <ItemSave
          addItem={ this.addItem } />
      </section>
    );
  }
}

export default createRefetchContainer(
  List,
  {
    list: graphql`
    fragment List_list on List {
      id,
      name,
      items {
        id,
        ...Item_item,
      },
    }
  `,
  },
  graphql`
    query ListRefetchQuery($id: ID!) {
      list(id: $id) {
        ...List_list,
      }
    }
  `
);
