import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Container, Title } from './App.styles';

export class App extends Component {
  static defaultProps = {
    contacts: [
      { id: 'id-10', name: 'Владислав', number: '0548348383' },
      { id: 'id-1', name: 'Rosie Simpson', number: '+380630206263' },
      { id: 'id-2', name: 'Hermione Kline', number: '0630203313' },
      { id: 'id-3', name: 'Eden Clements', number: '+380630203700' },
      { id: 'id-4', name: 'Annie Copeland', number: '+380630666700' },
    ],
  };

  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
    title: PropTypes.string.isRequired,
  };

  state = {
    contacts: this.props.contacts,
    filter: '',
  };

  addContact = (newContact, { resetForm }) => {
    const { contacts } = this.state;
    const isNewContact = !contacts.find(({ name }) => name === newContact.name);
    if (!isNewContact) {
      Report.failure(`${newContact.name} is already in contacts`, '', 'Okey', {
        position: 'center-bottom',
      });
      return;
    }

    this.setState(({ contacts: currentContacts }) => ({
      contacts: [{ ...newContact, id: nanoid() }, ...currentContacts],
    }));

    resetForm();
  };

  deleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  updateFilterValue = value => {
    this.setState({ filter: value });
  };

  toFilterContactsForName = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(({ name }) => {
      const text = name.toLowerCase();
      const filterText = filter.toLowerCase();
      return text.includes(filterText);
    });
  };

  render() {
    const { filter } = this.state;
    const { title } = this.props;

    return (
      <Container>
        <Title>{title}</Title>
        <ContactForm onSubmit={this.addContact} />
        <Filter onChange={this.updateFilterValue} value={filter} />
        <ContactList
          contacts={this.toFilterContactsForName()}
          toDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
