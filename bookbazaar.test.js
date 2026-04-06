const { apiUrl } = require('./apiConfig')

// Fetch endpoint helper function
async function fetchEndpoint(path, method = 'GET', body) {
    const options = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
    }

    if (body) {
        options.body = JSON.stringify(body);
    }
    
    return await fetch(apiUrl + path, options);
};


test("Happy path test: POST/GET a new book", async () => {

    const newBook = {
        title: "The Hobbit",
        author: "J. R. R. Tolkien",
    }
    
    // POST: Add new book
    const postRes = await fetchEndpoint('/api/books', 'POST', newBook);

    expect(postRes.status).toBe(201);

    const postResJson = await postRes.json();
    expect(postResJson.title).toBe(newBook.title);
    expect(postResJson.author).toBe(newBook.author);

    // Check ID of the book we added
    const bookId = Number(postResJson.id);
    expect(bookId).toEqual(expect.any(Number));

    
    // GET: Get list of books, expect the book we just created to be inside
    const getRes = await fetchEndpoint('/api/books');
    
    expect(getRes.status).toBe(200);
    
    const getResJson = await getRes.json();

    expect(Array.isArray(getResJson)).toBe(true);

    // Check the format of the response
    expect(getResJson).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                title: expect.any(String),
                author: expect.any(String),
                id: expect.any(String),
            })
        ])
    );

    // Check to see if response has the book we just added
    expect(getResJson).toEqual(
        expect.arrayContaining([postResJson])
    );

    
    // GET: Get book by id
    const getIdRes = await fetchEndpoint(`/api/books/${bookId}`);

    expect(getIdRes.status).toBe(200);

    const getIdResJson = await getIdRes.json();
    expect(getIdResJson).toEqual(
        expect.objectContaining(postResJson)
    );    
});

// Unfortunately, an object of any format sent to `mockapi.io` is added to their database. This test fails with `mockapi.io`
test("Edge/validation case: POST with invalid format", async () => {
    
    // newBook missing a title
    const newBook = {
        "author": "Bob the Builder",
    }

    const postRes = await fetchEndpoint('/api/books', 'POST', newBook);

    expect(postRes.status).toBe(400);
    expect(await postRes.json()).toBe('Invalid request');
});


test("Negative/error case: DELETE nonexistent book", async () => {
    const getRes = await fetchEndpoint('/api/books/99999', 'DELETE');
    
    expect(getRes.status).toBe(404);
    expect(await getRes.json()).toBe('Not found');
});

