const { apiUrl } = require('./apiConfig')

test("Happy path test", async () => {

    const newBook = {
        title: "The Hobbit",
        author: "J. R. R. Tolkien",
    }
    
    // POST: Add new book
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

    // Check ID of the book we added
    const bookId = Number(postResJson.id);
    expect(bookId).toEqual(expect.any(Number));

    
    // GET: Get list of books, expect the book we just created to be inside
    const getRes = await fetch(`${apiUrl}/api/books`);
    
    expect(getRes.status).toBe(200);
    
    const getResJson = await getRes.json();

    expect(Array.isArray(getResJson)).toBe(true);

    // Check the format of the response
    for (const value of getResJson) {
        expect(value).toEqual(
            expect.objectContaining({
                title: expect.any(String),
                author: expect.any(String),
                id: expect.any(String),
            })
        );
    }

    // Check to see if response has the book we just added
    expect(getResJson).toEqual(
        expect.arrayContaining([postResJson])
    );

    
    // GET: Get book by id
    const getIdRes = await fetch(`${apiUrl}/api/books/${bookId}`);

    expect(getIdRes.status).toBe(200);

    const getIdResJson = await getIdRes.json();
    expect(getIdResJson).toEqual(
        expect.objectContaining(postResJson)
    );    
});
