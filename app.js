window.addEventListener('load',()=>{
  const app = Vue.createApp({
    el: '#app',
    data(){
      return{
        items: [],
        saved: [],
        show:false,
        search: '',
        total:0
      }
    },
    async created() {
      fetch('./data.json')
        .then((res)=>{return res.json()})
        .then((res)=>{
          this.items=res.cart;
          this.saved=res.saved;
          this.savedTotal();
      });
    },
    methods:{
      removeFromSaved(index){
        const item = this.saved.splice(index,1)
        this.items.push(item[0])
        this.total-=item[0].price
      },
      saveCard(index){
        const item = this.items.splice(index,1)
        this.saved.push(item[0])
        this.total+=item[0].price
      },
      savedTotal(){
        if(this.saved.length > 0){
          this.saved.map(item => this.total+=item.price);
        }
      }
    },
    computed: {
      savedIsEmpty: function () {
          return this.saved.length > 0 ? false : true
      },
      filteredList() {
        return this.items.filter(item => {
          return item.name.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
  });
  app.mount('#app')
});