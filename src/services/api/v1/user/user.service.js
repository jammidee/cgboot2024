exports.getUsers = async () => {
  return db.users.findAll()
}