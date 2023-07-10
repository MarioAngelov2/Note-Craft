const URL = `http://localhost:5001/api/notes/`;

export async function getNotes() {
    try {
        const response = await fetch(URL, { method: "GET" });

        if (response.status === 200) {
            return response.json();
        } else if (response.status === 204) {
            console.error("No content");
            return null;
        } else if (response.status === 400) {
            throw new Error("Bad request");
        } else if (response.status === 404) {
            throw new Error("Notes not found");
        }
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch notes");
    }
}
