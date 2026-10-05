import ContactItem from "./ContactItem";

const contacts = [
  { id: "c1", name: "Arun", phone: "98480 11111", isFavorite: true },
  { id: "c2", name: "Priya", phone: "98480 22222", isFavorite: false },
  { id: "c3", name: "Kiran", phone: "98480 33333", isFavorite: true },
];

// The key goes on the outermost element returned from map(), which here is
// the component itself. {...contact} spreads name, phone and isFavorite as props.
function ContactList() {
  return (
    <ul>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} {...contact} />
      ))}
    </ul>
  );
}

export default ContactList;
