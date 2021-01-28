var storage = window.localStorage

const LocalStorage = () => {
  return {
    setUser(obj) {
      storage.setItem('emp_obj', JSON.stringify(obj))
    },
    getUser() {
      return JSON.parse(storage.getItem('emp_obj'))
    },
    removeUser() {
      storage.removeItem('emp_obj')
    }
  }
}

export default LocalStorage()