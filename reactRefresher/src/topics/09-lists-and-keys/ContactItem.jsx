// One list item, extracted into its own component. Notice: no key here.
// The key belongs on <ContactItem key=...> in the parent's map(), because
// that is where React looks at the list of siblings.
// Also, key is NOT passed in as a prop: props.key would be undefined.
// If the child needs the id, pass it separately (id={contact.id}).
function ContactItem({ name, phone, isFavorite }) {
  return (
    <li>
      {isFavorite && "⭐ "}
      <strong>{name}</strong>: {phone}
    </li>
  );
}

export default ContactItem;
