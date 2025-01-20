# To-Do List Application

A simple **To-Do List** application built using **Node.js**, **Express.js**, **MongoDB**, and **EJS templating engine**. This application allows users to create, delete, and manage daily tasks as well as custom lists.

---

## Features

1. **Default List**:
   - Users have a default "Today" list with preloaded tasks: 
     - "Buy Food"
     - "Cook Food"
     - "Eat Food"
   - Tasks can be added or deleted.

2. **Custom Lists**:
   - Users can create custom task lists by navigating to `/<custom-list-name>` in the URL.
   - Each custom list is saved in MongoDB for persistent storage.

3. **Task Management**:
   - Add new tasks to either the default or custom lists.
   - Delete tasks by checking them off.

4. **Dynamic Routing**:
   - Automatically creates a new list if the specified custom list does not exist in the database.

5. **MongoDB Integration**:
   - Persistent storage of lists and tasks using MongoDB.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Templating**: EJS
- **CSS & Static Files**: Public directory for custom styles and assets
- **Environment Variables**: dotenv

---

## Installation

### Prerequisites
1. **Node.js**: Make sure you have Node.js installed.
2. **MongoDB**: Install and run a MongoDB instance locally or use a cloud MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

---

### Steps

1. **Clone the Repository**
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Create a `.env` file in the root of the project and add the following:
   ```env
   MONGO_API=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
   PORT=3000
   ```

4. **Start the Server**
   ```bash
   node app.js
   ```

5. **Access the Application**
   Open your browser and go to:
   - Default List: [http://localhost:3000](http://localhost:3000)
   - Custom List: [http://localhost:3000/<custom-list-name>](http://localhost:3000/<custom-list-name>)

---

## Usage

### Default List
1. Navigate to [http://localhost:3000](http://localhost:3000).
2. Add a new task using the input box and click "+".
3. Delete a task by selecting the checkbox next to it.

### Custom Lists
1. Navigate to [http://localhost:3000/<custom-list-name>](http://localhost:3000/<custom-list-name>).
2. A new list will be created automatically if it doesn't exist.
3. Manage tasks in the same way as the default list.

---

## Project Structure

```
├── public
│   ├── css
│   │   └── styles.css
├── views
│   ├── list.ejs
│   └── about.ejs
├── app.js
├── package.json
└── .env
```

- `app.js`: Main application file.
- `views/`: Contains EJS templates for rendering pages.
- `public/`: Contains static files like CSS.

---

## Dependencies

- **express**: Web framework for Node.js.
- **body-parser**: Parses incoming request bodies.
- **mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **lodash**: Utility library for string manipulation (used for capitalizing custom list names).
- **dotenv**: To manage environment variables.

---

## Environment Variables

The `.env` file should include:
```env
MONGO_API=<Your MongoDB connection string>
PORT=<Your desired port number>
```

---

## Future Enhancements

1. **User Authentication**:
   - Allow users to create accounts and have personalized lists.
2. **Styling Enhancements**:
   - Improve the UI/UX with modern CSS frameworks like Bootstrap or Tailwind.
3. **Cloud Deployment**:
   - Deploy the app to platforms like Heroku or AWS.

---

## Contributing

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes and test thoroughly.
4. Submit a pull request.


---

Feel free to suggest any improvements or report bugs! Happy coding 🎉
