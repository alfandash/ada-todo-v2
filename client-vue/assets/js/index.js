const url = 'http://localhost:3000'

var app = new Vue({
  el: '#signup',
  data: {
    email: '',
    username: '',
    password: ''
  },
  methods: {
    signup() {
      let self = this
      let dataSignup = {
        email: self.email,
        username: self.username,
        password: self.password
      }

      axios.post(`${url}/users/signup`,{
        email: self.email,
        username: self.username,
        password: self.password
      })
      .then(response => {
        console.log(response);
        alert(`Daftar berhasil ${response.data.message} silahkan login`)
        window.location.href = 'index.html'
      })
      .catch(err => {
        console.log(err);
        alert('Signup gagal harap ulangi')
        res.send(err)
      })
    }

    signin() {
      let self = this
      let dataSignin = {
        username: self.username,
        password: self.password
      }
      axios.post(`${url}/users/signin`,{
        username: self.username,
        password: self.password
      })
      .then(response => {
        console.log('response nih',response.data);
        alert(`Login berhasil`)
        localStorage.setItem('gp-uploader-token',response.data.token)
        window.location.href = 'gp-uploader.html'
      })
      .catch(err => {
        alert(err)
        console.log('error',err);
      })

    }
  }
})

var signin = new Vue({
  el: '#signin',
  data: {
    username: '',
    password: ''
  },
  methods: {
    signin() {
      let self = this
      let dataSignin = {
        username: self.username,
        password: self.password
      }
      axios.post(`${url}/users/signin`,{
        username: self.username,
        password: self.password
      })
      .then(response => {
        console.log('response nih',response.data);
        alert(`Login berhasil`)
        localStorage.setItem('gp-uploader-token',response.data.token)
        window.location.href = 'gp-uploader.html'
      })
      .catch(err => {
        alert(err)
        console.log('error',err);
      })

    }
  }
})
