<div>
    <input type="email" v-model="email" placeholder="Email">

    @error('email')
        <p class="error-message">{{ $message }}</p>
    @enderror

    <button @click="submit">Submit</button>
</div>

