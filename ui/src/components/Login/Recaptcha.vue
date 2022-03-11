<template>
  <vue-recaptcha ref="recaptcha"
                  @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired"
                  size="invisible"
                  sitekey="6LfZVH0eAAAAAOFiMrnNpE8bMvKBpURfDF-x-6h9" >
  </vue-recaptcha>
</template>

<script>
  import axios from 'axios';
  import { VueRecaptcha } from 'vue-recaptcha';
  export default {
    props:["afterVerif"],
    components: { VueRecaptcha }
    ,
    methods: {
      submit: function () {

        // this.status = "submitting";

        this.$refs.recaptcha.execute();
      },
      
      onCaptchaVerified: function (recaptchaToken) {
        const self = this;
        self.status = "submitting";
        self.$refs.recaptcha.reset();
        
        axios.post(`${process.env.VUE_APP_APIURL}/signup`, {

          recaptchaToken: recaptchaToken
        }).then((response) => {
          self.sucessfulServerResponse = response.data.message;
          console.log(response.data.message)
          //Execute after succ Response

          this.$root.$emit(this.afterVerif)
        }).catch((err) => {
          self.serverError = getErrorMessage(err);

          //helper to get a displayable message to the user
          function getErrorMessage(err) {
            let responseBody;
            responseBody = err.response;
            if (!responseBody) {
              responseBody = err;
            }
            else {
              responseBody = err.response.data || responseBody;
            }
            return responseBody.message || JSON.stringify(responseBody);
          }

        }).then(() => {
          self.status = "";
        });


      },
      onCaptchaExpired: function () {
        this.$refs.recaptcha.reset();
      }
    },
    data() {
      return {
        email: "",
        password: "",
        passwordConfirmation: "",
        status: "",
        sucessfulServerResponse: "",
        serverError: ""
      };
    }
  };
</script>