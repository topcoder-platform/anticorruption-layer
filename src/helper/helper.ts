/**
 * Test if the id is UUID
 * @param {String} id the id
 * @returns {Boolean} true if it's a uuid
 */
export function isUuid(id: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}
