<div>
    <input type="text" v-model="newTodo" @keyup.enter="addTodo">
    <button @click="addTodo">Add</button>
    <ul>
        @foreach($todos as $todo)
            <li>{{ $todo['text'] }}</li>
        @endforeach
    </ul>
</div>
