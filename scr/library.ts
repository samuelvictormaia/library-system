// Library Management System 

// Class 1: Book
class Book {
    public title: string;
    public writer: string;
    public isBorrowed: boolean;

    constructor(title: string, writer: string) {
        this.title = title;
        this.writer = writer;
        this.isBorrowed = false;
    }
}

class BookManager {
    private collection: Map<string, Book>;

    constructor() {
        this.collection = new Map<string, Book>();
    }

// Simulates a small delay (like a database call)
    private wait(ms: number = 100): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

 // Add a new book to the Book collection
    addBook(book: Book): void {
        if (this.collection.has(book.title)) {
            console.warn(`The book "${book.title}" is already in the system.`);
            return;
        }
        this.collection.set(book.title, book);
        console.log(`Added: "${book.title}" by ${book.writer}`);
    }

// Borrow a book
    async borrowBook(title: string): Promise<string> {
        await this.wait();

        const book = this.collection.get(title);
        if (!book) {
            throw new Error(`The title "${title}" could not be found.`);
        }

        if (book.isBorrowed) {
            throw new Error(`Sorry, the book "${title}" is currently borrowed.`);
        }

        book.isBorrowed = true;
        return `You just borrowed "${title}". Take good care of it!`;
    }

// Return a borrowed book
    async returnBook(title: string): Promise<string> {
        await this.wait();

        const book = this.collection.get(title);
        if (!book) {
            throw new Error(`The book "${title}" does not belong to this Library.`);
        }

        if (!book.isBorrowed) {
            throw new Error(`The book "${title}" was not borrowed.`);
        }

        book.isBorrowed = false;
        return `Thank you for returning "${title}".`;
    }

// List all books
    listBooks(): void {
        console.log("Book Collection:");
        this.collection.forEach((book) => {
            console.log(
                `- "${book.title}" by ${book.writer} — ${book.isBorrowed ? "Not Available" : "Available"}`
            );
        });
    }
}

// Start System
async function startSystem() {
    console.log("===============================================");
    console.log("            Library System Starting            ");
    console.log("===============================================");

    const library = new BookManager();

//  Add books
    console.log("Adding books to the collection...");
    library.addBook(new Book("Dom Casmurro", "Machado de Assis"));
    library.addBook(new Book("O Guarani", "José de Alencar"));
    library.addBook(new Book("Capitães da Areia", "Jorge Amado"));
    library.addBook(new Book("A Hora da Estrela", "Clarice Lispector"));
    library.addBook(new Book("Grande Sertão: Veredas", "João Guimarães Rosa"));
    library.addBook(new Book("O Cortiço", "Aluísio Azevedo"));

// Show available books
    library.listBooks();

// Borrow a book
    console.log("Trying to borrow 'Dom Casmurro'...");
    try {
        const msg = await library.borrowBook("Dom Casmurro");
        console.log(msg);
    } catch (err) {
        if (err instanceof Error) console.error(err.message);
    }

// Borrow the same book again (should fail)
    console.log("Borrowing 'Dom Casmurro' again (should fail)...");
    try {
        const msg = await library.borrowBook("Dom Casmurro");
        console.log(msg);
    } catch (err) {
        console.warn("-> Expected error:");
        if (err instanceof Error) console.error(err.message);
    }

// Borrow a book that doesn't exist
    console.log("Borrowing 'Vidas Secas' (not added yet)...");
    try {
        const msg = await library.borrowBook("Vidas Secas");
        console.log(msg);
    } catch (err) {
        console.warn("-> Expected error:");
        if (err instanceof Error) console.error(err.message);
    }

// Return the book successfully
    console.log("Returning 'Dom Casmurro'...");
    try {
        const msg = await library.returnBook("Dom Casmurro");
        console.log(msg);
    } catch (err) {
        if (err instanceof Error) console.error(err.message);
    }

// Try returning it again (should fail)
    console.log("Returning 'Dom Casmurro' again (should fail)...");
    try {
        const msg = await library.returnBook("Dom Casmurro");
        console.log(msg);
    } catch (err) {
        console.warn("-> Expected error:");
        if (err instanceof Error) console.error(err.message);
    }

 // Final list
    console.log("Final list of books:");
    library.listBooks();

    console.log("\n===============================================");
    console.log("     End of Library System Simulation");
    console.log("===============================================");
}

// Run the System
startSystem();
