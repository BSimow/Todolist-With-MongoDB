//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const env = require("dotenv").config().parsed;

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect(env.MONGO_API);

const itemsSchema = {
	name: String,
};

const listSchema = {
	name: String,
	items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
	name: "Buy Food",
});
const item2 = new Item({
	name: "Cook Food",
});
const item3 = new Item({
	name: "Eat Food",
});

const defaultItems = [item1, item2, item3];

app.get("/", (req, res) => {
	Item.find({})
		.then((items) => {
			if (items.length === 0) {
				Item.insertMany(defaultItems).then(() => {
					console.log("Successfully saved default items to DB");
				});
			}
			res.render("list", { listTitle: "Today", newItemsList: items });
		})
		.catch((err) => {
			res.send(err);
		});
});

app.post("/", async (req, res) => {
	const itemName = req.body.newItem;
	const item = new Item({
		name: itemName,
	});

	const listName = req.body.list;
	if (listName === "Today") {
		item.save();
		res.redirect("/");
	} else {
		await List.findOne({ name: listName }).then((foundList) => {
			foundList.items.push(item);
			foundList.save();
			res.redirect("/" + listName);
		});
	}
});

app.post("/delete", async (req, res) => {
	const checkedItemId = req.body.checkbox;
	const listName = req.body.list;
	console.log(listName);
	if (listName === "Today") {
		await Item.findByIdAndDelete(checkedItemId)
			.then(() => {
				console.log("Successfully deleted checked item");
				res.redirect("/");
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		await List.findOneAndUpdate(
			{ name: listName },
			{ $pull: { items: { _id: checkedItemId } } }
		)
			.then((foundList) => {
				res.redirect("/" + listName);
			})
			.catch((err) => {
				console.log(err);
			});
	}
});

app.get("/:customListName", async (req, res) => {
	const customListName = _.capitalize(req.params.customListName);
	await List.findOne({ name: customListName }).then((foundList) => {
		if (!foundList) {
			const list = new List({
				name: customListName,
				items: defaultItems,
			});
			list.save();
			console.log("List created");
			res.redirect("/" + customListName);
		} else {
			//Show lists
			res.render("list", {
				listTitle: foundList.name,
				newItemsList: foundList.items,
			});
		}
	});
});

app.post("/work", (req, res) => {
	var item = req.body.newItem;

	res.redirect("/work");
});

app.get("/about", (req, res) => {
	res.render("about");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
