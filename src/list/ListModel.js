// @flow

import React from 'react';
import { graphql, QueryRenderer } from 'react-relay';
import environment from '../app/Environment';

import ItemCreateMutation from '../item/ItemCreateMutation';
import ItemUpdateMutation from '../item/ItemUpdateMutation';
import ItemRemoveMutation from '../item/ItemRemoveMutation';

import List from './List';

type Props = {
  id: string,
};

class ListModel extends React.Component<Props> {
  addItem: (name: string) => void;
  updateItem: (id: string, name: string) => void;
  removeItem: (id: string) => void;

  constructor(props: Props) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem(name: string): void {
    ItemCreateMutation.commit(
      environment,
      this.props.id,
      name,
      false,
    );
  }

  updateItem(id: string, name: string): void {
    ItemUpdateMutation.commit(
      environment,
      id,
      this.props.id,
      name,
      false,
    );
  }

  removeItem(id: string): void {
    ItemRemoveMutation.commit(
      environment,
      id,
    );
  }

  render(): ?React$Element<any> {
    return (
      <QueryRenderer
        environment={ environment }
        query={ graphql`
          query ListModelQuery($id: ID!) {
            list(id: $id) {
              ...List_list
            }
          }
        `}
        variables={ { id: this.props.id } }
        render={({ error, props }) => {
          if (error) return <div>Failure!</div>;
          if (!props) return <div>Loading...</div>;
          return <List
            list={ props.list }
            addItem={ this.addItem }
            updateItem={ this.updateItem }
            removeItem={ this.removeItem } />;
        }}
      />
    );
  }
}

export default ListModel;
