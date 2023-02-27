import React, { Component } from 'react';

import ContactForm from './ContactForm/ContactForm';
import NumberList from './NumberList/NumberList';
import Filter from './Filter/Filter';

import style from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addNumber = objNumber => {
    const { id, name, number } = objNumber;
    if (this.state.contacts.filter(e => e.name === name).length !== 0) {
      alert(`${name}is already in contacts.`);
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [{ id, name, number }, ...prevState.contacts],
      };
    });
  };

  onFilterChage = e => {
    const value = e.currentTarget.value;
    this.setState({ filter: value });
  };

  deleteContact = id => {
    const newListContact = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: newListContact });
  };

  render() {
    const normilizeFilter = this.state.filter.toLowerCase();
    const visibleContact = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizeFilter)
    );

    return (
      <div className={style.App__container}>
        <div>
          <h1 className={style.App__title}>Phonebook</h1>
          <ContactForm addNumber={this.addNumber} />
          <h2 className={style.App__title}>Contacts</h2>
          <Filter
            filter={this.state.filter}
            onFilterChage={this.onFilterChage}
          />
          <NumberList
            list={visibleContact}
            deleteContact={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;
