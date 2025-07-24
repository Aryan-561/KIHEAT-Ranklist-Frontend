const IS_PRODUCTION = import.meta.env.MODE === "production";
console.log(import.meta.env);

const ENV = {
    IS_PRODUCTION,
    API_BASE_URL: IS_PRODUCTION
        ? import.meta.env.VITE_API_BASE_URL_PRODUCTION
        : import.meta.env.VITE_API_BASE_URL_DEVELOPMENT,
};

export default ENV;
