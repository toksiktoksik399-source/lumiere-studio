export const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  title, tagline, city, phone, email, address, workingHours,
  whatsapp, telegram, vk, mapUrl, bookingUrl,
  heroHeading, heroSubheading,
  "heroImageUrl": heroImage.asset->url,
  "heroImages": heroImages[].asset->url,
  aboutHeading, aboutText,
  "aboutImageUrl": aboutPhoto.asset->url,
  "galleryImages": galleryImages[].asset->url
}`

export const PROCEDURES_QUERY = `*[_type == "topProcedure"] | order(order asc) {
  _id, title, description,
  "imageUrl": image.asset->url,
  priceLines[]{ label, price }
}`

export const TEAM_QUERY = `*[_type == "teamMember"] | order(order asc) {
  _id, name,
  "role": coalesce({"ru": role, "en": role}, {"ru": role, "en": role}),
  "experience": coalesce({"ru": experience, "en": experience}, {"ru": experience, "en": experience}),
  spec, bio,
  "photoUrl": coalesce(photoUrl, photo.asset->url)
}`

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc) {
  _id, name,
  "text": coalesce({"ru": text, "en": text}, text),
  rating,
  "photoUrl": coalesce(photoUrl, photo.asset->url)
}`

export const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id,
  "title": coalesce({"ru": title, "en": title}, title),
  "description": coalesce({"ru": description, "en": description}, description),
  price, category
}`
