const API_URL = "https://test.miocafehn.com/api";

export async function getItems() {
    const res = await fetch(`${API_URL}/get-items.php`, {
        cache: "no-store", // Next.js no cachea
    });
    return res.json();
}

export async function addItem(data: any) {
    const res = await fetch(`${API_URL}/add-item.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}
