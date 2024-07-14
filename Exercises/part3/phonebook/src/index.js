import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 3001;

morgan.token("post-body", (request, response) => {
	if (request.method === "POST") {
		return JSON.stringify(request.body);
	}
});

app.use(
	morgan((tokens, request, response) => {
		return [
			tokens.method(request, response),
			tokens.url(request, response),
			tokens.status(request, response),
			tokens.res(request, response, "content-length"),
			"-",
			tokens["response-time"](request, response),
			"ms",
			// JSON.stringify(request.body),
			tokens["post-body"](request, response),
		].join(" ");
	})
);

let persons = [
	{
		id: "1",
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: "2",
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: "3",
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: "4",
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.use(express.json());

app.get("/", (request, response) => {
	return response.send("<h1>Phone Book</h1>");
});

app.get("/api/persons", (request, response) => {
	return response.json(persons);
});

app.get("/info", (request, response) => {
	const personCount = persons.length;
	const currentTime = new Date().toString();
	return response.send(`
		<p>Phonebook has info for ${personCount} people</p>
		<p>${currentTime}</p>
		`);
});

app.get("/api/persons/:id", (request, response) => {
	const { id } = request.params;
	const person = persons.find((person) => person.id === id);
	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

app.delete("/api/persons/:id", (request, response) => {
	const { id } = request.params;
	persons = persons.filter((person) => person.id !== id);
	return response.status(204).end();
});

const generateId = () => {
	const newId = Math.floor(Math.random() * 100000000) + 1;
	return String(newId);
};

app.post("/api/persons", (request, response) => {
	const { body } = request;

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: "Missing Fields",
		});
	}

	const personExists = persons.some((person) => person.name === body.name);
	if (personExists) {
		return response.status(400).json({
			error: "name must be unique",
		});
	}

	const person = {
		id: generateId(),
		name: body.name,
		number: body.number,
	};

	persons = persons.concat(person);
	response.json(person);
});

app.listen(PORT, () => {
	console.log(`Server listening on PORT:${PORT}`);
});
