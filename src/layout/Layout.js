// @flow

import React from 'react';

import ListModel from '../list/ListModel';

import './layout.css';

class Layout extends React.Component<any> {
  title: string;
  currentYear: () => number;

  constructor() {
    super();

    this.title = 'React Flow Relay Example';
    this.currentYear = this.currentYear.bind(this);
  }

  currentYear(): number {
    return new Date().getFullYear();
  }

  render(): ?React$Element<any> {
    return (
      <section className="layout">
        <header className="layout__header">
          <h1 className="layout__title">
            { this.title }
          </h1>
        </header>
        <main className="layout__content">
          <ListModel id="1" className="layout__list" />
        </main>
        <footer className="layout__footer">
          { this.currentYear() }
        </footer>
      </section>
    );
  }
}

export default Layout;
