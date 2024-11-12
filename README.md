# c13-react-review
Mild, medium, and spicy react topics using a todo app for an example

Here are the steps covered in each version of the code:

React Review
Setup	
1. Setup a new react 
2. Remove boiler plate
3. Run app
Mild - AppMild.jsx
1. Setup useStates (todo’s and inputs)
2. Create add input function (addTodo)
3. Add input button (to trigger  addTodo)
4. Create TodoItem Component
5. Add list to map list of todos (to “map” over the list of todos)
6. Bonus - abstract TodoItem to another file
Medium - AppMedium.jsx
1. Add completed check box (optionally make it a new component)
2. Add delete button (optionally make it a new component)
3. Add useEffect to Fetch existing ToDo list on initial page load
4. Bonus - add a button to add another 5 todos
Spicy - AppSpicy.jsx
1. Make a custom hook for data fetching
2. Memoize todo list to only render the list on data change
3. create a context to make useState variables available across all child components

## How to Run
copy the version of the code you want to run into the App.jsx file and run the following command:
```npm run dev```