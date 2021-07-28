import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// const BASE_URL = process.env.REACT_APP_ENV === "PROD" ? window.origin : "http://localhost";
const BASE_URL = window.origin;

const createRequest = () =>
    axios.create({
        baseURL: BASE_URL,
        params: {
            cookie: cookies.get("session"),
        },
    });

export { createRequest, BASE_URL };

export const postLogin = async (data) => {
    const config = {
        method: "post",
        url: BASE_URL + "/backend/api/login",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": '*',
        },
        data: data,
    };

    try {
        const res = await axios(config);
        const date = new Date();
        const tomorrow = date.setDate(date.getDate() + 1);
        document.cookie = `session=${res.data.cookieValue}; expires=${tomorrow}; path=/`;
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const postRegister = (data) => {
    const config = {
        method: "post",
        url: BASE_URL + "/backend/api/register",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    };
    return axios(config)
    .then((res) => {
        const date = new Date();
        const tomorrow = date.setDate(date.getDate() + 1);
        document.cookie = `session=${res.data.cookieValue}; expires=${tomorrow}; path=/`;
        return res;
    })
    .catch((err) => {
        console.log(err);
    });
};

export const getUser = () => {
    return createRequest()
    .get("/backend/api/user")
    .then((res) => {
        console.log(res);
        return res;
    })
    .catch((err) => {
        console.log("Get user request failed: /backend/api/user/");
        console.log(err);
        return "err";
    });
}

export const getUserId = () => {
    return createRequest()
    .get("/backend/api/user-id")
    .then((res) => {
        console.log(res);
        return res;
    })
    .catch((err) => {
        console.log("Get user request failed: /backend/api/user-id");
        console.log(err);
        return "err";
    });
};

export const postListing = (data) => {
    return createRequest()
    .post ("/backend/api/listing", data)
    .then((res) => {
        console.log(res);
        return res;
    })
    .catch((err) => {
        console.log("Error posting listing: /backend/api/listing/");
        console.log(err);
        return "err";
    });
}

export const getListing = (id) => {
    return createRequest()
    .get(`/backend/api/listing/${id}`)
    .then((res) => {
        console.log(res);
        return res;
    })
    .catch((err) => {
        console.log("Error getting listing: /backend/api/listing/");
        console.log(err);
        return "err";
    });
}

export const getListings = (category) => {
    return createRequest()
    .get(`/backend/api/listing/category/${category}`)
    .then((res) => {
        console.log("Here");
        console.log(res);
        return res;
    })
    .catch((err) => {
        console.log("Error getting listing: /backend/api/listing/");
        console.log(err);
        return "err";
    });
};

export const sendMessage = (data) => {
    return createRequest()
    .post ("/backend/api/message", data)
    .then((res) => {
        console.log(res);
        return res;
    })
    .catch((err) => {
        console.log("Error posting message: /backend/api/message/");
        console.log(err);
        return "err";
    });
};

export const getMessages = () => {
    return createRequest()
    .get("/backend/api/message")
    .then((res) => {
        console.log(res);
        return res;
    })
    .catch((err) => {
        console.log("Error getting messages: /backend/api/message/");
        console.log(err);
        return "err";
    });
}

export const postToCart = (data) => {
    return createRequest()
    .post("/backend/api/postToCart", data)
    .then((res) => {
        console.log(res);
        return res;
    })
    .catch((err) => {
        console.log("Error posting to cart: /backend/api/postToCart");
        console.log(err);
        return "err";
    })
}

export const getCart = () => {
    return createRequest()
    .get("/backend/api/getCart")
    .then((res) => {
        console.log(res);
        return res;
    })
    .catch((err) => {
        console.log("Error getting cart: /backend/api/getCart");
        console.log(err);
        return "err";
    })
}

export const deleteCartItem = (listingId) => {
    return createRequest()
    .get(`/backend/api/deleteCartItem/${listingId}`)
    .then((res) => {
        console.log(res);
        return res;
    })
    .catch((err) => {
        console.log("Error deleting cart item: /backend/api/deleteCartItem");
    })
}
