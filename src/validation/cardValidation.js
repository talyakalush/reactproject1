import Joi from "joi";

const titleSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
});
const subTitleSchema = Joi.object({
  subtitle: Joi.string().min(2).max(256).required(),
});
const descriptionSchema = Joi.object({
  description: Joi.string().min(2).max(1024).required(),
});
const phoneSchema = Joi.object({
  phone: Joi.string().min(9).max(11).required(),
});
const emailSchema = Joi.object({
  email: Joi.string().min(5).required(),
});
const webSchema = Joi.object({ web: Joi.string().min(14).allow("") });
const stateSchema = Joi.object({
  state: Joi.string().allow(""),
});
const countrySchema = Joi.object({
  country: Joi.string().required(),
});
const citySchema = Joi.object({
  city: Joi.string().required(),
});
const streetSchema = Joi.object({
  street: Joi.string().required(),
});
const houseNumberSchema = Joi.object({
  houseNumber: Joi.number().min(1).required(),
});
const zipSchema = Joi.object({
  zip: Joi.number().required(),
});
const urlSchema = Joi.object({
  url: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .min(14)
    .allow(""),
});
const altSchema = Joi.object({ alt: Joi.string().min(2).allow("") });

const validateTitleSchema = (title) => titleSchema.validate(title);
const validateSubTitleSchema = (subtitle) => subTitleSchema.validate(subtitle);
const validateDescriptionSchema = (description) =>
  descriptionSchema.validate(description);
const validatePhoneSchema = (phone) => phoneSchema.validate(phone);

const validateEmailSchema = (email) => emailSchema.validate(email);

const validateStateSchema = (state) => stateSchema.validate(state);
const validateCountrySchema = (country) => countrySchema.validate(country);
const validateCitySchema = (city) => citySchema.validate(city);
const validateStreetSchema = (street) => streetSchema.validate(street);
const validateHouseNumberSchema = (houseNumber) =>
  houseNumberSchema.validate(houseNumber);
const validateZipSchema = (zip) => zipSchema.validate(zip);
const validateUrlSchema = (url) => urlSchema.validate(url);
const validateAltSchema = (alt) => altSchema.validate(alt);
const validateWebSchema = (web) => webSchema.validate(web);

const validateSchema = {
  title: validateTitleSchema,
  subtitle: validateSubTitleSchema,
  description: validateDescriptionSchema,
  phone: validatePhoneSchema,
  email: validateEmailSchema,

  state: validateStateSchema,
  country: validateCountrySchema,
  city: validateCitySchema,
  street: validateStreetSchema,
  houseNumber: validateHouseNumberSchema,
  zip: validateZipSchema,
  url: validateUrlSchema,
  alt: validateAltSchema,
  web: validateWebSchema,
};

export default validateSchema;
