import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost/api'
})

const JWT_TOKEN_LOCALSTORAGE_KEY = 'jwt_token'
const token = localStorage.getItem(JWT_TOKEN_LOCALSTORAGE_KEY);

axiosInstance.defaults.headers.common['Accept'] = 'application/json;charset=UTF-8';
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

export const authAPI = {
  async login (email, password) {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password
    })
    if (response.status == 200) {
      localStorage.setItem(JWT_TOKEN_LOCALSTORAGE_KEY, response.data.access_token)
      return true
    }
    return false
  },
  async customerLogin (code) {
    const response = await axiosInstance.post('/auth/customer/login', {
      code
    })
    if (response.status == 200) {
      localStorage.setItem(JWT_TOKEN_LOCALSTORAGE_KEY, response.data.access_token)
      return true
    }
    return false
  },
  async me () {
    const _token = localStorage.getItem(JWT_TOKEN_LOCALSTORAGE_KEY)
    if (_token) {
      axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + _token
    }
    const response = await axiosInstance.post('/auth/me')
    if (response.status == 200) {
      return response.data.data
    } 
    return {}
  },
  async customerMe () {
    const _token = localStorage.getItem(JWT_TOKEN_LOCALSTORAGE_KEY)
    if (_token) {
      axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + _token
    }
    const response = await axiosInstance.post('/auth/customer/me')
    if (response.status == 200) {
      return response.data.data
    }
    return {}
  },
  logout () {
    localStorage.removeItem(JWT_TOKEN_LOCALSTORAGE_KEY)
  }
}

export const foodAPI = {
  async getAll () {
    const response = await axiosInstance.get('/foods')
    if (response.status == 200) {
        return response.data
    }
    return []
  },
  async update (food) {
    const response = await axiosInstance.put('/foods/'.concat(food.id), {'quantity' : food.quantity})
    if (response.status == 200) {
      return {
        success: true
      }
    }
    return {
      success: false
    }
  }
  ,
  async saveNew (food) {
    const response = await axiosInstance.post('/foods', food)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  }
}

export const tableAPI = {
  async getAll () {
    const response = await axiosInstance.get('/tables')
    if (response.status == 200) {
        return response.data
    }
    return []
  },
  async saveNew (table) {
    const response = await axiosInstance.post('/tables', table)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },
  async updateTable (table) {
    const response = await axiosInstance.put('/tables/'.concat(table.id), table)
    if (response.status == 200) {
      return {
        success: true
      }
    }
    return {
      success: false
    }
  }
}

export const customerAPI = {
  async getAll () {
    const response = await axiosInstance.get('/customers')
    if (response.status == 200) {
        return response.data
    }
    return []
  },
  async saveNew (customer) {
    const response = await axiosInstance.post('/customers', customer)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },
  async updateCustomer (customer) {
    const response = await axiosInstance.put('/customers/'.concat(customer.id), customer)
    if (response.status == 200) {
      return {
        success: true
      }
    }
    return {
      success: false
    }
  }
}

export const foodOrderAPI = {
  async getAllFoodOrder () {
    const response = await axiosInstance.get('/food-orders')
    if (response.status == 200) {
      return response.data
    }
    return []
  },
  async updateFoodOrder (foodOrder) {
    const response = await axiosInstance.put('/food-orders/'.concat(foodOrder.id), {'quantity' : foodOrder.orderQuantity})
    if (response.status == 200) {
      return {
        success: true
      }
    }
    return {
      success: false
    }
  }
  ,
  async saveNewFoodOrder (foodOrder) {
    const response = await axiosInstance.post('/food-orders', foodOrder)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  }
}

export const orderAPI = {
  async getAll () {
    const response = await axiosInstance.get('/orders')
    if (response.status == 200) {
      return response.data
    }
    return []
  },
  async getByID (id) {
    const response = await axiosInstance.get('/orders/'.concat(id))
    if (response.status == 200) {
      return response.data
    }
    return []
  },
  async saveNew (order) {
    const response = await axiosInstance.post('/orders', order)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },
  async updateOrder (order) {
    const response = await axiosInstance.put('/orders/'.concat(order.id), order)
    if (response.status == 200) {
      return {
        success: true
      }
    }
    return {
      success: false
    }
  },
  async getAllOrdersToday () {
    const response = await axiosInstance.get('/orders-today')
    if (response.status == 200) {
      return response.data
    }
    return []
  },
  async getOrdersByIdCustomer (id) {
    const response = await axiosInstance.get('/order-from/'.concat(id))
    if (response.status == 200) {
      return response.data
    }
    return []
  }
}