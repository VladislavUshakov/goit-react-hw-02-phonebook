import { ContactItem } from 'components/ContactItem';
import PropTypes from 'prop-types';
import { List } from './ContactList.styles';
import { Title } from './ContactList.styles';

export const ContactList = ({ contacts, toDeleteContact }) => {
  return (
    <div>
      <Title>Contacts</Title>
      <List>
        {contacts.map(({ name, number, id }) => {
          return (
            <ContactItem
              key={id}
              name={name}
              number={number}
              id={id}
              toDeleteContact={toDeleteContact}
            />
          );
        })}
      </List>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  toDeleteContact: PropTypes.func.isRequired,
};
