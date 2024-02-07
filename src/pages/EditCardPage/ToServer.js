const ToServer = (newData) => {
  return {
    title: newData.title,
    subtitle: newData.subtitle,
    description: newData.description,
    phone: newData.phone,
    email: newData.email,
    web: newData.web,
    image: {
      url: newData.url,
      alt: newData.alt,
    },
    address: {
      state: newData.state,
      country: newData.country,
      city: newData.city,
      street: newData.street,
      houseNumber: newData.houseNumber,
      zip: newData.zip,
    },
  };
};
export default ToServer;
