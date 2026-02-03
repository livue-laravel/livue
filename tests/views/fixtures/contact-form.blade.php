<div>
    @if($submitted)
        <p>Thank you for your message!</p>
    @else
        <form @submit.prevent="submit">
            <input type="text" v-model="name" placeholder="Name">
            <input type="email" v-model="email" placeholder="Email">
            <textarea v-model="message" placeholder="Message"></textarea>
            <button type="submit">Send</button>
        </form>
    @endif
</div>
