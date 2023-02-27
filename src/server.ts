import App from "./app";
import IndexRoute from "@routes/index.route";
import validateEnv from "@utils/validateEnv";
import AuthRoute from "./routes/auth.route";
import SearchRoute from "./routes/search.route";

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new SearchRoute()]);

app.listen();
