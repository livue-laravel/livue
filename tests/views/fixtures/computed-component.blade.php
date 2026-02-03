<div>
    <input type="text" v-model="firstName" placeholder="First Name">
    <input type="text" v-model="lastName" placeholder="Last Name">

    <p class="full-name">{{ $fullName }}</p>
    <p class="initials">{{ $initials }}</p>

    @if($isComplete)
        <span class="complete">Name is complete</span>
    @endif
</div>
