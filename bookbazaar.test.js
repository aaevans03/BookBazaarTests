const { apiUrl } = require('./apiConfig')

test("Happy path test", async () => {

    const newBook = {
        title: "The Hobbit",
        author: "J. R. R. Tolkien",
    }
    
    const postRes = await fetch(`${apiUrl}/api/books`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(newBook),
    });

    expect(postRes.status).toBe(201);
    expect(postRes.statusText).toBe('Created');

    const postResJson = await postRes.json();
    expect(postResJson.title).toBe(newBook.title);
    expect(postResJson.author).toBe(newBook.author);
    expect(postResJson.id).toEqual(expect.any(String));

    const bookId = Number(postResJson.id)

    expect(bookId).toEqual(expect.any(Number));
    
});
