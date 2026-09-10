const supertest = require("supertest");

describe("notes api", () => {
  let app;

  beforeEach(() => {
    // fresh module + in-memory notes array for every test, so
    // nothing a previous test created/deleted leaks into the next one
    jest.resetModules();
    app = require("../app");
  });

  describe("GET /", () => {
    test("returns the hello world html page", async () => {
      const response = await supertest(app).get("/");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/text\/html/);
      expect(response.text).toContain("Hello world");
    });
  });

  describe("GET /api/notes", () => {
    test("returns all notes as json", async () => {
      const response = await supertest(app).get("/api/notes");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/application\/json/);
      expect(response.body).toHaveLength(3);
    });

    test("returned notes contain the expected content", async () => {
      const response = await supertest(app).get("/api/notes");

      const contents = response.body.map((note) => note.content);
      expect(contents).toContain("Repasar los retos de JS de midudev");
    });
  });

  describe("GET /api/notes/:id", () => {
    test("returns the matching note when the id exists", async () => {
      const response = await supertest(app).get("/api/notes/1");

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
    });

    test("returns 404 when the id does not exist", async () => {
      const response = await supertest(app).get("/api/notes/999");

      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /api/notes/:id", () => {
    test("removes the note and responds 204", async () => {
      const deleteResponse = await supertest(app).delete("/api/notes/1");
      expect(deleteResponse.status).toBe(204);

      const notesResponse = await supertest(app).get("/api/notes");
      const ids = notesResponse.body.map((note) => note.id);

      expect(notesResponse.body).toHaveLength(2);
      expect(ids).not.toContain(1);
    });

    test("responds 204 even when the id does not exist", async () => {
      const response = await supertest(app).delete("/api/notes/999");
      expect(response.status).toBe(204);
    });
  });

  describe("POST /api/notes", () => {
    test("creates a new note when content is provided", async () => {
      const newNote = {
        content: "A brand new note",
        important: true
      };

      const response = await supertest(app)
        .post("/api/notes")
        .send(newNote);

      expect(response.status).toBe(201);
      expect(response.body.content).toBe(newNote.content);
      expect(response.body.important).toBe(true);
      expect(response.body.id).toBeDefined();
      expect(response.body.date).toBeDefined();

      const notesResponse = await supertest(app).get("/api/notes");
      expect(notesResponse.body).toHaveLength(4);
    });

    test("defaults important to false when not provided", async () => {
      const response = await supertest(app)
        .post("/api/notes")
        .send({ content: "No importance specified" });

      expect(response.status).toBe(201);
      expect(response.body.important).toBe(false);
    });

    test("returns 400 when content is missing", async () => {
      const response = await supertest(app)
        .post("/api/notes")
        .send({ important: true });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("note.content is missing");

      const notesResponse = await supertest(app).get("/api/notes");
      expect(notesResponse.body).toHaveLength(3);
    });
  });

  describe("unknown endpoint", () => {
    test("returns 404 with an error message", async () => {
      const response = await supertest(app).get("/api/does-not-exist");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Not found");
    });
  });
});
