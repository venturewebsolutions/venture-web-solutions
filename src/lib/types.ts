export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type AutocompleteValue =
  // Global on/off
  | 'on'
  | 'off'

  // Name
  | 'name' // full name
  | 'honorific-prefix' // Mr., Mrs., Dr., etc.
  | 'given-name' // first name
  | 'additional-name' // middle name
  | 'family-name' // last name
  | 'honorific-suffix' // Jr., Sr., III, etc.
  | 'nickname'

  // Auth
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'one-time-code' // OTP / 2FA codes

  // Organisation
  | 'organization-title' // job title
  | 'organization'

  // Address
  | 'street-address'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level1' // state / province
  | 'address-level2' // city / town
  | 'address-level3' // neighbourhood / district
  | 'address-level4' // most specific level
  | 'country' // ISO 3166-1 alpha-2 country code
  | 'country-name' // full country name

  // Contact
  | 'postal-code'
  | 'email'
  | 'tel'
  | 'tel-country-code' // e.g. +1, +44
  | 'tel-national' // without country code
  | 'tel-area-code'
  | 'tel-local'
  | 'tel-local-prefix'
  | 'tel-local-suffix'
  | 'tel-extension'
  | 'impp' // instant messaging URL (e.g. xmpp:user@host)
  | 'url'

  // Date / personal
  | 'bday' // full birthday
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'sex' // gender identity, free-form text
  | 'language' // preferred language, BCP 47 tag

  // Payment
  | 'cc-name' // full name on card
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp' // expiry MM/YY
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc' // security code
  | 'cc-type' // Visa, Mastercard, etc.
  | 'transaction-currency'
  | 'transaction-amount'

  // Photo
  | 'photo'

  // WebAuthn (passkeys)
  | 'webauthn'
  | (string & {})
