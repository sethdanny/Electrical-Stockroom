import express from 'express';
import 'dotenv/config';
import { testConnection } from './models/index.js';
import errorHandler from './middlewares/errors.js';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from '../backend/routes/userRoute.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

const app = express();
const PORT = process.env.port || 4001;

app.get('/', (req, res) => {
	res.send({message: 'welcome'});
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: process.env.SECRET,
	saveUninitialized: false,
	resave: false,
	cookie: {
		maxAge: 60000 * 60,
	}
})
);
app.use(morgan('dev'));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRoutes);

app.use(errorHandler);

const startServer = async() => {
	try {
		await testConnection();
		app.listen(PORT, () => {
			console.log(`Server is listening on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();