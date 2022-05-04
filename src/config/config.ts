const ENV = process.env.NODE_ENV || "dev";

console.log("-- Running in " + ENV + " mode --");

if (ENV === "production") {
  // Production Config
} else {
  // Dev Config
}

export const config = {
  firebase: {},
  elastic: {},
};
