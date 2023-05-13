<template>
    <div class="forgotPasswordBox">
        <md-card class="forgotPasswordCard">
            <md-card-media-actions>
                <md-card-media>
                    <img src="@/assets/images/garnbarn-logo.png" class="garnbarnLogo" />
                </md-card-media>

                <md-card-actions>
                    <h3>Forgot Password</h3>
                    <div>
                        <form @submit.prevent="submitForm">
                            <div class="input-block">
                                <label for="email">Email:</label>
                                <input id="email" v-model="email" type="email" />
                            </div>
                            <div>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </md-card-actions>
            </md-card-media-actions>
        </md-card>
    </div>
</template>
  
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ForgotPassword extends Vue {
    email = '';

    submitForm(): void {
        this.email = '';

        alert('Password reset instructions sent to your email!');
    }
}
</script>
  
<style scoped>
.forgotPasswordBox {
    padding-top: 5%;
    padding-top: 5%;
}

.forgotPasswordCard {
    padding: 10px;
    padding-top: 15px;
    border-radius: 20px;
    background-color: #f9f9f9;
    display: inline-block;
    vertical-align: top;
    overflow: auto;
    border: 1px solid rgba(#000, 0.12);
}

.input-block {
    margin: 0.5rem;
}
.md-alignment-right{
    justify-content: center !important; 
}
</style>
  