// @flow

import React from 'react';

import type { Item_item } from './__generated__/Item_item.graphql';

type Props = {
  item?: Item_item,
  addItem?: (name: string) => void,
  updateItem?: (id: string, name: string) => void,
};

type State = {
  name: string,
  saving: boolean,
};

class ItemSave extends React.Component<Props, State> {
  exists: boolean;

  handleInputChange: (event: SyntheticInputEvent<HTMLInputElement>) => void;
  handleInputKeyDown: (event: SyntheticInputEvent<HTMLInputElement>) => void;
  handleButtonClick: () => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      name: '',
      saving: false,
    };

    this.exists = false;

    if (this.props.item) {
      this.exists = true;
      this.state.name = this.props.item.name || '';
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  addItem(name?: string): void {
    name = name || this.state.name;
    if (name && this.props.addItem) {
      this.props.addItem(name);
      this.setState(prevState => ({ name: '' }));
    }
  }

  updateItem(id?: string, name?: string): void {
    id = id || this.props.item.id;
    name = name || this.state.name;
    if (id && name && this.props.updateItem) {
      this.props.updateItem(id, name);
    }
  }

  saveItem(): void {
    if (this.exists) {
      this.updateItem();
    } else {
      this.addItem();
    }
  }

  flashButton() {
    this.setState(prevState => ({ saving: true }));
    setTimeout(() => {
      this.setState(prevState => ({ saving: false }));
    }, 200);
  }

  handleInputChange(event: SyntheticInputEvent<HTMLInputElement>): void {
    const value: string = event.target.value;
    this.setState(prevState => ({ name: value }));
  }

  handleInputKeyDown(event: SyntheticInputEvent<HTMLInputElement>): void {
    if (event.keyCode === 13) { // On the enter key
      this.saveItem();
      this.flashButton();
    }
  }

  handleButtonClick(): void {
    this.saveItem();
  }

  render(): ?React$Element<any> {
    const buttonClass: string = 'list__button button'
      + (this.state.saving ? ' button--active' : '');
    return (
      <span className="list__save">
        <input
          className="list__input-text input-text"
          autoFocus={ true }
          placeholder="Item Name"
          value={ this.state.name }
          onChange={ this.handleInputChange }
          onKeyDown={ this.handleInputKeyDown } />
        <button
          className={ buttonClass }
          onClick={ this.handleButtonClick }>
          { this.exists ? 'Update' : 'Add' }
        </button>
      </span>
    );
  }
}

export default ItemSave;
