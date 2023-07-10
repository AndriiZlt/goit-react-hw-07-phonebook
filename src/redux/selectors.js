import { useSelector } from 'react-redux';

const GetSelector = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter);

  return { contacts, filter };
};

export default GetSelector;
