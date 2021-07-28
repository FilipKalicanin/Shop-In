
export function getWareouseGoods() {
    let data = fetch(`https://fakestoreapi.com/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            } else {
                return res.json();
            }
        }).then(data => {
            return data;
        })
    return data;
}

export function getProductDetails(id) {
    let data = fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            } else {
                return res.json();
            }
        }).then(data => {
            return data;
        })
    return data;
}