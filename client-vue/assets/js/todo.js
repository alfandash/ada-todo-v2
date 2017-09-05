const url = 'http://localhost:3000'


var app = new Vue({
  el: '#app',
  data: {
    token: '',
    task: '',
    taskslist: []
  },
  methods: {
    getToken () {
      let self = this
      if (localStorage.getItem('adatodotoken')) {
        self.token = localStorage.getItem('adatodotoken')
        self.loadtask()
      } else {
        window.location.href = "/"
      }
    },
    logout () {
      localStorage.removeItem('adatodotoken')
      localStorage.removeItem('fbaccesstoken')
      window.location.href = "/index.html" 
    },
    addtask () {
      let self = this
      axios({
        method: 'post',
        url: `${url}/todo/`,
        headers: { token: self.token },
        data: {
          task: self.task
        }      
      })
      .then((response) => {
        console.log(response.data)
        self.loadtask()
      })
      .catch((error) => {
        console.log(error)
      })
    },
    loadtask () {
      let self = this
      axios({
        method: 'get',
        url: `${url}/todo`,
        headers: { token: self.token }
      })
      .then((response) => {
        this.taskslist = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    },
    updatestatus (id,status) {
      let self = this
      console.log(id)
      if (status === 'done') {
        status = 'undone'
      } else {
        status = 'done'
      }
      console.log(status)
      axios({
        method: 'put',
        url: `${url}/todo/status?id_task=${id}&status=${status}`,
        headers: { token: self.token }
      })
      .then((response) => {
        console.log(response.data)
        self.loadtask()
      })
      .catch((error) => {
        console.log(error)
      })
    },
    destroytask (id) {
      let self = this
      axios({
        method: 'delete',
        url: `${url}/todo?id_task=${id}`,
        headers: { token: self.token }
      })
      .then((response) => {
        console.log(response.data)
        self.loadtask()
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getToken()
  }
})

// Smooth scrolling using jQuery easing
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, "easeInOutExpo");
      return false;
    }
  }
});
