export const Model = {
  data: {
    iddle: true,
  },
  updateData: (data) => {
    Model.data = Object.assign(Model.data, data)
  },
}
