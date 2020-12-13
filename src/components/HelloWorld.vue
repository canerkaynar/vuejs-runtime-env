<template>
  <div class="hello">
    <div class="wrapper">
      <h1>{{ msg }}</h1>
      <div><strong>Variable 1: </strong> {{ variable1 }}</div>
      <div><strong>Variable 2: </strong> {{ variable2 }}</div>
      <div><strong>ApiUrl: </strong> {{ apiUrl }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    console.log("process.env: ", process.env);
    console.log(this.env);
    return {
      variable1: this.env.VUE_APP_VARIABLE_1,
      variable2: this.env.VUE_APP_VARIABLE_2,
      apiUrl: this.env.VUE_APP_API_URL
    };
  }
};
</script>
,

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.wrapper {
  text-align: left;
}
.hello {
  justify-content: center;
  display: flex;
}
</style>
